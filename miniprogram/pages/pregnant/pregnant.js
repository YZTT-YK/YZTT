// pages/pregnant/pregnant.js
const db=wx.cloud.database();
const users=db.collection("YK_ND_PregnantPhysical");
var MinValue=[0,0],
 MaxValue=[0,0],
 AveValue=[0,0],
w=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,];
import * as echarts from '/../../ec-canvas/echarts';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    shouldChange:0,
    shouldWeight:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      name:options.name,
      ID:options.ID,
      sex:options.sex,
      age:options.age,
    })
    this.lazyComponent = this.selectComponent('#lazy-mychart-dom'),
this.init()
  },
  fpages(){
  wx.navigateTo({
    url: "/pages/demo5/demo5?name="+this.data.name +"&age="+this.data.age + "&sex="+this.data.sex + "&pastWeight="+this.data.pastWeight
    + "&Weight="+this.data.Weight+"&Height="+this.data.Height+"&YZ="+this.data.YZ+"&Taishu="+this.data.Taishu
    +"&cBMI="+this.data.cBMI+"&weightChange="+this.data.weightChange+"&pastCondition="+this.data.pastCondition+"&TS="+this.data.TS
    +"&allWeight_change="+this.data.allWeight_change+"&Weight2_13="+this.data.Weight2_13+"&Weight14_26="+this.data.Weight14_26
    +"&Weight27_40="+this.data.Weight27_40+"&tellBmi="+this.data.tellBmi+"&cbmi="+this.data.cbmi +"&shouldChange="+this.data.shouldChange
    +"&shouldWeight="+this.data.shouldWeight+"&gap="+this.data.gap
  })
},
jump(){
  wx.navigateTo({
    url: "/pages/history1/history1?ID="+this.data.ID
  })
},  
 
pastweightInput(e){
  this.setData({
   pastWeight:e.detail.value
  });
  this.func1();
},
weightInput(e){
  this.setData({
   Weight:e.detail.value,
  });
  this.func1();
  w=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
w.splice(this.data.YZ-1,1,e.detail.value) //删除一项，插入
},
heightInput(e){
 this.setData({
 Height:e.detail.value
})
this.func1();
},
pWeek(e){
 this.setData({  
   YZ:e.detail.value,
 })
 this.func1();
 w=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
 w.splice(e.detail.value-1,1,this.data.Weight) //删除一项，插入两项
},
bindTaishu(e){
 this.setData({
  Taishu:e.detail.value,
})
this.func1();

},
WeightC(){
if(parseFloat(this.data.Weight)>parseFloat(MaxValue[this.data.YZ-1])){
  this.setData({
  suggest:"[孕期体重增加较多]"
})
}
else if(parseFloat(this.data.Weight)<parseFloat(MinValue[this.data.YZ-1])){
  this.setData({
    suggest:"[孕期体重增加较少]"
  })
}
else{
  this.setData({
    suggest:"[孕期体重增加正常]"
  })
}
},

