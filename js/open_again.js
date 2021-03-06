//取得url id值region
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}
//endregion

//填入資料region
$(document).ready(function() {
    var phone_id = getUrlVars()["phone_id"];
    var face_id = getUrlVars()["face_id"];
    var num = getUrlVars()["num"];
    var date = getUrlVars()["date"];
    var times = getUrlVars()["times"];
    var assign = decodeURIComponent(getUrlVars()["assign"]);
    var name = decodeURIComponent(getUrlVars()["name"]);
    var gender = decodeURIComponent(getUrlVars()["gender"]);
    $("#face_id").html(face_id);
//    $("#open_id").html(open_id);
    $("#face_date").html(date);
    $("#face_num").html(times);
    $("#face_assign").html(assign);
    $("#name").html(name);
    $("#gender").html(gender);
            load_img();
            load_img2();
            load_PDF();
            load_PDF2();
            load_PDF3();
    
    //opne1 region
    $.ajax({
        url: "database/find_open_again1.php",
        type: "POST",
        data:{
            face_id:face_id,
            num:num
        },
        dataType: "JSON",
        async: false,//啟用同步請求
        success: function (data) {
//            console.log(data.open_id[0])
            $("#open_id").val(data.open_id[0]);
                //1-1
            if(data.with_face != ""){
                    $("#with_face").val(data.with_face[0]);                
                    $("#old_name").val(data.old_name[0]);
                    $("#dateFrom").val(data.birth_date[0]);
                    $("#age").val(data.age[0]);
                    $("#identity_card").val(data.identity_card[0]);
                    $("#height").val(data.height[0]);
                    $("#weight").val(data.weight[0]);
                    BMI();
                    $("#school").val(data.school[0]);
                    $("#skill").val(data.skill[0]);
                    $("#what_disabled").val(data.what_disabled[0]);
                    $("#what_aboriginal").val(data.what_aboriginal[0]);
                    $("#what_foreign").val(data.what_foreign[0]);
                    $("#what_rehabilitation").val(data.what_rehabilitation[0]);
                    $("#q1").val(data.q1[0]);
                    $("#shift").val(data.shift[0]);
                    $("#address").val(data.address[0]);
                    $("#live_address").val(data.live_address[0]);
                    $("#home_phone").val(data.home_phone[0]);
                    $("#personal_phone").val(data.personal_phone[0]);
                    $("#mc_name").val(data.mc_name[0]);
                    $("#mc_phone").val(data.mc_phone[0]);
                    $("#mc_hphone").val(data.mc_hphone[0]);
                    $("#mc_relationship").val(data.mc_relationship[0]);
                    $("#sc_name").val(data.sc_name[0]);
                    $("#sc_phone").val(data.sc_phone[0]);
                    $("#sc_hphone").val(data.sc_hphone[0]);
                    $("#sc_relationship").val(data.sc_relationship[0]);


                $("#twzipcode").twzipcode('set', {
                    'zipcode': data.city_zip[0]
                });
                $("#twzipcode2").twzipcode('set', {
                    'zipcode': data.live_zip[0]
                });
                if(data.live_or_not[0] !== ""){
                    $('input[name=live_or_not][value='+data.live_or_not[0]+']').attr('checked',true);
                }

                if(data.education_range[0] !== ""){
                    $('input[name=education_range][value='+data.education_range[0]+']').attr('checked',true);
                }
                if(data.change_name_or_not[0] !== ""){
                    $('input[name=change_name_or_not][value='+data.change_name_or_not[0]+']').attr('checked',true);
                }
                if(data.age_range[0] !== ""){
                    $('input[name=age_range][value='+data.age_range[0]+']').attr('checked',true);
                }
                if(data.blood[0] !== ""){
                    $('input[name=blood][value='+data.blood[0]+']').attr('checked',true);
                }
                if(data.belief[0] !== ""){
                    $('input[name=belief][value='+data.belief[0]+']').attr('checked',true);
                }
                if(data.disabled_or_not[0] !== ""){
                    $('input[name=disabled_or_not][value='+data.disabled_or_not[0]+']').attr('checked',true);
                }
                if(data.aboriginal_or_not[0] !== ""){
                    $('input[name=aboriginal_or_not][value='+data.aboriginal_or_not[0]+']').attr('checked',true);
                }
                if(data.foreign_or_not[0] !== ""){
                    $('input[name=foreign_or_not][value='+data.foreign_or_not[0]+']').attr('checked',true);
                }
                if(data.rehabilitation_or_not[0] !== ""){
                    $('input[name=rehabilitation_or_not][value='+data.rehabilitation_or_not[0]+']').attr('checked',true);
                }            
            }

        },
        
        error: function (e) {
                notyf.alert('伺服器錯誤,無法載入' + e);
         }
    });
    //endregion
    
    //open2 region
    $.ajax({
        url: "database/find_open_again2.php",
        type: "POST",
        data:{
            face_id:face_id,
            num:num
        },
        dataType: "JSON",
        async: false,//啟用同步請求
        success: function (data) {
                $("#q24").val(data.q24[0]);
                $("#q25").val(data.q25[0]);
                $("#q26").val(data.q26[0]);
                $("#q27").val(data.q27[0]);
                $("#q28").val(data.q28[0]);
                $("#q29").val(data.q29[0]);
                $("#q30").val(data.q30[0]);
                $("#q31").val(data.q31[0]);
                $("#q32").val(data.q32[0]);
                $("#q33").val(data.q33[0]);
                $("#q34").val(data.q34[0]);
                $("#what_violence").val(data.what_violence[0]);
                $("#q35").val(data.q35[0]);
                $("#suicide_why").val(data.suicide_why[0]);
                $("#q36").val(data.q36[0]);
                $("#q37").val(data.q37[0]);
                $("#what_morose").val(data.what_morose[0]);
                $("#q38").val(data.q38[0]);
                $("#what_no_power").val(data.what_no_power[0]);
                $("#q39").val(data.q39[0]);
                $("#what_very_morose").val(data.what_very_morose[0]);
                $("#q40").val(data.q40[0]);
                $("#q41").val(data.q41[0]);
                $("#what_receive_baptism").val(data.what_receive_baptism[0]);
                $("#q42").val(data.q42[0]);
                $("#q43").val(data.q43[0]);
                $("#q44").val(data.q44[0]);
                $("#q45").val(data.q45[0]);
                $("#q46").val(data.q46[0]);
                $("#q47").val(data.q47[0]);
                $("#q48").val(data.q48[0]);
                $("#q49").val(data.q49[0]);
                $("#q50").val(data.q50[0]);
                $("#q51").val(data.q51[0]);
                $("#q52").val(data.q52[0]);
                $("#q53").val(data.q53[0]);
                $("#q54").val(data.q54[0]);
                $("#q55").val(data.q55[0]);
                $("#q56").val(data.q56[0]);
                $("#q57").val(data.q57[0]);
                $("#q58").val(data.q58[0]);
                $("#q59").val(data.q59[0]);
                $("#q60").val(data.q60[0]);
                $("#q61").val(data.q61[0]);
            
                if(data.sports[0] !== ""){
                    $('input[name=sports][value='+data.sports[0]+']').attr('checked',true);
                }            
                if(data.use_support[0] !== ""){
                    $('input[name=use_support][value='+data.use_support[0]+']').attr('checked',true);
                }            
                if(data.spirit_sick[0] !== ""){
                    $('input[name=spirit_sick][value='+data.spirit_sick[0]+']').attr('checked',true);
                }            
                if(data.doctor_mdi[0] !== ""){
                    $('input[name=doctor_mdi][value='+data.doctor_mdi[0]+']').attr('checked',true);
                }            
                if(data.sicks[0] !== ""){
                    $('input[name=sicks][value='+data.sicks[0]+']').attr('checked',true);
                }            
                if(data.hospital[0] !== ""){
                    $('input[name=hospital][value='+data.hospital[0]+']').attr('checked',true);
                }            
                if(data.hurt[0] !== ""){
                    $('input[name=hurt][value='+data.hurt[0]+']').attr('checked',true);
                }            
                if(data.violence[0] !== ""){
                    $('input[name=violence][value='+data.violence[0]+']').attr('checked',true);
                }            
                if(data.suicide[0] !== ""){
                    $('input[name=suicide][value='+data.suicide[0]+']').attr('checked',true);
                }            
                if(data.suicide_experience[0] !== ""){
                    $('input[name=suicide_experience][value='+data.suicide_experience[0]+']').attr('checked',true);
                }            
                if(data.morose[0] !== ""){
                    $('input[name=morose][value='+data.morose[0]+']').attr('checked',true);
                }            
                if(data.no_power[0] !== ""){
                    $('input[name=no_power][value='+data.no_power[0]+']').attr('checked',true);
                }            
                if(data.very_morose[0] !== ""){
                    $('input[name=very_morose][value='+data.very_morose[0]+']').attr('checked',true);
                }            
                if(data.h_belief[0] !== ""){
                    $('input[name=h_belief][value='+data.h_belief[0]+']').attr('checked',true);
                }            
                if(data.receive_baptism[0] !== ""){
                    $('input[name=receive_baptism][value='+data.receive_baptism[0]+']').attr('checked',true);
                }            
                if(data.join_church[0] !== ""){
                    $('input[name=join_church][value='+data.join_church[0]+']').attr('checked',true);
                }  
            
                if($("input[name='h_belief']:checked").val() == "基督教"){
            //        $("#sd_status_tr").attr("hidden");
                    $("#q41_tr").attr("hidden",false);
                    $("#receive_baptism_tr").attr("hidden",false);
                    $("#join_church_tr").attr("hidden",false);
                }else{
                    $("#q41_tr").attr("hidden",true);
                    $("#receive_baptism_tr").attr("hidden",true);
                    $("#join_church_tr").attr("hidden",true);
                }
            
        },
        
        error: function (e) {
                notyf.alert('伺服器錯誤,無法載入' + e);
         }
    });
    //endregion
    
    //open3 region

            var face_id = getUrlVars()["face_id"];
            $.ajax({
                url: "database/find_open_again3.php",
                type: "POST",
                data: {
                    face_id: face_id,
                    num:num
                },
                dataType: "JSON",
                async: false, //啟用同步請求
                success: function (data) {
//                    console.log(data.expect_time[0],data.actual_time[0])
                    if(data.expect_time[0] != null || data.actual_time[0] != null){
                        var Arr = (data.expect_time[0]).split(":"); // 根据“-”分割
                        var Arr2 = (data.actual_time[0]).split(":"); // 根据“-”分割
                        var e_hour = Arr[0];
                        var e_min = Arr[1];
                        var a_hour = Arr2[0];
                        var a_min = Arr2[1];
                    }
                    
                    if(data.money[0] != ""){
                       $('input[name=money][value=' + data.money[0] + ']').attr('checked', true); 
                    }
                    if(data.expect_house[0] != ""){
                       $('input[name=expect_house][value=' + data.expect_house[0] + ']').attr('checked', true);
                    }
                    if(data.actual_house[0] != ""){
                       $('input[name=actual_house][value=' + data.actual_house[0] + ']').attr('checked', true);
                    }
                    
                    

                    $("#q62").val(data.q62[0]);
                    $("#q63").val(data.q63[0]);
                    $("#expect_house").val(data.expect_house[0]);
                    $("#dateFrom2").val(data.expect_date[0]);
                    if(data.expect_time[0] != null){
                        $("#hour").val(e_hour);
                        $("#min").val(e_min);
                    }
                    $("#q64").val(data.q64[0]);
                    $("#actual_house").val(data.actual_house[0]);
                    $("#dateFrom3").val(data.actual_date[0]);
                    if(data.actual_time[0] != null){
                        $("#true_hour").val(a_hour);
                        $("#true_min").val(a_min);
                    }

                },

                error: function (e) {
                    //                notyf.alert('伺服器錯誤,無法載入' + e);
                    console.log(e)
                }
            });
    //endregion
    
    //入園應備資料 region
    $.ajax({
        url: "database/find_prepare.php",
        type: "POST",
        data:{
            face_id:face_id,
            num:num
        },
        dataType: "JSON",
        async: false,//啟用同步請求
        success: function (data) {
            $('input[name=o_OK][value='+data.o_OK[0]+']').attr('checked',true); 
            $('input[name=e_OK][value='+data.e_OK[0]+']').attr('checked',true); 
            $('input[name=f_OK][value='+data.f_OK[0]+']').attr('checked',true); 
            $('input[name=head_OK][value='+data.head_OK[0]+']').attr('checked',true); 
            $('input[name=q_OK][value='+data.q_OK[0]+']').attr('checked',true); 
            $('input[name=a_OK][value='+data.a_OK[0]+']').attr('checked',true); 
            $('input[name=si_OK][value='+data.si_OK[0]+']').attr('checked',true); 
            $('input[name=h_OK][value='+data.h_OK[0]+']').attr('checked',true); 
            $('input[name=b_OK][value='+data.b_OK[0]+']').attr('checked',true); 
            $('input[name=c_OK][value='+data.c_OK[0]+']').attr('checked',true); 
            $('input[name=ho_OK][value='+data.ho_OK[0]+']').attr('checked',true); 
            $('input[name=i_OK][value='+data.i_OK[0]+']').attr('checked',true); 
            $('input[name=he_OK][value='+data.he_OK[0]+']').attr('checked',true); 
            $('input[name=g_OK][value='+data.g_OK[0]+']').attr('checked',true); 
            $('input[name=cl_OK][value='+data.cl_OK[0]+']').attr('checked',true); 
            $("#o_detail").val(data.o_detail[0]);
            $("#e_detail").val(data.e_detail[0]);
            $("#f_detail").val(data.f_detail[0]);
            $("#head_detail").val(data.head_detail[0]);
            $("#q_detail").val(data.q_detail[0]);
            $("#a_detail").val(data.a_detail[0]);
            $("#si_detail").val(data.si_detail[0]);
            $("#h_detail").val(data.h_detail[0]);
            $("#b_detail").val(data.b_detail[0]);
            $("#c_detail").val(data.c_detail[0]);
            $("#ho_detail").val(data.ho_detail[0]);
            $("#i_detail").val(data.i_detail[0]);
            $("#he_detail").val(data.he_detail[0]);
            $("#g_detail").val(data.g_detail[0]);
            $("#cl_detail").val(data.cl_detail[0]);
        },
        
        error: function (e) {
//                notyf.alert('伺服器錯誤,無法載入' + e);
            console.log(e)
         }
    });
    //endregion
    
//endregion
    
//BMI計算region
$('.bmi').on('keyup change', function () {
    BMI();
});
    
function BMI(){
    var BMI = $("#weight").val() / (($("#height").val()*$("#height").val())/10000);
//    console.log(BMI.toFixed(1))
    $("#BMI").html(BMI.toFixed(1))
}
//endregion

//年齡計算region
//$("#age").html("");
$("#dateFrom").on('change',function(){
    age();
});
    function age(){
        
        ymd = ($("#dateFrom").val()).split("-");
        bir_y=ymd[0];
        bir_m=ymd[1];
        bir_d=ymd[2];
//        console.log(bir_y)
        date = new Date();
        bir = (date.getFullYear()-1911)-bir_y;
//        console.log(bir)
        if(bir_m == "01" || bir_m == "02" ||bir_m == "03" ||bir_m == "04" ||bir_m == "05" ||bir_m == "06" ||bir_m == "07" ||bir_m == "08" || bir_m == "09"){
            x = bir_m.split("0");
            bir_m = parseInt(x[1]);
        }
        if(bir_d == "01" || bir_d == "02" ||bir_d == "03" ||bir_d == "04" ||bir_d == "05" ||bir_d == "06" ||bir_d == "07" ||bir_d == "08" || bir_d == "09"){
            x = bir_d.split("0");
            bir_d = parseInt(x[1]);
        }
    //    console.log(date.getMonth()+1)

        if(bir_m < date.getMonth()+1){
            $("#age").val(bir);
        }else if(bir_m == date.getMonth()+1){
            if(bir_d <= date.getDay()){
                $("#age").val(bir);
            }else{
                $("#age").val(bir-1);
            }
        }else{
            $("#age").val(bir-1);
        }
    }
//endregion
    
//預覽照片(未開放)region
//function readURL(input){
//
//  if(input.files && input.files[0]){
//
//    var imageTagID = input.getAttribute("targetID");
//
//    var reader = new FileReader();
//
//    reader.onload = function (e) {
//
//       var img = document.getElementById(imageTagID);
//
//       img.setAttribute("src", e.target.result)
//
//    }
//
//    reader.readAsDataURL(input.files[0]);
//
//  }
//
//}
//endregion

//大頭照上傳顯示region
    //按下上傳(大頭照)region
    $('#btn-upload4').on('click',function(){
    var form_data = new FormData($('#upload-file4')[0]);
    var face_id = getUrlVars()["face_id"];
    var num = getUrlVars()["num"];
    form_data.append('face_id', face_id);
    form_data.append('num', num);   
    //    console.log(form_data)

        $.ajax({
            type:'POST',
            url:'database/upload_head.php',
            data:form_data,
            processData: false,
            contentType:false,
            cache:false,
            processData:false,
            async:true,
            success: function (data) {
    //            console.log(data)
                if(data == 11|| data == 1){
                    swal({
                        title:'上傳成功！',
                        type:'success',                        
                    }).then(function(){
                        load_img2();
                    }) 
                }else{
    //                console.log(data)
                    swal({
                        title:'上傳失敗！請聯絡負責單位',
                        type:'error',
                    })
                }
            },
        });
    });
    //endregion

    //顯示個案體大頭照region
    function load_img2(){
        var face_id = getUrlVars()["face_id"];
        var num = getUrlVars()["num"];
        $.ajax({
            url: "database/load_head.php",
            type: "POST",
            data:{
                face_id:face_id,
                num:num
            },
            dataType: "JSON",
            async: false,//啟用同步請求
            success: function (data) {
    //            console.log(data.path[0]);
                $("#preview_progressbarTW_img").attr('src',data.path[0]);
//                console.log(data.path[0])
            },

            error: function (e) {
                    notyf.alert('伺服器錯誤,無法載入' + e);
             }
        });
    }
    //endregion
//endregion

//個案精神報告圖片上傳顯示region

    //按下上傳(精神報告圖片)region
    $('#btn-upload').on('click',function(){
    var form_data = new FormData($('#upload-file')[0]);
    //form_data.append('file[]',file1);
    //form_data.append('file[]',file2); 
    //    console.log(form_data)
    var face_id = getUrlVars()["face_id"];
    var num = getUrlVars()["num"];        
    form_data.append('face_id', face_id);
    form_data.append('num', num);

        $.ajax({
            type:'POST',
            url:'database/upload.php',
            data:form_data,
            processData: false,
            contentType:false,
            cache:false,
            processData:false,
            async:true,
            success: function (data) {
    //            console.log(data)
                if(data == 11|| data == 1){
                    swal({
                        title:'上傳成功！',
                        type:'success',                        
                    }).then(function(){
                        load_img();                        
                    }) 
                }else{
                    console.log(data)
                    swal({
                        title:'上傳失敗！請聯絡負責單位',
                        type:'error',
                    })
                }
            },
        });
    });
    //endregion

    //顯示個案體檢精神報告圖片region
    function load_img(){
        var face_id = getUrlVars()["face_id"];
        var num = getUrlVars()["num"];
        $.ajax({
            url: "database/load_img.php",
            type: "POST",
            data:{
                face_id:face_id,
                num:num
            },
            dataType: "JSON",
            async: false,//啟用同步請求
            success: function (data) {
    //            console.log(data.path[0]);
                $("#preview_progressbarTW_img2").attr('src',data.path[0]);
            },

            error: function (e) {
                    notyf.alert('伺服器錯誤,無法載入' + e);
             }
        });
    }
    //endregion

//endregion

//個案體檢PDF上傳顯示region

    //按下上傳(個案體檢PDF)region
$('#btn-upload2').on('click',function(){
var form_data = new FormData($('#upload-file2')[0]);
//form_data.append('file[]',file1);
//form_data.append('file[]',file2); 
//    console.log(form_data)
var face_id = getUrlVars()["face_id"];
var num = getUrlVars()["num"];
form_data.append('num', num);
form_data.append('face_id', face_id);
//    console.log(form_data)
    
    $.ajax({
        type:'POST',
        url:'database/upload.php',
        data:form_data,
		processData: false,
        contentType:false,
        cache:false,
        processData:false,
        async:true,
        success: function (data) {
//            console.log(data)
            if(data == 11|| data == 1){
                swal({
                    title:'上傳成功！',
                    type:'success',                        
                }).then(function(){
                    load_PDF();
                }) 
            }else{
                swal({
                    title:'上傳失敗！請聯絡負責單位',
                    type:'error',
                })
            }
        },
    });
});
//endregion

    //顯示個案體檢PDF region
    function load_PDF(){
        var face_id = getUrlVars()["face_id"];
        var num = getUrlVars()["num"];
        $.ajax({
            url: "database/load_pdf.php",
            type: "POST",
            data:{
                face_id:face_id,
                num:num
            },
            dataType: "JSON",
            async: false,//啟用同步請求
            success: function (data) {

                $('#pdf_preview').media(
                {
                  width : '1500px',
                  height : '1000px',
                  autoplay : true,
                  src : data.path[0],
                });
            },

            error: function (e) {
                    notyf.alert('伺服器錯誤,無法載入' + e);
             }
        });
    }

    //endregion
});
//endregion

