const CONFIG = {
  useLiveData: true,

  sheets: {
  skus:         "https://docs.google.com/spreadsheets/d/e/2PACX-1vThN0RKLSU67oXkUFIixgnX73N8mPiiEchEGnkpeIpvr6K6WUsnOzubA1hwiPFc4A/pub?gid=1586570316&single=true&output=csv",
  transactions: "https://docs.google.com/spreadsheets/d/e/2PACX-1vThN0RKLSU67oXkUFIixgnX73N8mPiiEchEGnkpeIpvr6K6WUsnOzubA1hwiPFc4A/pub?gid=1250416564&single=true&output=csv",
  warehouses:   "https://docs.google.com/spreadsheets/d/e/2PACX-1vThN0RKLSU67oXkUFIixgnX73N8mPiiEchEGnkpeIpvr6K6WUsnOzubA1hwiPFc4A/pub?gid=1345876107&single=true&output=csv",
  audits:       "https://docs.google.com/spreadsheets/d/e/2PACX-1vThN0RKLSU67oXkUFIixgnX73N8mPiiEchEGnkpeIpvr6K6WUsnOzubA1hwiPFc4A/pub?gid=596060522&single=true&output=csv"

  },

  camps: [
    { name: "2026 冬令營", date: "2026-02-10", students: 1500 },
    { name: "2026 夏令營", date: "2026-07-15", students: 4000 },
    { name: "2027 冬令營", date: "2027-02-10", students: 1500 },
    { name: "2027 夏令營", date: "2027-07-15", students: 4000 }
  ],

  staleMonths: 12
};
