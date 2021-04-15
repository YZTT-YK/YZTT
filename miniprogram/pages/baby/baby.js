const db=wx.cloud.database();
const users=db.collection("YK_ND_ChildrenPhysical");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Height:0,
    Weight:0,
    head:0,
    arm:0,
    triceps:0,
    shoulder:0
  },

  onLoad: function (options) {
    this.setData({
      name:options.name,
      ID:options.ID,
      sex:options.sex,
      age:options.age,
      months:options.months
    })
    if(options.sex==="男"){
      this.setData({
        Sex:1
      })
    }
    else{
      this.setData({
        Sex:0
      })
    }
  },
  func1(Type,value){
    var that=this
    wx.request({
   
      url: 'https://yzttwsplat.natapp4.cc/YKInterface/GetChildRange',
  
      data: {       
        queryJson: JSON.stringify({
        Sex: this.data.Sex,
        Month:this.data.months,
        Type:Type,
        Length:-1,
    })
      },
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
   
      success: function (res) {
         var Pscore=res.data.childData[0].Pscore[0]
        var z=((((parseFloat(value))/res.data.childData[0].Zscore[0].M)**(res.data.childData[0].Zscore[0].L)-1)/
        (res.data.childData[0].Zscore[0].S*res.data.childData[0].Zscore[0].L)).toFixed(1)
        var A=new that.funP1(value,Pscore)
        that.funP(Type,A.rangeType)
        if(Type==1||Type==2){
    var A=new that.funP1(that.data.Height,Pscore)
     that.setData({
      z1:z,
      p1:A.rangeValue,
    })
     that.funHeight(z)
    }
     else if(Type==3){
      that.setData({
        z2:z,
        p2:A.rangeValue,
      })
      that.funWeight(z)
     }
     else if(Type==6||Type==7){
      that.setData({
        z4:z,
        p4:A.rangeValue,
      })
      that.funBmi(z)
     }
     else if(Type==8){
      that.setData({
        z5:z,
        p5:A.rangeValue,
      })
      that.funHead(z)
     }
      else if(Type==9){
        that.setData({
          z6:z,
          p6:A.rangeValue,
        })
        that.funArm(z)
      }
      else if(Type==10){
          that.setData({
            z7:z,
            p7:A.rangeValue
          })
          that.funTriceps(z)
        }
      else if(Type==11){
            that.setData({
              z8:z,
              p8:A.rangeValue
            })
            that.funShoulder(z)
     }
}
 
})
  
  },
  func2(Type,value){
    var that=this
    wx.request({
   
      url: 'https://yzttwsplat.natapp4.cc/YKInterface/GetChildRange',
  
      data: {       
        queryJson: JSON.stringify({
        Sex: this.data.Sex,
        Type:Type,
        Length:this.data.Height,
    })
      },
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
   
      success: function (res) {
        var Pscore=res.data.childData[0].Pscore[0]
        var z=((((parseFloat(value))/res.data.childData[0].Zscore[0].M)**(res.data.childData[0].Zscore[0].L)-1)/
        (res.data.childData[0].Zscore[0].S*res.data.childData[0].Zscore[0].L)).toFixed(1)
        var A=new that.funP1(value,Pscore)
        that.funP(Type,A.rangeType)
if(Type==4||Type==5){
      that.setData({
        z3:z,
        p3:A.rangeValue
      })
      that.funH_Weight(z)
     }
}
})
  
  },
