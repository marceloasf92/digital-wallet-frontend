import {
  Typography,
  Skeleton,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Box } from "@mui/system";
import { useLoginContext } from "../../contexts";
import CachedIcon from "@mui/icons-material/Cached";
import { UsersService } from "../../services/api/users/Users";

export const BoxBalance = () => {
  const { balance, token, setBalance } = useLoginContext();
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClick = () => {
    UsersService.showBalance(token, setBalance);
  };

  console.log(balance);

  return (
    <Box height="100%" width="100%">
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <Box
          borderRadius="30px"
          border="1px solid"
          padding="25px"
          width="50%"
          margin={2}
        >
          <Typography
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            gap={2}
            fontSize={theme.spacing(smDown ? 4 : 6)}
          >
            R${" "}
            {Number(balance) >= 0 ? (
              <>{Number(balance).toFixed(2).replace(".", ",")}</>
            ) : (
              <>
                <Skeleton
                  variant="rounded"
                  width={100}
                  height={60}
                  style={{ flex: 1 }}
                />
              </>
            )}
            <IconButton aria-label="cached" onClick={handleClick}>
              <CachedIcon />
            </IconButton>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