func1(){
  this.setData({
    weightChange:parseFloat(this.data.Weight)-parseFloat(this.data.pastWeight),
    cBMI:(parseFloat(this.data.pastWeight) / (parseFloat(this.data.Height) / 100 * parseFloat(this.data.Height) / 100)).toFixed(2)
  })
 if(this.data.YZ>0){
 this.setData({
  YZ:this.data.YZ
})
}
else{
this.setData({
  YZ:""
})   
}

if(this.data.weightChange>0){
  this.setData({
    weightChange:this.data.weightChange.toFixed(2)
  })
}
else if(this.data.weightChange<=0){
  this.setData({
    weightChange:this.data.weightChange.toFixed(2)
  })
}
else{
  this.setData({
    weightChange:""
  })   
}

var that=this
if(parseFloat(this.data.Taishu)==1){
  if(parseFloat(this.data.cBMI)>0&&parseFloat(this.data.cBMI)<18.5){
     wx.request({
    url: 'https://yzttwsplat.natapp4.cc/YKInterface/GetPregnantRange?FetalNumber=0&BMI=10',
    data: {
    },
    method: 'POST',
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    success: function (res) {
      MinValue=[that.data.pastWeight,that.data.pastWeight]
      MaxValue=[that.data.pastWeight,that.data.pastWeight]
      AveValue=[0,0]
   
let i
for(i=0;i<38;i++){
  MinValue.push((parseFloat(res.data.Pregnantvalue[i].MinValue)+parseFloat(that.data.pastWeight)).toFixed(2) ),
  MaxValue.push((parseFloat(res.data.Pregnantvalue[i].MaxValue)+parseFloat(that.data.pastWeight)).toFixed(2)),
  AveValue.push(parseFloat(res.data.Pregnantvalue[i].AveValue).toFixed(2))
 }
 that.WeightC()
 that.setData({
  tellBmi:"[孕前体重不足]",
  pastCondition:"孕前体重状态:体重不足",
  TS:"胎数:单胎",
  cbmi:"孕前BMI(kg/m²):<18.5",
  allWeight_change:"孕期总增重(kg):12.5-18",
  Weight2_13:"孕早期体重(kg):0.5-2.0",
  Weight14_26:"孕中晚期增重速率(kg/周):0.51(0.44-0.58)",
  Weight27_40:"",
  shouldChange:AveValue[that.data.YZ-1],
  shouldWeight:(parseFloat(that.data.pastWeight) +parseFloat(AveValue[that.data.YZ-1])).toFixed(2),
  gap:(that.data.weightChange-AveValue[that.data.YZ-1]).toFixed(2)
 })
    },
  })

  } else if(parseFloat(this.data.cBMI)>= 18.5 && parseFloat(this.data.cBMI)<24){
    wx.request({
      url: 'https://yzttwsplat.natapp4.cc/YKInterface/GetPregnantRange?FetalNumber=0&BMI=20',
  
      data: {
      
      },
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        MinValue=[that.data.pastWeight,that.data.pastWeight]
        MaxValue=[that.data.pastWeight,that.data.pastWeight]
        AveValue=[0,0]
     
        let i;
        for(i=0;i<38;i++){
          MinValue.push((parseFloat(res.data.Pregnantvalue[i].MinValue)+parseFloat(that.data.pastWeight)).toFixed(2) ),
          MaxValue.push((parseFloat(res.data.Pregnantvalue[i].MaxValue)+parseFloat(that.data.pastWeight)).toFixed(2)),
          AveValue.push(parseFloat(res.data.Pregnantvalue[i].AveValue).toFixed(2))
         }
         that.WeightC()
         that.setData({
          tellBmi:"[孕前体重正常]",
          pastCondition:"孕前体重状态:体重正常",
          TS:"胎数:单胎",
          cbmi:"孕前BMI(kg/m²):18.5-23.9",
          allWeight_change:"孕期总增重(kg):11.5-16",
          Weight2_13:"孕早期体重(kg):0.5-2.0",
          Weight14_26:"孕中晚期增重速率(kg/周):0.42(0.35-0.50)",
          Weight27_40:"",
          shouldChange:AveValue[that.data.YZ-1],
          shouldWeight:(parseFloat(that.data.pastWeight) +parseFloat(AveValue[that.data.YZ-1])).toFixed(2),
          gap:(that.data.weightChange-AveValue[that.data.YZ-1]).toFixed(2)
        })
      }
    })
   
  }else if(parseFloat(this.data.cBMI)>= 24 && parseFloat(this.data.cBMI)<28){
    wx.request({
   
      url: 'https://yzttwsplat.natapp4.cc/YKInterface/GetPregnantRange?FetalNumber=0&BMI=26',
  
      data: {
      
      },
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        MinValue=[that.data.pastWeight,that.data.pastWeight]
        MaxValue=[that.data.pastWeight,that.data.pastWeight]
        AveValue=[0,0]
      
        let i;
        for(i=0;i<38;i++){
          MinValue.push((parseFloat(res.data.Pregnantvalue[i].MinValue)+parseFloat(that.data.pastWeight)).toFixed(2) ),
          MaxValue.push((parseFloat(res.data.Pregnantvalue[i].MaxValue)+parseFloat(that.data.pastWeight)).toFixed(2)),
          AveValue.push(parseFloat(res.data.Pregnantvalue[i].AveValue).toFixed(2))
         }
         that.WeightC()
         that.setData({
          tellBmi:"[孕前体重超重]",
          pastCondition:"孕前体重状态:超重",
          TS:"胎数:单胎",
          cbmi:"孕前BMI(kg/m²):24-27.9",
          allWeight_change:"孕期总增重(kg):7.0-11.5",
          Weight2_13:"孕早期体重(kg):0.5-2.0",
          Weight14_26:"孕中晚期增重速率(kg/周):0.28(0.23-0.33)",
          Weight27_40:"",
          shouldChange:AveValue[that.data.YZ-1],
          shouldWeight:(parseFloat(that.data.pastWeight) +parseFloat(AveValue[that.data.YZ-1])).toFixed(2),
          gap:(that.data.weightChange-AveValue[that.data.YZ-1]).toFixed(2)
        })
      }
    })


  }else if(parseFloat(this.data.cBMI)>= 28){
    wx.request({
      url: 'https://yzttwsplat.natapp4.cc/YKInterface/GetPregnantRange?FetalNumber=0&BMI=30',
      data: {
      },
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
      
        MinValue=[that.data.pastWeight,that.data.pastWeight]
        MaxValue=[that.data.pastWeight,that.data.pastWeight]
        AveValue=[0,0]
  
  let i
  for(i=0;i<38;i++){
    MinValue.push((parseFloat(res.data.Pregnantvalue[i].MinValue)+parseFloat(that.data.pastWeight)).toFixed(2) ),
    MaxValue.push((parseFloat(res.data.Pregnantvalue[i].MaxValue)+parseFloat(that.data.pastWeight)).toFixed(2)),
    AveValue.push(parseFloat(res.data.Pregnantvalue[i].AveValue).toFixed(2))
   }
      }
    })
    that.WeightC()
   that.setData({
      tellBmi:"[孕前体重肥胖]",
      pastCondition:"孕前体重状态:肥胖",
      TS:"胎数:单胎",
      cbmi:"孕前BMI(kg/m²):≥28",
      allWeight_change:"孕期总增重(kg):5.0-9.0",
      Weight2_13:"孕早期体重(kg):0.5-2.0",
      Weight14_26:"孕中晚期增重速率(kg/周):0.22(0.17-0.27)",
      Weight27_40:"",
      shouldChange:AveValue[that.data.YZ-1],
      shouldWeight:(parseFloat(that.data.pastWeight)+parseFloat(AveValue[that.data.YZ-1])).toFixed(2),
      gap:(that.data.weightChange-AveValue[that.data.YZ-1]).toFixed(2)
    })
  }
  else{
    this.setData({
      tellBmi:"",
      MinValue:[0,0],
      MaxValue:[0,0]
    })
  }
}
  else if(parseFloat(this.data.Taishu)!=1){ 

    if(parseFloat(this.data.cBMI)>0&&parseFloat(this.data.cBMI)<18.5){
      wx.request({
     
        url: 'https://yzttwsplat.natapp4.cc/YKInterface/GetPregnantRange?FetalNumber=1&BMI=15',
    
        data: {
        
        },
        method: 'POST',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          MinValue=[that.data.pastWeight,that.data.pastWeight]
          MaxValue=[that.data.pastWeight,that.data.pastWeight]
          AveValue=[0,0]
     
          let i;
          for(i=0;i<38;i++){
            MinValue.push((parseFloat(res.data.Pregnantvalue[i].MinValue)+parseFloat(that.data.pastWeight)).toFixed(2) ),
            MaxValue.push((parseFloat(res.data.Pregnantvalue[i].MaxValue)+parseFloat(that.data.pastWeight)).toFixed(2)),
            AveValue.push(parseFloat(res.data.Pregnantvalue[i].AveValue).toFixed(2))
           }
           that.WeightC()
           that.setData({
            tellBmi:"[孕前体重不足]",
            pastCondition:"孕前体重状态:体重不足",
            TS:"胎数:双胎",
            cbmi:"孕前BMI(kg/m²):＜18.5",
            allWeight_change:"孕期总增重(kg):16.8-24.5",
            Weight2_13:"2~13孕周(kg):0.12-0.49",
            Weight14_26:"14~26孕周(kg):0.64-0.94",
            Weight27_40:"27~40孕周:0.50-0.83",
            shouldChange:AveValue[that.data.YZ-1],
            shouldWeight:(parseFloat(that.data.pastWeight) +parseFloat(AveValue[that.data.YZ-1])).toFixed(2),
            gap:(that.data.weightChange-AveValue[that.data.YZ-1]).toFixed(2)
          })
        }
      })

    } else if(parseFloat(this.data.cBMI)>= 18.5 && parseFloat(this.data.cBMI)<24){
      wx.request({
     
        url: 'https://yzttwsplat.natapp4.cc/YKInterface/GetPregnantRange?FetalNumber=1&BMI=20',
    
        data: {
        
        },
        method: 'POST',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          MinValue=[that.data.pastWeight,that.data.pastWeight]
          MaxValue=[that.data.pastWeight,that.data.pastWeight]
          AveValue=[0,0]
          let i;
          for(i=0;i<38;i++){
            MinValue.push((parseFloat(res.data.Pregnantvalue[i].MinValue)+parseFloat(that.data.pastWeight)).toFixed(2)),
            MaxValue.push((parseFloat(res.data.Pregnantvalue[i].MaxValue)+parseFloat(that.data.pastWeight)).toFixed(2)),
            AveValue.push((parseFloat(res.data.Pregnantvalue[i].AveValue)).toFixed(2))
           }
           that.WeightC()
           that.setData({
            tellBmi:"[孕前体重正常]",
            pastCondition:"孕前体重状态:体重正常",
            TS:"胎数:双胎",
            cbmi:"孕前BMI(kg/m²):18.5-23.9",
            allWeight_change:"孕期总增重(kg):16.8-24.5",
            Weight2_13:"2~13孕周(kg):0.12-0.49",
            Weight14_26:"14~26孕周(kg):0.64-0.94",
            Weight27_40:"27~40孕周:0.50-0.83",
            shouldChange:AveValue[that.data.YZ-1],
            shouldWeight:(parseFloat(that.data.pastWeight) +parseFloat(AveValue[that.data.YZ-1])).toFixed(2),
            gap:(that.data.weightChange-AveValue[that.data.YZ-1]).toFixed(2)
          })
        }
      })
 
    }else if(parseFloat(this.data.cBMI)>= 24 && parseFloat(this.data.cBMI)<28){
      wx.request({
     
        url: 'https://yzttwsplat.natapp4.cc/YKInterface/GetPregnantRange?FetalNumber=1&BMI=26',
    
        data: {
        
        },
        method: 'POST',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          MinValue=[that.data.pastWeight,that.data.pastWeight]
          MaxValue=[that.data.pastWeight,that.data.pastWeight]
          AveValue=[0,0]
          let i;
          for(i=0;i<38;i++){
            MinValue.push((parseFloat(res.data.Pregnantvalue[i].MinValue)+parseFloat(that.data.pastWeight)).toFixed(2) ),
            MaxValue.push((parseFloat(res.data.Pregnantvalue[i].MaxValue)+parseFloat(that.data.pastWeight)).toFixed(2)),
            AveValue.push(parseFloat(res.data.Pregnantvalue[i].AveValue).toFixed(2))
           }
          that.WeightC()
           that.setData({

            tellBmi:"[孕前体重超重]",
            pastCondition:"孕前体重状态:超重",
            TS:"胎数:双胎",
            cbmi:"孕前BMI(kg/m²):24-27.9",
            allWeight_change:"孕期总增重(kg):14.1-22.7",
            Weight2_13:"2~13孕周(kg):0.03-0.39",
            Weight14_26:"14~26孕周(kg):0.57-0.87",
            Weight27_40:"27~40孕周:0.42-0.81",
            shouldChange:AveValue[that.data.YZ-1],
            shouldWeight:(parseFloat(that.data.pastWeight) +parseFloat(AveValue[that.data.YZ-1])).toFixed(2),
            gap:(that.data.weightChange-AveValue[that.data.YZ-1]).toFixed(2)
            
          })
        }
      })
 
    }else if(parseFloat(this.data.cBMI)>= 28){
      wx.request({
   
        url: 'https://yzttwsplat.natapp4.cc/YKInterface/GetPregnantRange?FetalNumber=1&BMI=30',
    
        data: {
        
        },
        method: 'POST',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          MinValue=[that.data.pastWeight,that.data.pastWeight]
          MaxValue=[that.data.pastWeight,that.data.pastWeight]
          AveValue=[0,0]
          let i;
          for(i=0;i<38;i++){
            MinValue.push((parseFloat(res.data.Pregnantvalue[i].MinValue)+parseFloat(that.data.pastWeight)).toFixed(2) ),
            MaxValue.push((parseFloat(res.data.Pregnantvalue[i].MaxValue)+parseFloat(that.data.pastWeight)).toFixed(2)),
            AveValue.push(parseFloat(res.data.Pregnantvalue[i].AveValue).toFixed(2))
           }
           that.WeightC()
           that.setData({
            tellBmi:"[孕前体重肥胖]",
            pastCondition:"孕前体重状态:肥胖",
            TS:"胎数:双胎",
            cbmi:"孕前BMI(kg/m²):≥28",
            allWeight_change:"孕期总增重(kg):11.4-19.1",
            Weight2_13:"2~13孕周(kg):0.08-0.34",
            Weight14_26:"14~26孕周(kg):0.24-0.63",
            Weight27_40:"27~40孕周:0.34-0.70",
            shouldChange:AveValue[that.data.YZ-1],
            shouldWeight:(parseFloat(that.data.pastWeight) +parseFloat(AveValue[that.data.YZ-1])).toFixed(2),
            gap:(that.data.weightChange-AveValue[that.data.YZ-1]).toFixed(2)
        })
        }
      })

  }
    else{

      this.setData({
        tellBmi:"",
        MinValue:[0,0],
        MaxValue:[0,0]
      })
    }
  }