//Z评分
  funBMI(){
if(this.data.Height!=0&&this.data.Weight!=0){
  this.funKuap()
  var BMI=(parseFloat(this.data.Weight) / (parseFloat(this.data.Height) / 100 * parseFloat(this.data.Height) / 100)).toFixed(2)
  if(this.data.months<=24){
    this.func1(6,BMI)
  }
  else{
    this.func1(7,BMI)
  }
}
},
funHeight(z1){

    //年龄别身高
if(z1<=-3){
  this.setData({
    ZScoreStr:"[重度生长迟缓]",
    Color1:"#8B0000"
  })
}
else if(-3<z1&&z1<=-2){
  this.setData({
    ZScoreStr:"[轻度生长迟缓]",
    Color1:"red"
  })
}
else if(-2<z1&&z1<=2){
  this.setData({
    ZScoreStr:"[身长(高)正常]",
    Color1:"green"
  })
}
else if(2<z1&&z1<=3){
  this.setData({
    ZScoreStr:"[偏高]",
Color1:"#8A2BE2"
  })
}
else{
  this.setData({
    ZScoreStr:"[高身材]",
    Color1:"#800080"
  })
}
},

funWeight(z2){
//年龄别体重
if(z2<=-3.0){
  this.setData({
    ZScoreStr2:"[严重体重不足]",
    Color2:"#8B0000"
  })
}
else if(-3<z2&&z2<=-2){
  this.setData({
    ZScoreStr2:"[中度体重不足]",
    Color2:"red"
  })
}
else if(-2<z2&z2<=-1){
  this.setData({
    ZScoreStr2:"[轻度体重不足]",
    Color2:"#808000"
  })
}
else if(-1<z2&&z2<=2){
  this.setData({
    ZScoreStr2:"[体重正常]",
    Color2:"green"
  })
}
else if(2<z2&&z2<=3){
  this.setData({
    ZScoreStr2:"[可能偏重]",
    Color2:"#8A2BE2"

  })
}
else{
  this.setData({
    ZScoreStr2:"[可能超重]",
   Color2:"	#800080"
  })
}
},
funH_Weight(z3){
//身高别体重&&年龄别BMI
if(z3<=-3){
  this.setData({
    ZScoreStr3:"[重度消瘦]",
    Color3:"#8B0000"
  })
}
else if(-3<z3&&z3<=-2){
  this.setData({
    ZScoreStr3:"[消瘦]",
    Color3:"red"
  })
}
else if(-2<z3&&z3<=-1){
  this.setData({
    ZScoreStr3:"[偏瘦]",
    Color3:"#8B0000"
  })
}
else if(-1<z3&&z3<=1){
  this.setData({
    ZScoreStr3:"[正常]",
    Color3:"greeen"
  })
}
else if(1<z3&&z3<=2){
  this.setData({
    ZScoreStr3:"[超重]",
    Color3:"#8A2BE2"
  })
}
else if(2<z3&&z3<=3){
  this.setData({
    ZScoreStr3:"[肥胖]",
    Color3:"#800080"
  })
}
else{
  this.setData({
    ZScoreStr3:"[过度肥胖]",
    Color3:"#4B0082"
  })
}
},
funBmi(z4){
  if(z4<=-3){
    this.setData({
      ZScoreStr4:"[重度消瘦]",
      Color4:"#8B0000"
    })
  }
  else if(-3<z4&&z4<=-2){
    this.setData({
      ZScoreStr4:"[消瘦]",
      Color4:"red"
    })
  }
  else if(-2<z4&&z4<=-1){
    this.setData({
      ZScoreStr4:"[偏瘦]",
      Color4:"#8B0000"
    })
  }
  else if(-1<z4&&z4<=1){
    this.setData({
      ZScoreStr4:"[正常]",
      Color4:"green"
    })
  }
  else if(1<z4&&z4<=2){
    this.setData({
      ZScoreStr4:"[超重]",
      Color4:"#8A2BE2"
    })
  }
  else if(2<z4&&z4<=3){
    this.setData({
      ZScoreStr4:"[肥胖]",
      Color4:"#800080"
    })
  }
  else{
    this.setData({
      ZScoreStr4:"[过度肥胖]",
      Color4:"#4B0082"
    })
  }
},
funHead(z5){
if (z5<=-2.0){
  this.setData({
    ZScoreStr5:"[偏小]",
    Color5:"#808000"
  })
}
else if(-2<z5&&z5<=2){
  this.setData({
    ZScoreStr5:"[正常]",
    Color5:"green"
  })

}
else if(2<z5){
  this.setData({
    ZScoreStr5:"[偏大]",
    Color5:"#8A2BE2"
  })
}
},
funArm(z6){
  if (z6<=-2.0){
    this.setData({
      ZScoreStr6:"[偏小]",
      Color6:"#808000"
    })
  }
  else if(-2<z6&&z6<=2){
    this.setData({
      ZScoreStr6:"[正常]",
      Color6:"green"
    })
  
  }
  else if(2<z6){
    this.setData({
      ZScoreStr6:"[偏大]",
      Color6:"#8A2BE2"
    })
  }
  },
