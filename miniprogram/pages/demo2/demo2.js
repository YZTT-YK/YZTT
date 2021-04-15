import*as echarts from '../../ec-canvas/echarts'
Page({

  /**
   * 页面的初始数据
   */
  data: {
   name:""
  },
  onLoad: function (options) {
    let name=wx.getStorageSync('username');
    this.setData({
      name:name
    })
  },
  exitSy:function(){
    wx.reLaunch({
      url: '../../pages/first/first',
    })
  }
})
