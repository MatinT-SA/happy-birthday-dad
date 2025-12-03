import "./styles/globals.css";

export const metadata = {
  title: "تولدت مبارک بابا",
  description: "صفحه ویژه تبریک تولد پدر",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body className="antialiased font-iransans">{children}</body>
    </html>
  );
}