funTriceps(z7){
  if (z7<=-2.0){
    this.setData({
      ZScoreStr7:"[偏小]",
      Color7:"#808000"
    })
  }
  else if(-2<z7&&z7<=2){
    this.setData({
      ZScoreStr7:"[正常]",
      Color7:"green"
    })
  
  }
  else if(2<z7){
    this.setData({
      ZScoreStr7:"[偏大]",
      Color7:"#8A2BE2"
    })
  }
},
funShoulder(z8){
  if (z8<=-2.0){
    this.setData({
      ZScoreStr8:"[偏小]",
      Color8:"#808000"
    })
  }
  else if(-2<z8&&z8<=2){
    this.setData({
      ZScoreStr8:"[正常]",
      Color8:"green"
    })
  
  }
  else if(2<z8){
    this.setData({
      ZScoreStr8:"[偏大]",
      Color8:"#8A2BE2"
    })
  }
},
funKuap(){
    if(this.data.age<8){
      this.setData({
        Kaup:(parseFloat(this.data.Weight) / (parseFloat(this.data.Height) / 100 * parseFloat(this.data.Height) / 100)).toFixed(2),
      })
      if(this.data.Kaup<10&&this.data.Kaup>0){
        this.setData({
          Kaup1:"[消耗性疾病]",
          kaupColor:"#8B0000;"
        })
      }
      else if(10<=this.data.Kaup&&this.data.Kaup<13){
        this.setData({
          Kaup1:"[营养不良]",
          kaupColor:"red"
        })
      }
      else if(13<=this.data.Kaup&&this.data.Kaup<15){
        this.setData({
          Kaup1:"[消瘦]",
          kaupColor:"	#808000"
        })
      }
      else if(15<=this.data.Kaup&&this.data.Kaup<19){
        this.setData({
          Kaup1:"[正常]",
          kaupColor:"green"
        })
      }
      else if(19<=this.data.Kaup&&this.data.Kaup<22){
        this.setData({
          Kaup1:"[优良]",
          kaupColor:"	#40E0D0"
        })
      }
      else if(22<=this.data.Kaup){
        this.setData({
          Kaup1:"[肥胖]",
          kaupColor:"	#800080"
        })
      }
      else{
        this.setData({
          Kaup1:"",
          kaupColor:"white",
          Kaup:""
        })
      }
    }
    else{
      this.setData({
        Kaup:((parseFloat(this.data.Weight) / (parseFloat(this.data.Height))**3)*10**7).toFixed(2),
      })
      if(this.data.Kaup<92){
        console.log(this.data.Kaup)
        this.setData({
          Kaup1:"[过度瘦弱]",
          kaupColor:"red"
        })
      }
      else if(92<=this.data.Kaup&&this.data.Kaup<109){
        this.setData({
          Kaup1:"[偏瘦]",
          kaupColor:"	#808000"
        })
      }
      else if(109<=this.data.Kaup&&this.data.Kaup<140){
        this.setData({
          Kaup1:"[中等]",
          kaupColor:"green"
        })
      }
      else if(140<=this.data.Kaup&&this.data.Kaup<156){
        this.setData({
          Kaup1:"[肥胖]",
          kaupColor:"#8A2BE2"
        })
      }
      else if(156<=this.data.Kaup){
        this.setData({
          Kaup1:"[过度肥胖]",
          kaupColor:"	#800080"
        })
      }
      else{
        this.setData({
          Kaup1:"",
          kaupColor:"white",
          Kaup:""
        })
      }

    }
  },
