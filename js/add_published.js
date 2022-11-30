//datepicker創建 region
datepicker_create = function (selector_id) {
  if (selector_id == "birth") {
    $("#" + selector_id).datepicker({
      changeYear: true,
      changeMonth: true,
      currentText: "今天",
      dateFormat: "R.mm.dd",
      showButtonPanel: true,
      yearRange: "-109:+0",
      onClose: function (dateText) {
        console.log($("#" + selector_id).val());
        console.log(trans_to_EN(dateText));
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
      minDate: new Date(new Date().getFullYear(), new Date().getMonth() - 3, 1),
      maxDate: new Date(new Date().getFullYear() + 3, 11, 31),
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
  var strAry = endate.split(".");

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

$(document).ready(function () {
  //將input name名稱為ch_datepicker創建datepicker初始化 region
  $("input[name='ch_datepicker']").each(function () {
    var this_id = $(this).attr("id");
    datepicker_create(this_id);
  });
  //endregion

  append_user();
});

function submit_form() {
  //去掉資料內前後端多餘的空白，file類型須排除，否則報錯
  $("input, textarea").each(function () {
  if ($(this).attr("type") != "file") {
      $(this).val(jQuery.trim($(this).val()));
  }
  });

  var form_data = new FormData();

  var year = publishd_date_year_split[0];

  $("input[type='file']").each(function(index, element) {
      var publishd_file = $(this).prop("files");

      if (publishd_file != undefined) {
        if (publishd_file.length != 0) {
          for (var i = 0; i < publishd_file.length; i++) {
            form_data.append("publishd_file"+index, publishd_file[i]);
            // console.log(publishd_file[i])
          }
        } 
      }
  });

  form_data.append("Year", year);
  form_data.append("Title_name", $("#title_name").val());
  form_data.append("Publishd_date", $("#publishd_date").val());
  form_data.append("Subject",$("#subject").val());
  form_data.append("Num_publish",$("#num_publish").val());


  form_data.append("Sign_publishd_date", trans_to_EN($("#publishd_date").val()));
  form_data.append("Supervise",$("#Supervise").val());
  form_data.append("Leader",$("#Leader").val());
  form_data.append("Director",$("#Director").val());

  // 預覽傳到後端的資料詳細內容
  // for (var pair of form_data.entries()) {
  //   console.log(pair[0] + ", " + pair[1]);
  // }


  $.ajax({
      url: "database/add_new_publishd.php",
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
            type: "success",
            title: "新增成功!",
            allowOutsideClick: false, //不可點背景關閉
          }).then(function () {
            window.location.href =
              "publishd.php?year=" + year;
          });
        } else {
          swal({
            type: "error",
            title: "新增失敗!請聯絡負責人",
            allowOutsideClick: false, //不可點背景關閉
          });
        }
      },
      error: function (e) {
          console.log(e)
          swal({
              type: "error",
              title: "新增失敗!請聯絡負責人",
              allowOutsideClick: false, //不可點背景關閉
          });
      },
    });
}


//新增發文紀錄region
// $("#pu_add_new").on("click", function () {
//   var stau = false;

//   var published_date_year_split = $("#published_date").val().split(".");

//   if (check_add_published_data() != "") {
//     stau = false;
//   } else {
//     stau = true;
//   }
//   console.log(stau);

//   if (!stau) {
//     swal({
//       title: check_add_published_data(),
//       type: "error",
//     });
//   } else {
//     $.ajax({
//       url: "database/add_new_published.php",
//       type: "POST",
//       data: {
//         // Id: $("#id").val(),
//         Year: published_date_year_split[0],
//         Title_name: $("#title_name").val(),
//         Published_date: trans_to_EN($("#published_date").val()),
//         Subject: $("#subject").val(),
//         Unit: $("#unit").val(),
//         Num_publish: $("#num_publish").val(),
//         // Create_date: trans_to_EN($("#create_date").val()),
//         // Create_name: $("#create_name").val(),
//         // Update_date: trans_to_EN($("#update_date").val()),
//         // Update_name: $("#update_name").val(),
//       },
//       //            dataType: "JSON",
//       success: function (data) {
//         console.log(data);
//         if (data == 1) {
//           swal({
//             type: "success",
//             title: "新增成功!",
//             allowOutsideClick: false, //不可點背景關閉
//           }).then(function () {
//             window.location.replace("published_yearlist.php");
//           });
//         } else {
//           swal({
//             type: "error",
//             title: "新增失敗!請聯絡負責人",
//             allowOutsideClick: false, //不可點背景關閉
//           }).then(function () {
//             window.location.replace("published_yearlist.php");
//           });
//         }
//       },
//       error: function (e) {
//         alert("系統錯誤!");
//         console.log(e);
//       },
//     });
//   }
// });
//endregion

//檢查發文紀錄的必填欄位region
function check_add_published_data() {
  var title_name = $("#title_name").val();
  var published_date = $("#published_date").val();
  var num_publish = $("#num_publish").val();
  var subject = $("#subject").val();

  var errorstr = "";

  if (title_name == null) {
    errorstr += "未填寫發文記錄標題!\r\n";
  }
  if (published_date == null) {
    errorstr += "未填寫發文日期!\r\n";
  }
  if (num_publish == null) {
    errorstr += "未填寫發文字號!\r\n";
  }
  if (subject == null) {
    errorstr += "未填寫主旨!\r\n";
  }

  if (errorstr == "") {
    if (title_name.replace(/\s*/g, "") == "") {
      errorstr += "未填寫發文記錄標題!\r\n";
    }
    if (published_date.replace(/\s*/g, "") == "") {
      errorstr += "未填寫發文日期!\r\n";
    }
    if (num_publish.replace(/\s*/g, "") == "") {
      errorstr += "未填寫發文字號!\r\n";
    }
    if (subject.replace(/\s*/g, "") == "") {
      errorstr += "未填寫主旨!\r\n";
    }
  }

  return errorstr;
}
//endregion

// // 呼叫user方法region
// $.ajax({
//   type: "POST",
//   url: "database/find_check_user.php",
//   dataType: "JSON",
//   async: false, //啟用同步請求
//   success: function (data) {
//     for (var index in data.Id) {
//       $(".user").append(
//         '<option value="' +
//           data.Name[index] +
//           '">' +
//           data.Name[index] +
//           "</option>"
//       );
//     }
//   },
//   error: function (e) {
//     console.log(e);
//   },
// });

//endregion

//呼叫user方法region
function append_user(){             
  $.ajax({
      type:'POST',
      url:'database/find_check_user.php',
      dataType: "JSON",
      async: false,//啟用同步請求
      success: function (data) {
          // console.log('test',data)
          for (var index in data.Id) {
            $("#supervise").append('<option value="'+data.Name[index]+'">'+data.Name[index]+'</option>');
            $("#leader").append('<option value="'+data.Name[index]+'">'+data.Name[index]+'</option>');
            $("#director").append('<option value="'+data.Name[index]+'">'+data.Name[index]+'</option>');
          }
      },
  });
}
//endregion