//個案住院戒斷PDF上傳顯示region

    //按下上傳(個案住院戒斷PDF)region
$('#btn-upload6').on('click',function(){
var form_data = new FormData($('#upload-file6')[0]);
//form_data.append('file[]',file1);
//form_data.append('file[]',file2); 
//    console.log(form_data)
var face_id = getUrlVars()["face_id"];
var num = getUrlVars()["num"];

form_data.append('num', num);
form_data.append('face_id', face_id);
//    console.log(form_data)
    
    $.ajax({
        type:'POST',
        url:'database/upload_hospital.php',
        data:form_data,
		processData: false,
        contentType:false,
        cache:false,
        processData:false,
        async:true,
        success: function (data) {
//            console.log(data)
            if(data == 11|| data == 1){
                swal({
                    title:'上傳成功！',
                    type:'success',                        
                }).then(function(){
                    load_PDF3();
                }) 
            }else{
                swal({
                    title:'上傳失敗！請聯絡負責單位',
                    type:'error',
                })
            }
        },
    });
});
//endregion

    //顯示個案住院戒斷PDF region
    function load_PDF3(){
        var face_id = getUrlVars()["face_id"];
        var num = getUrlVars()["num"];
        $.ajax({
            url: "database/load_hospital.php",
            type: "POST",
            data:{
                face_id:face_id,
                num:num
            },
            dataType: "JSON",
            async: false,//啟用同步請求 
            success: function (data) {

                $('#pdf_preview3').media(
                {
                  width : '1500px',
                  height : '1000px',
                  autoplay : true,
                  src : data.path[0],
                });
            },

            error: function (e) {
                    notyf.alert('伺服器錯誤,無法載入' + e);
             }
        });
    }

    //endregion

