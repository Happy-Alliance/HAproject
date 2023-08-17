//取得url id值region
function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(
    /[?&]+([^=&]+)=([^&]*)/gi,
    function (m, key, value) {
      vars[key] = value;
    }
  );
  return vars;
}
//endregion

//datepicker創建 region
datepicker_create = function (selector_id) {
  if (selector_id.includes("birth")) {
    $("#" + selector_id).datepicker({
      changeYear: true,
      changeMonth: true,
      currentText: "今天",
      dateFormat: "R.mm.dd",
      showButtonPanel: true,
      yearRange: "-109:+0",
      onClose: function (dateText) {
        // console.log($('#'+selector_id).val());
        // console.log(trans_to_EN(dateText));
      },
      beforeShow: function (input, inst) {
        var $this = $(this);
        var cal = inst.dpDiv;
        var outerh = $this.outerHeight();
        if ($this.offset().top > 1200) {
          outerh = outerh * 4;
        } else {
          outerh = outerh * 3;
        }
        // console.log($this.offset().top)
        // console.log(outerh)

        var top = $this.offset().top - outerh;
        var left = $this.offset().left - 10;
        setTimeout(function () {
          cal.css({
            top: top,
            left: left,
          });
        }, 10);
      },
    });
  } else {
    $("#" + selector_id).datepicker({
      changeYear: true,
      changeMonth: true,
      currentText: "今天",
      dateFormat: "R.mm.dd",
      showButtonPanel: true,
      // minDate: new Date(new Date().getFullYear() - 10, 0, 1),
      // maxDate: new Date(new Date().getFullYear() + 10, 11, 31),
      yearRange: "-15:+5",
      onClose: function (dateText) {
        // console.log($('#'+selector_id).val());
        // console.log(trans_to_EN(dateText));
      },
      beforeShow: function (input, inst) {
        var $this = $(this);
        var cal = inst.dpDiv;
        var outerh = $this.outerHeight();
        if ($this.offset().top > 1200) {
          outerh = outerh * 4;
        } else {
          outerh = outerh * 3;
        }
        // console.log($this.offset().top)
        // console.log(outerh)

        var top = $this.offset().top - outerh;
        var left = $this.offset().left - 10;
        setTimeout(function () {
          cal.css({
            top: top,
            left: left,
          });
        }, 10);
      },
    });
  }
};
//endregion

//將日期轉為民國年格式111.03.07 region
trans_to_Tw = function (endate) {
  var strAry = endate.split("-");

  if (parseInt(strAry[0]) > 1911) {
    strAry[0] = parseInt(strAry[0]) - 1911;
  }

  return strAry.join(".");
};
//endregion

//將日期轉為西元年格式2022-03-07(mysql date格式) region
trans_to_EN = function (endate) {
  var strAry = endate.split(".");

  if (parseInt(strAry[0]) < 1911) {
    strAry[0] = parseInt(strAry[0]) + 1911;
  }

  return strAry.join("-");
};
//endregion

//檢查SQL撈出來的日期格式region
check_sql_date_format = function (date) {
  if (date == "0000-00-00") {
    date = "";
  } else {
    date = trans_to_Tw(date);
  }

  return date;
};

$.ajax({
  type:'POST',
  url:'database/find_check_user.php',
  dataType: "JSON",
  async: false,//啟用同步請求
  success: function (data) {
      // console.log('test',data)
      for (var index in data.Id) {
          $("#leader").append('<option value="'+data.Name[index]+'">'+data.Name[index]+'</option>');
          $("#director").append('<option value="'+data.Name[index]+'">'+data.Name[index]+'</option>');
      }
  },
});

pu_id = getUrlVars()["pu_id"];
pu_year = getUrlVars()["year"];

leader_msg_arr = [];
director_msg_arr = [];

