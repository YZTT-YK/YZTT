const db=wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataObj:"",
    nixu:""
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      ID:options.ID
    })
   var ID=options.ID;
    wx.cloud.database().collection('YK_ND_PregnantPhysical')
      .where({
      ID: ID
      })
      .get()
      .then(res=>{
    this.setData({
      nixu:res.data,
      num:res.data.length-1,
    })

    this.setData({
      dataObj:this.data.nixu.reverse(),

    })
    console.log(this.data.dataObj)
  })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
hide:function(e){

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
    var ID=this.data.ID;
    wx.cloud.database().collection('YK_ND_PregnantPhysical')
      .where({
      ID: ID
      }) 
      .get()
      .then(res=>{
    console.log("数据库连接成功...")
    this.setData({
      nixu:res.data
    })
    this.setData({
      dataObj:this.data.nixu.reverse(),
      weightChange:this.data.nixu.Weight-this.data.nixu.PregnancyWeight
    })

  })
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