//endregion
    
//個案入園應備資料上傳顯示region

    //入住檢查PDF上傳region
    $('#btn-upload3').on('click',function(){
    var form_data = new FormData($('#upload-file3')[0]);
    //form_data.append('file[]',file1);
    //form_data.append('file[]',file2); 
    //    console.log(form_data)
    var face_id = getUrlVars()["face_id"];
    var num = getUrlVars()["num"];
    form_data.append('face_id', face_id);
    form_data.append('num', num);
    //    console.log(form_data)

        $.ajax({
            type:'POST',
            url:'database/upload_check.php',
            data:form_data,
            processData: false,
            contentType:false,
            cache:false,
            processData:false,
            async:true,
            success: function (data) {
    //            console.log(data)
                if(data == 11|| data == 1){
                    swal({
                        title:'上傳成功！',
                        type:'success',                        
                    }).then(function(){
                        load_PDF2();
                    }) 
                }else{
                    swal({
                        title:'上傳失敗！請聯絡負責單位',
                        type:'error',
                    })
                }
            },
        });
    });
    //endregion

    //顯示個案入村資料PDF region
    function load_PDF2(){
        var face_id = getUrlVars()["face_id"];
        var num = getUrlVars()["num"];
        $.ajax({
            url: "database/load_livepdf.php",
            type: "POST",
            data:{
                face_id:face_id,
                num:num
            },
            dataType: "JSON",
            async: false,//啟用同步請求
            success: function (data) {

                $('#pdf_preview2').media(
                {
                  width : '1500px',
                  height : '1000px',
                  autoplay : true,
                  src : data.path[0],
                });
            },

            error: function (e) {
                    notyf.alert('伺服器錯誤,無法載入' + e);
             }
        });
    }
    //endregion

//endregion

