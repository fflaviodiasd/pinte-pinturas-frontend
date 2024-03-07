import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Box } from "@mui/material";
import { useStyles } from "./styles";

function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export default function Breadcrumb({ breadcrumbPath1, breadcrumbPath2 }: any) {
  const { classes } = useStyles();

  const breadcrumbs = [
    <Link
      underline="none"
      key="1"
      color="inherit"
      //href="/"
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
    <Stack spacing={2}>
      <Box className={classes.breadcrumbContainer}>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          {breadcrumbs}
        </Breadcrumbs>
      </Box>
    </Stack>
  );
}