//P评分
funP1(value,P){
var rangeValue,rangeType;
 if(value<P.P2){
  rangeValue = "＜P3";
  rangeType = 1;
  }
  else if(P.P2<=value&&value<P.P4){
  rangeValue = "P3～P15";
    rangeType = 2;
  }
  else if(P.P4<=value&&value<P.P8){
  rangeValue = "P15～P85";
    rangeType = 3;}
  else if (P.P8<=value&&value<P.P10){
  rangeValue = "P85～P97";
    rangeType = 4;}
 else if(P.P10<=value){
  rangeValue = "＞P97";
    rangeType = 5;}
    return{
      rangeValue: rangeValue,
    rangeType:rangeType
    }
},
funP(type,rangeType){
  switch(rangeType){
 case 1:
if(type==1||type==2){
  this.setData({
PerScoreStr1:"[矮]",
pColor1:"red"

})
}else if (type==3){
  this.setData({
    PerScoreStr2:"[轻]",
    pColor2:"red"
    })
}else if (type==4||type==5){
  this.setData({
    PerScoreStr3:"[瘦]",
    pColor3:"red"
  })
}else if (type==6||type==7){
  this.setData({
    PerScoreStr4:"[瘦]",
    pColor4:"red"
  })
}else if (type==8){
  this.setData({
    PerScoreStr5:"[小]",
    pColor5:"red"
  })
}else if (type==9){
  this.setData({
    PerScoreStr6:"[小]",
    pColor6:"red"
  })
}else if (type==10){
  this.setData({
    PerScoreStr7: "[小]",
    pColor7:"red"
  })
}else if (type==11){
  this.setData({
    PerScoreStr8:"[小]",
    pColor8:"red"
  })
}
break;
case 2:
if(type==1||type==2){
  this.setData({
PerScoreStr1:"[偏矮]",
pColor1:"#2E8B57"
})}
else if (type==3){
  this.setData({
    PerScoreStr2:"[偏轻]",
    pColor2:"#2E8B57"
    })
}
else if (type==4||type==5){
  this.setData({
    PerScoreStr3:"[瘦]",
    pColor3:"#2E8B57"
  })
}
else if (type==6||type==7){
  this.setData({
    PerScoreStr4:"[瘦]",
    pColor4:"#2E8B57"
  })
}
else if (type==8){
  this.setData({
    PerScoreStr5:"[偏小]",
    pColor5:"#2E8B57"
  })
}
else if (type==9){
  this.setData({
    PerScoreStr6:"[偏小]",
    pColor6:"#2E8B57"
  })
}
else if (type==10){
  this.setData({
    PerScoreStr7:"[偏小]",
    pColor7:"#2E8B57"
  })
}
else if (type==11){
  this.setData({
    PerScoreStr8:"[偏小]",
    pColor8:"#2E8B57"
  })
}
break;
case 3:
if(type==1||type==2){
  this.setData({
PerScoreStr1:"[中等]",
pColor1:"green"
})}
else if (type==3){
  this.setData({
    PerScoreStr2:"[中等]",
    pColor2:"green"
    })
}
else if (type==4||type==5){
  this.setData({
    PerScoreStr3:"[中等]",
    pColor3:"green"
  })
}
else if (type==6||type==7){
  this.setData({
    PerScoreStr4:"[中等]",
    pColor4:"green"
  })
}
else if (type==8){
  this.setData({
    PerScoreStr5:"[中等]",
    pColor5:"green"
  })
}
else if (type==9){
  this.setData({
    PerScoreStr6:"[中等]",
    pColor6:"green"
  })
}
else if (type==10){
  this.setData({
    PerScoreStr7: "[中等]",
    pColor7:"green"
  })
}
else if (type==11){
  this.setData({
    PerScoreStr8:"[中等]",
    pColor8:"green"
  })
}
break;
case 4:
if(type==1||type==2){
  this.setData({
PerScoreStr1:"[偏高]",
pColor1:" #8A2BE2"
})}
else if (type==3){
  this.setData({
    PerScoreStr2:"[偏重]",
    pColor2:" #8A2BE2"
    })
}
else if (type==4||type==5){
  this.setData({
    PerScoreStr3:"[偏胖]",
    pColor3:" #8A2BE2"
  })
}
else if (type==6||type==7){
  this.setData({
    PerScoreStr4:"[偏胖]",
    pColor4:" #8A2BE2"
  })
}
else if (type==8){
  this.setData({
    PerScoreStr5:"[偏大]",
    pColor5:" #8A2BE2"
  })
}
else if (type==9){
  this.setData({
    PerScoreStr6:"[偏大]",
    pColor6:" #8A2BE2"
  })
}
else if (type==10){
  this.setData({
    PerScoreStr7:"[偏大]",
    pColor7:" #8A2BE2"
  })
}
else if (type==11){
  this.setData({
    PerScoreStr8:"[偏大]",
    pColor8:" #8A2BE2"
  })
}
break;
case 5:
if(type==1||type==2){
  this.setData({
PerScoreStr1: "[高]",
pColor1:"#800080"
})}
else if (type==3){
  this.setData({
    PerScoreStr2:"[重]",
    pColor2:"#800080"
    })
}
else if (type==4||type==5){
  this.setData({
    PerScoreStr3:"[胖]",
    pColor3:"#800080"
  })
}
else if (type==6||type==7){
  this.setData({
    PerScoreStr4:"[胖]",
    pColor4:"#800080"
  })
}
else if (type==8){
  this.setData({
    PerScoreStr5:"[大]",
    pColor5:"#800080"
  })
}
else if (type==9){
  this.setData({
    PerScoreStr6:"[大]",
    pColor6:"#800080"
  })
}
else if (type==10){
  this.setData({
    PerScoreStr7:"[大]",
    pColor7:"#800080"
  })
}
else if (type==11){
  this.setData({
    PerScoreStr8:"[大]",
    pColor8:"#800080"
  })
}
  }
},
  heightInput(e){
    this.setData({
      Height:e.detail.value,
    })
    if(0<this.data.months&&this.data.months<=24){
    this.func1(1,e.detail.value)}
    else{
      this.func1(2,e.detail.value)
    }
    this.funBMI()
 

  },
  weightInput(e){
    this.setData({
      Weight:e.detail.value,
    })
    if(this.data.months<=120){
    this.func1(3,e.detail.value)
  }
    if(this.data.months <= 24&&this.data.Height>=45 &&this.data.Height<=110){
      this.func2(4,e.detail.value)
    }
    else if(this.data.months>24&&this.data.Height>=65&&this.data.Height<=120){
      this.func2(5,e.detail.value)
    }
    this.funBMI()
  },
  bornHeightInput(e){
    this.setData({
      bornHeight:e.detail.value
      })

  },
  bornWeightInput(e){
    this.setData({
      bornWeight:e.detail.value
      })
  },
  headInput(e){
    this.setData({
      head:e.detail.value,
     })
    if(this.data.months<=60){
      this.func1(8,e.detail.value)
    }
  },
  chestInput(e){
    this.setData({
      chest:e.detail.value,
      })
  },
  armInput(e){
    this.setData({
      arm:e.detail.value
      })
    if(this.data.months >= 3 && this.data.months <= 60){
      this.func1(9,e.detail.value) 
      }
  },
  tricepsInput(e){
    this.setData({
      triceps:e.detail.value
      })
    if(this.data.months >= 3 && this.data.months <= 60){
      this.func1(10,e.detail.value)
      }
  },
  shoulderInput(e){
    this.setData({
      shoulder:e.detail.value
      })
    if(this.data.months >= 3 && this.data.months <= 60){
      this.func1(11,e.detail.value)
      }
  },