//抓發文表region
$(document).ready(function () {
  $.ajax({
    url: "database/find_published_data_detail.php",
    data: {
      pu_id: pu_id,
      year: pu_year,
    },
    type: "POST",
    dataType: "JSON",
    async: false,
    success: function (data) {
      // console.log(data);

      $.each(data, function (index, value) {
        // $("#pu_id").html(value.pu_id);

        $("#year").val(value.Year);
        $("#title_name").val(value.Title_name);

        $("#published_date").val(check_sql_date_format(value.Published_date));
        $("#subject").val(value.Subject);
        $("#num_publish").val(value.Num_publish);

        $("#create_date").val(check_sql_date_format(value.Create_date));
        $("#create_name").val(value.Create_name);
        $("#update_date").val(check_sql_date_format(value.Update_date));
        $("#update_name").val(value.Update_name);

        var published_file_path = value.Upload_path.replace("../", "./");
        published_file_name = value.Upload_name;
        var a_element_content = '<a href="'+published_file_path+'" style="text-decoration:none;color:blue;" target="_blank">'
        +published_file_name
        +'</a><br/><br/>';

        $("#upload").html(a_element_content);


        var leader_sign_file_val = value.Leader_signature.replace(
          "../signature/",
          ""
        );

        $("#leader").val(value.Leader);

        $("#leader_signature_simg").text("點擊顯示簽名圖片");
        
        if(leader_sign_file_val=="")
        {
          $("#leader_signature_simg").attr("onclick", "javascript:swal({title: '未簽名',type: 'error',}); return false;")
        }
        else
        {
          $("#leader_signature_simg").attr(
            "href",
            "./signature/" + leader_sign_file_val
          );
        }
        

        leader_msg_arr.push(value.Leader_sign_msg);
        leader_msg_arr.push(value.Leader_sign_time);
       
        
        var director_sign_file_val = value.Director_signature.replace(
          "../signature/",
          ""
        );

        $("#director").val(value.Director);

        $("#director_signature_simg").text("點擊顯示簽名圖片");
        
        if(director_sign_file_val=="")
        {
          $("#director_signature_simg").attr("onclick", "javascript:swal({title: '未簽名',type: 'error',}); return false;")
        }
        else
        {
          $("#director_signature_simg").attr(
            "href",
            "./signature/" + director_sign_file_val
          );
        }
        

        director_msg_arr.push(value.Director_sign_msg);
        director_msg_arr.push(value.Director_sign_time);
      });
    },
    error: function (e) {
      console.log(e);
    },
  });

  $(".pu_question").attr("disabled", true);

  //jsignature插件初始化 region
  jsignature_initialization();
  //endregion


  //隱藏jsignature畫布區域 region
  $("#signature_area").hide();
  //endregion

  //將name名稱為ch_datepicker創建datepicker初始化 region
  $("[name='ch_datepicker']").each(function () {
    var this_id = $(this).attr("id");
    datepicker_create(this_id);
  });
  //endregion

  $('a[data-toggle="pill"]').on("shown.bs.tab", function (e) {
    if ($(e.target).attr("id") == "home-tab") {
      $("#all_data").show();
    }
  });

  //手動新增按鈕點擊跳出模態框
  $("#myModal").on("shown.bs.modal", function () {
    $("#trans_to_opencase").trigger("focus");
  });
});

//endregion

sign_msg_model = function (sign_type_name) {
  //手動新增按鈕點擊跳出模態框
  $("#myModal").on("shown.bs.modal", function () {
    $("#" + sign_type_name).trigger("focus");
  });

  // console.log(social_worker_msg_arr)

  switch (sign_type_name) {
    case "leader":
      var type_name = "組長";
      $(".sign_msg").text(leader_msg_arr[0]);
      $(".sign_msg_time").val(leader_msg_arr[1]);
      break;
    case "director":
      var type_name = "主管";
      $(".sign_msg").text(director_msg_arr[0]);
      $(".sign_msg_time").val(director_msg_arr[1]);
      break;
  }

  $(".sign_msg_td_name").text(type_name + "簽名留言內容");
};

//jsignature插件初始化 region
function jsignature_initialization() {
  var $sigdiv = $("#signature_div");
  $sigdiv.jSignature({ UndoButton: true }); // 初始化jSignature插件-属性用","隔开
  // $sigdiv.jSignature({'decor-color':'red'}); // 初始化jSignature插件-设置横线颜色
  // $sigdiv.jSignature({'lineWidth':"6"});// 初始化jSignature插件-设置横线粗细
  // $sigdiv.jSignature({"decor-color":"transparent"});// 初始化jSignature插件-去掉横线
  // $sigdiv.jSignature({'UndoButton':true});// 初始化jSignature插件-撤销功能
  // $sigdiv.jSignature({'height': 100, 'width': 200}); // 初始化jSignature插件-设置书写范围(大小)

  // 同步更新畫布中的簽名圖片和簽名檔案格式 region
  $("#signature_div").bind("change", function (e) {
    var datapair = $sigdiv.jSignature("getData", "image");
    $("#signature_images").attr(
      "src",
      "data:" + datapair[0] + "," + datapair[1]
    );
  });
  //endregion

  //重設繪製簽名 region
  $("#signature_reset").click(function () {
    $("#signature_div").jSignature("reset"); //重置画布，可以进行重新作画
    $("#signature_images").attr("src", "");
  });
  //endregion
}
//endregion

