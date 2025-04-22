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
- 當自訂自己在入後，會將原來的文字替換掉。
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
  layout.tsx 如果該層某些或底下不想套用 (使用 pathname 或者 (dir) 資料夾分組的方法去控制)

#### Root layout

/app/layout.tsx 是一定要有的在每個 Next.js application，你在這加的 UI 會被 shared scroll all pages in your application.
可以操作你的 <html> and <body> tags, and add metadata

layout.tsx 目的就是為了 share UI

## 5. Navigation Between Pages

#### The <Link> component

- 會使用 browser 的 window.history.pushState() 更改 URL，不會重新載入整頁
- 在 Server Component 一樣能使用他，他會被序列化然後類似於某個 tag (@link 大概這樣) 來讓 Client Component hydration
- 由於 Next.js 會自動根據 路由段落(route segment) 來做程式碼切格(code-splitting) 所以只會載入當前 route 的 JS
- 有 prefetch 的功能可以預先取回 code for the linked route in the background，prefetch 只有在 production 的環境下有用，他只要出現在 viewport 看到就會 prefetch，主要是靠著

```
<link rel='prefetch' href="/xxx">做到，當然也可以關掉 prefetch 的功能。 (他實際做法應該是直接去 fetch 然後存在某個 cacheModule 中)
[Link 相關屬性](https://nextjs.org/docs/pages/api-reference/components/link)
```

#### Pattern: Showing active links

需要使用 Next.js 提供的 hook 叫做 usePathname()，然後你就能確認 path 來去時做這個 pattern。
但是 usePathname() 是 React hook，所以必須把你的 nav-links.tsx 轉變成 Client Component， 加上 "use client" 在檔案類的程式碼最上方，然後 import usePathname() from 'next/navigation'; 如果你沒有轉成 Client Component 他也會有錯誤提示提醒你 usePathname 屬於 React hook 必須轉成 Client Component。

再使用 clsx 或隨便 CSS 去控制 Link 的樣式。

## 6. 與 Vercel 連動

#### 故障排除

- bcrypt 有些環境會有 Module error，再更改為 bcryptjs 替代。

## 7. Fetching Data

#### RSC 相關資料

- [RSC 認識](https://oldmo860617.medium.com/%E5%BE%9E-next-js-13-%E8%AA%8D%E8%AD%98-react-server-components-37c2bad96d90)
- [RSC 實踐](https://juejin.cn/post/7457011188167294976)
- Next.js 能使用 RSC 主要是靠著他的 Turbopack + SWC + webpack 做出來的 (react-server-dom-webpack 這個包是重點)

#### 使用 Server Component to fetch Data (RSC)

## Next.js 使用 "React Server Component"(RSC) 有幾個好處

- Server Component 支援 JavaScript Promise 來取得非同步任務提供猿聲解決方案。可以使用 async/await 語法而不需要使用 useEffect、useState 其他資料取得
- Server Component 跑在 server 上，所以昂貴的 fetch and logic 會在 server，只有傳送 result 給 client 端。
- 因為 Server Component 跑在 server，所以可以直接操作 DB 無須額外的 API 層

## SQL query 一些用法

在 SQL 如果你只 fetch 你需要的 data 效能會稍微提升

```
const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
```

## 8. Static and Dynamic Rendering

#### What is Static Rendering?

透過靜態渲染 (Static Rendering)，data fetching and rendering 發生在 server at build time(when you deploy) 或者 when revalidating data(重新驗證資料)
優點:

- Faster Website: 當部署到 Vercel 等平台，預先渲染的內容可以被快取在全球範圍內分發。可確保世界各地的使用這能夠更快、更可靠的存取你網站內容。

- Reduce Server Load: 由於內容已被快取，伺服器不必為每個用戶動態生成內容。可以降題計算成本。

- SEO: 預先渲染的內容更容易被搜尋引擎爬蟲索引，可以提高排名。
  靜態渲染對於沒有資料或跨使用者共享資料的 UI 很有用，例如產品頁面。但她可能不太適合定期更新個人化資料的儀錶板。

#### Dynamic Rendering

透過動態渲染，內容會在請求時(使用者訪問頁面時) 在伺服器上為每個使用者渲染。
優點:

- 即時數據(Real-Time Data): 動態渲染可以讓你的應用程式顯示即時或頻繁更新的資料。

- 使用者特定內容(User-Specific Content): 更容易提供個人化資料，例如儀表板或使用者設定文件，並根據使用者互動更新資料。

- 請求時資訊(Request Time Information): 動態渲染可讓你存取只能在請求時知道的訊息，例如 cookie 或 URL 搜尋參數。

## 9. Streaming(串流傳輸)

#### What is streaming?

Streaming 是一種資料傳輸技術，他允許將路由分解為更小的 "chunks(區塊)" ，並在準備好時逐步將他們從伺服器串流傳輸到客戶端。
透過 Streaming，你可以避免太慢的資料請求阻塞整個頁面。這使得用戶能夠查看頁面的各個部分並進行交互，而無需等待所有資料加載完畢才能向用戶顯示任何 UI。
Streaming 與 React 的元件模型配合得很好，因為每個元件都可被視為一個 "chunk(區塊)"
Next.js 中時做串留有兩種方法:

1. 在 page level, 使用 loading.tsx file(為你建立 <Suspense>)
2. 在 component level, 使用 <Suspense> 實現更精細的控制。

#### Fixing the loading skeleton bug with route groups

- 可以使用 [Route Group](https://nextjs.org/docs/app/building-your-application/routing/route-groups) 將 page.tsx 跟 loading.tsx 或者 layout.tsx 搬移到 /(overview) 來控制 loading.tsx、layout.tsx 作用的範圍，就不會作用到子路由了。

#### Deciding where to place your Suspense boundaries(決定 Suspense 的邊界在哪)

Suspense 的界線取決於以下幾點:

1. 你希望使用者如何體驗 the page as it streams.
2. What content you want to prioritize 你想優先考慮那些內容
3. If the components rely(依賴) on data fetching.

照著範例的儀表板頁面，其實沒有正確答案。

- 可以 stream 整個 page 就像我們一開始使用 loading.tsx ，但是如果其中一個 component fetch data 很慢，會導致更長的載入時間。
- 可以單獨 stream every component individually(單獨地)，但是會導致 UI 在準備就緒時彈出在螢幕上。
- 也可以透過 stream page sections(頁面部分像<CardWrapper />) 建立交錯效果，但需要包裝元件。

## 10. Partial Prerendering (部分渲染)

Next.js 14 引入的實驗性還不是穩定版本，不推薦在產品中使用

1. pnpm install next@canary
2. 在 next.config.ts 新增 nextConfig 的設定

- experimental: {ppr: 'incremental'}

3. 在檔案(layout.tsx 或 page.tsx) 最上方 export const experimental_ppr = true;

然後他就會自動識別，基本仰賴 Suspense 來認定為 dynamic
