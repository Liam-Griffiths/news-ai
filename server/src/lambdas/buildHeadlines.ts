import {APIGatewayEvent, APIGatewayProxyResult, Handler} from 'aws-lambda';
import {responses} from "../../common/responses";
import { Team, Person, MinPerson, TeamsResponse } from '../../common/interfaces';
import {getAllPeople, getAllTeams, getPerson} from "../../common/data";

export const handler: Handler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult>  => {
    console.log("Incoming event:");
    console.log(JSON.stringify(event));

    const res: APIGatewayProxyResult = responses.ok;
    return res;
};
