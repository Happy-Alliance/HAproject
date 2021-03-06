//取得url id值region
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}
//endregion

//填寫資料(輔導紀錄)region
var name = decodeURIComponent(getUrlVars()["name"]);
var pid =getUrlVars()["pid"];
var date = getUrlVars()["date"];
// var grade = getUrlVars()["grade"];
var property = decodeURIComponent(getUrlVars()["property"]);
var type = decodeURIComponent(getUrlVars()["type"]);
var pcase_id = getUrlVars()["id"];
var open_id = getUrlVars()["open_id"];
// var addition =decodeURIComponent(getUrlVars()["addition"]);
// var age = decodeURIComponent(getUrlVars()["age"]);
// var gender =decodeURIComponent(getUrlVars()["gender"]);

var referral = decodeURIComponent(getUrlVars()["referral"]);
var case_Create_date = getUrlVars()["case_Create_date"];
var unopen_type = decodeURIComponent(getUrlVars()["unopen_type"]);
var birth = getUrlVars()["birth"];

var form_id = getUrlVars()["form_id"];
var form_type = decodeURIComponent(getUrlVars()["form_type"]);


//當量表分數改變(選項)的時候，重算分數
$("input[name*='answer']").change( function(event) {
    
    //加總所有選項分數
    answer_score_counting();

    //BSRS5量表總分計算和得分評估
    if(form_type=="BSRS5")
    {
        BSRS5_answer_score_counting();
        BSRS5_answer_score_evaluation();
    }
});

//量表分數計算region
function answer_score_counting() {
    var t_score = 0;

    $("input[name*='answer']").each(function(i,n){

        if($(this).is(":checked"))
        {
            var score = parseInt($(this).val())
            t_score += score;
        }
    });

    $("#answer_score").val(t_score);
}
//endregion

//BSRS5量表分數計算(扣除附加題分數) region
function BSRS5_answer_score_counting() {
    var t_score = 0;
    var answer_last_ques = $("input[name*='answer'][type='radio']").last().attr("name");

    $("input[name*='answer']").each(function(i,n){

        if($(this).is(":checked"))
        {
            var score = parseInt($(this).val())
            t_score += score;
        }
    });

    var add_ques_score = parseInt($("input[name='"+answer_last_ques+"']:checked").attr("value")) || 0;


    $("#answer_score").val(t_score - add_ques_score);
}
//endregion

//BSRS5量表分數評估 region
function BSRS5_answer_score_evaluation() {

    var answer_score = $("#answer_score").val();

    var answer_last_ques = $("input[name*='answer'][type='radio']").last().attr("name");

    //評估是否總分大於6分，除附加題以外
    if(parseInt(answer_score) > 6)
    {
        $("input[name='treatment_status']").first().prop("checked",true);
    }
    else
    {
        $("input[name='treatment_status']").first().prop("checked",false);
    }


    //評估附加題分數是否大於0
    if(parseInt($("input[name='"+answer_last_ques+"']:checked").attr("value")) > 0)
    {
        $("input[name='treatment_status']").last().prop("checked",true);
    }
    else
    {
        $("input[name='treatment_status']").last().prop("checked",false);
    }
    
}
//endregion

//宣告存入 file Object的空陣列
var file_name=[];

//選擇檔案的動作region
$("input[name*='customFile']").change( function(event) {
    //獲取 檔名.檔案格式
    var filePath = $(this).val().split("\\");
    //獲取 file name名稱
    var name = $(this).attr("name");
    //獲取檔案格式
    var filetype= filePath[filePath.length-1].split(".");
    var ext = filetype[filetype.length - 1];
    // console.log(ext)

    //file_name中name值 重複次數
    var repeat_num = 0;
    //file_name中name值 重複的索引值
    var repeat_index;

    //創建臨時檔案連結
    // var tmppath = URL.createObjectURL(event.target.files[0]);

    //若檔案為圖片格式，則顯示圖片，否則不顯示圖片
    if(isAssetTypeAnImage(ext.toLowerCase()))
    {
        $("#"+name+"_img").fadeIn("fast").attr('src',URL.createObjectURL(event.target.files[0]));
    }
    else
    {
        $("#"+name+"_img").css("display","none");
    }

    //預覽上傳檔名
    $("#"+name).html("檔名："+filePath[filePath.length-1]);

    //查看 file_name 中是否已有重複元素
    $.each(file_name, function (i, obj) {
        if(obj.name==name)
        {
            repeat_num ++;
            repeat_index = i;
        }
        else
        {
            repeat_num = 0;
        }
    });
    // console.log(repeat_num);

    //如果file_name中未找到相同name值，則新加入一筆資料至file_name
    //否則，找到相對應索引repeat_index name值，更新該value值
    if(repeat_num==0)
    {
        file_name.push({name:name,value:filePath[filePath.length-1]}); 
    }
    else
    {
        file_name[repeat_index]["value"] = filePath[filePath.length-1];
    }
    
    // console.log(file_name)
});
//endregion

