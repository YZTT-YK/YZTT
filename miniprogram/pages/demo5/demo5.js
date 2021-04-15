// pages/demo5/demo5.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      name:options.name, age:options.age, pastWeight:options.pastWeight,
    Weight:options.Weight, Height:options.Height, YZ:options.YZ,Taishu:options.Taishu,
    cBMI:options.cBMI,pastCondition:options.pastCondition,TS:options.TS,
    allWeight_change:options.allWeight_change,Weight2_13:options.Weight2_13,
    Weight14_26:options.Weight14_26,Weight27_40:options.Weight27_40, 
    weightChange:options.weightChange,tellBmi:options.tellBmi,cbmi:options.cbmi,
    shouldChange:options.shouldChange,shouldWeight:options.shouldWeight,gap:options.gap
    })
    console.log(this.data.weightChange)
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