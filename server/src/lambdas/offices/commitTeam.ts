import {APIGatewayEvent, APIGatewayProxyEvent, APIGatewayProxyResult, Handler} from 'aws-lambda';
import {responses} from "../../common/responses";
import { Team } from '../../common/interfaces';
import {commitTeam} from "../../common/data";

export const handler: Handler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult>  => {
    console.log("Incoming event:");
    console.log(JSON.stringify(event));

    if(!event.body) return responses.badRequest;

    try {
        const team: Team = JSON.parse(event.body);
        await commitTeam(team);

        const res: APIGatewayProxyResult = responses.ok;
        return res;

    } catch (error) {
        console.log(error);
        const res: APIGatewayProxyResult = responses.serverError;
        res.body = error;
        return res;
    }
};