//檢查是否為圖片檔region
function isAssetTypeAnImage(ext) {
    return [
    'png', 'jpg', 'jpeg', 'bmp', 'gif', 'webp', 'psd', 'svg', 'tiff'].
    indexOf(ext.toLowerCase()) !== -1;
}
//endregion

//檢查檔名是否重複，提示使用者region
function check_file_exist(){
    var check_file_value = $('input[type="file"]').prop('files');
    var warning_str = "";
    var file_arr = [];
    var file_n = "";
    var exist_info = [];

    for(var i=0; i<check_file_value.length; i++){
         file_arr.push(check_file_value[i]["name"]);
     }
     $.each(file_arr, function (index, value) {
         $.ajax({
             url: "database/placement_case_file_check.php",
             data: {
                file_name:value,
                Case_id:open_id,
                Form_id:form_id,
                Form_type:form_type,
                Case_pid:pid
             },
             type: "POST",
             dataType: "JSON",
             async:false,
             success: function (data) {
                //  console.log(data)
                 if(data!="")
                 {
                     $.each(data, function (index, value) {
                         var form_type_str = "";
 
                         file_n = data[index].file_path.replace("\.\.\/upload\/", "");
 
                         switch (data[index].Form_type) {
                             case "case":
                                 form_type_str = "個案評估表";
                                 
                                 break;
                             case "BSRS5":
                                 form_type_str = "BSRS-5量表";
                                 
                                 break;
                             case "sullen":
                                 form_type_str = "憂鬱量表";
                                 break;
                         }
     
                         warning_str += '檔案名稱：'+file_n+'，\n'+
                                         '開案案號：'+data[index].Case_id+'，\n'+
                                         '量表類型：'+form_type_str+'，\n'+
                                         '檔案創建者：'+data[index].Create_name+'，\n'+
                                         '檔案更新者：'+data[index].Update_name+'。\n\n';
                         

                        exist_info.push([file_n, warning_str]);
                     });
                 }
                 else
                 {
                     warning_str = "";
                 }               
             },
             error: function (e) {
                 console.log(e);
             }
         });
     });
     return exist_info;
  }
 //endregion

 other_info_push = function(form_tpye) {

    var other_info_arr = [];
    
    switch (form_tpye) {
        case 'case':

              var get_case_closed = $('input[name="case_closed_radio"]:checked').val();

              if(get_case_closed=='結案')
              {
                other_info_arr.push({name:form_tpye,value:'結案'});
              }
              else if(get_case_closed=='暫不結案')
              {                
                var case_closed_str = "暫不結案，持續服務至民國"+$('input[name="case_closed_year"]').val()+"年"+$('input[name="case_closed_month"]').val()+"月"+$('input[name="case_closed_day"]').val()+"日";
                other_info_arr.push({name:form_tpye,value:case_closed_str});
              }
              else
              {
                other_info_arr.push({name:form_tpye,value:''});
              }
              
            break;

        case 'life':

            var w_test = $('input[name="w_test"]:checked').val();
            
            if(w_test==undefined)
            {
                other_info_arr.push({name:form_tpye,value:''});
            }
            else
            {
                other_info_arr.push({name:form_tpye,value:w_test});
            }

            break;

        case 'employment_satif':
        case 'satif':

            var answer_score = $('input[name="answer_score"]').val();
            other_info_arr.push({name:form_tpye,value:answer_score});

            break;

        case 'familyship':

            var answer_score = $('input[name="answer_score"]').val();
            other_info_arr.push({name:form_tpye,value:answer_score});

            var w_test = $('input[name="w_test"]:checked').val();
            if(w_test==undefined)
            {
                other_info_arr.push({name:form_tpye,value:''});
            }
            else
            {
                other_info_arr.push({name:form_tpye,value:w_test});
            }

            break;

        case 'BSRS5':

            var answer_score = $('input[name="answer_score"]').val();
            other_info_arr.push({name:form_tpye,value:answer_score});
            var statement = $('textarea[name="statement"]').val();
            other_info_arr.push({name:form_tpye,value:statement});

            break;

        case 'settlement':
            var basic_indicator = $('input[name="basic_indicator"]:checked').length;
            var end_indicator = $('input[name="end_indicator"]:checked').length;

            if(basic_indicator==0 && end_indicator==0)
            {
                var indicators_str = "";
            }
            else
            {
                var indicators_str = "符合基本條件指標條件共"+basic_indicator+"項，符合收案指標條件共"+end_indicator+"項。";
            }

            
            other_info_arr.push({name:form_tpye,value:indicators_str});

            break;

        case 'health':
            
            break;

        default:
            
            break;
    }

    return other_info_arr;

 }


