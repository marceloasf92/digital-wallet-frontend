import { Routes as RoutesDOM, Route, Navigate } from "react-router-dom";
import { Home, Login } from "../pages";

export const Routes = () => {
  return (
    <RoutesDOM>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Navigate to="/" />} />
    </RoutesDOM>
  );
};
