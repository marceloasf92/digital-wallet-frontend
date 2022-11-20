import { Routes } from "./routes";
import { BrowserRouter } from "react-router-dom";
import { AppThemeProvider, DrawerProvider, LoginProvider } from "./contexts/";
import { SideMenu } from "./components/side-menu/SideMenu";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const App = () => {
  return (
    <AppThemeProvider>
      <DrawerProvider>
        <LoginProvider>
          <BrowserRouter>
            <SideMenu>
              <Routes />
              <ToastContainer autoClose={3000} />
            </SideMenu>
          </BrowserRouter>
        </LoginProvider>
      </DrawerProvider>
    </AppThemeProvider>
  );
};
