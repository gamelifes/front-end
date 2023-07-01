
function read_excel(){

    var filePath="E:\\abcd9.com.xls"; //要读取的xls
    var sheet_id=2; //读取第2个表
    var row_start=3; //从第3行开始读取
    var tempStr='';
    try{
        var oXL = new ActiveXObject("Excel.application"); //创建Excel.Application对象
    }catch(err)
    {
        alert(err);
    }
    var oWB = oXL.Workbooks.open(filePath);
    oWB.worksheets(sheet_id).select();
    var oSheet = oWB.ActiveSheet;
    var colcount=oXL.Worksheets(sheet_id).UsedRange.Cells.Rows.Count ;

    for(var i=row_start;i<=colcount;i++){
        if (typeof(oSheet.Cells(i,8).value)=='date'){ //处理第8列部分单元格内容是日期格式时的读取问题
            d= new Date(oSheet.Cells(i,8).value);
            temp_time=d.getFullYear()+"-"+(d.getMonth() + 1)+"-"+d.getDate();
        }
        else
            temp_time=$.trim(oSheet.Cells(i,7).value.toString());
        tempStr+=($.trim(oSheet.Cells(i,2).value)+" "+$.trim(oSheet.Cells(i,4).value)+" "+$.trim(oSheet.Cells(i,6).value.toString())+" "+temp_time+"\n");
        //读取第2、4、6、8列内容
    }

   
    oXL.Quit();
    CollectGarbage();
    return tempStr; //返回
}

