
Page({

  data: {
date:0,
sex:"男",
hide:0,
YF:0
  },
  func(){
    if(this.data.age>18&&this.data.sex=="女"){
this.setData({
  hide:1
})
    }else{
      this.setData({
        hide:0
      })
    }
  },
  changeDate(e){
    this.setData({
      date:e.detail.value,
      years:new Date().toJSON().substr(0, 4) -e.detail.value.substr(0, 4),
      months:new Date().toJSON().substr(5, 2)-e.detail.value.substr(5, 2)
    })
    if(this.data.month<0){
      this.setData({
        age:this.data.years-1
      })
    }
    else{
      this.setData({
        age:this.data.years
      })
    }
    if(new Date().toJSON().substr(7, 2)<e.detail.value.substr(7, 2)){
      this.setData({
        allmonths:this.data.years*12+this.data.months-1
      })
      if(new Date().toJSON().substr(5, 2)==e.detail.value.substr(5, 2)){
      this.setData({
        age:this.data.years-1
      })
    }    else{
      this.setData({
        age:this.data.years
      })
    }}
    else{
      this.setData({
        allmonths:this.data.years*12+this.data.months,
        age:this.data.years
      })
    }
    this.func()
  },
  bindSub:function(event){
    if(event.detail.value.ID&&event.detail.value.name&&this.data.allmonths){
      if(this.data.YF==1){
        wx.navigateTo({
          url: "/pages/pregnant/pregnant?ID=" +event.detail.value.ID+ "&age=" + this.data.age + "&name=" 
          + event.detail.value.name  + "&sex=" + this.data.sex
        })
      }
      else{
        if(this.data.age>18){
          wx.navigateTo({
            url: "/pages/Normal/Normal?ID=" + event.detail.value.ID + "&age=" + this.data.age + "&name=" 
            + event.detail.value.name  + "&sex=" + this.data.sex
          })
        }else{
          wx.navigateTo({
          url: "/pages/baby/baby?ID=" + event.detail.value.ID + "&age=" + this.data.age + "&name=" 
          + event.detail.value.name  + "&sex=" + this.data.sex+"&months="+this.data.allmonths
        })
        }
 }
  }
  else{
  
  wx.showToast({
    title: "请正确输入", // 提示的内容
    icon: "none", // 图标，默认success
    // image: "", // 自定义图标的本地路径，image 的优先级高于 icon
    duration: 3000, // 提示的延迟时间，默认1500
    mask: false, // 是否显示透明蒙层，防止触摸穿透
})
  }
    },
 
  onLoad: function (options) {
  },

  radioChange(e){
    this.setData({
      sex:e.detail.value,
    })
    this.func()
  },
  radioYF(event){
    this.setData({
      YF:event.detail.value,
    })
  }
})