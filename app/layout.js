import "./globals.css";
import { Toaster } from "sonner";


export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`antialiased `}
      >
        {children}
        <Toaster/>
      </body>
    </html>
  );
}
