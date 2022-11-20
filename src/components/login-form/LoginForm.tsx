import { Box } from "@mui/system";
import {
  Button,
  Typography,
  useMediaQuery,
  useTheme,
  TextField,
} from "@mui/material";

import LoginIcon from "@mui/icons-material/Login";

import { ReactNode, useState } from "react";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import { UsersService } from "../../services/api/users/Users";
import { useLoginContext } from "../../contexts";

interface Props {
  title?: string;
  icon?: ReactNode;
}

type UserSubmitForm = {
  username: string;
  password: string;
};

interface IError {
  status: string;
  message: string;
}

export const LoginForm = ({ title, icon }: Props): JSX.Element => {
  const { setToken, setUserLogin } = useLoginContext();
  let navigate = useNavigate();
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));

  const success = () => {
    setValues({
      username: "",
      password: "",
    });
    toast.success("Conta criada com sucesso!");
    navigate("/login");
  };
  const error = (errorMsg: IError) => {
    setValues({
      username: "",
      password: "",
    });
    if (errorMsg.message === "Username already exists!") {
      return toast.error("Usuário ou senha já cadastrados.");
    } else {
      return toast.error("Houve algum erro, tente mais tarde");
    }
  };

  const schema = yup.object().shape({
    username: yup.string().required("Username obrigatório"),
    password: yup.string().required("Senha obrigatória"),
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
  });

  const handleChange =
    (prop: keyof UserSubmitForm) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleRegister = (data: UserSubmitForm) => {
    try {
      UsersService.login(data, setToken, setUserLogin, success, error);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box border="1px solid" borderRadius="30px" paddingX={5} paddingY={12}>
        <Box display="flex" flexDirection="column" gap={2}>
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
              {title}
              {icon}
            </Box>
          </Typography>
          <form
            onSubmit={handleSubmit(handleRegister)}
            style={{ width: "100%" }}
          >
            <Box
              display="flex"
              alignItems="center"
              flexDirection="column"
              gap={2}
            >
              <TextField
                id="username"
                label="Username"
                helperText={errors.username?.message}
                variant="outlined"
                {...register("username")}
                name="username"
                value={values.username}
                onChange={handleChange("username")}
                type="text"
                error={errors.username?.message === undefined ? false : true}
                style={{ width: "100%" }}
              />
              <TextField
                id="password"
                label="Password"
                helperText={errors.password?.message}
                variant="outlined"
                {...register("password")}
                name="password"
                value={values.password}
                onChange={handleChange("password")}
                type="password"
                error={errors.password?.message === undefined ? false : true}
                style={{ width: "100%" }}
              />
              <Button
                variant="contained"
                endIcon={<LoginIcon />}
                color="success"
                type="submit"
                style={{
                  width: "100%",
                  height: theme.spacing(8),
                  fontSize: theme.spacing(2),
                }}
              >
                Login
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
};
