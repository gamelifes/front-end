var testBody = document.getElementById('keep');
        var btn1 = document.getElementById('search');
        var cirDone = document.getElementById('cirDone');
        var weather = document.getElementById('weather');

        var urls = [
          "https://tcc.taobao.com/cc/json/mobile_tel_segment.htm?tel=18911703782",
          "https://tool.bitefu.net/shouji/",
          //"http://www.weather.com.cn/data/cityinfo/101281001.html", 只有今天的数据
          "https://www.baidu.com/home/other/data/weatherInfo?city=湛江"
      ];
      var url_phone = "https://bird.ioliu.cn/v1?url=";
      function getPhone(event) {
          console.log(event)
          event.target.value = event.target.value.replace(/[^\d]/g, '');

      }
      function checkGoNext() {
          cirDone.classList.toggle('active');
          let phone = document.getElementById('phone').value;
          console.log(phone)
          telOrPhone = phone.length == 11 ? /^1(3|4|5|6|7|8|9)\d{9}$/.test(phone) : /^(\d{3,4})-(\d{7,8})/.test(phone);

          if (!telOrPhone) {
              console.log(telOrPhone)
              // var tip = document.getElementById('tip');
              // tip.className = 'tip';
              // setTimeout(function () {
              //     tip.className = 'tip anima';
              // }, 10);

          } else {
              axjPhoneUrl()

          }

          // var login = document.getElementById('login');
          // var verifyCode = document.getElementById('verifyCode');
          // login.style.display = 'none';
          // verifyCode.style.display = 'block';
      }
      btn1.onclick = checkGoNext;

      function axjPhoneUrl() {
          let ioliuUrl = url_phone + urls[0].toString()

          let param = { "tel": phone }

          // axios 参数必须用params包裹，例如:  var  param = {params:{pageNo:1,pageSize:20}}

          param = { params: param };
          axios.get(
              ioliuUrl,
              param

          ).then(function (data) {
              // const fileName = "手机号归属地数据表.csv";
              // let jsonData = JSON.stringify(data.data);
              // tableToExcel(fileName,jsonData);
              console.log(data)

          }).catch(function (e) {
              console.log("url:" + url_phone + ",请求失败，网络错误");
          });
      }