//儲存後資料預覽測試region
test = function()
{   
    if($('input[type="file"]').length!=0)
    {
        var exist_arr = check_file_exist();

        if(exist_arr.length!=0)
        {
            swal({
                title: exist_arr[0][0]+"已存在。相關資訊如下：\n"+exist_arr[0][1],
                text: "選擇『確認送出』覆蓋現有檔案，或是按『取消』更改檔名",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "確認送出",
                cancelButtonText: "取消",
                showConfirmButton: true,
                showCancelButton: true
            }).then(function(result) {
                if (result) {
                    submit_data();
                }
            }, function(dismiss){
                if(dismiss == 'cancel'){
                    swal({
                        title:'已取消，建議請更改檔名',
                        type:'success',                        
                    })
                }
            }).catch(swal.noop)
        }
        else
        {
            submit_data();
        }
    }
    else
    {
        submit_data();
    }
   
    
}



function submit_data()
{
    var form_type = getUrlVars()["form_type"];
    //去掉資料內前後端多餘的空白
    $('input, textarea').each(function(){
        if($(this).attr('type')!='file')
        {
            $(this).val(jQuery.trim($(this).val()));
        }
    });

    var form_data = new FormData();

    var customfile = $('[type="file"]').prop('files');


    // console.log(typeof customfile)
    
    var form = $('.form').serializeArray();
    // console.log(form)

    if(file_name.length==0)
    {
        var input_files_len = $('[type="file"]');
        var inputs_files_value = $('[type="file"]').attr("value");
        var inputs_files_name = $('[type="file"]').attr("name");

        if(inputs_files_value!=undefined)
        {
            for(var i=0;i<input_files_len.length;i++)
            {
                file_name.push({name:inputs_files_name,value:inputs_files_value}); 
            }
        }

        form = form.concat(file_name);
    }
    else
    {
        form = form.concat(file_name);
    }

    if(form_type=="health")
    {
        form_health_arr = new Array();

        $(".form_health table").each(function(index, name){
            var get_tab_id = $(this).attr("id");
            var name_arr1 = $("[name='"+get_tab_id+"&medical_rec_1[]']");
            var name_arr2 = $("[name='"+get_tab_id+"&medical_rec_2[]']");
        
            var arr_len  = name_arr1.length;
            var arr2_len  = name_arr2.length;
        
            var arr1 = new Array();
            var arr2 = new Array();
           
            for (i = 0; i < arr_len; i++)
            {
                arr1.push(name_arr1[i].value); 
            } 
            
            for (i = 0; i < arr2_len; i++)
            {
                arr2.push(name_arr2[i].value); 
            }
            var isstrspace = 0;

            arr1.forEach(function(item, index, arr) {
                if (item==null || item=="") {
                    isstrspace ++
                }
            });

            arr2.forEach(function(item, index, arr) {
                if (item==null || item=="") {
                    isstrspace ++
                }
            });

            console.log(isstrspace)
            if(isstrspace!=(arr_len+arr2_len))
            {
                form_health_arr.push({name:name_arr1.attr("name"),value:arr1})
                form_health_arr.push({name:name_arr2.attr("name"),value:arr2})
            }
            else
            {
                console.log("no")
            }


        });
        // var form_health_arr = $('.form_health').serializeArray();

        form_data.append("health_rec", JSON.stringify(form_health_arr));
    }

    var other_info = other_info_push(form_type);

    if(other_info.length>0)
    {
        form_data.append("other_info", JSON.stringify(other_info));
    }

    // console.log(form)

     //將其他摘要訊息添加至form_data，other_info用來顯示在placement_case_all.php的各量表摘要表格上
     var other_info = other_info_push(form_type);

    //  console.log(other_info)
    //  console.log(other_info.length)
     if(other_info.length>0)
     {
         form_data.append("other_info", JSON.stringify(other_info));
     }
 
     form_data.append("Fillin_date", $("input[name*='fillin_date']").val());


     if(customfile!=undefined)
     {
         if(customfile.length!=0)
         {
             for(var i=0; i<customfile.length; i++){
                 form_data.append("file4", customfile[i]);
                 // console.log(customfile[i])
             }
         }
         else
         {
             //載入量表『無重新上傳檔案』情況下按儲存，則加入File_name供後端程式判斷
             form_data.append("File_name", $('[type="file"]').attr("value"));
         }
     }

    form_data.append("Case_id", open_id);
    form_data.append("Form_id", form_id);
    form_data.append("Form_type", form_type);
    form_data.append("Case_name", name);
    form_data.append("Case_pid", pid);

    form_data.append("answer", JSON.stringify(form));

    for (var pair of form_data.entries()) {
        console.log(pair[0]+ ', ' + pair[1]); 
    }
}
//endregion


