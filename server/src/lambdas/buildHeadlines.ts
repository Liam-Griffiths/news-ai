import {APIGatewayEvent, APIGatewayProxyResult, Handler} from 'aws-lambda';
import {responses} from "../common/responses";
import Parser, {Output} from 'rss-parser';
//import MarkovGen from 'markov-generator';
import {sources} from "../common/config";
import {RawHeadline, TopicArray} from "../common/interfaces";
import nlp from 'compromise'

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

    let topicsHeadlines: TopicArray = {};
    headlines.forEach(line => {
        line.topics.forEach(topic => {
            topicsHeadlines[topic].push(line.headline);
        })
    });

    const container = Object.entries(topicsHeadlines);
        ​container.sort(function (a, b) {
        return b.length - a.length;
    });

   /* let markov = new MarkovGen({
        input: topicsHeadlines[container[0].to],
        minLength: 10
    });*/

    //let sentence = markov.makeChain();

    const res: APIGatewayProxyResult = responses.ok;
    res.body = JSON.stringify(container);
    return res;
};
