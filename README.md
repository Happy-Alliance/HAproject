# 2022/09/16更新:

```
case_all.php
add_case.php
reopencase.php
trans_closed.php
case_detail.php
phone_trans_to_opencase.php
current_case.php

save_login.php
index.php
logout.php

add_supervisor_record.php
supervisor_record_detail.php
add_members_assemble.php
add_board_supervisor.php
index.php
accounting_record_cash.php
add_accounting_record_cash.php


menu.php
case_report.php

```

database/
```
add_new_closed.php
update_case_trans_user.php
add_new_case.php
update_case_trans_grade.php
find_case_all.php
add_case_all.php
find_case.php

save_login_record.php
timeout_logout.php
check_login.php

update_supervisor_record_data_detail_signature.php
add_new_upload_supervisor_record.php
add_new_supervisor_record.php
find_signature_notice.php
find_ar_cash_yearlist.php

add_new_accounting_record_cash.php
update_accounting_record_cash_data.php
find_accounting_record_cash.php
test_arcb.php(測試用)
find_accounting_record_cash_balance.php

add_form_interlocution_ques_type_keywords.php
find_form_interlocution_ques_type_keywords.php

add_update_case_detail_form.php
find_current_case_for_report.php

```

js/
```
case_all.js
case_detail.js
trans_case.js
reopencase.js
trans_closed.js
add_current_case.js
current_case.js
detail.js
case_all_all.js

login.js

add_supervisor_record.js
supervisor_record_detail.js
add_members_assemble.js
members_assemble_detail.js	
add_board_supervisor.js
board_supervisor_detail.js
index.js
accounting_record_cash.js
add_accounting_record_cash.js
accounting_record_cash_yearlist.js

case_report.php
```

javascript/
```
datepickerTw3.js
```

case_forms/
```
form_life.php
form_case.php
form_settlement.php
form_employment_satif.php
form_BSRS5.php
```

signature/
```
```

resume/
```
```

upload/
```
```

supervisor_record/
```
signature
upload
```

board_supervisor/
```
signature
upload
```

members_assemble/ 
```
signature
upload
```

# 2022/09/16資料庫：
```
current_case
forms
form_all_info
closed

login_record

supervisor_record
board_supervisor
members_assemble
signature_notice

accounting_record_cash
accounting_record_cash_balance

form_interlocution_queskeywords

case_report
```


# 2022/09/16摘要：
```
個案管理
    開案個案
        1.	修改開案個案新增、修改詳細資料設定
        2.	修改開案個案轉級、轉案功能、再次開案功能
        3.	開案個案資料庫新增類別屬性階段、個案負責人
        4.	修改生活品質量表第一部份計分方式功能
        5.	修改case_forms資料夾內的檔案設定
        6.	case_all.php修改返回鍵設定
        7.  個案評估表、結案評估、就業量表、會談紀錄表 新增或有內容更新時，記數寫入工作報表資料庫case_report作統計使用
        8.  開案個案 會談紀錄 問題類型關鍵字
        9.  Menu.php 中添加開案個案工作報表連結
        10. 開案個案工作報表功能
```

```
行政管理 會計管理
        1.  顯示除了兒少單據和轉帳的零用金紀錄(1~12月)上期結餘、總收入、總支出、本期結餘資料
        2.	修改零用金紀錄 insert/update兒少單據、轉帳、日記帳功能
        3.	新增accounting_record_cash_balance資料庫作為紀錄每一期資料的總收入、總支出、上期結餘數據
```

```
行政管理 會議管理
        1.  修改團督紀錄、理監事會議、會員大會新增檔案、首頁提醒主管簽核、上傳簽名功能
```

```
將引用的css或js網址改成用檔案引用的方式：
https://unpkg.com/bootstrap-table@1.18.0/dist/bootstrap-table.min.css
	css/bootstrap-table.min.css
https://cdn.datatables.net/1.10.16/css/jquery.dataTables.min.css
	css/jquery.dataTables1.10.16.min.css
https://cdn.datatables.net/buttons/1.5.1/css/buttons.dataTables.min.css
	css/buttons.dataTables1.5.1.min.css
https://cdn.datatables.net/1.10.16/js/jquery.dataTables.min.js
	javascript/jquery.dataTables1.10.16.min.js
https://cdn.datatables.net/buttons/1.2.2/js/dataTables.buttons.min.js
	javascript/dataTables1.2.2.buttons.min.js
https://cdnjs.cloudflare.com/ajax/libs/jszip/2.5.0/jszip.min.js
	javascript/jszip2.5.0.min.js
https://cdn.datatables.net/buttons/1.2.2/js/buttons.html5.min.js
	javascript/buttons1.2.2.html5.min.js
https://unpkg.com/bootstrap-table@1.18.0/dist/bootstrap-table.min.js
	javascript/bootstrap1.18.0-table.min.js
https://cdn.bootcss.com/bootstrap-table/1.11.1/locale/bootstrap-table-zh-TW.min.js
	javascript/bootstrap-table1.11.1-zh-TW.min.js


index.php 登入
1.	自動登出機制，會話清空設定
    (每個頁面添加 <?php include("database/timeout_logout.php"); ?> 語法)
2.	登入打卡，以及寫入資料庫
```

