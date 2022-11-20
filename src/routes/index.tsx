import { Routes as RoutesDOM, Route, Navigate } from "react-router-dom";
import { Home, Login, Dashboard } from "../pages";

export const Routes = () => {
  return (
    <RoutesDOM>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<Navigate to="/" />} />
    </RoutesDOM>
  );
};