if(this.data.shouldWeight=="NaN"){
  this.setData({
    shouldWeight:"",
    gap:""
  })
}

this.init()
},
btnSub2(e){
 users.add({
   data:{   
     ID:this.data.ID,
     name:this.data.name,
     age:this.data.age,
     sex:this.data.sex,
     Height:this.data.Height,
     Weight:this.data.Weight,
     PregnancyWeight:this.data.pastWeight,
     PregnancyBMI:this.data.cBMI,
     Gestation:this.data.YZ,
     IBW:this.data.Height-105,
     Result: "孕前BMI(kg/m2):"+this.data.cBMI+"。第"+this.data.YZ+"周,目前实际已增重"+this.data.weightChange+"kg，推荐应增重"+this.data.shouldChange+
     "kg(即体重应达到"+this.data.shouldWeight+"kg)，"+"目前偏差"+this.data.gap+"kg。",
       F_GreateDate:new Date().toJSON().substring(0, 10) + ' ' + new Date().toTimeString().substring(0,8)
   }
 })
},

  init() {
    this.lazyComponent.init((canvas, width, height, dpr) => {
      let chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr
      })
      let option = getOption()
      chart.setOption(option)
      this.chart = chart
      return chart
    })
  },
})
function getOption() {
  return {
    title: {
      text: '体重曲线图'
    },
    xAxis: {
      type: 'category',
      data:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40]
    },
    yAxis: {
      type: 'value'
    },
    series: [{
        name: '最大标准体重',
        data: MaxValue,
        type: 'line',
        showSymbol: false,

      },
      {
        name: '最小标准体重',
        data:MinValue,
        type: 'line',
        showSymbol: false,
      },
      {
        name: '体重',
        data:w,
        type: 'line',
        showSymbol: false,
      },
    ]
  }
} 