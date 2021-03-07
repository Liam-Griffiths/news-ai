import { APIGatewayProxyResult } from "aws-lambda";

interface Responses {
    [key: string]: APIGatewayProxyResult;
}

export const responses: Responses = {
    unauthorized:  {
        statusCode: 401,
        body: JSON.stringify({ error: "Unauthorized" }),
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
        }
    },
    badRequest: {
        statusCode: 400,
        body: JSON.stringify({ error: "Bad Request" }),
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
        }
    },
    notFound: {
        statusCode: 404,
        body: JSON.stringify({ error: "Not found" }),
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
        }
    },
    serverError: {
        statusCode: 500,
        body: JSON.stringify({ error: "Internal Server Error" }),
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
        }
    },
    ok: {
        statusCode: 200,
        body: JSON.stringify({ status: "OK" }),
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
        }
    }
};