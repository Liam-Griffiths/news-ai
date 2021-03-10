import Dynamo from "aws-sdk/clients/dynamodb";
import {AWSError} from "aws-sdk";
import {Key, MapObj} from './interfaces';
import {devConfig, prodConfig} from "./config";

const currentEnv:string = "liam";
const devEnv: string = "dev";
const prodEnv: string = "prod";

export const loadAllGeneric = async (tableName: string): Promise<any> => {
    const dynamo: Dynamo = new Dynamo();
    const dynamoDoc: Dynamo.DocumentClient = new Dynamo.DocumentClient({
        convertEmptyValues: true,
        service: dynamo
    });

    let finalResponse: any[] = [];

    const scanParams: Dynamo.DocumentClient.ScanInput = {
        TableName: tableName
    };

    console.log("Getting all...");

    return dynamoDoc.scan(scanParams).promise()
        .then((data) => {
            if (data.Items) finalResponse = data.Items as any[];
            console.log(`Found ${finalResponse.length} records.`);

            return finalResponse;
        })
        .catch((error: AWSError) => {
            console.log(error);

            return finalResponse;
        });
};

export const loadIDGeneric = async (tableName: string, id: string): Promise<any> => {

        const dynamo: Dynamo = new Dynamo();
        const dynamoDoc: Dynamo.DocumentClient = new Dynamo.DocumentClient({
            convertEmptyValues: true,
            service: dynamo
        });

        if (id) {
            const getConfig: Dynamo.DocumentClient.GetItemInput = {
                TableName: tableName,
                Key: {
                    ID: id
                }
            };

            console.log(`Loading record ${id}`);

            return dynamoDoc.get(getConfig).promise()
                .then((data) => {
                    if (data.Item) {

                        return data.Item;
                    }

                    return false;
                })
                .catch((error: AWSError) => {
                    console.log(error);

                    return false;
                });
        }
};

export const loadFieldGeneric = async (tableName: string, field: string, id: string): Promise<any> => {

    const dynamo: Dynamo = new Dynamo();
    const dynamoDoc: Dynamo.DocumentClient = new Dynamo.DocumentClient({
        convertEmptyValues: true,
        service: dynamo
    });

    if (id) {
        const queryConfig: Dynamo.DocumentClient.QueryInput = {
            TableName: tableName,
            IndexName: field,
            KeyConditionExpression: `${field} = :u`,
            ExpressionAttributeValues: {
                ":u" : id
            }
        };

        console.log(JSON.stringify(getConfig));
        console.log(`Loading record ${id}`);

        return dynamoDoc.query(queryConfig).promise()
            .then((data) => {
                if (data.Items && data.Items.length) {
                    console.log(JSON.stringify(data.Items));

                    return data.Items;
                }

                return false;
            })
            .catch((error: AWSError) => {
                console.log(error);

                return false;
            });
    }
};

export const loadIDBatchGeneric = async (tableName: string, idArray: string[]): Promise<any> => {

    const dynamo: Dynamo = new Dynamo();
    const dynamoDoc: Dynamo.DocumentClient = new Dynamo.DocumentClient({
        convertEmptyValues: true,
        service: dynamo
    });

    const keys: Key[] = [];
    idArray.forEach((idItem)=>{
        const newKey: Key = {
            ID: idItem
        }
        keys.push(newKey);
    });

    if (keys) {
        const getConfig: Dynamo.DocumentClient.BatchGetItemInput = {
            RequestItems:{
                [tableName]: {
                    Keys: keys
                }
            }
        };

        console.log(`Loading records`);

        return dynamoDoc.batchGet(getConfig).promise()
            .then((data) => {

                console.log("200");
                console.log(JSON.stringify(data.Responses));

                if(!data.Responses || !data.Responses[tableName]) return false;

                return data.Responses[tableName];
            })
            .catch((error: AWSError) => {
                console.log("500");
                console.log(error);

                return false;
            });
    }
};

export const commitGeneric = async (tableName: string, data: any): Promise<boolean> => {
    const dynamo: Dynamo = new Dynamo();
    const dynamoDoc: Dynamo.DocumentClient = new Dynamo.DocumentClient({
        convertEmptyValues: true,
        service: dynamo
    });

    const putConfig: Dynamo.DocumentClient.PutItemInput = {
        TableName: tableName,
        Item: data
    };

    console.log("Committing record:");
    console.log(JSON.stringify(data));

    return dynamoDoc.put(putConfig).promise()
        .then(() => {
            console.log(`Data committed`);

            return true;
        })
        .catch((error: AWSError) => {
            console.log(error);

            return false;
        });
}

export const getConfig = (env?: string): MapObj => {
    let currentEnv: string = devEnv;
    if (env) currentEnv = env;

    if (env == devEnv) return devConfig;
    if (env == prodEnv) return prodConfig;

    return devConfig;
};