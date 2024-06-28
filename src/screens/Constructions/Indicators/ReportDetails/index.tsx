import React, { useMemo } from 'react';
import {
  MaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import { Box, Grid, Typography, FormControlLabel, RadioGroup, Radio } from '@mui/material';

interface ServiceDetail {
  service_name: string;
  stpe_service_name: string;
  amount_execution: number;
  amount_media: number;
  price_unit: string;
  total_step: string;
  production_value: string;
  total_production_value: string;
}

interface PackageDetail {
  package_name: string;
  amount_executed: number;
  average_time: number;
  package_price: string;
  total_package: string;
  package_price_workmanship: string;
  total_package_workmanship: string;
}

type Detail = ServiceDetail | PackageDetail;

interface ReportDetailsProps {
  details: Detail[];
  onReportTypeChange: (value: string) => void;
  reportType: string;
}

const ReportDetails: React.FC<ReportDetailsProps> = ({ details, onReportTypeChange, reportType }) => {
  const serviceColumns = useMemo<MRT_ColumnDef<ServiceDetail>[]>(
    () => [
      { accessorKey: 'service_name', header: 'Serviço' },
      { accessorKey: 'stpe_service_name', header: 'Etapa do Serviço' },
      { accessorKey: 'amount_execution', header: 'Qtd. Executada' },
      { accessorKey: 'amount_media', header: 'Qtd. Média' },
      { accessorKey: 'price_unit', header: 'Preço Unitário' },
      { accessorKey: 'total_step', header: 'Total Etapa' },
      { accessorKey: 'production_value', header: 'Valor Produção' },
      { accessorKey: 'total_production_value', header: 'Valor Total Produção' },
    ],
    []
  );

  const packageColumns = useMemo<MRT_ColumnDef<PackageDetail>[]>(
    () => [
      { accessorKey: 'package_name', header: 'Pacote' },
      { accessorKey: 'amount_executed', header: 'Qtd. Executada' },
      { accessorKey: 'average_time', header: 'Tempo Médio/Dia' },
      { accessorKey: 'package_price', header: 'Preço Unitário' },
      { accessorKey: 'total_package', header: 'Total Pacote' },
      { accessorKey: 'package_price_workmanship', header: 'Preço Mão-de-Obra' },
      { accessorKey: 'total_package_workmanship', header: 'Total Mão-de-Obra' },
    ],
    []
  );

  const columns = reportType === 'service' ? serviceColumns : packageColumns;

  return (
    <Grid item xs={12} lg={12} sx={{ padding: 1 }}>
      <MaterialReactTable
        columns={columns as MRT_ColumnDef<Detail>[]}
        data={details}
        enableColumnFilters
        enableGrouping
        initialState={{ showColumnFilters: true }}
        renderTopToolbar={({ table }) => (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "1rem",
              padding: 2,
            }}
          >
            <Box
              sx={{
                position: "relative",
                "&::after": {
                  content: '""',
                  display: "block",
                  width: "30%",
                  height: "3px",
                  backgroundColor: "#1976d2",
                  position: "absolute",
                  bottom: 0,
                },
              }}
            >
              <Typography variant="h5" component="div" gutterBottom>
                Detalhes
              </Typography>
            </Box>
            <RadioGroup
              row
              value={reportType}
              onChange={(e) => onReportTypeChange(e.target.value)}
            >
              <FormControlLabel value="service" control={<Radio />} label="Serviços" />
              <FormControlLabel value="package" control={<Radio />} label="Pacotes" />
            </RadioGroup>
          </Box>
        )}
        enablePagination={false}
        enableBottomToolbar={false}
      />
    </Grid>
  );
};

export default ReportDetails;