//審核通過新增至在園一覽表region
$("#add_four").on('click',function(){
    $("#OK").modal('show'); 
});
$("#ann_cancel").on('click',function(){
    $("#remark").val(""); 
});
$("#add_new_four").on('click',function(){                 
    var id = getUrlVars()["phone_id"];
    var face_id = getUrlVars()["face_id"];
    var num = getUrlVars()["num"];
    var actual_house = $("input[name='actual_house']:checked").val();
    var addition = $("input[name='addiction_types[]']:checked").val();
    //預計階段結束日期region
    var TimeNow= new Date();
    var date1 = new Date($("#dateFrom3").val());
    var today = TimeNow.getFullYear()+"-"+('0'+(TimeNow.getMonth()+1)).substr(-2)+"-"+('0'+TimeNow.getDate()).substr(-2);
//    var date2 =  new Date($("#leave").val());
//    var timeDiff = Math.abs(date2.getTime() - date1.getTime());
//    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    date_y = date1.getFullYear()+1911;
    date_m = (date1.getMonth()+1);
    date_d =date1.getDate();
    
    CE_date = date_y+'-'+('0'+date_m).substr(-2)+'-'+('0'+date_d).substr(-2);
    if((date_m+3) > 12){
        date_m = (date_m+3)-12;
        date_y = date_y+1;
        var stage1 = date_y+"-"+('0'+date_m).substr(-2)+"-"+('0'+date_d).substr(-2);
    }else{
        date_m = (date_m+3);
        date_y = date_y;
        var stage1 = date_y+"-"+('0'+date_m).substr(-2)+"-"+('0'+date_d).substr(-2);
    }     
        
    if((date_m+3) > 12){
        date_m = (date_m+3)-12;
        date_y = date_y+1;
        var stage2 = date_y+"-"+('0'+date_m).substr(-2)+"-"+('0'+date_d).substr(-2);
    }else{
        date_m = (date_m+3);
        date_y = date_y;
        var stage2 = date_y+"-"+('0'+date_m).substr(-2)+"-"+('0'+date_d).substr(-2);
    }    
    if((date_m+6) > 12){
        date_m = (date_m+6)-12;
        date_y = date_y+1;
        var stage3 = date_y+"-"+('0'+date_m).substr(-2)+"-"+('0'+date_d).substr(-2);
    }else{
        date_m = (date_m+6);
        date_y = date_y;
        var stage3 = date_y+"-"+('0'+date_m).substr(-2)+"-"+('0'+date_d).substr(-2);
    } 
    if((date_m+6) > 12){
        date_m = (date_m+6)-12;
        date_y = date_y+1;
        var stage4 = date_y+"-"+('0'+date_m).substr(-2)+"-"+('0'+date_d).substr(-2);
    }else{
        date_m = (date_m+6);
        date_y = date_y;
        var stage4 = date_y+"-"+('0'+date_m).substr(-2)+"-"+('0'+date_d).substr(-2);
    } 
    
    if(Date.parse(today,10) < Date.parse(stage1)){
        var fstage = "第一階段";
    }else if(Date.parse(today,10) < Date.parse(stage2)){
        var fstage ="第二階段";
    }else if(Date.parse(today,10) < Date.parse(stage3)){
        var fstage ="第三階段";
    }else{
        var fstage ="第四階段";
    }
    //endregion
    
    
        //審核(未完成)region
//        $.ajax({
//            url: "database/review.php",
//            type: "POST",
//            data:{
//                num:num,
//                face_id:face_id,
//                name:$("#name").text(),
//            },
//            dataType: "JSON",
//            async: false,//啟用同步請求
//            success: function (data) {
//            },
//
//            error: function (e) {
//                    console.log(e);
//             }
//        });
    //endregion

    $.ajax({
        url: "database/add_new_four.php",
        type: "POST",
        data:{
            face_id:face_id,
//            open_id:$("#open_id").val(),
            name:$("#name").text(),
            gender:$("#gender").text(),
            stage1:stage1,
            stage2:stage2,
            stage3:stage3,
            stage4:stage4,
            stage:fstage,
            date:CE_date,
            house:actual_house,
            age:$("#age").val(),
            addition:addition,
            remark:$("#remark").val()
        },
        async: false,//啟用同步請求
        success: function (data) {
//            console.log(data)
            if(data == 1){
                swal({
                    title:'新增成功！',
                    type:'success',                        
                }).then(function(){
                    location.reload();
                }) 
            }else{
                console.log(data)
                swal({
                    title:'審核失敗！請聯絡負責單位',
                    type:'error',
                })
            }
        },
        
        error: function (e) {
                notyf.alert('伺服器錯誤,無法載入' + e);
         }
    });
    
    //新增戒治者問卷總表(未完成)region

//    $.ajax({
//        url: "database/add_new_daily_life_a.php",
//        type: "POST",
//        data:{
//            id:id,
//            face_id:face_id,
//            name:$("#name").text(),
//            gender:$("#gender").text(),
//            age:$("#age").text(),
//            address:$("#address").val(),
//            use_addition:addition,
//            addition:m_addition[0],
////            gender:$("#gender").text(),
//        },
//        async: false,//啟用同步請求
//        success: function (data) {
////            console.log(data)
//
//        },
//        
//        error: function (e) {
//                notyf.alert('伺服器錯誤,無法載入' + e);
//         }
//    });
    //endregion

});
//endregion

//新增開案表1 region
$('#open1').on('click',function(){
    var face_id = getUrlVars()["face_id"];
    var phone_id = getUrlVars()["phone_id"];
    var num = getUrlVars()["num"];
    var change_name_or_not = $("input[name='change_name_or_not']:checked").val();
    var age_range = $("input[name='age_range']:checked").val();
    var blood = $("input[name='blood']:checked").val();
    var education_range = $("input[name='education_range']:checked").val();
    var disabled_or_not = $("input[name='disabled_or_not']:checked").val();
    var aboriginal_or_not = $("input[name='aboriginal_or_not']:checked").val();
    var foreign_or_not = $("input[name='foreign_or_not']:checked").val();
    var live_or_not =$("input[name='live_or_not']:checked").val();
    var rehabilitation_or_not = $("input[name='rehabilitation_or_not']:checked").val();
    var debt_or_not = $("input[name='debt_or_not']:checked").val();
    var gang_or_not = $("input[name='gang_or_not']:checked").val();
    var sd_status = $("input[name='sd_status']:checked").val();
    var communion_or_not = $("input[name='communion_or_not']:checked").val();
    var communion_live = $("input[name='communion_live']:checked").val();
    var bs_status = $("input[name='bs_status']:checked").val();
    var contact_range = $("input[name='contact_range']:checked").val();
    var use_range = $("input[name='use_range']:checked").val();
    var change_addition_or_not = $("input[name='change_addition_or_not']:checked").val();
    var month_use = $("input[name='month_use']:checked").val();
    var abs_long_range = $("input[name='abs_long_range']:checked").val();
//    var where_abs_range = $("input[name='where_abs_range']:checked").val();
    var mf_status = $("input[name='mf_status']:checked").val();
    var mf_or_not = $("input[name='mf_or_not']:checked").val();
    var withlive_interactive = $("input[name='withlive_interactive']:checked").val();
    var communion_or_not = $("input[name='communion_or_not']:checked").val();


    var zip = $("#twzipcode").twzipcode('get', 'zipcode');
    var live_zip = $("#twzipcode2").twzipcode('get', 'zipcode');
//    console.log(zip)
//    console.log($("input[name='faith_detail']:checked").val())
    if($("input[name='belief']:checked").val() == "其它"){
        belief = $("#belief_other").val();
    }else{
        belief = $("input[name='belief']:checked").val();
    }
    
    if($("input[name='status']:checked").val() == "其他"){
        status = $("#status_other").val();
    }else{
        status = $("input[name='status']:checked").val();
    }
    
    if($("input[name='sd_status']:checked").val() == "其他"){
        sd_status = $("#sd_status_other").val();
    }else{
        sd_status = $("input[name='sd_status']:checked").val();
    }
    
    if($("input[name='sd_interactive']:checked").val() == "其他"){
        sd_interactive = $("#sd_interactive_other").val();
    }else{
        sd_interactive = $("input[name='sd_interactive']:checked").val();
    }
    
    if($("input[name='communion_interactive']:checked").val() == "其他"){
        communion_interactive = $("#communion_interactive_other").val();
    }else{
        communion_interactive = $("input[name='communion_interactive']:checked").val();
    }
    
    if($("input[name='bs_interactive']:checked").val() == "其他"){
        bs_interactive = $("#bs_interactive_other").val();
    }else{
        bs_interactive = $("input[name='bs_interactive']:checked").val();
    }
    

    
    var addiction_three={};//创建一个空对象
    $('input[name^="addiction_three"]:checked').each(function(index,element){	//index下标 element 当前选中的元素
        if($(this).val()=="其他"){
            addiction_three[index] = $("#addiction_three_other").val();
        }else{
            addiction_three[index] = $(this).val();//压入对象数组
        }
    });
    
    var addiction_types={};//创建一个空对象
    $('input[name^="addiction_types"]:checked').each(function(index,element){	//index下标 element 当前选中的元素
        if($(this).val()=="其它"){
            addiction_types[index] = $("#addiction_types_other").val();
        }else{
            addiction_types[index] = $(this).val();//压入对象数组
        }
    });
    
    var addiction_cause={};//创建一个空对象
    $('input[name^="addiction_cause"]:checked').each(function(index,element){
        if($(this).val()=="其他"){
            addiction_cause[index] = $("#addiction_cause_other").val();
        }else{
            addiction_cause[index] = $(this).val();//压入对象数组
        }
    });
    
    var addiction_fail={};//创建一个空对象
    $('input[name^="addiction_fail"]:checked').each(function(index,element){
        if($(this).val()=="其它"){
            addiction_fail[index] = $("#addiction_fail_other").val();
        }else{
            addiction_fail[index] = $(this).val();//压入对象数组
        }
    });
    
    var help_range={};//创建一个空对象
    $('input[name^="help_range"]:checked').each(function(index,element){	//index下标 element 当前选中的元素
        if($(this).val() == "其他"){
            help_range[index] = $("#help_range_other").val();
        }else{
            help_range[index] = $(this).val();//压入对象数组
        }
    });
    
    var where_abs_range={};//创建一个空对象
    $('input[name^="where_abs_range"]:checked').each(function(index,element){	//index下标 element 当前选中的元素
        if($(this).val() == "其它"){
            where_abs_range[index] = $("#where_abs_range_other").val();
        }else{
            where_abs_range[index] = $(this).val();//压入对象数组
        }
    });
    //add_open1
    $.ajax({
            type:'POST',
            url:'database/add_open_again1.php',
//            dataType: "JSON",
            data:{
                //1-1
                num:num,
                face_id:face_id,
                phone_id:phone_id,
                open_id:$("#open_id").text(),
                face_place:$("#face_place").text(),
                face_assign:$("#face_assign").text(),
                with_face:$("#with_face").val(),
                change_name_or_not:change_name_or_not,
                old_name:$("#old_name").val(),
                birth_date:$("#dateFrom").val(),
                age:$("#age").val(),
                age_range:age_range,
                identity_card:$("#identity_card").val(),
                height:$("#height").val(),
                weight:$("#weight").val(),
                blood:blood,
                belief:belief,
                school:$("#school").val(),
                education_range:education_range,
                skill:$("#skill").val(),
                disabled_or_not:disabled_or_not,
                what_disabled:$("#what_disabled").val(),
                aboriginal_or_not:aboriginal_or_not,
                what_aboriginal:$("#what_aboriginal").val(),
                foreign_or_not:foreign_or_not,
                what_foreign:$("#what_foreign").val(),
                rehabilitation_or_not:rehabilitation_or_not,
                what_rehabilitation:$("#what_rehabilitation").val(),
                q1:$("#q1").val(),
                shift:$("#shift").val(),
                city_zip:zip[0],
                address:$("#address").val(),
                live_zip:live_zip[0],
                live_or_not:live_or_not,
                live_address:$("#live_address").val(),
                home_phone:$("#home_phone").val(),
                personal_phone:$("#personal_phone").val(),
                mc_name:$("#mc_name").val(),
                mc_phone:$("#mc_phone").val(),
                mc_hphone:$("#mc_hphone").val(),
                mc_relationship:$("#mc_relationship").val(),
                sc_name:$("#sc_name").val(),
                sc_phone:$("#sc_phone").val(),
                sc_hphone:$("#sc_hphone").val(),
                sc_relationship:$("#sc_relationship").val(),

            },
            success: function (data) {
                if(data == 1){
                    swal({
                        title:'儲存成功！',
                        type:'success',                        
                    }).then(function(){
                        location.reload();
                    }) 
                }else{
                    console.log(data)
                    swal({
                        title:'上傳失敗！請聯絡負責單位',
                        type:'error',
                    })
                }
            },
        });
});
//endregion
    
