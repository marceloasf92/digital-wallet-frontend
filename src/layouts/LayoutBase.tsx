import { Box } from "@mui/system";
import {
  useTheme,
  IconButton,
  Icon,
  useMediaQuery,
  Typography,
} from "@mui/material";
import {
  useAppThemeContext,
  useDrawerContext,
  useLoginContext,
} from "../contexts";

import { useState } from "react";

interface Props {
  children: React.ReactNode;
}

export const LayoutBase = ({ children }: Props): JSX.Element => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));

  const { toggleDrawerOpen } = useDrawerContext();

  const { themeName, toggleTheme } = useAppThemeContext();

  const { token } = useLoginContext();

  const [username] = useState(
    localStorage.getItem("@user:digital_wallet") || "usuário"
  );

  return (
    <Box height="100%" display="flex" flexDirection="column" gap={1}>
      <Box
        padding={1}
        display="flex"
        alignItems="center"
        justifyContent="center"
        height={theme.spacing(smDown ? 4 : mdDown ? 6 : 6)}
      >
        {smDown && (
          <IconButton onClick={toggleDrawerOpen}>
            <Icon>menu</Icon>
          </IconButton>
        )}
        {token && (
          <Box>
            <Typography
              fontSize={theme.spacing(smDown ? 3 : 5)}
              color="#7d2cff"
              margin={2}
            >
              Olá, {username.replaceAll('"', "").toUpperCase()}
            </Typography>
          </Box>
        )}
        {themeName === "light" ? (
          <Box flex={1} display="flex" justifyContent="flex-end">
            <IconButton onClick={toggleTheme}>
              <Icon>dark_mode</Icon>
            </IconButton>
          </Box>
        ) : (
          <Box flex={1} display="flex" justifyContent="flex-end">
            <IconButton onClick={toggleTheme}>
              <Icon color="action">light_mode</Icon>
            </IconButton>
          </Box>
        )}
      </Box>
      <Box flex={1} overflow="auto">
        {children}
      </Box>
    </Box>
  );
};
