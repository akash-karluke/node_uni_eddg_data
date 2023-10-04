const { tables } = require("../../../helper/utils/tables");
const { isNotNull, filterINSQL, userPersonna, getUserIDQuery, changeArrayToMap } = require("../../../helper/utils/utils");
const getQuery = (end_week, Abbreviation, filters, user) => {
  const getUserQuery = getUserIDQuery(user);
  const filterIn = filterINSQL(filters, false)
  return `(
      select 
        [AGG_PROD_ID], 
        [Priority], 
        A.[StoreID],
        [StoreName],
        [City],
        A.[CategoryID],
        [ProductCategory], 
        OOS,
        [LostSalesValue],
        AC as #ActionsRequired,
        RC,
        [SalesRepID], 
        CONCAT([FirstName],' ',[LastName]) as FieldRep,
        LW as LastVisit,
        [ActionStatus]
      from 
        (
          Select 
            [AGG_PROD_ID], 
            [LocationID], 
            [StoreID], 
            [SalesRepID], 
            [CategoryID], 
            [LostSalesValue], 
            [CompleatedDate], 
            1 - [OSAPercentage] as OOS, 
            [ActualSalesValue], 
            [Priority], 
            'Increase OSA' as RC, 
            [ActionStatus], 
            [ActionRequired], 
            AC = Count(*) over(
              Partition By [LocationID], [StoreID], 
              [SalesRepID], [CategoryID]
            ), 
            LW = Max(CompleatedDate) over(
              Partition By [LocationID], [StoreID], 
              [SalesRepID], [CategoryID]
            ), 
            WeekID, 
            ActionPending = count([ActionStatus]) over(
              Partition By [LocationID], [StoreID], 
              [SalesRepID], [CategoryID], [ActionStatus]
            ) 
          from 
            [${tables.aggProductCatDb.schema}].[${tables.aggProductCatDb.table}${Abbreviation}] 
          where 
            WeekID <= ${end_week} 
            and [ActionRequired] = 1 ${isNotNull(filterIn) ? filterIn : ''}  ${isNotNull(getUserQuery) ? `and ${getUserQuery}` : ''}
        ) as A 
        left join [dbo].[Dim_Location_DB] as AA on AA.[LocationID] = A.[LocationID] 
        left join [dbo].[Dim_Category_DB] as BB on BB.[CategoryID] = A.[CategoryID] 
        left join [dbo].[Dim_Store_DB] as CC on CC.[StoreID] = A.[StoreID] 
        left join [dbo].[Dim_UserPersona] as DD on DD.[UserID] = A.[SalesRepID] 
      Where 
        WeekID = ${end_week}
    )`;
}
const getDownloadQuery = (end_week, Abbreviation, filters, user) => {
  const getUserQuery = getUserIDQuery(user);
  const filterIn = filterINSQL(filters, false)
  return `(select 
      [Fact_ID], 
      [Year], 
      [Date], 
      A.[WeekID], 
      [CountryName], 
      [City], 
      [RegionName], 
      [ProductCode], 
      [ProductDescription], 
      [GlobalDivision], 
      [ProductCategory], 
      [RetailerName], 
      [StoreCode], 
      [StoreName], 
      [ActualSalesValue], 
      [LostSalesValue], 
      [OSAPercentage], 
      [AvailablityStatus], 
      CONCAT([FirstName],' ',[LastName]) as AssignedTO, 
      isnull(A.[Priority], 'Low') as Priority 
    from 
      (
        SELECT 
          Fact_ID, 
          LocationID, 
          AA.WeekID, 
          AA.ProductID, 
          AA.CategoryID, 
          AA.RetailerID, 
          AA.StoreID, 
          AA.SalesRepID, 
          AA.ManagerID COTCFlag, 
          ActualSalesValue, 
          LostSalesValue, 
          OSAPercentage, 
          AvailablityStatus, 
          [Priority] from (
            Select 
              * 
            from 
              [${tables.factOsa.schema}].[${tables.factOsa.table}${Abbreviation}] 
            where WeekID = ${end_week} and [AvailablityStatus] = 0 ${isNotNull(filterIn) ? filterIn : ''} ${isNotNull(getUserQuery) ? `and ${getUserQuery}` : ''} 
          ) as AA 
          left join (
            Select 
              WeekID, 
              CategoryID, 
              StoreID, 
              RetailerID, 
              [Priority] 
            from 
              [${tables.aggProductCatDb.schema}].[${tables.aggProductCatDb.table}${Abbreviation}]  
            where 
              WeekID = ${end_week}
          ) as BB on BB.WeekID = AA.WeekID 
          and BB.CategoryID = AA.CategoryID 
          and BB.StoreID = AA.StoreID 
          and BB.RetailerID = AA.RetailerID 
      ) as A 
      inner join [dbo].[Dim_Location_DB] as B on A.LocationID = B.LocationID          
      inner join [dbo].[Dim_Retailer_DB] as C on C.RetailerID = A.RetailerID          
      inner join [dbo].[Dim_Category_DB] as D on A.CategoryID = D.CategoryID          
      inner join [dbo].[Dim_Store_DB] as E on E.StoreID = A.StoreID          
      inner join [dbo].[Dim_Date_DB] as F on F.[WeekID] = A.WeekID 
      left join [dbo].[Dim_UserPersona] as DD on DD.[UserID] = A.[SalesRepID] 
      inner join [dbo].[Dim_Products_DB] as H on H.[ProductID] = A.[ProductID]
    )`;
};

