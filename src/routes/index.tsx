import { useEffect } from "react";
import {
  Routes as RoutesDOM,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useLoginContext } from "../contexts";
import { Home, Login, Dashboard } from "../pages";

export const Routes = () => {
  let navigate = useNavigate();

  const { token } = useLoginContext();

  useEffect(() => {
    if (token) {
      return navigate("/dashboard");
    } else {
      return navigate("/");
    }
  }, [token]);

  return (
    <RoutesDOM>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<Navigate to="/" />} />
    </RoutesDOM>
  );
};