//網頁載入 region
$(document).ready(function () {
    //填入資料region
    
    //各量表依據form_type自動更新麵包屑名稱
    $("#form_type_name").text($("#form_type").text());

    
    //家庭關係量表自動填入性別
    // $("input[name='sex'][value='"+gender+"生']").attr('checked',true);

    //個案服務滿意度調查表自動填入資料
    $("#case_name").val(name);
    $("#tsn_case_id").val(decodeURIComponent(open_id));
    //assign_name 於case_detail.php 第234行定義變數
    $("#assign_name").val(assign_name);

    //個案評估表自動填入資料
    $("#name").val(name);
    $("#pid").val(decodeURIComponent(pid));
    // $("input[name='sex'][value='"+gender+"生']").attr('checked',true);
    $("#open_date").val(decodeURIComponent(date));
    // $("#age").val(decodeURIComponent(age));

    //填寫日期自動帶入
    $("input[name*='fillin_date']").each(function(){
        //獲取現在時間 moment.js插件
        var timenow = moment().format('YYYY-MM-DD');
        $(this).val(timenow);
    });

    var url = "";

    //判斷是否為個案評估表或安置、自立宿舍評估量表
    if(form_type=="case" || form_type=="settlement")
    {
        //個案評估表
        url = "database/find_placement_case_detail_typecase.php";
    }
    else
    {
        //其他量表
        url = "database/find_placement_case_detail.php";
    }

    //載入各量表 資料
    load_all_forms_data(form_type,url);

    //計算各量表 分數
    answer_score_counting();
  
});
//endregion

