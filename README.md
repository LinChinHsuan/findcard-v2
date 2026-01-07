# 找。牌 FindCard - 電商平台重構版

這是一個專為撲克牌愛好者設計的電商平台。本專案經歷了從 Vue 2 到 Vue 3 的現代化架構重構，展示了在元件設計、狀態管理與程式碼品質控管上的專業實踐。

## 🛠 技術升級重點 (Vue 2 to Vue 3 Refactor)

本專案於 2025 ~ 2026 年初間完成了全面的架構遷移，主要更新包含：
- **框架升級**：從 Options API 遷移至 **Vue 3 Composition API (`<script setup>`)**，提升代碼邏輯的聚合性與可維護性。
- **狀態管理**：深化 **Pinia** 的應用，將全域狀態進一步模組化，並透過 `storeToRefs` 維持響應式資料流。
- **登入驗證**：將驗證邏輯從 UI 組件抽離至路由與 API 模組，提升代碼可維護性。
- **建置工具**：從 Vue CLI (Webpack) 轉換至 **Vite**，大幅優化 HMR (熱更新) 與建置速度。
- **代碼規範**：在既有的 ESLint 基礎上，進一步整合 **Prettier** 實施全域自動化格式化

## ✨ 核心功能

### 前台功能
- **完整購物流程**：商品列表瀏覽、分類過濾、商品詳細資訊、加入購物車及結帳流程。
- **互動機制**：商品收藏功能、互動式抽獎券、冷知識挑戰小遊戲。
- **響應式設計**：全站符合 RWD (Responsive Web Design)，優化跨裝置行動體驗。

### 後台管理系統 (CMS)
- **管理功能**：實作商品、訂單、優惠券之完整 CRUD 操作。
- **互動回饋**：封裝全域 Loading 元件與 Toast 通知，確保非同步操作之反饋體驗。


## 📦 技術棧 (Tech Stack)

- **Framework**: Vue 3 (Composition API)
- **State Management**: Pinia
- **Build Tool**: Vite
- **HTTP Client**: Axios
- **Styling**: SCSS, Bootstrap 5
- **Validation**: Vee-Validate
- **Code Quality**: ESLint, Prettier

## 🏁 如何執行專案

1. 複製專案：
   git clone https://github.com/LinChinHsuan/findcard.git

2. 安裝依賴：
   npm install

3. 啟動開發伺服器：
   npm run dev

4. 建置生產版本：
   npm run build

---
*本專案僅作為個人技術練習使用

# findcard-v2