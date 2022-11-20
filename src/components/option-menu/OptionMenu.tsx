import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

export const OptionMenu = ({ value, handleChange }: any): JSX.Element => {
  return (
    <Box sx={{ width: "100%", margin: "10px" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="inherit"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        <Tab value="balance" label="Saldo atual" />
        <Tab value="transfer" label="Transferência" />
        <Tab value="transactions" label="Transações" />
      </Tabs>
    </Box>
  );
};