//新增開案表2 region
$('#open2').on('click',function(){
    var face_id = getUrlVars()["face_id"];
    var phone_id = getUrlVars()["phone_id"];
    var num = getUrlVars()["num"];
    var violence = $("input[name='violence']:checked").val();
    var suicide = $("input[name='suicide']:checked").val();
    var suicide_experience = $("input[name='suicide_experience']:checked").val();
    var morose = $("input[name='morose']:checked").val();
    var no_power = $("input[name='no_power']:checked").val();
    var very_morose = $("input[name='very_morose']:checked").val();
    var receive_baptism = $("input[name='receive_baptism']:checked").val();
    var join_church = $("input[name='join_church']:checked").val();
    var sports = $("input[name='sports']:checked").val();
    var use_support = $("input[name='use_support']:checked").val();
    var doctor_mdi = $("input[name='doctor_mdi']:checked").val();
    var sicks = $("input[name='sicks']:checked").val();
    var hospital = $("input[name='hospital']:checked").val();
    var hurt = $("input[name='hurt']:checked").val();
    var spirit_sick = $("input[name='spirit_sick']:checked").val();
    
    if($("input[name='h_belief']:checked").val() == "其他"){
        h_belief = $("#h_belief_other").val();
    }else{
        h_belief = $("input[name='h_belief']:checked").val();
    }
//    console.log(face_id,phone_id)
    $.ajax({
            type:'POST',
            url:'database/add_open_again2.php',
//            dataType: "JSON",
            data:{
                //1-1
                num:num,
                face_id:face_id,
                phone_id:phone_id,
                open_id:$("#open_id").text(),
                sports:sports,
                q24:$("#q24").val(),
                q25:$("#q25").val(),
                use_support:use_support,
                q26:$("#q26").val(),
                spirit_sick:spirit_sick,
                q27:$("#q27").val(),
                doctor_mdi:doctor_mdi,
                q28:$("#q28").val(),
                sicks:sicks,
                q29:$("#q29").val(),
                hospital:hospital,
                q30:$("#q30").val(),
                hurt:hurt,
                q31:$("#q31").val(),
                q32:$("#q32").val(),
                q33:$("#q33").val(),
                q34:$("#q34").val(),
                violence:violence,
                what_violence:$("#what_violence").val(),
                q35:$("#q35").val(),
                suicide:suicide,
                suicide_why:$("#suicide_why").val(),
                q36:$("#q36").val(),
                suicide_experience:suicide_experience,
                q37:$("#q37").val(),
                morose:morose,
                what_morose:$("#what_morose").val(),
                q38:$("#q38").val(),
                no_power:no_power,
                what_no_power:$("#what_no_power").val(),
                q39:$("#q39").val(),
                very_morose:very_morose,
                what_very_morose:$("#what_very_morose").val(),
                q40:$("#q40").val(),
                h_belief:h_belief,
                q41:$("#q41").val(),
                receive_baptism:receive_baptism,
                what_receive_baptism:$("#what_receive_baptism").val(),
                q42:$("#q42").val(),
                join_church:join_church,
                q43:$("#q43").val(),
                q44:$("#q44").val(),
                q45:$("#q45").val(),
                q46:$("#q46").val(),
                q47:$("#q47").val(),
                q48:$("#q48").val(),
                q49:$("#q49").val(),
                q50:$("#q50").val(),
                q51:$("#q51").val(),
                q52:$("#q52").val(),
                q53:$("#q53").val(),
                q54:$("#q54").val(),
//                q55:$("#q55").val(),
                q56:$("#q56").val(),
                q57:$("#q57").val(),
                q58:$("#q58").val(),
                q59:$("#q59").val(),
                q60:$("#q60").val(),
                q61:$("#q61").val(),
                
            },
            success: function (data) {
                console.log(data)
                if(data == 1){
                    swal({
                        title:'儲存成功！',
                        type:'success',                        
                    }).then(function(){

                    }) 
                }else{

                    swal({
                        title:'上傳失敗！請聯絡負責單位',
                        type:'error',
                    }).then(function(){

                    }) 
                }
            },
            error:function(e){
                console.log(data)
            }
        });
});
//endregion
    
//新增開案表3 region
$('#open3').on('click',function(){
    var face_id = getUrlVars()["face_id"];
    var phone_id = getUrlVars()["phone_id"];
    var num = getUrlVars()["num"];
    var money = $("input[name='money']:checked").val();
    var expect_house = $("input[name='expect_house']:checked").val();
    var expect_time = $("#hour").val()+':'+$("#min").val();
    var actual_house = $("input[name='actual_house']:checked").val();
    var actual_time = $("#true_hour").val()+':'+$("#true_min").val();
    
        $.ajax({
            type:'POST',
            url:'database/add_open_again3.php',
            data:{
                num:num,
                face_id:face_id,
                phone_id:phone_id,
                open_id:$("#open_id").val(),
                money:money,
                q62:$("#q62").val(),
                q63:$("#q63").val(),
                expect_house:expect_house,
                expect_date:$("#dateFrom2").val(),
                expect_time:expect_time,
                q64:$("#q64").val(),
                actual_house:actual_house,
                actual_date:$("#dateFrom3").val(),
                actual_time:actual_time,
            },
            success: function (data) {
                console.log(data)
                if(data == 1){
                    swal({
                        title:'儲存成功！',
                        type:'success',                        
                    }).then(function(){
                        
                    }) 
                }else{
    //                console.log(data)
                    swal({
                        title:'上傳失敗！請聯絡負責單位',
                        type:'error',
                    })
                }
            },
            error: function(e){
                console.log(e)
            }
        });
    
    //add_review region

    var stage = $("input[name='stage']:checked").val();
//        console.log(stage)
    if(stage != null && $("#department").val() != null && $("#user").val() != null){
        $.ajax({
            type:'POST',
            url:'database/add_review_again.php',
            data:{
                num:num,
                face_id:face_id,
                q65:$("#q65").val(),
                q66:$("#q66").val(),
                q67:$("#q67").val(),
                q68:$("#q68").val(),
                stage:stage,
                q69:$("#q69").val(),
                q70:$("#q70").val(),
                q71:$("#q71").val(),
                send_department:$("#department").val(),
                send_user:$("#user").val(),
                ok_or_not:$("#ok_or_not").val()
            },
            success: function (data) {
                console.log(data)
                if(data == 1){
                    swal({
                        title:'儲存成功！',
                        type:'success',                        
                    }).then(function(){
                        
                    }) 
                }else{
    //                console.log(data)
                    swal({
                        title:'儲存失敗！請聯絡負責單位',
                        type:'error',
                    })
                }
            },
            error: function(e){
                console.log(e)
            }
        });
    }
    //endregion
    
});
//endregion

