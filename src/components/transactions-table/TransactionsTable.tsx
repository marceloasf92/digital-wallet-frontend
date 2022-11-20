import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { transactions } from "../../transactions";
import { grey } from "@mui/material/colors";
import { useMemo, useState } from "react";
import moment from "moment";

export const TransactionsTable = () => {
  const [pageSize, setPageSize] = useState(5);

  const columns = useMemo(
    () => [
      {
        field: "debitedAccountId",
        headerName: "Transferido de:",
        width: 200,
      },
      {
        field: "creditedAccountId",
        headerName: "Recebido por:",
        width: 200,
      },
      { field: "value", headerName: "Valor da transação", width: 200 },
      {
        field: "createdAt",
        headerName: "createdAt",
        width: 200,
        renderCell: (params) =>
          moment(params.row.createdAt).format("YYYY-MM-DD HH:MM:SS"),
      },
    ],
    []
  );
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
        <Typography
          variant="h5"
          component="h3"
          sx={{ textAlign: "center", mt: 3, mb: 3 }}
        >
          Transações Financeiras
        </Typography>
        <DataGrid
          columns={columns}
          rows={transactions}
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
      </Box>
    </Box>
  );
};
