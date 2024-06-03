import { MRT_ColumnDef } from 'material-react-table';

export const defaultColumns: MRT_ColumnDef<any>[] = [
  {
    accessorKey: 'idLocal',
    header: 'ID Local',
  },
  {
    accessorKey: 'qntStepService',
    header: 'Unidade',
    aggregationFn: 'max',
    AggregatedCell: ({ cell }) => `Maior: ${cell.getValue<number>()}`,
  },
  {
    accessorKey: 'qntStepService',
    header: 'QTD. Cadastrada',
    aggregationFn: 'max',
    AggregatedCell: ({ cell }) => `Maior: ${cell.getValue<number>()}`,
  },
  {
    accessorKey: 'priceToPayStep',
    header: 'Quantidade',
    aggregationFn: 'sum',
    AggregatedCell: ({ cell }) => `Somatória: R$ ${cell.getValue<number>()}`,
  },
  {
    accessorKey: 'priceToPayStep',
    header: 'Preço Unit.',
    aggregationFn: 'sum',
    AggregatedCell: ({ cell }) => `Somatória: R$ ${cell.getValue<number>()}`,
  },
  {
    accessorKey: 'priceToPayStep',
    header: 'Total',
    aggregationFn: 'sum',
    AggregatedCell: ({ cell }) => `Somatória: R$ ${cell.getValue<number>()}`,
  },
  {
    accessorKey: 'priceToPayStep',
    header: 'QTD. Anterior',
    aggregationFn: 'sum',
    AggregatedCell: ({ cell }) => `Somatória: R$ ${cell.getValue<number>()}`,
  },
  {
    accessorKey: 'priceToPayStep',
    header: 'QTD. Atual',
    aggregationFn: 'sum',
    AggregatedCell: ({ cell }) => `Somatória: R$ ${cell.getValue<number>()}`,
  },
  {
    accessorKey: 'qntStepService',
    header: 'QTD. Acumulado',
    aggregationFn: 'sum',
    AggregatedCell: ({ cell }) => `Somatória: R$ ${cell.getValue<number>()}`,
  },
  {
    accessorKey: 'qntStepService',
    header: 'QTD. Saldo a Medir',
    aggregationFn: 'sum',
    AggregatedCell: ({ cell }) => `Somatória: R$ ${cell.getValue<number>()}`,
  },
  {
    accessorKey: 'priceToReceive',
    header: 'Val. Ac. Anterior',
    aggregationFn: 'sum',
    AggregatedCell: ({ cell }) => `Somatória: R$ ${cell.getValue<number>()}`,
  },
  {
    accessorKey: 'totalUnitStep',
    header: 'Val. Atual',
    aggregationFn: 'sum',
    AggregatedCell: ({ cell }) => `Somatória: R$ ${cell.getValue<number>()}`,
  },
  {
    accessorKey: 'priceToPayStep',
    header: 'Val. Acumulado',
    aggregationFn: 'sum',
    AggregatedCell: ({ cell }) => `Somatória: R$ ${cell.getValue<number>()}`,
  },
  {
    accessorKey: 'priceToPayService',
    header: 'Val. Saldo a Medir',
    aggregationFn: 'sum',
    AggregatedCell: ({ cell }) => `Somatória: R$ ${cell.getValue<number>()}`,
  },
];

export const localColumns: MRT_ColumnDef<any>[] = [
  {
    accessorKey: 'initialDate',
    header: 'Data de Inicio',
  },
  {
    accessorKey: 'finalDate',
    header: 'Data Final',
  },
  {
    accessorKey: 'totalValue',
    header: 'Valor Total',
  },
];
