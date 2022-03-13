import {APIGatewayEvent, APIGatewayProxyResult, Handler} from 'aws-lambda';
import {responses} from "../common/responses";
import Parser, {Output} from 'rss-parser';
import {TextGenerator} from 'node-markov-generator';
import {sources} from "../common/config";
import {Headlines, MapObj, RawHeadline, TopicHeadline} from "../common/interfaces";
import nlp from 'compromise'
import AWS, {S3} from "aws-sdk";

/*async function procesMultipleCandidates (data) {
    let generatedResponse = []
    await Promise.all(data.map(async (elem) => {
        try {
            // here candidate data is inserted into
            let insertResponse = await insertionInCandidate(elem)
            // and response need to be added into final response array
            generatedResponse.push(insertResponse)
        } catch (error) {
            console.log('error'+ error);
        }
    }))
    console.log('complete all') // gets loged first
    return generatedResponse // return without waiting for process of
}*/

export const handler: Handler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult>  => {
    //console.log("test 1");
    const parser: Parser = new Parser({
        customFields: {
            item: [
                ["media:content", "media"],
            ]
        }
    });
    let headlines: RawHeadline[] = [];
    const ONEDAY: number = (24 * (60 * 60 * 1000));

    for(let source of sources.mainstream){
        try {
            let feed: Output<any> = await parser.parseURL(source.url);
            //console.log(JSON.stringify(feed));
            feed.items.forEach(item => {
                // tslint:disable-next-line:no-any
                let pubDate: any = new Date(item.pubDate);
                // @ts-ignore
                if(((new Date) - pubDate) < ONEDAY) {
                    const newHeadline: RawHeadline = {headline: item.title, url: item.link, topics: []};
                    item.content=item.content.replace(/<br>/gi, "\n");
                    item.content=item.content.replace(/<p.*>/gi, "\n");
                    item.content=item.content.replace(/<a.*href="(.*?)".*>(.*?)<\/a>/gi, " $2 (Link->$1) ");
                    item.content=item.content.replace(/<(?:.|\s)*?>/g, "");
                    let doc: any = nlp(`${item.title} ${item.content}`);
                    let topics: any = doc.topics().json();
                    let topicList: string[] = [];
                    topics.forEach((topic: { text: string; }) => {
                        if (topics.length > 1) {
                            let t: string = topic.text;
                            t = t.toLowerCase();
                            t = t.replace("'s", "");
                            t = t.replace(/\W/g, "");
                            topicList.push(t);
                        }
                    });
                    if (topicList.length > 1) {
                        //topicList.sort();
                        //newHeadline.topics.push(topicList.join("-"));
                        newHeadline.topics.push(`${topicList[0]}-${topicList[topicList.length - 1]}`);
                        //topicList.forEach((t) => {
                        //    newHeadline.topics.push(t);
                        //})
                        headlines.push(newHeadline);
                    }
                }
            });
        }catch{
            console.log(source.title + " broken");
        }
    }

    headlines = shuffle(headlines);

    let topicsHeadlines: TopicHeadline[] = [];
    headlines.forEach(line => {
        line.topics.forEach(topic => {
            let key: number = search(topic, topicsHeadlines);
            if(key !== -1){
                topicsHeadlines[key].headlines.push(line.headline);
                if(!urlContainsTopics(topicsHeadlines[key].url, topicsHeadlines[key].topic)){
                    topicsHeadlines[key].url = line.url;
                }
            }else{
                topicsHeadlines.push({topic: topic, headlines: [line.headline], url: line.url});
            }
        })
    });

    topicsHeadlines.sort(sortObjByArrayProp("headlines"));
    topicsHeadlines = topicsHeadlines.filter(function( obj ) {
        return obj.headlines.length !== 1;
    });
    topicsHeadlines.reverse();

    const generator = new TextGenerator(topicsHeadlines[0].headlines);
    const result = await generator.generateSentence({
        minWordCount: 5,
        contextUsageDegree: 0.3
    });

    const finalHeadlines: Headlines = {
        lead: {
          text: result,
          link: topicsHeadlines[0].url,
          topic: topicsHeadlines[0].topic
        },
        headlines: []
    }

    let i: number = 0;
    for(let lineObj of topicsHeadlines){
        if(i > 0 && i < 30) {
            const generator1 = new TextGenerator(lineObj.headlines);
            const result1 = await generator1.generateSentence({
                minWordCount: 5,
                contextUsageDegree: 0.3
            });
            if (!finalHeadlines.headlines) finalHeadlines.headlines = [];
            if(result1) {
                finalHeadlines.headlines.push({
                    text: result1,
                    link: lineObj.url,
                    topic: lineObj.topic
                });
            }
        }
        i += 1;
    };

    const s3: S3 = new AWS.S3();

    const options = {
        Bucket: 'headlines-bucket-dev',
        Key: 'headlines.json',
        Body: JSON.stringify(finalHeadlines),
        ContentType: "application/json"
    };

    await s3.putObject(options).promise();

    const options2 = {
        Bucket: 'headlines-bucket-dev',
        Key: 'raw.json',
        Body: JSON.stringify(topicsHeadlines),
        ContentType: "application/json"
    };

    await s3.putObject(options2).promise();

    const res: APIGatewayProxyResult = responses.ok;
    res.body = JSON.stringify(finalHeadlines);
    return res;
};

// @ts-ignore
function urlContainsTopics(url, topicStr){
    let topicArray: string[] = topicStr.split("-");
    let urlTest: string = url.replace(/\W/g, "");
    for (let i=0; i < topicArray.length; i++) {
        if (urlTest.toUpperCase().includes(topicArray[i].toUpperCase())) {
            return false;
        }
    }
    return true;
}

// @ts-ignore
function search(nameKey, myArray){
    for (let i=0; i < myArray.length; i++) {
        if (myArray[i].topic === nameKey) {
            return i;
        }
    }
    return -1;
}

// @ts-ignore
function sortObjByArrayProp(property) {
    let sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    // @ts-ignore
    return function (a,b) {
        /* next line works with strings and numbers,
         * and you may want to customize it to your needs
         */
        let result = (a[property].length < b[property].length) ? -1 : (a[property].length > b[property].length) ? 1 : 0;
        return result * sortOrder;
    }
}

// @ts-ignore
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
