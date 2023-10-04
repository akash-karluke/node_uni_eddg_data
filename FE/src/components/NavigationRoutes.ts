export const navigationRoutes = [
  {
    name: "Actions",
    component: "actions",
    roles: ["GlobalUser", "SalesManager"],
    visible: true,
    visibleInMobile: true,
    iconUrl: "/icons/actions.svg",
  },
  {
    name: "Executive Summary",
    component: "executiveSummary",
    roles: ["SalesRep", "GlobalUser", "SalesManager"],
    visible: true,
    visibleInMobile: false,
    iconUrl: "/icons/executiveSummary.svg",
  },
  {
    name: "OOS Deep Dive",
    component: "oosDeepDive",
    roles: ["SalesRep", "GlobalUser", "SalesManager"],
    visible: true,
    visibleInMobile: false,
    iconUrl: "/icons/oosDeepDive.svg",
  },
  {
    name: "OSA Deep Dive",
    component: "osaDeepDive",
    roles: ["SalesRep", "GlobalUser", "SalesManager"],
    visible: true,
    visibleInMobile: false,
    iconUrl: "/icons/osaDeepDive.svg",
  },

  {
    name: "Average OSA Analysis",
    component: "averageOsaAnalysis",
    roles: ["SalesRep", "GlobalUser", "SalesManager"],
    visible: true,
    visibleInMobile: false,
    iconUrl: "/icons/averageOsaAnalysis.svg",
  },

  {
    name: "PICOS Deep Dive",
    component: "picosDeepDive",
    roles: ["SalesRep", "GlobalUser", "SalesManager"],
    visible: true,
    visibleInMobile: false,
    iconUrl: "/icons/picosDeepDive.svg",
  },

  {
    name: "Scorecard",
    component: "scorecard",
    roles: ["SalesRep", "GlobalUser", "SalesManager"],
    visible: true,
    visibleInMobile: true,
    iconUrl: "/icons/scorecard.svg",
  },
];
