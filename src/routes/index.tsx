import { Routes as RoutesDOM, Route, Navigate } from "react-router-dom";

export const Routes = () => {
  return (
    <RoutesDOM>
      <Route path="/" element={<p>Página inicial</p>} />
      <Route path="*" element={<Navigate to="/" />} />
    </RoutesDOM>
  );
};
