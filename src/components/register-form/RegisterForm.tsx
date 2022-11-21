import { Box } from "@mui/system";
import {
  Button,
  Typography,
  useMediaQuery,
  useTheme,
  TextField,
  styled,
  InputAdornment,
  IconButton,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

import { ReactNode, useState } from "react";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import { UsersService } from "../../services/api/users/Users";
import { useAppThemeContext } from "../../contexts";

interface Props {
  title?: string;
  icon?: ReactNode;
}

type UserSubmitForm = {
  username: string;
  password: string;
  showPassword: boolean;
};

interface IError {
  status: string;
  message: string;
}

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#7d2cff",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#7d2cff",
  },
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "#7d2cff",
    },
  },
});

export const RegisterForm = ({ icon }: Props): JSX.Element => {
  const { themeName } = useAppThemeContext();
  let navigate = useNavigate();
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));

  const success = () => {
    setValues({
      username: "",
      password: "",
      showPassword: false,
    });
    toast.success("Conta criada com sucesso!");
    navigate("/login");
  };
  const error = (errorMsg: IError) => {
    setValues({
      username: "",
      password: "",
      showPassword: false,
    });
    if (errorMsg.message === "Username already exists!") {
      return toast.error("Usuário ou senha já cadastrados.");
    } else {
      return toast.error("Houve algum erro, tente mais tarde");
    }
  };

  const schema = yup.object().shape({
    username: yup
      .string()
      .required("Usuário obrigatório")
      .min(3, "Usuário deve conter pelo menos 3 caracteres"),
    password: yup
      .string()
      .required("Senha obrigatória")
      .matches(
        /^(?=.*\d)(?=.*[A-Z])[0-9a-zA-Z$*&@#]{8,}$/,
        "A senha deve ser composta por pelo menos 8 caracteres, um número e uma letra maiúscula"
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSubmitForm>({
    resolver: yupResolver(schema),
  });

  const [values, setValues] = useState<UserSubmitForm>({
    username: "",
    password: "",
    showPassword: false,
  });

  const handleChange =
    (prop: keyof UserSubmitForm) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleRegister = (data: UserSubmitForm) => {
    UsersService.create(data, success, error);
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <Box
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        border="1px solid"
        borderRadius="30px"
        paddingY={10}
        bgcolor={themeName === "dark" ? "#303134" : "#FFF"}
        boxShadow={
          themeName === "dark"
            ? "0px 0px 5px 0px #FFFFFF"
            : "0px 0px 10px 0px #000000"
        }
        margin={2}
        width={smDown ? "80vw" : "40vw"}
      >
        <Box display="flex" flexDirection="column" gap={8}>
          <Typography
            variant={smDown ? "h5" : mdDown ? "h4" : "h3"}
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
          >
            <Box
              display="flex"
              alignItems="center"
              gap={1}
              justifyContent="center"
            >
              {icon}
            </Box>
          </Typography>
          <form
            onSubmit={handleSubmit(handleRegister)}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Box
              display="flex"
              alignItems="center"
              flexDirection="column"
              justifyContent="center"
              gap={2}
              width="80%"
            >
              <CssTextField
                id="username"
                label="Usuário"
                helperText={errors.username?.message}
                variant="outlined"
                {...register("username")}
                name="username"
                value={values.username}
                onChange={handleChange("username")}
                type="text"
                error={errors.username?.message === undefined ? false : true}
                style={{
                  width: "100%",
                }}
              />
              <CssTextField
                id="password"
                label="Senha"
                helperText={errors.password?.message}
                variant="outlined"
                {...register("password")}
                name="password"
                value={values.password}
                onChange={handleChange("password")}
                type={!values.showPassword ? "password" : "text"}
                error={errors.password?.message === undefined ? false : true}
                style={{ width: "100%" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                variant="contained"
                endIcon={<PersonAddIcon />}
                onMouseUp={() => (themeName === "dark" ? "#686565" : "#000000")}
                type="submit"
                style={{
                  width: "100%",
                  height: theme.spacing(8),
                  fontSize: theme.spacing(2),
                  backgroundColor: themeName === "dark" ? "#FFF" : "#000000",
                  color: themeName === "dark" ? "#303134" : "#FFF",
                }}
              >
                Registrar
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
};