// 儲存該簽名 region
signature_submit = function(this_btn) {

  // 獲取簽名類型(督導、組長、主管)
  var sign_type = $(this_btn).attr("board_name");

  // console.log(sign_type);

  var ajax_url = "database/update_published_data_detail_signature.php";

  var src_data = $("#signature_images").attr("src");
  // console.log(src);

  // 判斷有無簽名圖片，若有送出簽名並儲存檔案
  if (src_data) {
    // console.log("submit_sign");
    $.ajax({
      type: "post",
      url: ajax_url,
      data: {
        pu_id: pu_id,
        src_data: src_data,
        sign_msg: $("#signature_msg").val(),
        sign_type: sign_type,
      },
      async: false,
      success: function (data) {
        // console.log(data);
        if (data) {
          swal({
            title: "送出簽名成功！",
            type: "success",
          }).then(function () {
            location.reload();
          });
        } else {
          swal({
            title: "生成簽名圖片失敗！請聯絡負責單位",
            type: "error",
          });
        }
      },
    });
  } else {
    alert("簽名圖片檔不能為空！");
    return false;
  }
}
//endregion

//按簽名 按紐，顯示簽名畫布 隱藏其他詳細資料 region
signature_btn_click = function(sign_board_name) {

  var type_name = "";

  switch (sign_board_name) {
    case "leader":
      type_name = "組長";
      
      break;
    case "director":
      type_name = "主管";
      
      break;
  }

  $("#signature_h4").text(type_name + "簽名");
  $("#signature_title_td").text(type_name);
  $("#signature_msg_td").text(type_name);
  $("#sign_submit_btn").attr("board_name", sign_board_name);

  $("#signature_area").show();
  $("#collapseTwo").hide();
}
//endregion

//在簽名畫布區域按取消，返回詳細資料，並自動滾動卷軸至最頂部 region
show_main_panel = function () {
  $("#signature_area").hide();
  $("#collapseTwo").show();
  // $('html, body').scrollTop(0);
};
//endregion


//檢查檔名是否重複，提示使用者region
function check_file_exist() {
  var check_file_value = $('input[type="file"]').prop("files");
  var warning_str = "";
  var file_arr = [];
  var file_n = "";
  var exist_info = [];

  for (var i = 0; i < check_file_value.length; i++) {
    file_arr.push(check_file_value[i]["name"]);
  }
  $.each(file_arr, function (index, value) {
    $.ajax({
      url: "database/published_file_check.php",
      data: {
        file_name: value,
      },
      type: "POST",
      dataType: "JSON",
      async: false,
      success: function (data) {
        //  console.log(data)
        if (data != "") {
          $.each(data, function (index, value) {
            file_n = data[index].file_path.replace(
              "../published/",
              ""
            );

            warning_str += "已有重複檔案名稱：\n" + file_n;

            exist_info.push([file_n, warning_str]);
          });
        } else {
          warning_str = "";
        }
      },
      error: function (e) {
        console.log(e);
        notyf.alert('伺服器錯誤,無法載入');
      },
    });
  });
  return exist_info;
}
//endregion

//更新發文個案表基本資料region
$("#pu_update").on("click", function () {
  var pu_id = getUrlVars()["pu_id"];

  var stau = false;

  if (check_updat_published_data() != "") {
    stau = false;
  } else {
    stau = true;
  }
  console.log(stau);

  if (!stau) {
    swal({
      title: check_updat_published_data(),
      type: "error",
    });
  } else {
    var exist_arr = check_file_exist();
      if(exist_arr.length != 0)
      {
        swal({
          title: exist_arr[0][1],
          text: "選擇『確認送出』覆蓋現有檔案，或是按『取消』更改檔名",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "確認送出",
          cancelButtonText: "取消",
          showConfirmButton: true,
          showCancelButton: true,
        })
          .then(
            function (result) {
              if (result) {
                submit_form();
              }
            },
            function (dismiss) {
              if (dismiss == "cancel") {
                swal({
                  title: "已取消，建議請更改檔名",
                  type: "success",
                });
              }
            }
          )
          .catch(swal.noop);
      }
      else
      {
        submit_form();
      }
  }
});

