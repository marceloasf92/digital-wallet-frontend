import { Routes } from "./routes";
import { BrowserRouter } from "react-router-dom";
import { AppThemeProvider } from "./contexts/";

export const App = () => {
  return (
    <AppThemeProvider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </AppThemeProvider>
  );
};
