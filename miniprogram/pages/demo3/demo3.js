// pages/demo3/demo3.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
date:""
  },
  onLoad: function (options) {
    this.setData({
      name:options.name, age:options.age, bornWeight:options.bornWeight,bornHeight:options.bornHeight,sex:options.sex,
    Weight:options.Weight, Height:options.Height, TW:options.TW,months:options.months%12,YW:options.YW,
    ZSBBW:options.ZSBBW,STJPZHD:options.STJPZHD,JJXPZHD:options.JJXPZHD,z1:options.z1,ZScoreStr1:options.ZScoreStr1,
    z2:options.z2,ZScoreStr2:options.ZScoreStr2,z3:options.z3,ZScoreStr3:options.ZScoreStr3,
    z4:options.z4,ZScoreStr4:options.ZScoreStr4,z5:options.z5,ZScoreStr5:options.ZScoreStr5,
    z6:options.z6,ZScoreStr6:options.ZScoreStr6,z7:options.z7,ZScoreStr7:options.ZScoreStr7,
    z8:options.z8,ZScoreStr8:options.ZScoreStr8,
    p1:options.p1,PerScoreStr1:options.PerScoreStr1,    p2:options.p2,PerScoreStr2:options.PerScoreStr2,
    p3:options.p3,PerScoreStr3:options.PerScoreStr3,    p4:options.p4,PerScoreStr4:options.PerScoreStr4,
    p5:options.p5,PerScoreStr5:options.PerScoreStr5,    p6:options.p6,PerScoreStr6:options.PerScoreStr6,
    p7:options.p7,PerScoreStr7:options.PerScoreStr7,    p7:options.p8,PerScoreStr8:options.PerScoreStr8,
    })
    console.log(this.data.months)
  },
})