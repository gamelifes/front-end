
let err404 = {data:"<div>"+ 404 +"</div>"};
    //MARK:http response 返回拦截器
    axios.interceptors.response.use(
        response => {
          //console.log("respone拦截器response", response)
          let responseCode = response.status;
        
          
          if (responseCode != "200") {
           // let message = errorCode.errorMessage[responseCode];
        
           return message;
           
          }
          return response;
        },
        error => {
          console.log("respone拦截器error",error.response)
          let message = "";
          if(error && error.response){  //跨域存在获取不到状态码的情况
            message = errorCode.errorStatus[error.response.status] +"，"+i18n.t('option.errCode')+"："+error.response.status
          } else{   //跨域获取不到状态码或其他状态码进行的处理
            message = i18n.t('option.networkErr')
          }
          console.log(message)
          return Promise.resolve(error.response);
        }
      )
    //MARK:滚动条在Y轴上的滚动距离
 
    function getScrollTop(){
      　　var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
      　　if(document.body){
      　　　　bodyScrollTop = document.body.scrollTop;
      　　}
      　　if(document.documentElement){
      　　　　documentScrollTop = document.documentElement.scrollTop;
      　　}
      　　scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
      　　return scrollTop;
      }
       
      //MARK:文档的总高度
       
      function getScrollHeight(){
      　　var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
      　　if(document.body){
      　　　　bodyScrollHeight = document.body.scrollHeight;
      　　}
      　　if(document.documentElement){
      　　　　documentScrollHeight = document.documentElement.scrollHeight;
      　　}
      　　scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
      　　return scrollHeight;
      }
       
      //MARK:浏览器视口的高度
       
      function getWindowHeight(){
      　　var windowHeight = 0;
      　　if(document.compatMode == "CSS1Compat"){
      　　　　windowHeight = document.documentElement.clientHeight;
      　　}else{
      　　　　windowHeight = document.body.clientHeight;
      　　}
      　　return windowHeight;
      }
     
      window.onscroll = function(){
      　　if(getScrollTop() + getWindowHeight() == getScrollHeight()){
              console.log("已经到最底部了！!");
      　　}
      };
       //MARK:api数据
      var urls = [
        "https://tcc.taobao.com/cc/json/mobile_tel_segment.htm?tel=18911703782",
        "https://tool.bitefu.net/shouji/",
        //"http://www.weather.com.cn/data/cityinfo/101281001.html", 只有今天的数据
        "https://www.baidu.com/home/other/data/weatherInfo?city=湛江"
    ];
    var url_phone = "https://bird.ioliu.cn/v1?url=";
    //MARK:判断DOM节点是否存在页面中
   