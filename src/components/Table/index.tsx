import { Grid } from "@mui/material";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";

import { MRT_Localization_PT_BR } from "material-react-table/locales/pt-BR";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { TableContainer } from "./styles";

interface TableProps<TData extends Record<string, any> = {}> {
  columns: MRT_ColumnDef<TData>[];
  data: TData[];
  height?: number;
}

export const Table = <TData extends Record<string, any> = {}>({
  columns,
  data,
  height = 530,
  ...rest
}: TableProps<TData>) => {
  const theme = createTheme({
    components: {
      MuiTableHead: {
        styleOverrides: {
          root: {
            "& .MuiTableCell-root": {
              color: "#2E3132",
              fontWeight: "bold",
            },
          },
        },
      },
    },
  });

  return (
    <Grid container>
      <TableContainer item lg={12}>
        <ThemeProvider theme={theme}>
          <MaterialReactTable
            columns={columns}
            data={data}
            localization={MRT_Localization_PT_BR}
            enableDensityToggle={false}
            enableHiding={false}
            enableStickyHeader
            enableFullScreenToggle={false}
            enableFilters={false}
            enableTopToolbar={false}
            enablePagination={false}
            {...rest}
            muiTablePaperProps={{
              elevation: 0,
            }}
          />
        </ThemeProvider>
      </TableContainer>
    </Grid>
  );
};