//新增入園應備資料 region
$('#live_store').on('click',function(){
    var face_id = getUrlVars()["face_id"];
    var phone_id = getUrlVars()["phone_id"];
    var num = getUrlVars()["num"];
    var o_OK = $("input[name='o_OK']:checked").val();
    var e_OK = $("input[name='e_OK']:checked").val();
    var f_OK = $("input[name='f_OK']:checked").val();
    var head_OK = $("input[name='head_OK']:checked").val();
    var q_OK = $("input[name='q_OK']:checked").val();
    var a_OK = $("input[name='a_OK']:checked").val();
    var si_OK = $("input[name='si_OK']:checked").val();
    var h_OK = $("input[name='h_OK']:checked").val();
    var b_OK = $("input[name='b_OK']:checked").val();
    var c_OK = $("input[name='c_OK']:checked").val();
    var ho_OK = $("input[name='ho_OK']:checked").val();
    var i_OK = $("input[name='i_OK']:checked").val();
    var he_OK = $("input[name='he_OK']:checked").val();
    var g_OK = $("input[name='g_OK']:checked").val();
    var cl_OK = $("input[name='cl_OK']:checked").val();

        $.ajax({
            type:'POST',
            url:'database/add_prepare.php',
            data:{
                face_id:face_id,
                phone_id:phone_id,
                num:num,
                o_OK:o_OK,
                e_OK:e_OK,
                f_OK:f_OK,
                head_OK:head_OK,
                q_OK:q_OK,
                a_OK:a_OK,
                si_OK:si_OK,
                h_OK:h_OK,
                b_OK:b_OK,
                c_OK:c_OK,
                ho_OK:ho_OK,
                i_OK:i_OK,
                he_OK:he_OK,
                g_OK:g_OK,
                cl_OK:cl_OK,
                o_detail:$("#o_detail").val(),
                e_detail:$("#e_detail").val(),
                f_detail:$("#f_detail").val(),
                head_detail:$("#head_detail").val(),
                q_detail:$("#q_detail").val(),
                a_detail:$("#a_detail").val(),
                si_detail:$("#si_detail").val(),
                h_detail:$("#h_detail").val(),
                b_detail:$("#b_detail").val(),
                c_detail:$("#c_detail").val(),
                ho_detail:$("#ho_detail").val(),
                i_detail:$("#i_detail").val(),
                he_detail:$("#he_detail").val(),
                g_detail:$("#g_detail").val(),
                cl_detail:$("#cl_detail").val()
                
            },
            success: function (data) {
                if(data == 1){
                    swal({
                        title:'儲存成功！',
                        type:'success',                        
                    }).then(function(){
                        
                    }) 
                }else{
    //                console.log(data)
                    swal({
                        title:'上傳失敗！請聯絡負責單位',
                        type:'error',
                    })
                }
            },
        });
});
//endregion

//入園審核(新增評估)region
var face_id = getUrlVars()["face_id"];
var num = getUrlVars()["num"];
        $.ajax({
            type:'POST',
            url:'database/find_review_again.php',
            data:{
                face_id:face_id,
                num:num
            },
            dataType: "JSON",
            async: false,//啟用同步請求
            success: function (data) {
                var cssString5 = "";
                for (var index in data.id) {
                    if(data.job[index] == "社工"){
                        cssString5 +=
                            '<tr>' +
                                '<td style="text-align:center" colspan="2">一般會談工作人員 '+data.write_user[index]+' 評估(第一層級)</td>' +
                            '</tr>' +
                            '<tr>' +
                                '<td class="text-right" rowspan="7">綜合評估內容</td>' +
                                '<td>' +
            //                        '<input id="OK" name="" style="zoom:1.5;" value="" type="radio">' +
                                    '送給下一層級：'+
                                    '<select class="department" id="department'+data.id[index]+'" disabled>'+
                                         '<option value="" disabled selected hidden>請選擇部門</option>'+
                                    '</select>'+
                                    ' '+
                                    '<select  id="department'+data.id[index]+'user" disabled>'+
                                         '<option value="" disabled selected hidden>請選擇審核人</option>'+
                                    '</select>'+                    
                                '</td>' +
                            '</tr>' +
                            '<tr>' +
                                '<td>' +
                                    '身體層面：' +
                                    '<br>' +
                                    '<textarea id="q65'+data.id[index]+'" style="width:100%;height:120px" placeholder="請簡單摘要敘述" disabled>'+data.q65[index]+'</textarea>' +
                                '</td>' +
                            '</tr>' +
                            '<tr>' +
                                '<td>' +
                                    '心理層面：' +
                                    '<br>' +
                                    '<textarea id="q66'+data.id[index]+'" style="width:100%;height:120px" placeholder="請簡單摘要敘述" disabled>'+data.q66[index]+'</textarea>' +
                                '</td>' +
                            '</tr>' +
                            '<tr>' +
                                '<td>' +
                                    '靈性層面：' +
                                    '<br>' +
                                    '<textarea id="q67'+data.id[index]+'" style="width:100%;height:120px" placeholder="請簡單摘要敘述" disabled>'+data.q67[index]+'</textarea>' +
                                '</td>' +
                            '</tr>' +
                            '<tr>' +
                                '<td>' +
                                    '社會層面：' +
                                    '<br>' +
                                    '<textarea id="q68'+data.id[index]+'" style="width:100%;height:120px" placeholder="請簡單摘要敘述" disabled>'+data.q68[index]+'</textarea>' +
                                '</td>' +
                            '</tr>' +
                            '<tr>' +
                                '<td>' +
                                    '跨理論模式之改變五階段：' +
                                    '<br>' +
                                    '<input class="stage" name="stage'+data.id[index]+'" style="zoom:1.5" type="radio" value="無意圖期" disabled>無意圖期' +
                                    '<input class="stage" name="stage'+data.id[index]+'" style="zoom:1.5" type="radio" value="意圖期" disabled>意圖期' +
                                    '<input class="stage" name="stage'+data.id[index]+'" style="zoom:1.5" type="radio" value="準備期" disabled>準備期' +
                                    '<input class="stage" name="stage'+data.id[index]+'" style="zoom:1.5" type="radio" value="行動期" disabled>行動期' +
                                    '<input class="stage" name="stage'+data.id[index]+'" style="zoom:1.5" type="radio" value="維持期" disabled>維持期' +
                                '</td>' +
                            '</tr>' +
                            '<tr>' +
                                '<td>' +
                                    '整體評估入園合適性：' +
                                    '<br>' +
                                    '<textarea id="q69'+data.id[index]+'" style="width:100%;height:150px" placeholder="請簡單摘要敘述，不超過500字" disabled>'+data.q69[index]+'</textarea>' +
                                '</td>' +
                            '</tr>'

                    }else if(data.job[index] == "組長"){
                        cssString5 +=
                            '<tr>' +
                                '<td style="text-align:center" colspan="2">社工組長 '+data.write_user[index]+' 審核(第二層級)</td>' +
                            '</tr>'+
                            '<tr>'+
                                '<td class="text-right" rowspan="2">社工組長審核</td>' +
                                '<td>' +
                                    '送給同一層級：' +
                                    '<select class="department" id="department'+data.id[index]+'" disabled>'+
                                        '<option value="" disabled selected hidden>請選擇部門</option>'+
                                    '</select>'+
                                    ' '+
                                    '<select id="department'+data.id[index]+'user" disabled>'+
                                        '<option value="" disabled selected hidden>請選擇審核人</option>'+
                                    '</select>'+ 
                                '</td>' +
                            '</tr>' +
                            '<tr>' +
                                '<td>' +
                                    '送給同一層級，需寫建議。' +
                                    '<br>' +
                                    '<textarea id="q70'+data.id[index]+'" style="width:100%;height:150px" placeholder="請簡單摘要敘述，不超過500字" disabled>'+data.q70[index]+'</textarea>' +
                                '</td>' +
                            '</tr>'

//                          '<button id="delete" onClick="delete_note('+data.id[index]+')"> 刪除 </button>'+
                    }else{
                        cssString5 +=
                            '<tr>' +
                                '<td style="text-align:center" colspan="2">家園主任 '+data.write_user[index]+' 審核(第三層級)</td>' +
                            '</tr>' +
                            '<tr>' +
                                '<td class="text-right" rowspan="2">最終入園審核</td>' +
                                '<td>' +
                                    '<select id="ok_or_not'+data.id[index]+'" disabled>'+
                                        '<option value="" disabled selected hidden>請選擇是否通過</option>'+
                                        '<option value="通過">通過</option>'+
                                        '<option value="未通過">未通過</option>'+
                                    '</select>'+  
                                    ' '+
                                    '<select class="department" id="department'+data.id[index]+'" disabled>'+
                                        '<option value="" disabled selected hidden>請選擇部門</option>'+
                                    '</select>'+
                                    ' '+
                                    '<select id="department'+data.id[index]+'user" disabled>'+
                                        '<option value="" disabled selected hidden>請選擇審核人</option>'+
                                    '</select>'+ 
                //                    '<button id="back" hidden>退回</button>' +
                                '</td>' +
                            '</tr>' +
                            '<tr>' +
                                '<td>' +
                                    '無論是通過入園審核；或是退回上一層級；都需寫建議和理由。' +
                                    '<br>' +
                                    '<textarea id="q71'+data.id[index]+'" style="width:100%;height:150px" placeholder="請簡單摘要敘述，不超過500字" disabled>'+data.q71[index]+'</textarea>' +
                                '</td>' +
                            '</tr>'
//                            '<tr>'+
//                                '<td><span id="'+data.id[index]+'">'+data.user_name[index]+'</span>'+data.job[index]+'評估：<br>'+
//                                    '(<i style="color:red">※</i>以身、心、靈及社會層面評估。)'+
//                                    '<br>'+
//                                    '<textarea id="note'+data.id[index]+'" style="width:100%;height:300px">'+data.note[index]+'</textarea>'+
//                                    '<br>'+
//                                    '<select class="department" id="department'+data.id[index]+'">'+
//                                         '<option value="" disabled selected hidden>請選擇部門</option>'+
//                                    '</select>'+
//                                    ' '+
//                                    '<select id="department'+data.id[index]+'user">'+
//                                         '<option value="" disabled selected hidden>請選擇審核人</option>'+
//                                    '</select>'+
//                                    ' '+
//                                    '<button id="delete" onClick="delete_note('+data.id[index]+')"> 刪除 </button>'+
//                                '</td>'+
//                            '</tr>'
                    }

                }
//                console.log(cssString5)
                $("#print_check").html(cssString5);
                
        //下拉選單部門人名連動region
            //開網頁先行填入部門 region
                $.ajax({
                    type:'POST',
                    url:'database/find_house_info.php',
                    dataType: "JSON",
                    async: false,//啟用同步請求
                    success: function (data) {
                        for (var index in data.id) {
                            $('.department').append('<option value="'+data.name[index]+'">'+data.name[index]+'</option>');
                            $("#choose_house").append('<option value="'+data.name[index]+'">'+data.name[index]+'</option>');
                        }
                    },
                });
             //endregion
                
                for (var index in data.send_user) {
                    $('#department'+data.id[index]+'').val(data.send_department[index]);
                    append_user($('#department'+data.id[index]+'').val(),$('#department'+data.id[index]+'user'))
                    $('#department'+data.id[index]+'user').val(data.send_user[index]);
                    if(data.stage[index] != ""){
                        $('input[name=stage'+data.id[index]+'][value='+data.stage[index]+']').attr('checked',true);
                    }
                    $('#ok_or_not'+data.id[index]).val(data.ok_or_no[index]);
                }
                
                $(".department").on('change',function(){
                    var id = this.id;
                    var department = this.value;
    //                console.log(this.value)
                    $('#'+id+'user').empty();
                    append_user(department,$('#'+id+'user'));
                });
                
                function append_user(department,user){             
                        $.ajax({
                            type:'POST',
                            url:'database/find_check_user.php',
                            data:{
                                department:department,
                            },
                            dataType: "JSON",
                            async: false,//啟用同步請求
                            success: function (data) {
                                for (var index in data.id) {
                                    user.append('<option value="'+data.name[index]+'">'+data.name[index]+'</option>');                                   
                                }
                            },
                        });
                }
            //endregion
               
            },
            error: function(e){
              console.log(e)  
            },
        });
