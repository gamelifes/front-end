         
function tableToExcel(file,Data){
  const fileName = file;
  //要导出的json数据
  const jsonData = JSON.parse(Data);
 
  //列标题，逗号隔开，每一个逗号就是隔开一个单元格

  
  var keyAry = [];
  var valueAry = [];
for(var key in jsonData){
  keyAry.push(key);
  valueAry.push(jsonData[key]);
}
const tiltle = keyAry +`\n`;
let str = tiltle;
  console.log( JSON.stringify(jsonData))
  console.log( keyAry)
       

  //增加\t为了不让表格显示科学计数法或者其他格式
  for(let i = 0 ; i < valueAry.length ; i++ ){
    
        str+=`${valueAry[i] + '\t'},`;     
        
  }
  MakeExcel(keyAry,valueAry)
//   //encodeURIComponent解决中文乱码
//   let uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str);
//   //通过创建a标签实现
//   let link = document.createElement("a");
//   link.href = uri;
//   //对下载的文件命名
//   link.download = fileName;
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
}
function MakeExcel(keyAry,valueAry) {

    var i, j, n;

    try {

      var xls = new ActiveXObject("Excel.Application");

    }

    catch(e) {

      alert( "要生成该表，您必须安装Excel电子表格软件，同时浏览器须使用“ActiveX 控件”，您的浏览器须允许执行控件。请点击【帮助】了解浏览器设置方法！");

        return "";

    }

    xls.visible =true; // 设置excel为可见

    var xlBook = xls.Workbooks.Add;

    var xlsheet = xlBook.Worksheets(1);

    for (i=0;i<Lenr;i++)
    {
     var Lenc = keyAry.rows(i).cells.length;
     for (j=0;j<Lenc;j++)
     {
      oSheet.Cells(i+1,j+1).value = valueAry.rows(i).cells(j);
     }
    }

    xlsheet.Cells(2,1).Value = "卡号";

    


    xlsheet.Range(xlsheet.Cells(1,1),xlsheet.Cells(1,7)).mergecells=true;

    xlsheet.Range(xlsheet.Cells(1,1),xlsheet.Cells(1,7)).value="发卡记录";
   
  
   
    xlBook.SaveAs("E:\\PhoneMessge.XLS");
   
    // 用 Application 对象用 Quit 方法关闭 Excel。
   
    xlBook.Application.Quit();

    xls=null;

    xlBook=null;

    xlsheet=null;

  }


//指定页面区域“单元格”内容导入Excel
function CellAreaExcel(id)
{
const PrintA = id;
 var oXL = new ActiveXObject("Excel.Application");
 var oWB = oXL.Workbooks.Add();
 var oSheet = oWB.ActiveSheet;
 var Lenr = PrintA.rows.length;
 for (i=0;i<Lenr;i++)
 {
  var Lenc = PrintA.rows(i).cells.length;
  for (j=0;j<Lenc;j++)
  {
   oSheet.Cells(i+1,j+1).value = PrintA.rows(i).cells(j).innerText;
  }
 }
 oXL.Visible = true;
}
