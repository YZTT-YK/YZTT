
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tellBmi:"",
    tellWhr:"",
    tellUpHipliness:"",
 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    this.setData({       name:options.name, sex:options.sex, age:options.age,  BMI:options.BMI, SBW:options.SBW,
      Height:options.Height,XTW:options.XTW, Weight:options.Weight,   SBJW:options.SBJW,
      Weight_Last:options.Weight_Last,  PZHD:options.PZHD, YM:options.YM, WL:options.WL,
      TW:options.TW, Weight_IBW:options.Weight_IBW, Ideal_Weight:options.Ideal_Weight,
      Weight_Change:options.Weight_Change, YTB:options.YTB


    })
     
if(parseFloat(this.data.BMI)>0&&parseFloat(this.data.BMI)<18.5){
  this.setData({
    tellBmi:"偏瘦"
  })
} else if(parseFloat(this.data.BMI)>= 18.5 && parseFloat(this.data.BMI)<24){
  this.setData({
    tellBmi:"正常"
  })
}else if(parseFloat(this.data.BMI)>= 24 && parseFloat(this.data.BMI)<28){
  this.setData({
    tellBmi:"超重"
  })
}else if(parseFloat(this.data.BMI)>= 28){
  this.setData({
    tellBmi:"肥胖"
  })
}
////腰臀比情况
if(this.data.sex=="男"){
  if(parseFloat(this.data.YTB)>0.9){
    this.setData({
      tellWhr:"腹型肥胖，有患高脂血症、糖尿病、脑卒中、冠心病的危险"
    })
  }
  else{
    this.setData({
      tellWhr:"正常"
    })
  }
}
else{
  if(parseFloat(this.data.YTB)>0.85){
    this.setData({
      tellWhr:"腹型肥胖，有患高脂血症、糖尿病、脑卒中、冠心病的危险"
    })
  }
  else{
    this.setData({
      tellWhr:"正常"
    })
  }
}
//上臂肌围情况
if(this.data.sex=="男"){
  if((parseFloat(this.data.SBJW)/24.8)<0.9){
    this.setData({
      tellUpHipliness:"上臂肌围异常"
    })
  }
  else{
    this.setData({
      tellUpHipliness:"正常"
    })
  }
}
else{
  if((parseFloat(this.data.YBJW)/21)<0.9){
    this.setData({
      tellUpHipliness:"上臂肌围异常"
    })
  }
  else{
    this.setData({
      tellUpHipliness:"正常"
    })
  }
}
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})