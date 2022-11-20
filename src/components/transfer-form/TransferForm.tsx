import { Box } from "@mui/system";
import {
  Button,
  Typography,
  useMediaQuery,
  useTheme,
  TextField,
  styled,
} from "@mui/material";

import PaidIcon from "@mui/icons-material/Paid";

import { ReactNode, useState } from "react";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { toast } from "react-toastify";

import { useAppThemeContext, useLoginContext } from "../../contexts";
import { TransactionsService } from "../../services/api/transactions/Transactions";

interface Props {
  title?: string;
  icon?: ReactNode;
}

type UserSubmitForm = {
  username: string;
  cashOut: string;
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

export const TransferForm = ({ icon }: Props): JSX.Element => {
  const { themeName } = useAppThemeContext();
  const { token } = useLoginContext();
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));

  const success = () => {
    setValues({
      username: "",
      cashOut: "",
    });
    toast.success("Transferência concluída com sucesso.");
  };
  const error = (errorMsg: IError) => {
    setValues({
      username: "",
      cashOut: "",
    });
    if (errorMsg.message === "You are not allowed to transfer to yourself.") {
      return toast.error(
        "Não é possível realizar a transferência para a conta de origem."
      );
    } else if (errorMsg.message === "Username doesn't exist.") {
      return toast.error("Usuário não encontrado");
    } else {
      return toast.error("Houve algum erro, tente mais tarde.");
    }
  };

  const schema = yup.object().shape({
    username: yup.string().required("Usuário obrigatório"),
    cashOut: yup
      .number()
      .positive("Informe um valor positivo")
      .required("Número obrigatória")
      .typeError("Favor informe um valor."),
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
    cashOut: "",
  });

  const handleChange =
    (prop: keyof UserSubmitForm) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleTransfer = (data: UserSubmitForm) => {
    TransactionsService.transfer(data, token, success, error);
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
        minWidth="50%"
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
            onSubmit={handleSubmit(handleTransfer)}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Box
              display="flex"
              alignItems="center"
              flexDirection="column"
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
                style={{ width: "100%" }}
              />
              <CssTextField
                id="cashOut"
                label="Valor"
                helperText={errors.cashOut?.message}
                variant="outlined"
                {...register("cashOut")}
                name="cashOut"
                value={values.cashOut}
                onChange={handleChange("cashOut")}
                type="number"
                error={errors.cashOut?.message === undefined ? false : true}
                style={{ width: "100%" }}
              />
              <Button
                variant="contained"
                endIcon={<PaidIcon />}
                type="submit"
                style={{
                  width: "100%",
                  height: theme.spacing(8),
                  fontSize: theme.spacing(2),
                  backgroundColor: themeName === "dark" ? "#FFF" : "#000000",
                  color: themeName === "dark" ? "#303134" : "#FFF",
                }}
              >
                Transferir
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
};
