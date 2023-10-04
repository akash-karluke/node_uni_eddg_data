const { exceptions } = require("winston");
const { getToken, superTestReq, getOOSAlertPayload, getOOSAlertStorePayload } = require("../../../helper/utils/utils");
let token = '';
let oosAlertPayload = '';
let storePayload = '';
beforeAll(async () => {
    token = await getToken();
    oosAlertPayload = await getOOSAlertPayload();
    storePayload = await getOOSAlertStorePayload();
});
describe("POST /api/v1/action/oosAlert", () => {
    describe("Data Availablity", () => {
        test("should respond with a 200 status code", async () => {
            const response = await superTestReq().post("/api/v1/action/oosAlert").set('Content-type', 'application/json').set("Authorization", `Bearer ${token}`).send(oosAlertPayload);
            expect(response.status).toBe(200);
            expect(response.body).toEqual(expect.objectContaining({
                status: true,
                data: {
                    count: expect.any(Number),
                    rows: expect.any(Array)
                }
            }));
        })
    });
    describe("Authentication Failed", () => {
        test("should respond with a 401 status code", async () => {
            const repsonse = await superTestReq().post("/api/v1/action/oosAlert").set('Content-type', 'application/json')
            expect(repsonse.status).toBe(401)
        })
    })
    describe("Payload Required", () => {
        test("should respond with a 400 status code", async () => {
            const repsonse = await superTestReq().post("/api/v1/action/oosAlert").set('Content-type', 'application/json').set("Authorization", `Bearer ${token}`);
            expect(repsonse.status).toBe(400);
        })
    })
})
describe("POST /api/v1/action/oosAlert/download", () => {
    describe("Download", () => {
        test("should respond with a 200 status code", async () => {
            const response = await superTestReq().post("/api/v1/action/oosAlert/download").set('Content-type', 'application/json').set("Authorization", `Bearer ${token}`).send(oosAlertPayload);
            expect(response.status).toBe(200);
        })
    });
    describe("Authentication Failed", () => {
        test("should respond with a 401 status code", async () => {
            const repsonse = await superTestReq().post("/api/v1/action/oosAlert/download").set('Content-type', 'application/json')
            expect(repsonse.status).toBe(401)
        })
    })
    describe("Payload Required", () => {
        test("should respond with a 400 status code", async () => {
            const repsonse = await superTestReq().post("/api/v1/action/oosAlert/download").set('Content-type', 'application/json').set("Authorization", `Bearer ${token}`);
            expect(repsonse.status).toBe(400);
        })
    })
})
describe("POST /api/v1/action/oosAlert/store", () => {
    describe("Data Availablity", () => {
        test("should respond with a 200 status code", async () => {
            const response = await superTestReq().post("/api/v1/action/oosAlert/store").set('Content-type', 'application/json').set("Authorization", `Bearer ${token}`).send(storePayload);
            expect(response.status).toBe(200);
            expect(response.body).toEqual(expect.objectContaining({
                status: true,
                data: {
                    store: expect.any(Array),
                    availability: expect.any(Object)
                }
            }));
        })
    });
    describe("Authentication Failed", () => {
        test("should respond with a 401 status code", async () => {
            const repsonse = await superTestReq().post("/api/v1/action/oosAlert/store").set('Content-type', 'application/json')
            expect(repsonse.status).toBe(401)
        })
    })
    describe("Payload Required", () => {
        test("should respond with a 400 status code", async () => {
            const repsonse = await superTestReq().post("/api/v1/action/oosAlert/store").set('Content-type', 'application/json').set("Authorization", `Bearer ${token}`);
            expect(repsonse.status).toBe(400);
        })
    })
})

