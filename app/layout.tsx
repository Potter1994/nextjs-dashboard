import "@/app/ui/global.css";
import { inter } from "@/app/ui/fonts";
import { Metadata } from "next";

export const metadata: Metadata = {
  // title: "Acme Dashboard",
  title: {
    template: "%s | Acme Dashboard",
    default: "Acme Dashboard",
  },
  description: "The official Next.js Course Dashboard, built with App Router.",
  metadataBase: new URL("https://next-learn-dashboard.vercel.sh"),
  icons:
    "https://static-cdn.jtvnw.net/jtv_user_pictures/10662d89-629a-40f5-887e-0e72928d4c1f-profile_image-70x70.png",

  // openGraph: {title: ''} 傳社群可以設置的顯示樣式
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
