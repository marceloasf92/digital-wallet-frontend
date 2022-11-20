import { LayoutBase } from "../../layouts";
import { RegisterForm } from "../../components/register-form/RegisterForm";
import Diversity3Icon from "@mui/icons-material/Diversity3";

export const Home = () => {
  return (
    <LayoutBase>
      <RegisterForm
        title="Bem-vindo"
        icon={<Diversity3Icon fontSize="large" />}
      />
    </LayoutBase>
  );
};
