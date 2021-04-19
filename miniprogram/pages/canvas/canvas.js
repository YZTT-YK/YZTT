
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
onLoad(){
  var that = this;
    wx.showLoading({
   
    title: '开启蓝牙适配'
   
    });
   
    wx.openBluetoothAdapter({
   
    success: function (res) {
   
    console.log("初始化蓝牙适配器");
   
    console.log(res);
   
    that.getBluetoothAdapterState();
   
    },
   
    fail: function (err) {
   
    console.log(err);
    
    wx.showToast({
   
    title: '蓝牙初始化失败',
   
    icon: 'success',
   
    duration: 2000
   
    })
   
    setTimeout(function () {
   
    wx.hideToast()
   
    }, 2000)
   
    }
   
    });
   
    wx.onBluetoothAdapterStateChange(function (res) {
   
    var available = res.available;
   
    if (available) {
   
    that.getBluetoothAdapterState();
   
    }
   
    })
},
getBluetoothAdapterState: function () {

  var that = this;
 
  wx.getBluetoothAdapterState({
 
  success: function (res) {
 
  var available = res.available,
 
  discovering = res.discovering;
 
  if (!available) {
 
  wx.showToast({
 
  title: '设备无法开启蓝牙连接',
 
  icon: 'success',
 
  duration: 2000
 
  })
 
  setTimeout(function () {
 
  wx.hideToast()
 
  }, 2000)
 
  } else {
 
  if (!discovering) {
 
  that.startBluetoothDevicesDiscovery();
 
  that.getConnectedBluetoothDevices();
 
  }
 
  }
 
  }
 
  })
 
  }
})