btnSub(e){
  users.add({
    data:{   
      name:this.data.name,
      Sex:this.data.sex,
      Age:this.data.age,
      Height:this.data.Height,
      Weight:this.data.Weight,
      BirthHeight:this.data.bornHeight,
      BirthWeight:this.data.bornWeight,
      PatientDiagID:this.data.ID,
      TW:this.data.head,
      XW:this.data. chest,
      ZSBBW:this.data.arm,
      STJPZHD:this.data.triceps,
      JJXPZHD:this.data.shoulder,
      Height_For_Age_Z:this.data.z1,
      Weight_For_Age_Z:this.data.z2,
      Weight_For_Height_Z:this.data.z3,
      BMI_For_Age_Z:this.data.z4,
      Head_For_Age_Z:this.data.z5,
      ZSBBW_For_Age_Z:this.data.z6,
      STJPZHD_For_Age_Z:this.data.z7,
      JJXPZHD_For_Age_Z:this.data.z8,
      Kaup:this.data.Kaup,
      Height_For_Age_P:this.data.p1,
      Weight_For_Age_P:this.data.p2,
      Weight_For_Height_P:this.data.p3,
      BMI_For_Age_P:this.data.p4,
      Head_For_Age_P:this.data.p5,
      ZSBBW_For_Age_P:this.data.p6,
      STJPZHD_For_Age_P:this.data.p7,
      JJXPZHD_For_Age_P:this.data.p8,
      F_GreateDate:new Date().toJSON().substring(0, 10) + ' ' + new Date().toTimeString().substring(0,8)
    }
  })
},



  fpages(){
    wx.navigateTo({
      url: "/pages/demo3/demo3?name="+this.data.name +"&age="+this.data.age + "&sex="+this.data.sex + "&bornWeight="+this.data.bornWeight
      + "&Weight="+this.data.Weight+"&Height="+this.data.Height+"&bornWeight="+this.data.bornWeight+"&TW="+this.data.head+"&months="+this.data.months
      +"&YW="+this.data.chest+"&ZSBBW="+this.data.arm+"&STJPZHD="+this.data.triceps+"&JJXPZHD="+this.data.shoulder
      +"&z1="+this.data.z1+"&ZScoreStr1="+this.data.ZScoreStr1+"&z2="+this.data.z2+"&ZScoreStr2="+this.data.ZScoreStr2
      +"&z3="+this.data.z3+"&ZScoreStr3="+this.data.ZScoreStr3+"&z4="+this.data.z4+"&ZScoreStr4="+this.data.ZScoreStr4
      +"&z5="+this.data.z5+"&ZScoreStr5="+this.data.ZScoreStr5+"&z6="+this.data.z6+"&ZScoreStr6="+this.data.ZScoreStr6
      +"&z7="+this.data.z7+"&ZScoreStr7="+this.data.ZScoreStr7+"&z8="+this.data.z8+"&ZScoreStr8="+this.data.ZScoreStr8
      +"&p1="+this.data.p1+"&PerScoreStr1="+this.data.PerScoreStr1+"&p2="+this.data.z2+"&PerScoreStr2="+this.data.PerScoreStr2
      +"&p3="+this.data.p3+"&PerScoreStr3="+this.data.PerScoreStr3+"&p4="+this.data.p4+"&PerScoreStr4="+this.data.PerScoreStr4
      +"&p5="+this.data.p5+"&PerScoreStr5="+this.data.PerScoreStr5+"&p6="+this.data.p6+"&PerScoreStr6="+this.data.PerScoreStr6
      +"&p7="+this.data.p7+"&PerScoreStr7="+this.data.PerScoreStr7+"&p8="+this.data.p8+"&PerScoreStr8="+this.data.PerScoreStr8
    })
  },
  jump(){
    wx.navigateTo({
      url: "/pages/history2/history2?ID="+this.data.ID
    })
  },  
})