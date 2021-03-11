import {APIGatewayEvent, APIGatewayProxyResult, Handler} from 'aws-lambda';
import {responses} from "../common/responses";
import Parser, {Output} from 'rss-parser';
import {TextGenerator} from 'node-markov-generator';
import {sources} from "../common/config";
import {Headlines, RawHeadline, TopicHeadline} from "../common/interfaces";
import nlp from 'compromise'
import AWS, {S3} from "aws-sdk";

export const handler: Handler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult>  => {
    console.log("Incoming event:");
    console.log(JSON.stringify(event));

    let parser: Parser = new Parser();
    let headlines: RawHeadline[] = [];

    for(let source of sources.mainstream){
        let feed: Output<any> = await parser.parseURL(source.url);
        console.log(feed.title);

        feed.items.forEach(item => {
            const newHeadline: RawHeadline = {headline: item.title, url: item.link, topics:[]};

            let doc: any = nlp(item.title);
            let topics: any = doc.topics().json();
            topics.forEach((topic: { text: string; }) => {
                newHeadline.topics.push(topic.text);
            });
            headlines.push(newHeadline);
        });
    }

    headlines = shuffle(headlines);

    let topicsHeadlines: TopicHeadline[] = [];
    headlines.forEach(line => {
        line.topics.forEach(topic => {
            let key: number = search(topic, topicsHeadlines);
            if(key !== -1){
                topicsHeadlines[key].headlines.push(line.headline);
            }else{
                topicsHeadlines.push({topic: topic, headlines: [line.headline], url: line.url});
            }
        })
    });

    topicsHeadlines = topicsHeadlines.sort(sortObjByArrayProp("headlines"));
    topicsHeadlines = topicsHeadlines.reverse();

    console.log(`List: ${JSON.stringify(topicsHeadlines)}`);

    const generator = new TextGenerator(topicsHeadlines[0].headlines);
    const result = await generator.generateSentence();
    console.log(result);

    const finalHeadlines: Headlines = {
        lead: {
          text: result,
          link: topicsHeadlines[0].url
        }
    }

    const s3: S3 = new AWS.S3();

    const options = {
        Bucket: 'headlines-bucket',
        Key: 'headlines.json',
        Body: JSON.stringify(finalHeadlines),
        ContentType: "application/json"
    };

    const data = await s3.putObject(options).promise();

    const res: APIGatewayProxyResult = responses.ok;
    res.body = JSON.stringify(finalHeadlines);
    return res;
};

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
