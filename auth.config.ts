import type { NextAuthConfig } from 'next-auth'

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  // callbacks: 流程控制點 (想像成可以監聽 jwt、signIn、authorized 等事件)
  // 在登入、拿 session、middleware 授權時，自己客製化要不要允許、改資料、做跳轉等
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard')
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false;
      } else if (isLoggedIn) {
        // URL 第二個參數會被自動取用 base url 而已
        return Response.redirect(new URL('/dashboard', nextUrl))
      }
      return true
    },
  },
  // providers: 登入方式的設定表 
  // 你要支援那些登入? 例如 Google、GitHub、Credentials 自己驗證帳密...
  providers: []
} satisfies NextAuthConfig