//載入各量表 資料 region
function load_all_forms_data(type_name,url_str)
{
        //載入各量表 資料
        $.ajax({
        url: url_str,
        type: "POST",
        data: {
            Case_id:open_id,
            Form_id:form_id,
            Form_type:type_name,
            Case_pid:pid,
        },
        dataType: "JSON",
        async: false, //啟用同步請求
        success: function (data) {
            // console.log(data)

            //程式執行條件為 非剛創建的量表
            if(data!='')
            {
                //將ajax結果轉為json
                var data_json = JSON.parse("[" +data[0].answer.replace('\"\[', '\[').replace('\]\"', '\]') + "]");
                // console.log(data_json)
                //依據input的type類型名稱寫入資料，file類型名稱另外寫 region
                $.each(data_json[0], function (i, datan) {

                    //獲取name值對應的input類型
                    var inputs_type = $("input[name='"+datan.name+"']").attr('type');

                    //根據對應的類型選擇js語法填入資料
                    if(inputs_type!=undefined)
                    {
                        switch (inputs_type) {
                            case "radio":
                            case "checkbox":
                                //radio & checkbox填值語法格式
                                $("input[name='"+datan.name+"'][value='"+datan.value+"']").attr('checked',true);
                                break;

                            //text填值語法格式
                            case "text":
                                $("input[name='"+datan.name+"']").val(datan.value);
                                break;
                            case "file":
                                    //file類型跳過，下面再後續處理
                                break;
                            default:
                                $("input[name='"+datan.name+"']").val(datan.value);
                                break;
                        }
                    }
                    else //若不是input標籤
                    {
                        //其他 select、textarea
                        $("[name='"+datan.name+"']").val(datan.value);
                    }
                    

                });
                //endregion

                //file類型顯示資料處理 region
                //獲取所有 type="file" 的元素
                var inputs_type_files = $('[type="file"]');

                //如果存在 type="file" 的元素，繼續以下動作
                if(inputs_type_files.length>0)
                {
                    //顯示檔案圖片、路徑
                    for(var i=0;i<inputs_type_files.length;i++)
                    { 
                        //從資料庫抓取的格式為 "../upload/檔案.檔名"
                        //replace()更改為 "檔案.檔名"
                        var file_val = data[0].file_path.replace("\.\.\/upload\/", "");

                        //該input value寫入"檔案.檔名"
                        $("input[name*='customFile']").eq(i).attr("value",file_val)

                        //檔案連結與圖片string
                        var file_html='<a name="customFile'+(i+1)+'_a" href="./upload/'+file_val+'" style="text-decoration:none;color:blue;" target="_blank">'+file_val+'<br/><img style="vertical-align:middle;" width="auto" src="./upload/'+file_val+'"></a>';
                        
                        //寫入該input相對應的div元素 (id="customFile^") 中顯示
                        $("#customFile"+(i+1)).html(file_html);
                    }
                }
                //endregion

                if(form_type == "health")
                {
                    health_form_names = new Array();

                    var data_json_health = JSON.parse("[" +data[0].Health_rec.replace('\"\[\{', '\[\{').replace('\}\]\"', '\}\]') + "]");

                    $.each(data_json_health[0], function (i, datan) {
                        health_form_names.push(datan.name);
                    });

                    uniqueArr = filterArray(health_form_names)
                    var tab_arr = new Array();

                    for(var i = 0; i < uniqueArr.length; i++)
                    {
                        var tab_n = uniqueArr[i].split('\&');
                        tab_arr.push(tab_n[0])
                    }
                    tab_arr = filterArray(tab_arr)
                    tab_arr_len = tab_arr.length;

                    for(var i=1;i<=tab_arr_len;i++)
                    {
                        if(i!=1)
                        {
                            var cssString = "";

                            var table_str = "";
    
                            cssString += '<li class="nav-item" role="presentation">' +
                                '<a class="nav-link" id="profile-tab'+(parseInt(i)+1)+'" data-toggle="pill" href="#tabx0_'+i+'" role="tab"  aria-selected="false">' +
                                '<b>' + '就診紀錄表'+i+'</b>' +
                                '</a>' +
                                '</li>';
        
                            table_str += 
                            '<div class="tab-pane fade" id="tabx0_'+i+'" role="tabpanel" aria-labelledby="profile-tab'+(parseInt(i)+1)+'">'+
                                '<div class="col-sm-12">'+
                                    '<div style="margin-top:15px" class="text-center">'+
                                        '<h4>就診紀錄表'+i+'</h4>'+
                                    '</div>'+
                                '</div>'+
                                '<div class="panel-body">'+
                                '</div>'+
                                '<div class="table-wrap">'+
                                    '<div class="table-responsive">'+
                                        '<form class="form_health">'+
                                            '<table style="width:100%;" class="table table-bordered medical_rec_table" id="mtable'+i+'">'+
                                            '<thead class="medical_rec_1_th"></thead>'+
                                            '<tbody class="medical_rec_1"></tbody>'+
                                            '<thead class="medical_rec_2_th"></thead>'+
                                            '<tbody class="medical_rec_2"></tbody>'+
                                            '</table>'+
                                        '</form>'+
                                    '</div>'+
                                '</div>'+
                            '</div>';
    
                            $("#new_rec").before(cssString);
    
                            $(".panel-footer").before(table_str);
    
                            get_generate_medical_thead();
                            generate_medical_td_default();
    
    
                            $(".nav-link").click(function (e) {
                                e.preventDefault();
                                $(this).tab('show');
                            })
                        }
                        
                    }

                    // console.log(data_json_health[0])
                    //依據input的type類型名稱寫入資料，file類型名稱另外寫 region
                    $.each(data_json_health[0], function (i, datan) {
                        $.each(datan.value, function (e, v) {
                            $("input[name='"+datan.name+"']").eq(e).val(v);                            
                        });
                    });

                }
            }

           
        
        },
        error: function (e) {
            console.log(e)
            swal({
                title:'上傳失敗！請聯絡負責單位',
                type:'error',
            })
        }
    });
}
//endregion


