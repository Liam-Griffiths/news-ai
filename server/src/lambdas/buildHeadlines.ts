import {APIGatewayEvent, APIGatewayProxyResult, Handler} from 'aws-lambda';
import {responses} from "../common/responses";

export const handler: Handler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult>  => {
    console.log("Incoming event:");
    console.log(JSON.stringify(event));

    const res: APIGatewayProxyResult = responses.ok;
    return res;
};
