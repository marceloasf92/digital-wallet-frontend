import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useTheme, useMediaQuery } from "@mui/material";

export const OptionMenu = ({ value, handleChange }: any): JSX.Element => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      <Box sx={{ width: "100%", margin: "10px" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="primary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
          style={{
            overflowY: "auto",
            fontSize: theme.spacing(smDown ? 6 : 8),
            display: "flex",
          }}
        >
          <Tab
            value="balance"
            label="Saldo atual"
            style={{ fontSize: theme.spacing(smDown ? 2 : 3) }}
          />
          <Tab
            value="transfer"
            label="Transferência"
            style={{ fontSize: theme.spacing(smDown ? 2 : 3) }}
          />
          <Tab
            value="transactionsSent"
            label="Transações Enviadas"
            style={{ fontSize: theme.spacing(smDown ? 2 : 3) }}
          />
          <Tab
            value="transactionsReceived"
            label="Transações Recebidas"
            style={{ fontSize: theme.spacing(smDown ? 2 : 3) }}
          />
        </Tabs>
      </Box>
    </>
  );
};