//刪除陣列重複元素region
function filterArray(inputArr){
    var found ={};
    var out = inputArr.filter(function(element){
        return found.hasOwnProperty(element)? false : (found[element]=true);
    });
    return out;
}
//endregion



//按下儲存region
$("#add_"+form_type+"_detail").on('click', function () {

    //判斷該量表是否含有 input[type="file"] 類型資料
    if($('input[type="file"]').length!=0)
    {
        var exist_arr = check_file_exist();

        //如果上傳的檔案檔名重複則提示使用者
        if(exist_arr.length!=0)
        {
            swal({
                title: exist_arr[0][0]+"已存在。\n現有重複檔案資訊如下：\n"+exist_arr[0][1],
                text: "選擇『確認送出』覆蓋現有檔案，或是按『取消』更改檔名",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "確認送出",
                cancelButtonText: "取消",
                showConfirmButton: true,
                showCancelButton: true
            }).then(function(result) {
                if (result) {
                    submit_form_data();
                }
            }, function(dismiss){
                if(dismiss == 'cancel'){
                    swal({
                        title:'已取消，建議請更改檔名',
                        type:'success',                        
                    })
                }
            }).catch(swal.noop)
        }
        else
        {
            submit_form_data();
        }
    }
    else
    {
        submit_form_data();
    }
    

    
});
//endregion

