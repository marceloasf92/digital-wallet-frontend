import {
  Drawer,
  useTheme,
  Avatar,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  Icon,
  ListItemText,
  useMediaQuery,
} from "@mui/material/";
import { Box } from "@mui/system";
import { useNavigate, useResolvedPath, useMatch } from "react-router-dom";
import { useAppThemeContext, useDrawerContext } from "../../contexts";
import ngLogo from "../../assets/ngLogo.png";

interface IlistSideMenu {
  to: string;
  icon: string;
  label: string;
  onClick: (() => void) | undefined;
}

interface BoxProps {
  children: React.ReactNode;
}

const ListSideMenu = ({ to, icon, label, onClick }: IlistSideMenu) => {
  const { themeName } = useAppThemeContext();
  const navigate = useNavigate();
  // const resolvedPath = useResolvedPath(to);
  // const match = useMatch({ path: resolvedPath.pathname, end: false });

  const handleClick = () => {
    navigate(to);
    onClick?.();
  };
  return (
    <ListItemButton
      style={{
        backgroundColor: themeName === "dark" ? "#202124" : "#f7f6f3",
        padding: "20px",
      }}
      onClick={handleClick}
    >
      <ListItemIcon>
        <Icon>{icon}</Icon>
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );
};

export const SideMenu = ({ children }: BoxProps) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));

  const { isDrawerOpen, toggleDrawerOpen } = useDrawerContext();

  return (
    <>
      <Drawer
        open={isDrawerOpen}
        variant={smDown ? "temporary" : "permanent"}
        onClose={toggleDrawerOpen}
      >
        <Box
          width={theme.spacing(28)}
          height="100%"
          display="flex"
          flexDirection="column"
        >
          <Box
            width="100%"
            height={theme.spacing(20)}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Avatar
              sx={{ height: theme.spacing(12), width: theme.spacing(12) }}
              src={ngLogo}
            />
          </Box>
        </Box>

        <Divider />

        <Box flex={1}>
          <List component="nav" disablePadding={true}>
            <ListSideMenu
              icon="how_to_reg"
              to="/"
              label="Registre-se"
              onClick={smDown ? toggleDrawerOpen : undefined}
            />
          </List>
          <Divider />
          <List component="nav">
            <ListSideMenu
              icon="login"
              to="/login"
              label="Login"
              onClick={smDown ? toggleDrawerOpen : undefined}
            />
          </List>
        </Box>
      </Drawer>

      <Box height="100vh" marginLeft={smDown ? 0 : theme.spacing(28)}>
        {children}
      </Box>
    </>
  );
};
