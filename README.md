# 教材庫存管理儀表板

給 Numeracy Lab 教學部使用的輕量庫存管理網站。資料存在 Google Sheets，網站讀取後呈現儀表板與分析頁。

## 目錄結構

```
inventory-dashboard/
├── index.html         儀表板首頁（KPI、警示、倉點分佈、近期交易）
├── items.html         品項清單（可搜尋、篩選）
├── detail.html        品項詳情（四倉分佈、交易紀錄）
├── stale.html         呆滯品管理
├── assets/
│   ├── style.css      整站樣式
│   ├── config.js      設定檔：Google Sheets 網址、營期日期、呆滯門檻
│   ├── app.js         共用函式：CSV 解析、庫存計算、格式化
│   ├── dashboard.js   儀表板邏輯
│   ├── items.js       品項清單邏輯
│   ├── detail.js      品項詳情邏輯
│   └── stale.js       呆滯品邏輯
├── data/              示範資料（連接 Google Sheets 後可忽略）
│   ├── skus.csv
│   ├── transactions.csv
│   ├── warehouses.csv
│   └── audits.csv
└── README.md
```

## 本地預覽

由於瀏覽器安全限制，直接雙擊 `index.html` 無法載入 CSV。請用簡易伺服器：

```bash
# 在此資料夾內執行任一指令
npx serve .          # 需要 Node.js
# 或
python -m http.server 8000
```

然後打開瀏覽器連 `http://localhost:8000/`。

## 連接 Google Sheets（正式資料）

### 步驟 1：把 4 張工作表各自發布成 CSV

1. 開啟 Google Sheets → `檔案` → `共用` → `發布到網路`
2. 在「連結」分頁：
   - 選擇要發布的工作表（逐一發布，不能選「整份文件」）
   - 格式選 `逗號分隔值 (.csv)`
3. 點「發布」→ 複製產生的 URL
4. 每一張表都做一次（SKU 主檔、庫存交易、倉點、盤點紀錄）

### 步驟 2：填入 `assets/config.js`

```js
const CONFIG = {
  useLiveData: true,   // ← 改為 true
  sheets: {
    skus:         "貼上 SKU 主檔的 CSV 網址",
    transactions: "貼上 庫存交易的 CSV 網址",
    warehouses:   "貼上 倉點的 CSV 網址",
    audits:       "貼上 盤點紀錄的 CSV 網址"
  },
  camps: [ /* 更新營期日期 */ ],
  staleMonths: 12
};
```

### 步驟 3：確認欄位名稱

Google Sheets 的欄位名稱必須和示範 CSV 一致（見下方表格）。

## Google Sheets 欄位規格

### `SKU 主檔`（表名：skus）

| 欄位 | 必填 | 說明 | 範例 |
|---|---|---|---|
| SKU | ✓ | 唯一編號 | A101 |
| 品名 | ✓ | 教材名稱 | 七年級數學素養題型 |
| 類別 | ✓ | A/B/C | A |
| 季節線 | ✓ | 冬/夏/全年 | 夏 |
| 安全庫存 | ✓ | 低於此數字會警示 | 1500 |
| 單位 |   | 本/組/片等 | 本 |
| 每箱數量 |   | 用於箱數換算 | 30 |
| 狀態 | ✓ | 活躍/汰除中 | 活躍 |
| 備註 |   | 自由文字 | 夏令營主教材 |

### `庫存交易`（表名：transactions）

| 欄位 | 必填 | 說明 | 範例 |
|---|---|---|---|
| 日期 | ✓ | YYYY-MM-DD | 2026-05-10 |
| SKU | ✓ | 對應主檔 SKU | A101 |
| 類型 | ✓ | 入庫/出庫/調撥/盤點調整 | 入庫 |
| 來源倉 | 條件 | 出庫/調撥必填（代碼） | OF |
| 目的倉 | 條件 | 入庫/調撥必填（代碼） | XL |
| 數量 | ✓ | 正整數 | 3000 |
| 對應事件 |   | 事件名稱 | 2026夏令營 |
| 登錄人 |   | 姓名 | Amy |
| 備註 |   | 自由文字 |   |

### `倉點`（表名：warehouses）

| 欄位 | 必填 | 說明 | 範例 |
|---|---|---|---|
| 代碼 | ✓ | 2 碼縮寫 | SK |
| 倉點名稱 | ✓ |   | 深坑倉庫 |
| 角色 | ✓ |   | 中期週轉倉 |
| 備註 |   |   |   |

### `盤點紀錄`（表名：audits）

| 欄位 | 說明 |
|---|---|
| 盤點日 | YYYY-MM-DD |
| SKU | 對應主檔 |
| 倉點 | 代碼 |
| 帳面數 |   |
| 實際數 |   |
| 差異 | 實際 − 帳面 |
| 盤點人 |   |
| 備註 |   |

## 部署到 GitHub Pages

1. 登入 GitHub，建立新 repo（建議名稱：`inventory-dashboard`，設為 Public 或 Private）
2. 將整個 `inventory-dashboard/` 資料夾推到 repo
3. Repo 頁面 → `Settings` → `Pages`
4. `Source` 選 `Deploy from a branch`、`Branch` 選 `main` / `root`
5. 幾分鐘後，網址會是：`https://<你的帳號>.github.io/inventory-dashboard/`

> 若資料敏感不想公開，可將 repo 設為 Private，僅授權成員可看；或改用 Cloudflare Pages / Vercel 加密碼保護。

## 設定營期日期

編輯 `assets/config.js` 的 `camps` 陣列：

```js
camps: [
  { name: "2026 冬令營", date: "2026-02-10", students: 1500 },
  { name: "2026 夏令營", date: "2026-07-15", students: 4000 }
]
```

儀表板會自動抓「距今最近的未來營期」做倒數。

## 常見問題

**Q1：助理直接改 Google Sheets，網站會自動更新嗎？**
會。但 Google 的 CSV 發布網址有 5–10 分鐘快取，非即時。重新整理網頁可刷新。

**Q2：不希望助理誤刪資料怎麼辦？**
在 Google Sheets 使用「保護範圍」功能，鎖住標題列與公式欄；也可設定「編輯權限」只開放特定人員。

**Q3：想加新的倉點、新類別怎麼辦？**
- 加倉點：在 `warehouses` 表新增一列，網站會自動顯示新欄
- 加類別：在 `items.js` 的篩選下拉選單中新增 option

**Q4：資料量變大會不會慢？**
在 500 SKU × 5000 筆交易以下，瀏覽器計算是瞬間的。超過 1 萬筆交易可再討論效能優化。
