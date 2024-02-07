import { Pagination, PaginationItem, Typography } from "@mui/material";

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
  return (
    <div
      style={{
        width: "100%",
        margin: "1rem 0",
        padding: "0 2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
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
