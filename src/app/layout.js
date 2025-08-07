import Header from "@/components/Header";
import "./globals.css";
import config from "@/config";
import AppProvider from "@/redux/provider";
import MainLayout from "@/layouts/MainLayout";

export const metadata = {
  title: {
    default: config.appName,
    template: `${config.appName} | %s`,
  },
  description: "E-commerce app on Next.js",
  keywords: "E-commerce, online shopping",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en" >
      <body>
        <AppProvider>
          <MainLayout>
            <Header />
            {children}
          </MainLayout>
        </AppProvider>
      </body>
    </html>
  );
}
