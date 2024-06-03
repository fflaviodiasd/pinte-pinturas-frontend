import { Backdrop, CircularProgress } from "@mui/material";

type LoadingProps = {
  isLoading: boolean;
};

export function Loading({ isLoading }: LoadingProps) {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={isLoading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
