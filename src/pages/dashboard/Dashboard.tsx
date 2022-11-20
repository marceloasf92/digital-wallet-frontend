import { useState } from "react";
import { BoxBalance } from "../../components/box-balance/BoxBalance";
import { OptionMenu } from "../../components/option-menu/OptionMenu";
import { LayoutBase } from "../../layouts";

export const Dashboard = (): JSX.Element => {
  const [value, setValue] = useState("balance");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <LayoutBase>
      <OptionMenu value={value} handleChange={handleChange} />
      {value === "balance" && <BoxBalance />}
    </LayoutBase>
  );
};
