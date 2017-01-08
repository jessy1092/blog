blog
=====

## 簡介

Lee 的部落格，使用 react 開發。

## 資源介紹

使用 `webpack` 做建置工具，專案架構使用 `react-router`、`redux`，搭配 `eslint`、`react-storybook` 與 `jest` 開發，支援 `ES6`、`stage-3` 語法。

## 如何開始

- 安裝 nodejs v6 以上的版本
- 安裝套件: `npm i` or `yarn`

#### 踏出第一步

啟動開發 server

```
npm start
```

便可在 <http://localhost:3000> 看到本地伺服器～

啟動 storybook server

```
npm run storybook
```

便可在 <http://localhost:8000> 看到 storybook 開發伺服器～

#### npm script

- **npm start**: 啟動開發 server
- **npm run dev**: 跟 `npm start` 一樣
- **npm run demo**: 使用 `demo` 參數打包專案，部署在測試機。
- **npm run build**: 使用 `production` 參數打包專案，部署在正式機。
- **npm run lint**: 跑 eslint 跟 stylelint 檢查 coding style
- **npm run storybook**: 跑 storybook
- **npm test**: 跑 jest 測試

## ENV