//送出量表資料region
function submit_form_data() {
    var form_type = getUrlVars()["form_type"];

    //先執行 出入矯正機關 計算約共幾年幾月
    calculation_date();

    //去掉資料內前後端多餘的空白，file類型須排除，否則報錯
    $('input, textarea').each(function(){
        if($(this).attr('type')!='file')
        {
            $(this).val(jQuery.trim($(this).val()));
        }
    });
    
    //創立FormData Oject
    //傳輸 input type="file"類型檔案需用FormData Oject格式傳送ajax
    var form_data = new FormData();

    //獲取File Object
    var customfile = $('[type="file"]').prop('files');
    // console.log(typeof customfile)

    //獲取所有form的資料轉為serializeArray
    var form = $('.form').serializeArray();

    //form serializeArray物件合併input type="file"類型物件 (serializeArray不會將input type="file"類型資料加入，需額外設定)
    if(file_name.length==0)
    {
        var input_files_len = $('[type="file"]');
        var inputs_files_value = $('[type="file"]').attr("value");
        var inputs_files_name = $('[type="file"]').attr("name");

        if(inputs_files_value!=undefined)
        {
            for(var i=0;i<input_files_len.length;i++)
            {
                file_name.push({name:inputs_files_name,value:inputs_files_value}); 
            }
        }

        form = form.concat(file_name);
    }
    else
    {
        form = form.concat(file_name);
    }

    if(form_type=="health")
    {
        form_health_arr = new Array();

        $(".form_health table").each(function(index, name){
            var get_tab_id = $(this).attr("id");
            var name_arr1 = $("[name='"+get_tab_id+"&medical_rec_1[]']");
            var name_arr2 = $("[name='"+get_tab_id+"&medical_rec_2[]']");
        
            var arr_len  = name_arr1.length;
            var arr2_len  = name_arr2.length;
        
            var arr1 = new Array();
            var arr2 = new Array();
           
            for (i = 0; i < arr_len; i++)
            {
                arr1.push(name_arr1[i].value); 
            } 
            
            for (i = 0; i < arr2_len; i++)
            {
                arr2.push(name_arr2[i].value); 
            }
            var isstrspace = 0;

            arr1.forEach(function(item, index, arr) {
                if (item==null || item=="") {
                    isstrspace ++
                }
            });

            arr2.forEach(function(item, index, arr) {
                if (item==null || item=="") {
                    isstrspace ++
                }
            });

            if(isstrspace!=(arr_len+arr2_len))
            {
                form_health_arr.push({name:name_arr1.attr("name"),value:arr1})
                form_health_arr.push({name:name_arr2.attr("name"),value:arr2})
            }
        });
        // var form_health_arr = $('.form_health').serializeArray();

        form_data.append("health_rec", JSON.stringify(form_health_arr));
    }

    //將其他摘要訊息添加至form_data，other_info用來顯示在placement_case_all.php的各量表摘要表格上
    var other_info = other_info_push(form_type);

    // console.log(other_info)
    // console.log(other_info.length)
    if(other_info.length>0)
    {
        form_data.append("other_info", JSON.stringify(other_info));
    }

    //將填寫日期添加至form_data，fillin_date用來顯示在placement_case_all.php的各量表摘要表格上
    form_data.append("Fillin_date", $("input[name*='fillin_date']").val());

    //將 以下資料添加到 FormData Oject region

    //若量表無 input type="file"類型資料 則不執行該迴圈
    //量表沒有input type="file"類型資料，customfile會顯示undefined，customfile.length會報錯
    //量表存在input type="file"類型資料，但無任何檔案上傳customfile.length會顯示0
    if(customfile!=undefined)
    {
        if(customfile.length!=0)
        {
            for(var i=0; i<customfile.length; i++){
                form_data.append("file4", customfile[i]);
                // console.log(customfile[i])
            }
        }
        else
        {
            //載入量表『無重新上傳檔案』情況下按儲存，則加入File_name供後端程式判斷
            form_data.append("File_name", $('[type="file"]').attr("value"));
        }
    }

    form_data.append("Case_id", open_id);
    form_data.append("Form_id", form_id);
    form_data.append("Form_type", form_type);
    form_data.append("Case_name", name);
    form_data.append("Case_pid", pid);

    form_data.append("answer", JSON.stringify(form));
    //endregion

    // for (var pair of form_data.entries()) {
    //     console.log(pair[0]+ ', ' + pair[1]); 
    // }

    //傳輸 FormData Oject 格式資料ajax須設定如下
    $.ajax({
        type: 'POST',
        url: 'database/add_update_placement_case_detail_form.php',
        // data: {
        //     Case_id:open_id,
        //     Form_id:form_id,
        //     Form_type:form_type,
        //     Case_name:name,
        //     Case_pid:pid,
        //     answer:form
        // },
        data:form_data,
        contentType:false,
        cache:false,
        processData:false,
        async:true,
        success: function (data) {
            // console.log(data)
            //console.log(typeof data)
            if(data == 1){
                swal({
                    title:'上傳成功！',
                    type:'success',                        
                }).then(function(){
                    location.reload();
                }) 
            }
           else
           {
                swal({
                    title:'上傳失敗！請聯絡負責單位',
                    type:'error',
                })
            }
        },
        error: function (e) {
            console.log(e);
            swal({
                title:'上傳失敗！請聯絡負責單位',
                type:'error',
            })
        }
    });
}
//endregion


//個案評估表 同戶籍地址功能region
$(document).on('change', 'input[name="same_address"]', function() {

    var address_val = $("#address").val();

    if(this.checked) {
        swal({
            title: "確認填入同戶籍地址？",
            text: "提示：現「住處地址」內的資料將被覆蓋",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "送出",
            cancelButtonText: "取消",
            showConfirmButton: true,
            showCancelButton: true
        }).then(function(result) {
            if (result) {
                //住處地址value = 戶籍地址value
                $("#residence").val(address_val);
            }
        }, function(dismiss){
            if(dismiss == 'cancel'){
                swal({
                    title:'已取消送出',
                    type:'success',                        
                })
            }
        }).catch(swal.noop)
    }
});
//endregion

