const { getToken, nullOrAnyFun, superTestReq } = require("../../../helper/utils/utils");
let token = '';
beforeAll(async () => {
    expect.extend({
        nullOrAny(received, expected) {
            return nullOrAnyFun(received, expected)
        }
    });
    token = await getToken();
});
describe("GET /api/v1/user", () => {
    describe("given Bearer Token", () => {
        test("should respond with a 200 status code", async () => {
            const response = await superTestReq().get("/api/v1/user").set("Authorization", `Bearer ${token}`);
            expect(response.status).toBe(200)
            expect(response.body).toEqual(expect.objectContaining({
                status: true,
                data: {
                    UserID: expect.any(String),
                    FirstName: expect.any(String),
                    MiddleName: expect.nullOrAny(String),
                    LastName: expect.nullOrAny(String),
                    EmailID: expect.any(String),
                    UserPersona: expect.any(String)
                }
            }))
        })
    });
    describe("when Bearer Token missing", () => {
        test("should respond with a 401 status code", async () => {
            const repsonse = await superTestReq().get("/api/v1/user")
            expect(repsonse.status).toBe(401)
        })
    })
})