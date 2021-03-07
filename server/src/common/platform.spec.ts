import { getConfig } from "./platform";
import { devConfig, prodConfig } from "./config";

describe('Platform should work...', () => {
    afterAll(() => {
        jest.resetAllMocks();
    });

    it('should get dev config', async () => {
        const env: string = "dev";
        expect.assertions(1);
        return expect(getConfig(env)).toEqual(devConfig);
    });

    it('should get prod config', async () => {
        const env: string = "prod";
        expect.assertions(1);
        return expect(getConfig(env)).toEqual(prodConfig);
    });
});