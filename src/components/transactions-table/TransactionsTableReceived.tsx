import { Box } from "@mui/system";
import { IconButton, Skeleton, Typography } from "@mui/material";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { grey } from "@mui/material/colors";
import { useMemo, useState } from "react";
import moment from "moment";
import { useLoginContext } from "../../contexts";
import CachedIcon from "@mui/icons-material/Cached";
import { TransactionsService } from "../../services/api/transactions/Transactions";

export const TransactionsTableReceived = () => {
  const { userDataLogged, setUserDataLogged, token } = useLoginContext();

  const [pageSize, setPageSize] = useState(5);

  const columns = useMemo(
    () => [
      {
        field: "creditedAccountId",
        headerName: "Recebido de:",
        width: 200,
      },
      { field: "value", headerName: "Valor da transação", width: 200 },
      {
        field: "createdAt",
        headerName: "Data da transação",
        width: 200,
        renderCell: (params) =>
          moment(params.row.createdAt).format("YYYY-MM-DD HH:MM:SS"),
      },
    ],

    []
  );

  const handleUpdate = () => {
    TransactionsService.searchTransactions(token, setUserDataLogged);
  };
  return (
    <Box
      display="flex"
      width="100%"
      height="100%"
      justifyContent="center"
      alignItems="flex-start"
    >
      <Box
        sx={{
          height: 400,
          width: "80%",
        }}
      >
        <Box display="flex" alignItems="center" justifyContent="center">
          <Typography
            variant="h5"
            component="h3"
            sx={{ textAlign: "center", mt: 3, mb: 3 }}
          >
            Transações Financeiras Recebidas
          </Typography>

          <IconButton aria-label="cached" onClick={handleUpdate}>
            <CachedIcon />
          </IconButton>
        </Box>

        {userDataLogged?.length === 0 ? (
          <Skeleton
            variant="rounded"
            width="100%"
            height="100%"
            style={{ flex: 1 }}
          />
        ) : (
          <DataGrid
            columns={columns}
            rows={userDataLogged.receivedTransaction}
            getRowId={(row) => row.id}
            rowsPerPageOptions={[5, 10, 20]}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            getRowSpacing={(params) => ({
              top: params.isFirstVisible ? 0 : 5,
              bottom: params.isLastVisible ? 0 : 5,
            })}
            sx={{
              [`& .${gridClasses.row}`]: {
                bgcolor: (theme) =>
                  theme.palette.mode === "light" ? grey[200] : grey[900],
              },
            }}
          />
        )}
      </Box>
    </Box>
  );
};
