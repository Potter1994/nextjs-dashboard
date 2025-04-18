## Next.js App Router Course - Starter

This is the starter template for the Next.js App Router Course. It contains the starting code for the dashboard application.

For more information, see the [course curriculum](https://nextjs.org/learn) on the Next.js Website.

# 學習筆記

## 1. 介紹建置環境

## 2. CSS Styling

怎麼新增 global CSS file
兩種方式 of styling: Tailwind and CSS modules, 同一個 APP 同時使用也可以
使用第三方套件 clsx 新增有條件的 class name

#### Global styles

- 使用 import '@/app/ui/global.css'; 在你任何想要加入的 component 但通常會新增在 top-level component. 在 Next.js 就是 root layout(app/layout.tsx)

- 新增 global styles to your application by navigating to /app/layout.tsx

#### Tailwind

- global.css 裡面有引入了 tailwind 然後再 root layout 引入了 global.css 所以可以使用 tailwind

#### CSS modules

- scope CSS to a component 會自動 create unique class name, 所以不用擔心命名重複問題

- 使用 CSS module 建立的檔案需要 \*.module.css 結尾

#### 使用 clsx library to toggle class names

- <span className={clsx('flex items-center', {'bg-grey': status === 'pending'})} />
  a. 第二個參數物件，key 為 className， value 為 true 時代表使用這個 className

#### Other styling solutions

除了我們上述討論的方法，還有這些可以使用

- Sass which allows you to import .css and .scss files.

- CSS-in-JS libraries such as styled-jsx, styled-components, and emotion. 但是這個好像快要棄用了?

## 3. Optimizing Fonts and Images

#### Why optimize fonts?

[Cumulative Layout Shift](https://vercel.com/blog/how-core-web-vitals-affect-seo) 是 google 評價表現及使用者體驗的網站。他衡量頁面在載入過程中，元素是否因為樣式變動而「跳來跳去」，影響使用者的操作體驗。

字體如何造成 Layout Shift?

- 瀏覽器一開始使用預設系統字體來顯示文字。
- 當自訂自己在入後，會將原孩的文字替換掉。
- 若自訂字體的尺寸或間距不同，就會導致畫面元素被推擠、移動，造成 Layout Shift。

Next.js 提供 next/font 模組，可以有要解決字體造成的 CLS 問題

- Next.js 會在建置階段(build time) 就先下載好所需的自己檔案。
- 這些字體會被作為靜態資源(static) 一起部署在網站中。
- 使用者瀏覽網站時，不需要額外請求 Google Fonts 或外部字體資源，減少網路延遲和版面跳動的機會。

#### Why optimize images?

Next.js 提供 static assets, 像是照片, 放在根目錄 /public 資料夾中. 並透過以下方式引用

```js
<img src='/hero.png' />
```

不過這種傳統 HTML 的寫法有幾個需要手動處理的缺點:

1. 讓圖片具備響應式 (Responsive): 適應不同裝置螢幕大小
2. 指定各種裝置下的尺寸 (Image size): 需手動處理 srcset 或 <picture> 等元素
3. 避免 Layout Shift (畫面跳動): 圖片載入時若未先保留空間，會讓版面閃爍或移動。
4. 懶加載 (Lazy loading): 若圖片在畫面之外，也應該等到捲動時才載入，節省資源。
   Image Optimization 是一個大的主題，甚至可以單獨講了
   在這邊你可以使用 next/image component 自動優化你的圖片

#### The <Image> component

Next.js 的 Image Component 是一個 HTML <img> 的擴展 tag, 自動優化相關的功能

- 自動避免 Layout Shift: 在圖片加載時，會預留空間，防止畫面跳動提升使用體驗。
- 根據裝置尺寸調整圖片大小: 根據 viewport 自動調整，避免傳送過大的圖片。
- 預設使用 Lazy loading: 圖片會在進入 viewport 時才載入，節省載入資源，加快初始頁面速度。
- 支援現在圖片格式 (WebP、AVIF): 瀏覽器支援時，會自動使用效能更好的圖片格式。

## 4. Creating Layouts and Pages

#### Nested Routing (巢狀路由) - Next.js

Next.js 採用 "檔案系統為基礎的路由 (File-system routing)"，透過資料夾結構來對應 URL 路徑:

1. 資料夾結構 = URL 路徑

- app/page.tsx = /
- app/dashboard/page.tsx = /dashboard

2. layout.tsx 與 page.tsx

- app folder 底下只有 page.file 會是公開訪問的
- page.tsx: "必填的特殊檔案"，輸出一個 React component，該路由才會對外開放(即可已被訪問)
- layout.tsx: 可以用來建立該層(跟該層底下)路由的共用 UI (例如側邊覽、導覽列)
