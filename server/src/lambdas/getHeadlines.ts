import {APIGatewayEvent, APIGatewayProxyResult, Handler} from 'aws-lambda';
import AWS, {S3} from 'aws-sdk'
import {responses} from "../../common/responses";
import { Team, Person, MinPerson, TeamsResponse } from '../../common/interfaces';
import {getAllPeople, getAllTeams, getPerson} from "../../common/data";
import {S3Parameters} from "aws-sdk/clients/quicksight";

export const handler: Handler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult>  => {
    console.log("Incoming event:");
    console.log(JSON.stringify(event));
    const s3: S3 = new AWS.S3();

    const options = {
        Bucket: 'headlines-bucket',
        Key: 'headlines.json',
    };

    const data = await s3.getObject(options).promise();
    const fileContents = data.Body.toString();
    const json = JSON.parse(fileContents);
    console.log(json);

    if(data){
        const res: APIGatewayProxyResult = responses.ok;
        res.body = json;
        return res;
    }

    const res: APIGatewayProxyResult = responses.ok;
    res.body = "Nothing found."
    return res;
};
