const { getToken, superTestReq } = require("../../../helper/utils/utils");
let token = '';
beforeAll(async () => {
    token = await getToken();
});
describe("GET /api/v1/dashboard", () => {
    describe("Data Availablity", () => {
        test("should respond with a 200 status code", async () => {
            const response = await superTestReq().get("/api/v1/dashboard").set("Authorization", `Bearer ${token}`);
            expect(response.status).toBe(200);
            expect(response.body).toEqual(expect.objectContaining({
                status: true,
                data: {
                    Country: expect.any(Array),
                    Language: expect.any(Array),
                    Currency: expect.any(Array),
                    RootCause: expect.any(Array)
                }
            }));
            expect(response.body.data.Country.length).toBeGreaterThan(0)
        })
    });
    describe("when Bearer Token missing", () => {
        test("should respond with a 401 status code", async () => {
            const repsonse = await superTestReq().get("/api/v1/dashboard")
            expect(repsonse.status).toBe(401)
        })
    })
})