exports.Permission = {
  authMod:  1,
  userMod:  2,
  entryRead:4,
  entryMod: 8,
  compMod:  16,
  compRead: 32,
  compReportFinancial: 64,
  compReportOperations: 128,
  compReportJudging:  256,
  compModifyScores: 512,
  compRefundEntries: 1024,
  sysReadUserList: 2048,
  sysArchiveComp: 4096,
  sysCreateUser: 8162,
  sysSystemActions: 16384,
  sysTest: 32786
};

exports.PermClass = {
  admin:  this.Permission.authMod |
          this.Permission.userMod |
          this.Permission.compMod |
          this.Permission.compRead |
          this.Permission.entryRead |
          this.Permission.entryMod |
          this.Permission.compReportFinancial |
          this.Permission.compReportOperations |
          this.Permission.compReportJudging,
  compAdmin:
          this.Permission.compMod |
          this.Permission.compRead |
          this.Permission.entryRead |
          this.Permission.entryMod |
          this.Permission.compReportFinancial |
          this.Permission.compReportOperations |
          this.Permission.compReportJudging|
          this.Permission.compRefundEntries|
          this.Permission.sysReadUserList,
  judgeAdmin:
          this.Permission.compRead |
          this.Permission.entryRead |
          this.Permission.compReportJudging,

};

exports.CompState = {
  active: 1,
  acceptingEntries: 2,
  paused: 3,
  closedEntries: 4,
  running: 5,
  finished: 6,
  published: 7,
  completed: 8,
  closed: 16,
};

exports.EntryType = {
  fullPrice: 1,
  clubDiscount: 2,
  online: 4,
  offline: 8,
  test: 16,
  multiEntry: 32
};

