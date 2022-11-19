import { Box } from "@mui/system";
import {
  Typography,
  useTheme,
  IconButton,
  Icon,
  useMediaQuery,
} from "@mui/material";
import { useDrawerContext } from "../contexts";

interface Props {
  children: React.ReactNode;
  title: string;
}

export const LayoutBase = ({ children, title }: Props): JSX.Element => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const { toggleDrawerOpen } = useDrawerContext();

  return (
    <Box height="100%" display="flex" flexDirection="column" gap={1}>
      <Box
        padding={1}
        display="flex"
        alignItems="center"
        height={theme.spacing(12)}
      >
        {smDown && (
          <IconButton onClick={toggleDrawerOpen}>
            <Icon>menu</Icon>
          </IconButton>
        )}
        <Typography variant="h5">{title}</Typography>
      </Box>
      <Box>Barra de Ferramentas</Box>
      <Box>{children}</Box>
    </Box>
  );
};
