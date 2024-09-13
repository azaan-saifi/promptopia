import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Nav from "@components/Nav";
import "@styles/globals.css";

export const metadata = {
  title: "Promptopia",
  description: "Create and Share AI Prompts",
};

const Layout = ({ children }) => {
  return (
    <html lang="en">
      <ClerkProvider
        appearance={{
          baseTheme: dark,
          elements: { formButtonPrimary: "primary-orange" },
        }}
      >
        <body>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </body>
      </ClerkProvider>
    </html>
  );
};

export default Layout;
