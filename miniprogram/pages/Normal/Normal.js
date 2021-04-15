const db=wx.cloud.database();
const users=db.collection("demolist");
import * as echarts from '/../../ec-canvas/echarts';
var weightDataX=new Array();
var weightDataX1=new Array();
var weightDataY=new Array();
Page({
  data: {      
    ID:"",
    Ideal_Weight:"",
      Weight_IBW: "",
      BMI:"",
      YTB: "",
      SBJW:"",
    Weight:"",
    Height:" ",
    YW: "",
    TW: "",
    WL: "",
    PZHD: "",
    SBW: "",
    XTW:"" ,
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
 jump(){
   wx.navigateTo({
     url: "/pages/history/history?ID="+this.data.ID
   })
 },
 weightInput(e){
   this.setData({
    Weight:e.detail.value
   });
   this.func1()
 },
 heightInput(e){
  this.setData({
  Height:e.detail.value
})
this.func1()
 },
waistlineInput(e){
  this.setData({  
    YW:e.detail.value,
  })
  this.func1()
},
hiplineInput(e){
  this.setData({
  TW:e.detail.value,
})
this.func1()
},
gripInput(e){
  this.setData({
    WL:e.detail.value,
  })
  this.func1()
},
thicknessInput(e){
this.setData({
  PZHD:e.detail.value,
})
this.func1()
},
uphiplineInput(e){
  this.setData({
    SBW:e.detail.value,
  })
  this.func1()
},
legShankInpu(e){
  this.setData({
    XTW:e.detail.value,
  })
  this.func1()
},
  /**
   * 生命周期函数--监听页面加载
   */
  func1() {
    weightDataX.pop();
    weightDataX1.pop();
    
    this.setData({
      Ideal_Weight: (parseFloat(this.data.Height) - 105).toFixed(2),
      Weight_IBW: (parseFloat(this.data.Weight) / (parseFloat(this.data.Height) - 105)).toFixed(2),
      BMI: (parseFloat(this.data.Weight) / (parseFloat(this.data.Height) / 100 * parseFloat(this.data.Height) / 100)).toFixed(2),
      YTB: (parseFloat(this.data.YW) / parseFloat(this.data.TW)).toFixed(2),
      SBJW: (parseFloat(this.data.SBW) - 3.14 * parseFloat(this.data.PZHD) / 10).toFixed(2),
      Weight_Last: (parseFloat(this.data.lastWeight)).toFixed(2),
      Weight_Change:(parseFloat(this.data.Weight)-parseFloat(this.data.lastWeight)).toFixed(2),
      cbmi:(parseFloat(this.data.lastBMI)).toFixed(2),
  })
  weightDataX.push(this.data.Weight);
  weightDataX1.push((parseFloat(this.data.Weight) / (parseFloat(this.data.Height) / 100 * parseFloat(this.data.Height) / 100)).toFixed(2));
  
this.init()
      },
btnSub2(e){
   console.log(e);
   var name=this.data.name,
   ID=this.data.ID,
   sex=this.data.sex,
   age=this.data.age,
  Ideal_Weight=this.data. Ideal_Weight,
    Weight_IBW=this.data. Weight_IBWt,
   BMI=this.data. BMI,
   SBJW=this.data. SBJW,
    YTB=this.data. YTB,
    Weight_Last=this.data.Weight_Last,
    Weight_Change=this.data.Weight_Change,
    cbmi=this.data.cbmi;
   var{Height,Weight,YW,TW, WL,PZHD,SBW,XTW}=e.detail.value;
  users.add({
    data:{   
      ID:ID,
      name:name,
      age:age,
      sex:sex,
      Weight_Last:Weight_Last,
       Weight:Weight,
        Height:Height,
        YW:YW,
        TW:TW,
        WL:WL,
        PZHD:PZHD,
        SBW:SBW,
        XTW:XTW,
        Ideal_Weight:Ideal_Weight,
        BMI:BMI,
        YTB:YTB,
        Weight_IBW:Weight_IBW,
        Weight_Change:Weight_Change,
        SBJW:SBJW,
        cbmi:cbmi,
        F_GreateDate:new Date().toJSON().substring(0, 10) + ' ' + new Date().toTimeString().substring(0,8)
    }
  })
 },
  onLoad: function (options) {

    var len=weightDataX.length;
   let i;
    for(i=0;i<len;i++){
    weightDataX.pop()
    weightDataX1.pop()};

let ID=options.ID;
wx.cloud.database().collection('demolist')
  .where({
  ID: ID
  })
  .orderBy('F_GreateDate','asc')
  .get()     
  .then(res => {
var a=res.data.length-1
    if(typeof(res.data[a])==="undefined"){
      this.setData({lastWeight:0,
        lastBMI:0
      })}
    else{
      res.data.forEach(function(item){
        weightDataX.push(item.Weight);
        weightDataX1.push(item.BMI);
        weightDataY.push(item.F_GreateDate);
      })
      weightDataX.push(0)
    weightDataX1.push(0)

      this.setData({lastWeight:res.data[a].Weight,
        lastBMI:res.data[a].BMI
      })}
})

this.setData({
  name:options.name,
  ID:options.ID,
  sex:options.sex,
  age:options.age,

})
this.lazyComponent = this.selectComponent('#lazy-mychart-dom'),
this.init()

  },
  fpages: function () {
    wx.navigateTo({
      url: "/pages/demo4/demo4?SBW=" + this.data.SBW + "&BMI=" + this.data.BMI + "&name=" + this.data.name + "&sex=" + this.data.sex+ "&age=" + this.data.age+ "&Height=" + this.data.Height
      + "&XTW=" + this.data.XTW+ "&Weight=" + this.data.Weight+ "&Weight_Last=" + this.data.Weight_Last
      + "&PZHD=" + this.data.PZHD+ "&YM=" + this.data.YM+ "&WL=" + this.data.WL+ "&TW=" + this.data.TW
      + "&Weight_IBW" + this.data.Weight_IBW+ "&Ideal_Weight=" + this.data.Ideal_Weight+ "&Weight_Change=" + this.data.Weight_Change
      + "&YTB=" + this.data.YTB+ "&SBJW=" + this.data.SBJW
 
    })
  }
})
function getOption() {
  return {
    title: {
      text: '人体数据健康表'
    },
    xAxis: {
      type: 'category',
      data:""
    },
    yAxis: {
      type: 'value'
    },
    series: [{
        name: '体重',
        data:  weightDataX,
        type: 'line',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        }
      },
      {
        name: 'IBM',
        data: weightDataX1,
        type: 'line',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        }
      }
    ]
  }
} 
