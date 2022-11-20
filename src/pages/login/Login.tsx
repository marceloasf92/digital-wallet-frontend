import { LayoutBase } from "../../layouts";

import { LoginForm } from "../../components/login-form/LoginForm";
import ParaglidingIcon from "@mui/icons-material/Paragliding";

export const Login = () => {
  return (
    <LayoutBase>
      <LoginForm
        icon={
          <ParaglidingIcon style={{ color: "#7d2cff", fontSize: "50px" }} />
        }
      />
    </LayoutBase>
  );
};