const getGrowthPotentialQuery = (params) => {
  const { Retailer, StoreName, Category, Country, VisitWeek }= params
 
  return `Select [Action Priority],[Store Name],[Store Code],[Location],[Category],[Channel],[Top 5 KPI],[Achieved],
  case when LW is NULL then NULL else [Achieved]-LW end as LastVisitCompliance
  ,[Target],[Target]-[Achieved] as Growth_Potential,
  [Sales Representative],[Visit Date],[Action Status]
  From (

  Select [Action Priority],[Store Name],[Store Code],[Location],[Category],[Channel],[Top 5 KPI],[Achieved],[Target],[Target]-[Achieved] as Growth_Potential,
  [Sales Representative],[Visit Date],[Action Status], lag([Achieved]) over (partition by [Store Name],[Store Code],[Location],[Category],[Top 5 KPI] order by [Visit Week]) as LW
  , [Visit Week],[Action Required]
  From [stg_all_picos_new]
  Where [Visit Week] = ${VisitWeek} and [Store Name] in ${changeArrayToMap(StoreName)} and [Category] in ${changeArrayToMap(Category)} and [Country] in ${changeArrayToMap(Country)} and [Retailer] in ${changeArrayToMap(Retailer)}
  ) as A
  Where [Visit Week] =${VisitWeek} and [Action Required] =1
  
  `;
}

const getStoreQuery = (end_week, Abbreviation, filters) => {
  return `SELECT FF.Factless_Fact_ID, FF.ProductID, Prod.ProductDescription as core_sku_description, prod.ProductCode core_sku_EAN, AvailabilityStatus, FF.RootCause from ${tables.dimFactlessFact.schema}.${tables.dimFactlessFact.table}${Abbreviation} as FF inner join Dim_Products_DB as Prod on Prod.ProductID= FF.ProductID
  where WeekID = ${end_week} ${isNotNull(filters) ? ' and ' + filters : ''}`;
}

const getOSAAvailablityQuery = (end_week, Abbreviation, filters) => {

  return `SELECT AGG_PROD_ID, Due_date, ActionStatus, OSAPercentage*100 as OSAPercentage, 95 as TargetOSA from ${tables.aggProductCatDb.schema}.${tables.aggProductCatDb.table}${Abbreviation} where  WeekID = ${end_week} ${isNotNull(filters) ? ' and ' + filters : ''}`;
};

module.exports = { getDownloadQuery, getQuery, getStoreQuery, getOSAAvailablityQuery, getGrowthPotentialQuery }
