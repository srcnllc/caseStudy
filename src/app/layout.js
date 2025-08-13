import "./globals.css";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
        {children}
      </body>
    </html>
  );
}