//
$("#add_check").on('click', function () {
        //    console.log($("#job_title").text())
        var cssString = "";
        if($("#job_title").text() == " 社工"){
            cssString +=
                '<tr>' +
                    '<td style="text-align:center" colspan="2">一般會談工作人員評估(第一層級)</td>' +
                '</tr>' +
                '<tr>' +
                    '<td class="text-right" rowspan="7">綜合評估內容</td>' +
                    '<td>' +
//                        '<input id="OK" name="" style="zoom:1.5;" value="" type="radio">' +
                        '送給下一層級：'+
                        '<select id="department">'+
                             '<option value="" disabled selected hidden>請選擇部門</option>'+
                        '</select>'+
                        ' '+
                        '<select id="user">'+
                             '<option value="" disabled selected hidden>請選擇審核人</option>'+
                        '</select>'+                    
                    '</td>' +
                '</tr>' +
                '<tr>' +
                    '<td>' +
                        '身體層面：' +
                        '<br>' +
                        '<textarea id="q65" style="width:100%;height:120px" placeholder="請簡單摘要敘述"></textarea>' +
                    '</td>' +
                '</tr>' +
                '<tr>' +
                    '<td>' +
                        '心理層面：' +
                        '<br>' +
                        '<textarea id="q66" style="width:100%;height:120px" placeholder="請簡單摘要敘述"></textarea>' +
                    '</td>' +
                '</tr>' +
                '<tr>' +
                    '<td>' +
                        '靈性層面：' +
                        '<br>' +
                        '<textarea id="q67" style="width:100%;height:120px" placeholder="請簡單摘要敘述"></textarea>' +
                    '</td>' +
                '</tr>' +
                '<tr>' +
                    '<td>' +
                        '社會層面：' +
                        '<br>' +
                        '<textarea id="q68" style="width:100%;height:120px" placeholder="請簡單摘要敘述"></textarea>' +
                    '</td>' +
                '</tr>' +
                '<tr>' +
                    '<td>' +
                        '跨理論模式之改變五階段：' +
                        '<br>' +
                        '<input name="stage" style="zoom:1.5" type="radio" value="無意圖期">無意圖期' +
                        '<input name="stage" style="zoom:1.5" type="radio" value="意圖期">意圖期' +
                        '<input name="stage" style="zoom:1.5" type="radio" value="準備期">準備期' +
                        '<input name="stage" style="zoom:1.5" type="radio" value="行動期">行動期' +
                        '<input name="stage" style="zoom:1.5" type="radio" value="維持期">維持期' +
                    '</td>' +
                '</tr>' +
                '<tr>' +
                    '<td>' +
                        '整體評估入園合適性：' +
                        '<br>' +
                        '<textarea id="q69" style="width:100%;height:150px" placeholder="請簡單摘要敘述，不超過500字"></textarea>' +
                    '</td>' +
                '</tr>'+
                '<tr>' +
                    '<td colspan="2" class="text-center">' +
                        '<button onclick="check_send();" class="btn btn-default">送出</button>'+
                    '</td>' +
                '</tr>'
            
    } else if ($("#job_title").text() == " 組長") {
        cssString +=

            '<tr>' +
                '<td style="text-align:center" colspan="2">社工組長審核(第二層級)</td>' +
            '</tr>'+
            '<tr>'+
                '<td class="text-right" rowspan="2">社工組長審核</td>' +
                '<td>' +
                    '送給同一層級：' +
                    '<select id="department">'+
                        '<option value="" disabled selected hidden>請選擇部門</option>'+
                    '</select>'+
                    ' '+
                    '<select id="user">'+
                        '<option value="" disabled selected hidden>請選擇審核人</option>'+
                    '</select>'+ 
                '</td>' +
            '</tr>' +
            '<tr>' +
                '<td>' +
                    '送給同一層級，需寫建議。' +
                    '<br>' +
                    '<textarea id="q70" style="width:100%;height:150px" placeholder="請簡單摘要敘述，不超過500字"></textarea>' +
                '</td>' +
            '</tr>'+
                '<tr>' +
                    '<td colspan="2" class="text-center">' +
                        '<button onclick="check_send(3);" class="btn btn-default">送出</button> '+
                        ' <button onclick="back(3);" class="btn btn-default">退回</button>'+
                    '</td>' +
                '</tr>'
//                '<tr>'+
//                    '<td>'+$("#username").text()+'評估：<br>'+
//                        '(<i style="color:red">※</i>以身、心、靈及社會層面評估。)'+
//                        '<br>'+
//                        '<textarea id="note" style="width:100%;height:300px"></textarea>'+
//                        '<br>'+
//                        '<select id="department">'+
//                             '<option value="" disabled selected hidden>請選擇部門</option>'+
//                        '</select>'+
//                        ' '+
//                        '<select id="user">'+
//                             '<option value="" disabled selected hidden>請選擇審核人</option>'+
//                        '</select>'+
//                        ' '+
//                        '<button id="send"> 審核並送出 </button>'+
//                        ' '+
//                        '<button id="back"> 退回</button>'+
//                    '</td>'+
//                '</tr>'

    } else if ($("#job_title").text() == " 主任") {
        cssString +=
            '<tr>' +
                '<td style="text-align:center" colspan="2">家園主任審核(第三層級)</td>' +
            '</tr>' +
            '<tr>' +
                '<td class="text-right" rowspan="2">最終入園審核</td>' +
                '<td>' +
                    '<select id="ok_or_not">'+
                        '<option value="" disabled selected>請選擇是否通過</option>'+
                        '<option value="通過">通過</option>'+
                        '<option value="未通過">未通過</option>'+
                    '</select>'+  
                    ' '+
                    '<select id="department" >'+
                        '<option value="" disabled selected>請選擇部門</option>'+
                    '</select>'+
                    ' '+
                    '<select id="user">'+
                        '<option value="" disabled selected>請選擇審核人</option>'+
                    '</select>'+ 
//                    '<button id="back" hidden>退回</button>' +
                '</td>' +
            '</tr>' +
            '<tr>' +
                '<td>' +
                    '無論是通過入園審核；或是退回上一層級；都需寫建議和理由。' +
                    '<br>' +
                    '<textarea id="q71" style="width:100%;height:150px" placeholder="請簡單摘要敘述，不超過500字"></textarea>' +
                '</td>' +
            '</tr>'+
                '<tr>' +
                    '<td colspan="2" class="text-center">' +
                        '<button onclick="check_send(4);" class="btn btn-default">送出</button> '+
                        ' <button onclick="back(4);" class="btn btn-default">退回</button>'+
                    '</td>' +
                '</tr>'
//                '<tr>'+
//                    '<td>'+$("#username").text()+'評估：<br>'+
//                        '(<i style="color:red">※</i>以身、心、靈及社會層面評估。)'+
//                        '<br>'+
//                        '<textarea id="note" style="width:100%;height:300px"></textarea>'+
//                        '<br>'+
//                        '<select id="department">'+
//                             '<option value="" disabled selected hidden>請選擇部門</option>'+
//                        '</select>'+
//                        ' '+
//                        '<select id="user">'+
//                             '<option value="" disabled selected hidden>請選擇審核人</option>'+
//                        '</select>'+
//                        ' '+
//                        '<button id="send"> 審核並送出 </button>'+
//                        ' '+
//                        '<button id="back" > 退回</button>'+
//                    '</td>'+
//                '</tr>'
    }
    $("#check").html(cssString);
//        $("#ok_or_not").on('change',function(){
//            
//            if($("#ok_or_not").val() == "通過"){
//                $("#department").attr("hidden",false);
//                $("#user").attr("hidden",false);
//                $("#back").attr("hidden",true);
//            }else{
//                $("#department").attr("hidden",true);
//                $("#user").attr("hidden",true);
//                $("#back").attr("hidden",false);
//            }
//        });
    
        $("#department").on('change',function(){   
            $("#user").empty();
            append_user();
        });
    
        function append_user(){
            $.ajax({
                type:'POST',
                url:'database/find_check_user.php',
                data:{
                    department:$("#department").val(),
                },
                dataType: "JSON",
                async: false,//啟用同步請求
                success: function (data) {
                    for (var index in data.id) {
                        $("#user").append('<option value="'+data.name[index]+'">'+data.name[index]+'</option>');
                    }
                },
            });

        }

        $.ajax({
            type:'POST',
            url:'database/find_house_info.php',
            dataType: "JSON",
            async: false,//啟用同步請求
            success: function (data) {
                for (var index in data.id) {
                    $("#department").append('<option value="'+data.name[index]+'">'+data.name[index]+'</option>');
                }
            },
        });
        if($("#job_title").text() == " 社工"){
            $('#department').val('行政中心');
            $("#user").empty();
            append_user();
            $('#user').val('許文瀞');
        }
});
//endregion

