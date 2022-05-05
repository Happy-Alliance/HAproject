# 2022/04/21更新:

js/
```
phone.js
trans_case.js
closed_detail.js
closed.js
dlgrec_detail.js
add_placement_case.js
placement_case_all_all.js
placement_case_all.js
placement_case_detail.js
placement_case.js
```

```
add_phone.php
phone.php
phone_detail_v2.php
phone_trans_to_opencase.php
add_counsel.php
counsel.php
counsel_detail.php
add_screening.php
screening.php
screening_detail.php
add_case.php
current_case.php
case_all_all.php
case_all.php
case_detail.php
closed.php
closed_detail.php
add_dlgrec.php
dlgrec.php
dlgrec_detail.php
add_placement_case.php
placement_case.php
placement_case_all_all.php
placement_case_all.php
placement_case_detail.php
```

placement_case_forms/
```
form_settlement.php
```

# 2022/04/21資料庫：
```

```


# 2022/04/26摘要：
```
新增開案管理->placement_case安置評估(複製開案個案 表單只留安置評估)
創建placement_case_forms資料夾 複製form_settlement.php
menu.php修改諮詢案個(簡短諮詢服務)、監所服務、篩檢、結案個案(結案)、生輔紀錄、開案個案麵包屑
個案諮詢改簡短諮詢服務
結案個案改結案
開案個案大項改開案管理
未開案個案大項改未開案管理
```

# 2022/04/26更新:

js/
```
add_placement_case.js
placement_case_all_all.js
placement_case_all.js
placement_case_detail.js
placement_case.js
```
database/
```
add_update_placement_case_detail_form.php
find_placement_case_detail_typecase.php
find_placement_case_detail.php
find_case_detail_typecase.php
find_case_detail.php
placement_case_file_check.php
add_placement_case_all_upload.php
add_placement_case_all.php
find_placement_case_all.php
find_placement_case.php
find_repeat_placement_caseid.php
add_new_placement_case.php
```

# 2022/04/26資料庫：
```
placement_case
placement_forms
placement_form_all_info
```


# 2022/04/26摘要：
```
placement_case新建安置評估相關資料庫、資料庫寫入/修改/撈值設定
```

# 2022/04/27更新:

```
case_detail.php
case_all.php
```
case_forms
```
form_settlement.php
form_satif.php
form_resource.php
form_life.php
form_health.php
form_familyship.php
form_employment_satif.php
form_case.php
form_BSRS5.php
form_interlocution.php
```
placement_case_forms
```
form_settlement.php
```
js/
```
case_detail.js
case_all.js
resource_other_detail.js
placement_case_detail.js
```

# 2022/04/27資料庫：
```
forms
form_all_info
```


# 2022/04/27摘要：
```
修改case_forms和placement_case_forms所有表單的"返回"鍵onclick事件
case_forms新增 社會資源應用表格resource、個別會談摘要記錄表interlocution
開案個案case_all、case_detail 新增社會資源應用表格resource、個別會談摘要記錄表interlocution相關功能
forms、form_all_info資料異動
```

# 2022/05/05更新:

```
closed.php
closed_detail.php
dlgrec.php
dlgrec_detail.php
signnature_canvas.php
```
database/
```
update_closed_data_detail_signature.php
find_dlgrec_data_detail.php
update_dlgrec_data_detail_signature.php
```

jSignature/
```
flashcanvas.js
flashcanvas.swf
jSignature.min.js
jSignature.min.noconflict.js
```
js/
```
dlgrec.js
closed.js
dlgrec_detail.js
closed_detail.jsclosed_detail.js
```

# 2022/05/05資料庫：
```
dlgrec
closed
```


# 2022/05/05摘要：
```
生輔紀錄、結案 新增數位簽章功能(jSignature插件)
signature資料夾儲存 數位簽章圖片
```