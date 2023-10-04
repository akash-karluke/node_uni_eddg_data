const tables = {
    userPersona: {
        schema: "dbo",
        table: "Dim_UserPersona"
    },
    countryMap: {
        schema: "dbo",
        table: "DIM_Country_REP_MAP"
    },
    aggProductCatDb: {
        schema: "dbo",
        table: "AGG_Product_CAT_DB_"
    }
    ,
    dimLoction: {
        schema: "dbo",
        table: "Dim_Location_DB"
    },
    dimCategory: {
        schema: "dbo",
        table: "Dim_Category_DB"
    },
    dimStore: {
        schema: "dbo",
        table: "Dim_Store_DB"
    },
    factOsa: {
        schema: "dbo",
        table: "Fact_OSA_DB_"
    },
    OsaFilterMapping: {
        schema: "dbo",
        table: "OSA_Filter_Mapping"
    },
    OSAStoreFilterSP: {
        schema: "dbo",
        table: "OSA_Store_Filter"
    },
    OSAFilterMappingSP: {
        schema: "dbo",
        table: "OSA_Filter_Mapping_SP"
    },
    dimFactlessFact: {
        schema: "dbo",
        table: "Dim_Factless_Fact_"
    },
    dimRootCause: {
        schema: "dbo",
        table: "Dim_Root_Cause"
    },
    osaLogBookSP: {
        schema: "dbo",
        table: "OSA_Logbook_SP"
    },
    osaLogBookCountSP: {
        schema: "dbo",
        table: "OSA_Logbook_Count_SP"
    }
};
const picosTables = {
    Bel: {
        vwTopOsaDashboard: {
            schema: "belgium",
            table: "vw_top_osa_dashboard"
        },
        vwKpiBannerImage: {
            schema: "belgium",
            table: "vw_kpi_banner_image"
        }
    },
    Nld: {
        vwTopOsaDashboard: {
            schema: "nl",
            table: "vw_top_osa_dashboard"
        },
        vwKpiBannerImage: {
            schema: "nl",
            table: "vw_kpi_banner_image"
        }
    },
    Mex: {
        vwTopOsaDashboard: {
            schema: "mexico",
            table: "vw_top_osa_dashboard"
        },
        vwKpiBannerImage: {
            schema: "mexico",
            table: "vw_kpi_banner_image"
        }
    },
    Tur: {
        vwTopOsaDashboard: {
            schema: "turkey",
            table: "vw_top_osa_dashboard"
        },
        vwKpiBannerImage: {
            schema: "turkey",
            table: "vw_kpi_banner_image"
        }
    }
};

module.exports = { tables, picosTables }