function submit_form() {

  //去掉資料內前後端多餘的空白，file類型須排除，否則報錯
  $("input, textarea").each(function () {
    if ($(this).attr("type") != "file") {
        $(this).val(jQuery.trim($(this).val()));
    }
    });
  
    var form_data = new FormData();


    $("input[type='file']").each(function(index, element) {
        var published_files = $(this).prop("files");

        if (published_files != undefined) {
          if (published_files.length != 0) {
            for (var i = 0; i < published_files.length; i++) {
              form_data.append("published_files"+index, published_files[i]);
              // console.log(published_files[i])
            }
          } 
        }
    });

    form_data.append("pu_id", pu_id);
    form_data.append("Year", $("#year").val());
    form_data.append("Title_name", $("#title_name").val());
    form_data.append("Published_date", $("#published_date").val());
    form_data.append("Subject",$("#subject").val());
    form_data.append("Num_publish", $("#num_publish").val());
    form_data.append("Create_date",$("#create_date").val());
    form_data.append("Create_name",$("#create_name").val());
    form_data.append("Update_date",$("#update_date").val());
    form_data.append("Update_name",$("#update_name").val());

    // 預覽傳到後端的資料詳細內容
    for (var pair of form_data.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }


  $.ajax({
    url: "database/update_published_data_detail.php",
    type: "POST",
    data: form_data,
    contentType: false,
    cache: false,
    processData: false,
    async: true,
    success: function (data) {
      console.log(data);
      if (data == 1) {
        swal({
          title: "修改成功！",
          type: "success",
        }).then(function () {
          location.reload();
        });
      } else {
        swal({
          title: "修改失敗！請聯絡負責單位",
          type: "error",
        });
      }
    },
    error: function (e) {
      console.log(e);
    },
  });
}

//發文(update)的必填欄位 region
function check_updat_published_data() {
  var published_date = $("#published_date").val();
  var published_reason_checkbox = $(
    "input[name='published_reason']:checked"
  ).length;
  var published_reason_other = $("#published_reason_other").val();

  var errorstr = "";

  if (year == null) {
    errorstr += "未填寫年度!\r\n";
  }
  if (title_name == null) {
    errorstr += "未填寫發文標題!\r\n";
  }
  if (published_date == null) {
    errorstr += "未填寫發文日期!\r\n";
  }
  if (subject == null) {
    errorstr += "未填寫主旨!\r\n";
  }
  if (num_publish == null) {
    errorstr += "未填寫發文字號!\r\n";
  }

  return errorstr;
}
//endregion

//呼叫user方法region
function append_user() {
  $.ajax({
    type: "POST",
    url: "database/find_check_user.php",
    dataType: "JSON",
    async: false, //啟用同步請求
    success: function (data) {
      // console.log('test',data)
      for (var index in data.Id) {
        $("#user").append(
          '<option value="' +
            data.Name[index] +
            '">' +
            data.Name[index] +
            "</option>"
        );
      }
    },
  });
}
//endregion

//取消重整region
function cancel() {
  location.reload();
}
//endregion

//結案個案總表格鎖定控制region
function pu_edit() {
  $(".pu_question").attr("disabled", false);
  $("#edit_div").attr("hidden", true);
  $("#save_div").attr("hidden", false);
}
function pu_cancel() {
  $(".pu_question").attr("disabled", true);
  $("#edit_div").attr("hidden", false);
  $("#save_div").attr("hidden", true);
}
//endregion

//進入預覽WORD頁面region
$("#preview_word").on("click", function () {
  var pu_id = getUrlVars()["pu_id"];
  //    console.log(id);
  location.href = "preview_word.php?pu_id=" + pu_id + "";
});

$("#preview_word2").on("click", function () {
  var pu_id = getUrlVars()["pu_id"];
  //    console.log(id);
  location.href = "preview_word2.php?pu_id=" + pu_id + "";
});
//endregion
