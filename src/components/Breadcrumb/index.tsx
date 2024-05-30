/* eslint-disable @typescript-eslint/no-explicit-any */
import { Breadcrumbs, Link, Stack, Box } from "@mui/material";

import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import { useStyles } from "./styles";

export function Breadcrumb({
  breadcrumbPath1,
  breadcrumbPath2,
  hrefBreadcrumbPath1,
}: any) {
  // const { classes } = useStyles();

  const breadcrumbs = [
    <Link
      underline="none"
      key="1"
      color="inherit"
      href={hrefBreadcrumbPath1}
      //onClick={handleClick}
    >
      {breadcrumbPath1}
    </Link>,

    <Link
      key="2"
      color="text.primary"
      underline="none"
      //underline="hover"
      //href="/"
      //onClick={handleClick}
    >
      {breadcrumbPath2}
    </Link>,
  ];

  return (
    <Stack>
      <Box>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
          style={{ fontFamily: "Open Sans", fontWeight: 600 }}
        >
          {breadcrumbs}
        </Breadcrumbs>
      </Box>
    </Stack>
  );
}
