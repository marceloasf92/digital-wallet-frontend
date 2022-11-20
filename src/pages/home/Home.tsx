import { LayoutBase } from "../../layouts";
import { RegisterForm } from "../../components/register-form/RegisterForm";
import Diversity3Icon from "@mui/icons-material/Diversity3";

export const Home = () => {
  return (
    <LayoutBase>
      <RegisterForm
        title="Bem-vindo"
        icon={<Diversity3Icon style={{ color: "#7d2cff", fontSize: "50px" }} />}
      />
    </LayoutBase>
  );
};
