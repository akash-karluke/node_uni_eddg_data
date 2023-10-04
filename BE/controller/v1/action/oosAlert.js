const { failedResposne, successResposne } = require("../../../helper/utils/repsonse");
const db = require("../../../helper/database/db");
const { AsyncParser } = require("@json2csv/node");
const { Readable } = require('stream');
const { getQuery, getDownloadQuery, getStoreQuery, getOSAAvailablityQuery, getlogbookQuery } = require("./utils");
const { paramsToWhere, isNotNull, getPage, getPerPage } = require("../../../helper/utils/utils");
const dimFactlessFactModel = require("../../../models/dimFactlessFact");
const aggProductCatModel = require("../../../models/aggProductCat");
const { tables } = require("../../../helper/utils/tables");

const oosAlert = async (req, res) => {
  // #swagger.description = OOS Alert Data
  try {
    const { Abbreviation, end_week, filters } = req.body;
    let { page, per_page } = req.body;
    page = getPage(page);
    per_page = getPerPage(per_page);
    //query used for count and data
    const query = getQuery(end_week, Abbreviation, filters, req.user);
    const [result] = await db.sequelize.query(`select * from ${query} B order by LostSalesValue desc OFFSET ${(page - 1) * per_page} ROWS FETCH NEXT ${per_page} ROWS ONLY`);
    const [count] = await db.sequelize.query(`select count(*) as count from ${query} B`);
    return res.send(successResposne({ count: count[0].count, rows: result }));
  }
  catch (e) {
    return res.status(500).send(failedResposne(e, req.originalUrl))
  }
};

const oosAlertDownload = async (req, res) => {
  // #swagger.description = OOS Alert Download
  try {
    const { Abbreviation, end_week, filters } = req.body;
    //query used for count and data
    const query = getDownloadQuery(end_week, Abbreviation, filters, req.user);
    const [count] = await db.sequelize.query(`select count(*) as count from ${query} B`);
    let totalRows = count[0].count;
    let offSetRows = 0;
    const limit = totalRows < 10000 ? totalRows : 10000;
    totalRows = totalRows / 10000;
    const loop = Number.isInteger(totalRows) ? totalRows : parseInt(totalRows) + 1;
    res.setHeader("Access-Control-Expose-Headers", "Content-Disposition");
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", `attachment; filename=${Abbreviation}_${end_week}.csv`);
    const opts = {
      withBOM: true,
      excelString: true
    };
    const transformOpts = {
      highWaterMark: 8192,
      objectMode: true
    };
    let asyncParser = new AsyncParser(opts, transformOpts);
    const myManualInput = new Readable({ objectMode: true });
    myManualInput._read = () => { };

    asyncParser.parse(myManualInput)
      .on('data', (chunk) => res.write(chunk.toString()))
      .on('end', () => res.end())
      .on('error', (err) => console.error(err));
    if (loop === 0) {
      myManualInput.push({ "Info": "No Data Found" })
    }
    else {
      for (let start = 1; start <= loop; start++) {
        console.log(start)
        let [result] = await db.sequelize.query(`select * from ${query} B order by LostSalesValue desc OFFSET ${offSetRows} ROWS FETCH NEXT ${limit} ROWS ONLY`);
        result.map(data => {
          myManualInput.push(data)
        });
        offSetRows = offSetRows + limit;

      }
    }
    myManualInput.push(null);
  }
  catch (e) {
    return res.status(500).send(failedResposne(e, req.originalUrl))
  }
};

const storeData = async (req, res) => {
  // #swagger.description = Store Details
  try {
    const { end_week, Abbreviation, params } = req.body;
    const paramsIN = paramsToWhere(params)
    const [store] = await db.sequelize.query(getStoreQuery(end_week, Abbreviation, paramsIN));
    const [[availability]] = await db.sequelize.query(getOSAAvailablityQuery(end_week, Abbreviation, paramsIN));
    return res.send(successResposne({ store, availability }));
  }
  catch (e) {
    return res.status(500).send(failedResposne(e, req.originalUrl))
  }
};
const updateStoreData = async (req, res) => {
  // #swagger.description = Store Details
  try {
    const { store, availability, Abbreviation } = req.body;
    let result = {
      store: [],
      availability: {}
    };
    if (store && store.length) {
      for (const item of store) {
        const { Factless_Fact_ID, RootCause, AvailabilityStatus } = item;
        if (isNotNull(Factless_Fact_ID)) {
          let skuData = {};
          if (isNotNull(RootCause)) {
            skuData["RootCause"] = RootCause;
          }
          if (isNotNull("AvailabilityStatus")) {
            skuData["AvailabilityStatus"] = AvailabilityStatus;
          }
          const [isUpdated] = await dimFactlessFactModel(Abbreviation).update(skuData, {
            where: { Factless_Fact_ID: Factless_Fact_ID },
            returning: true
          });
          const data = isUpdated ? { Factless_Fact_ID, status: true } : { Factless_Fact_ID, status: false };
          result.store.push(data);
        }
      }
    }
    if (availability) {
      const { AGG_PROD_ID, ActionStatus } = availability;
      if (isNotNull(AGG_PROD_ID)) {
        let catData = {};
        if (isNotNull(ActionStatus)) {
          catData["ActionStatus"] = ActionStatus;
        }
        const [isUpdated] = await aggProductCatModel(Abbreviation).update(catData, {
          where: { AGG_PROD_ID: AGG_PROD_ID }
        });
        result.availability = isUpdated ? { AGG_PROD_ID, staus: true } : { AGG_PROD_ID, staus: false };
      }
    }
    return res.send(successResposne(result));
  }
  catch (e) {
    return res.status(500).send(failedResposne(e, req.originalUrl))
  }
};
const logBookData = async (req, res) => {
  // #swagger.description = OOS Alert Log Book Details
  try {
    const { end_week, Abbreviation } = req.body;
    let { page, per_page } = req.body;
    page = isNaN(Number(page)) ? 1 : Number(page);
    per_page = isNaN(Number(per_page)) ? 10 : Number(per_page);
    //query used for count and data
    if (end_week == 202301) {
      where = `where WeekID in(${end_week},${end_week}-49)`;
    } else {
      where = `where WeekID in(${end_week},${end_week}-1)`;
    }
    const [data] = await db.sequelize.query(
      `[${tables.osaLogBookSP.schema}].[${tables.osaLogBookSP.table}] @tblName = :tblName, @where= :where, @week= ${end_week}, @pagesize= :pageSize, @pageno= :pageNo`,
      {
        replacements: {
          tblName: Abbreviation,
          where: where,
          pageSize: per_page,
          pageNo: page
        },
      }

    );
    condition = `where  SalesRepID in (SalesRepID) and WeekID in(${end_week}) and RetailerID in (RetailerID) and StoreID in (StoreID)`;
    const [Count] = await db.sequelize.query(
      `[${tables.osaLogBookCountSP.schema}].[${tables.osaLogBookCountSP.table}] @tblName = :tblName, @where= :where`,
      {
        replacements: {
          tblName: Abbreviation,
          where: condition
        },
      }
    );
    return res.send(successResposne({ count: Count[0].TotalCount, rows: data }));
  }
  catch (e) {
    return res.status(500).send(failedResposne(e, req.originalUrl))
  }
};


module.exports = { oosAlert, oosAlertDownload, storeData, updateStoreData, logBookData };