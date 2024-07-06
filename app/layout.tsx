import "./styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl-NL">
      <body>{children}</body>
    </html>
  );
}
