/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from "react";
import { Box, Grid } from "@mui/material";

import { useTeams } from "../../../../hooks/useTeams";

import { FormTeamMembers } from "../FormTeamMembers";

import { TableMembers } from "../Tables/TableMembers";

type ListTeamMembers = {
  teamId: number;
};

export const ListTeamMembers = ({ teamId }: ListTeamMembers) => {
  const { listTeamMembers, getAllTeamMembers } = useTeams();

  useEffect(() => {
    if (teamId) {
      getAllTeamMembers(teamId);
    }
  }, [teamId]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={12}>
        <Box style={{ padding: "1rem" }}>
          <FormTeamMembers teamId={teamId} />
        </Box>

        <TableMembers listTeamMembers={listTeamMembers} />
      </Grid>
    </Grid>
  );
};
