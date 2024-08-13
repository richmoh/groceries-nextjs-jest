export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Equal Experts Grocery List</title>
      </head>
      <body>
        <header>
          <img src="/ee_logo.svg" alt="equal experts logo" />
        </header>
        {children}
      </body>
    </html>
  );
}
