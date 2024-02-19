import { Pagination, PaginationItem, Typography } from "@mui/material";
import { useStyles } from "./styles";

interface TablePaginationProps {
  count: number;
  page: number;
  onChange: (_: React.ChangeEvent<unknown>, value: number) => void;
}

export const TablePagination = ({
  count,
  page,
  onChange,
}: TablePaginationProps) => {
  const { classes } = useStyles();

  return (
    <div className={classes.containerPagination}>
      <Typography>
        Mostrando {page} de {count} páginas
      </Typography>
      <Pagination
        count={count}
        page={page}
        onChange={onChange}
        renderItem={(item) => {
          if (item.page) {
            return <PaginationItem {...item} />;
          }
        }}
      />
    </div>
  );
};
