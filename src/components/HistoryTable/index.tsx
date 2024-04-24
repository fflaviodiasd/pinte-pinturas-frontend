import React, { useMemo } from 'react';
import { MaterialReactTable, useMaterialReactTable, type MRT_ColumnDef } from "material-react-table";

const HistoryTable = ({ historyData }:any) => {
  // console.log('historyData>:', historyData)
  const columns = useMemo<MRT_ColumnDef<any>[]>(() => [
    {
      accessorKey: 'name',
      header: 'Nome Completo',
      enableEditing: false,
    },
    {
      accessorKey: 'inclusion_dt',
      header: 'Data de Inclusão',
      enableEditing: false,
    },
    {
      accessorKey: 'exit_dt',
      header: 'Data de Saída',
      enableEditing: false,
    },
    {
      accessorKey: 'profile',
      header: 'Perfil',
      enableEditing: false,
    },
  ], []);

  const tableInstance = useMaterialReactTable({
    columns,
    data: historyData,
    enableEditing: false,
    createDisplayMode: 'row',
    enableColumnFilterModes: true,
    enablePagination: false,
  });

  return <MaterialReactTable table={tableInstance} />;
};

export default HistoryTable;
