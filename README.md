# 2022/07/15更新:

```
menu.php
add_case.php
current_case.php
case_all.php
add_placement_case.php
placement_case.php
placement_case_all.php
phone_trans_to_opencase.php
phone_detail_v2.php
screening_detail.php
counsel_detail.php
trans_closed.php
closed_detail.php
reopencase.php
add_closed.php
closed.php

add_supervisor_record.php
supervisor_record.php
supervisor_record_upload_detail.php
supervisor_record_fillin_detail.php
supervisor_record_detail.php
add_board_supervisor.php
board_supervisor_upload_detail.php
board_supervisor_fillin_detail.php
board_supervisor_detail.php
add_members_assemble.php
members_assemble.php
members_assemble_upload_detail.php
members_assemble_fillin_detail.php
members_assemble_detail.php

add_volunteer.php
volunteer.php
volunteer_detail.php
```

database/
```
add_new_case.php
add_new_placement_case.php
find_trans_automatic_id.php
find_placement_automatic_id.php
update_case_trans_grade.php
add_new_case.php
find_closed_id.php
add_new_closed.php
find_reopencase_data.php
add_new_closed.php

add_new_supervisor_record.php
add_new_upload_supervisor_record.php
update_supervisor_record_data_detail_signature.php
add_new_board_supervisor.php
add_new_upload_board_supervisor.php
update_board_supervisor_data_detail_signature.php
add_new_members_assemble.php
add_new_upload_members_assemble.php
update_members_assemble_data_detail_signature.php

find_data_volunteer.php
find_volunteer_data_detail.php
add_new_volunteer.php
update_volunteer_data_detail.php
add_volunteer_hours_record.php
find_volunteer_hours_record.php
```

js/
```
add_current_case.js
current_case.js
case_all.js
case_all_all.js
add_placement_case.js
placement_case.js
counsel_detail.js
detail.js
screening_detail.js
trans_case.js
trans_closed.js
closed_detail.js
reopencase.js
add_closed.js

add_supervisor_record.js
supervisor_record.js
supervisor_record_detail.js
add_board_supervisor.js
board_supervisor.js
board_supervisor_detail.js
add_members_assemble.js
members_assemble.js
members_assemble_detail.js

add_volunteer.js
volunteer.js
volunteer_detail.js
```

case_forms/
```
form_case.php	
form_BSRS5.php
form_employment_satif.php
form_familyship.php
form_health.php
form_interlocution.php
form_life.php
form_resource.php
form_satif.php
form_settlement.php
```

placement_case_forms/
```
form_settlement.php
```

supervisor_record/
```
signature
```

board_supervisor/
```
signature
```

members_assemble/ 
```
signature
```

# 2022/07/15資料庫：
```
current_case
forms
form_all_info
placement_case
placement_forms
placement_form_all_info
screening_type_keywords
screening_result_keywords
closed

calendar
supervisor_record
board_supervisor
members_assemble

volunteer
volunteer_hours_record
```


# 2022/07/15摘要：
```
個案管理
    開案個案
        1.增加ABC個案分級
        2.新增個案服務對象類別 兒少A拿掉 藥癮者RE
        3.開案編號 預設新增編號從資料庫抓最新的編號
        4.服務類別改名個案類別，顯示第一
        5.個案屬性 改名 類別屬性

    開案個案 社會資源運用表格
        1.日期點選日曆
        2.社工員抓帳號名稱

    開案個案 個案服務摘要表
        會談紀錄摘要表呈現問題陳述 在關懷員欄位前面

    未開案個案 簡短服務
        1.簡短諮詢服務改簡短服務
        2.phone.php、phone_detail_v2.php 負責同工改接案工作人員

    未開案個案 篩檢
        1.可新增 篩檢類型和篩檢結果
        2.相關異動資料庫：screening_type_keywords、screening_result_keywords

    選單(menu.php)
        方案管理 項目順序->計畫、活動、成果

    首頁(index.php)
        1.公告的負責人改名成承辦人員
        2.請假負責人刪除
```

```
個案管理 
    開案個案修改
        一、case_forms資料集內檔案：註解測試btn、新增/註解 轉級、轉案、結案btn
        二、修改開案個案 個案評估表內容、生活品質量表功能、轉級功能、結案功能
        三、生活品質量表修改
            1.計算分數
            2.顯示至摘要表
        四、case_all
            1.網址參數增加grade和gender
            2.設定case_detail網頁網址參數，不再使用資料庫URL欄位抓值
            3.更改生活品質量表life的摘要表欄位數量
        五、case_detail
            1.網址參數增加grade和gender
            2.服務摘要表顯示生活品質量表總分
            3.自動帶入性別gender
            4.轉級功能模態框與功能
            5.生活品質量表第二部分input type range抓值顯示
            6.麵包屑網址內容
            7.結案功能
        六、add_current_case
            1.check_update_currentcase_data檢查欄位功能增加檢查性別gender
            2.check_current_case_value開案欄位檢查功能修改
            3.新增至開案個案資料庫欄位新增grade、gender
        七、current_case
            1.新增顯示case_grade個案分級
        八、
            1.網址參數增加gender、gender帶入欄位設定、gender帶入欄位顯示
            2.check_update_trans_opencase_data gender欄位檢查功能
            3.gender新增至開案個案資料庫
    轉案修改
        一、counsel_detail.js、screening_detail.js、detail.js
            1.修改$("#trans_to_opencase_submit")送出轉案資料抓取資料庫性別欄位內容
```

```
個案管理 結案
    1.再次開案功能(未完成)、再次開案按鈕
    2.手動新增結案(按鈕)
    3.數位簽章功能測試(signature資料夾內容異動)
```

```
行政管理 會議管理
    1.會議管理 團督紀錄、理監事會議、會員大會新增督導簽核功能，並在行事曆提醒簽核
    2.新增會議記錄取消按鈕更改href轉址設定(javascript:history.back())
    3.修改檔案上傳bug
```

```
行政管理 志工管理
    1.修改新增志工欄位及資料庫設定
    2.修改志工一覽表查詢功能、顯示表格內容
    3.修改志工詳細資料欄位顯示及相關功能
    4.新增添加服務時數按鈕
    5.新增至工時數異動紀錄表
```

