const powerBI = {
    averageOSA: {},
    executiveSummary: {
        groupId: "ac83bb71-83fb-46a9-a4c9-22a4e6a2249d",
        reportId: "6f36a19b-ef57-4231-b1a7-55a0366c6aa6",
        datasets: "ba364c42-7e81-48bd-ac53-66a62791309b",
        get embedURL() {
            return `https://app.powerbi.com/reportEmbed?reportId=${this.reportId}&groupId=${this.groupId}&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLU5PUlRILUVVUk9QRS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldCIsImVtYmVkRmVhdHVyZXMiOnsibW9kZXJuRW1iZWQiOnRydWUsInVzYWdlTWV0cmljc1ZOZXh0Ijp0cnVlfX0%3d`;
        }
    },
    osaDeepDive: {},
    managementView: {},
    oosDeepDive: {
        groupId: "ac83bb71-83fb-46a9-a4c9-22a4e6a2249d",
        reportId: "13539af1-c2d2-4661-9ca3-7b29ab89c6ac",
        datasets: "c0642e3a-9b02-44c5-a0d5-a8b264e83a47",
        get embedURL() {
            return `https://app.powerbi.com/reportEmbed?reportId=${this.reportId}&groupId=${this.groupId}&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLU5PUlRILUVVUk9QRS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldCIsImVtYmVkRmVhdHVyZXMiOnsibW9kZXJuRW1iZWQiOnRydWUsInVzYWdlTWV0cmljc1ZOZXh0Ijp0cnVlfX0%3d`;
        }
    }
}
module.exports = { powerBI };