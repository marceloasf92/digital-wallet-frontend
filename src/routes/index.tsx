import { Routes as RoutesDOM, Route, Navigate } from "react-router-dom";
// import { Button } from "@mui/material";
// import { useDrawerContext } from "../contexts";
import { Dashboard } from "../pages";

export const Routes = () => {
  // const { toggleDrawerOpen } = useDrawerContext();

  return (
    <RoutesDOM>
      <Route path="/" element={<Dashboard />} />
      <Route path="*" element={<Navigate to="/" />} />
    </RoutesDOM>
  );
};