//add_review_again region
function check_send(job){
//    alert(location.href);
    var face_id = getUrlVars()["face_id"];
    var num = getUrlVars()["num"];
    var stage = $("input[name='stage']:checked").val();
    if($("#department").val() != null && $("#user").val() != null){
        if(job == "3"){
            if($("#q70").val() != ""){    
                send();
            }else{
                sweetAlert("請填寫完整","","warning");
            }
        }else if(job == "4"){
            if($("#q71").val() != "" && $("#ok_or_not").val() != ""){    
                send();
            }else{
                sweetAlert("請填寫完整","","warning");
            }
        }else{
            send();
        }
    }else{
        sweetAlert("請填寫送給哪部門","","warning");
    }
    
    function send(){
                $.ajax({
                        type:'POST',
                        url:'database/add_review_again.php',
                        data:{
                            num:num,
                            face_id:face_id,
                            q65:$("#q65").val(),
                            q66:$("#q66").val(),
                            q67:$("#q67").val(),
                            q68:$("#q68").val(),
                            stage:stage,
                            q69:$("#q69").val(),
                            q70:$("#q70").val(),
                            q71:$("#q71").val(),
                            send_department:$("#department").val(),
                            send_user:$("#user").val(),
                            write_user:$("#face_assign").text(),
                            name:$("#name").text(),
                            url:location.href,
                            ok_or_no:$("#ok_or_not").val()
                        },
                        success: function (data) {
            //                console.log(data)
                            if(data == 1){
                                swal({
                                    title:'儲存成功！',
                                    type:'success',
                                    allowOutsideClick:false,
                                }).then(function(){
                                    location.reload();
                                }) 
                            }else{
                                console.log(data)
                                swal({
                                    title:'儲存失敗！請聯絡負責單位',
                                    type:'error',
                                    allowOutsideClick: false, //不可點背景關閉
                                })
                            }
                        },
                        error: function(e){
                            console.log(e)
                        }
                    });
        //只能按一次
        var btn = $(this);
        btn.prop('disabled', true);
    };
};
//endregion

//back_review_again region
function back(job){
var type = "退回"; 
var face_id = getUrlVars()["face_id"];
var num = getUrlVars()["num"];
var department = $("#department").val();
var user = $("#user").val();
    $.ajax({
            type:'POST',
            url:'database/find_review_again.php',
            data:{
                face_id:face_id,
                num:num,
                type:type
            },
            dataType: "JSON",
            async: false,//啟用同步請求
            success: function (data) {
                department = data.write_department[0];
                user = data.write_user[0];
            },
            error: function(e){
              console.log(e)  
            },
        });

    
    if(job == "3"){
        if($("#q70").val() != ""){    
            send_back();
        }else{
            sweetAlert("請填寫完整","","warning");
        }
    }else{
        if($("#q71").val() != "" && $("#ok_or_not").val() != ""){    
            send_back();
        }else{
            sweetAlert("請填寫完整","","warning");
        }    
    }
    
    function send_back(){
        swal({
            title: '是否退回？',
            text: "確認後將退回上一層級",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            allowOutsideClick: false, //不可點背景關閉
            confirmButtonText: '確認！',
            cancelButtonText: '取消'
        }).then(function (isConfirm) {
            if (isConfirm) {
                var face_id = getUrlVars()["face_id"];
                var num = getUrlVars()["num"];
                var stage = $("input[name='stage']:checked").val();
                    $.ajax({
                        type:'POST',
                        url:'database/add_review_again.php',
                        data:{
                            type:type,
                            num:num,
                            face_id:face_id,
                            q65:$("#q65").val(),
                            q66:$("#q66").val(),
                            q67:$("#q67").val(),
                            q68:$("#q68").val(),
                            stage:stage,
                            q69:$("#q69").val(),
                            q70:$("#q70").val(),
                            q71:$("#q71").val(),
                            send_department:department,
                            send_user:user,
                            name:$("#name").text(),
                            url:location.href,
                            ok_or_no:$("#ok_or_not").val()
                        },
                        success: function (data) {
                            console.log(data)
                            if(data == 1){
                                swal({
                                    title:'退回成功！',
                                    type:'success',
                                    allowOutsideClick:false,
                                }).then(function(){
                                    location.reload();
                                }) 
                            }else{
                //                console.log(data)
                                swal({
                                    title:'退回失敗！請聯絡負責單位',
                                    type:'error',
                                    allowOutsideClick: false, //不可點背景關閉
                                })
                            }
                        },
                        error: function(e){
                            console.log(e)
                        }
                    });
            }
            //只能按一次
            var btn = $(this);
            btn.prop('disabled', true);
        });
    }

};
//endregion

//返回會談紀錄region
var face_id = getUrlVars()["face_id"];
var phone_id = getUrlVars()["phone_id"];

var name = decodeURIComponent(getUrlVars()["name"]);
var gender = decodeURIComponent(getUrlVars()["gender"]);
var date = getUrlVars()["date"];
var times = getUrlVars()["times"];
var assign = decodeURIComponent(getUrlVars()["assign"]);
var url = 'open_all.php?face_id='+face_id+'&gender='+gender+'&name='+name+'&phone_id='+phone_id+'&date='+date+'&times='+times+'&assign='+assign+'';
$("#open_history").attr('href',url);
//endregion

//地址是否相同region
$("input[name='live_or_not']").on('change', function(){
//    console.log("OK")
    if($("input[name='live_or_not']:checked").val() == "是"){
        var zip = $("#twzipcode").twzipcode('get', 'zipcode');
        $("#twzipcode2").twzipcode('set', {
            'zipcode': zip
        });
        $("#live_address").val($("#address").val());
    }
});

    
    
//endregion

//進入預覽WORD頁面region

//open_again1
$("#preview_word").on('click',function(){
    var face_id = getUrlVars()["face_id"];
    var num = getUrlVars()["num"];
    var gender = getUrlVars()["gender"];
    var date = getUrlVars()["date"];
    var times = getUrlVars()["times"];
    var assign = getUrlVars()["assign"];
    var name = getUrlVars()["name"];
    var phone_id = getUrlVars()["phone_id"];
//    console.log(id);
    location.href = 'open_again_preview_word.php?face_id='+face_id+'&open_id='+$("#open_id").text()+'&name='+name+'&gender='+gender+'&date='+date+'&times='+times+'&place='+$("#face_place").text()+'&assign='+assign+'&phone_id='+phone_id+'&num='+num+'';
});

//open_again2
$("#preview_word2").on('click',function(){
    var face_id = getUrlVars()["face_id"];
    var num = getUrlVars()["num"];
//    console.log(id);
    location.href = 'open_again_preview_word2.php?face_id='+face_id+'&open_id='+$("#open_id").text()+'&name='+name+'&gender='+gender+'&date='+date+'&times='+times+'&place='+$("#face_place").text()+'&assign='+assign+'&phone_id='+phone_id+'&num='+num+'';
});
//endregion

//隱藏欄位region
    //案主家人宗教信仰region
    $("input[name='h_belief']").on('change', function(){
        if($("input[name='h_belief']:checked").val() == "基督教"){
    //        $("#sd_status_tr").attr("hidden");
            $("#q41_tr").attr("hidden",false);
            $("#receive_baptism_tr").attr("hidden",false);
            $("#join_church_tr").attr("hidden",false);
        }else{
            $("#q41_tr").attr("hidden",true);
            $("#receive_baptism_tr").attr("hidden",true);
            $("#join_church_tr").attr("hidden",true);
        }
    });
    //endregion
//endregion