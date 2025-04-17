## Next.js App Router Course - Starter

This is the starter template for the Next.js App Router Course. It contains the starting code for the dashboard application.

For more information, see the [course curriculum](https://nextjs.org/learn) on the Next.js Website.

# 學習筆記

## 1. 介紹建置環境

## 2. CSS Styling

怎麼新增 global CSS file
兩種方式 of styling: Tailwind and CSS modules, 同一個 APP 同時使用也可以
使用第三方套件 clsx 新增有條件的 class name

### Global styles

- 使用 import '@/app/ui/global.css'; 在你任何想要加入的 component 但通常會新增在 top-level component. 在 Next.js 就是 root layout(app/layout.tsx)

- 新增 global styles to your application by navigating to /app/layout.tsx

### Tailwind

- global.css 裡面有引入了 tailwind 然後再 root layout 引入了 global.css 所以可以使用 tailwind

### CSS modules

- scope CSS to a component 會自動 create unique class name, 所以不用擔心命名重複問題

- 使用 CSS module 建立的檔案需要 \*.module.css 結尾

### 使用 clsx library to toggle class names

- <span className={clsx('flex items-center', {'bg-grey': status === 'pending'})} />
  a. 第二個參數物件，key 為 className， value 為 true 時代表使用這個 className

### Other styling solutions

除了我們上述討論的方法，還有這些可以使用

- Sass which allows you to import .css and .scss files.

- CSS-in-JS libraries such as styled-jsx, styled-components, and emotion. 但是這個好像快要棄用了?
