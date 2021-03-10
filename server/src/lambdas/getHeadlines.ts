import {APIGatewayEvent, APIGatewayProxyResult, Handler} from 'aws-lambda';
import AWS, {S3} from 'aws-sdk'
import { responses } from "../common/responses";

export const handler: Handler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult>  => {
    console.log("Incoming event:");
    console.log(JSON.stringify(event));
    const s3: S3 = new AWS.S3();

    const options = {
        Bucket: 'headlines-bucket',
        Key: 'headlines.json',
    };

    const data = await s3.getObject(options).promise();

    if(!data || !data.Body){
        const res: APIGatewayProxyResult = responses.notFound;
        return res;
    }

    const fileContents = data.Body.toString();
    const json = JSON.parse(fileContents);
    console.log(json);

    const res: APIGatewayProxyResult = responses.ok;
    res.body = fileContents;
    return res;
};
