import { Routes } from "./routes";
import { BrowserRouter } from "react-router-dom";
import { AppThemeProvider, DrawerProvider } from "./contexts/";
import { SideMenu } from "./components/side-menu/SideMenu";

export const App = () => {
  return (
    <AppThemeProvider>
      <DrawerProvider>
        <BrowserRouter>
          <SideMenu>
            <Routes />
          </SideMenu>
        </BrowserRouter>
      </DrawerProvider>
    </AppThemeProvider>
  );
};
