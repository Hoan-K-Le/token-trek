import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "./providers";
import PageLink from "./components/links/PageLink";
import Icon from "./components/Icon/Icon";
import FormInput from "./components/Inputs/FormInput";
import CustomSelect from "./components/Inputs/CustomSelect";
import Theme from "./components/Buttons/Theme/Theme";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Token Trek",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Providers>
        <body className={`${inter.className} bg-slate900 pt-5`}>
          <nav className="font-medium container flex items-center justify-between mx-auto">
            <ul className="text-white100 text-1xl flex">
              <li>
                <PageLink id="coinsLink" href="/" text="Coins" />
              </li>
              <li>
                <PageLink
                  id="portfolioLink"
                  href="../pages/Portfolio"
                  text="Portfolio"
                />
              </li>
            </ul>

            <form className="text-white100 flex gap-5" action="">
              <div className="relative flex items-center">
                <Icon
                  className="text-xl absolute ml-2.5"
                  iconVariant="search"
                />
                <FormInput
                  label="Search"
                  id="search"
                  type="text"
                  name="search"
                  placeholder="Search"
                />
              </div>

              <CustomSelect />
              <Theme />
            </form>
          </nav>
          {children}
        </body>
      </Providers>
    </html>
  );
}