//出入矯正機關 計算約共幾年幾月region
calculation_date = function() {
    var start = $("#correctional_question_start").val();
    var end = $("#correctional_question_end").val();
    var iDays = parseInt(Math.abs(new Date(start) - new Date(end)) / 1000 / 60 / 60 / 24);

    var amount_year = parseInt(iDays / 365);
    var amount_month = parseInt((iDays % 365) / 30);

    if(isNaN(amount_year))
    {
        amount_year = 0
    }
    if(isNaN(amount_month))
    {
        amount_month = 0
    }

    $("#correctional_year").val(amount_year);
    $("#correctional_month").val(amount_month);
}
//endregion


//按下預覽匯出region
$("#preview").on('click', function(){

    location.href = 'four_preview.php?id='+pcase_id+'&open_id='+open_id+'&pid='+pid+'&form_id='+form_id+'&form_type='+form_type+'';
});
//endregion

//設定麵包屑返回region

var url = 'placement_case_all.php?name='+name+'&pid='+pid+'&date='+date+'&property='+property+'&type='+type+'&id='+pcase_id+'&open_id='+open_id+'&referral='+referral+'&case_Create_date='+case_Create_date+'&unopen_type='+unopen_type+'&birth='+birth+'';
$("#history").attr('href',url);

history_back_btn = function() {
    location.href=url;
}

var url2 = 'placement_case_all_all.php?open_id='+open_id+'';
$("#history2").attr('href',url2);

//endregion

    //結案region
    $("#end").on('click', function () {
        var name = decodeURIComponent(getUrlVars()["name"]);
        var pid =getUrlVars()["pid"];
        var date = getUrlVars()["date"];
        // var grade = getUrlVars()["grade"];
        var property = decodeURIComponent(getUrlVars()["property"]);
        var type = decodeURIComponent(getUrlVars()["type"]);
        var pcase_id = getUrlVars()["id"];
        var open_id = getUrlVars()["open_id"];
        // var addition =decodeURIComponent(getUrlVars()["addition"]);
        // var age = decodeURIComponent(getUrlVars()["age"]);
        // var gender =decodeURIComponent(getUrlVars()["gender"]);

        var referral = decodeURIComponent(getUrlVars()["referral"]);
        var case_Create_date = getUrlVars()["case_Create_date"];
        var unopen_type = decodeURIComponent(getUrlVars()["unopen_type"]);
        var birth = getUrlVars()["birth"];

        var form_id = getUrlVars()["form_id"];
        var form_type = decodeURIComponent(getUrlVars()["form_type"]);
        var Today=new Date();
        var twdate = (Today.getFullYear()-1911)+'-'+('0'+(Today.getMonth()+1)).substr(-2)+'-'+('0'+Today.getDate()).substr(-2);
        swal({
            title: '確認結案？',
            text: "結案後將新增至離園一覽表",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            allowOutsideClick: false, //不可點背景關閉
            confirmButtonText: '確認！',
            cancelButtonText: '取消'
        }).then(function (isConfirm) {
            if (isConfirm) {
                $.ajax({
                    url: "database/add_end.php",
                    data: {
                        face_id: face_id,
                        open_id:open_id,
                        house:house,
                        name:name,
                        leave_date:twdate,
                        leave_stage:$("#stage_end").val(),
                        main_addition:addition,
                        end_status:"未結案",
                        enter_date:$("#date").text(),
                    },
                    type: "POST",
                    dataType: "JSON",
                    success: function (data) {
                        if (data == 1) {
                            swal({
                                title: '結案成功！',
                                type: 'success',
                            }).then(function () {
                                location.reload();
                            })
                        } else {
                            swal({
                                title: '結案失敗！',
                                type: 'error',
                            })
                        }
                    },
                    error: function (e) {
                        console.log(e);
                    }
                });
            }

        });
    });
    //endregion

//endregion