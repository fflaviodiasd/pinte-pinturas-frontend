/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { api } from "../services/api";

import { errorMessage, successMessage } from "../components/Messages";

export type Team = {
  id: number;
  active: boolean;
  member_count: number;
  name: string;
};

export type TeamMember = {
  id: number;
  active: boolean;
  avatar: string;
  name: string;
  office: string;
  profile: string;
  cell_phone: string;
};

export const useTeams = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [listTeams, setListTeams] = useState<Team[]>([]);

  // const getTeam = async (teamId: any) => {
  //   setLoading(true);
  //   try {
  //     const { data } = await api.get(`teams/${teamId}/`);
  //     setConstructionData({
  //       ...constructionData,
  //       id: data.id,
  //       teamName: data.name,
  //     });
  //     setLoading(false);
  //   } catch (error) {
  //     console.log(error);
  //     setLoading(false);
  //   }
  // };

  const addTeam = async (name: string) => {
    setLoading(true);
    try {
      await api.post(`/constructions/${id}/teams/`, {
        name: name,
      });
      getAllTeams();
      successMessage("Equipe adicionada com sucesso!");
    } catch (error) {
      console.log(error);
      errorMessage("Não foi possível adicionar equipe!");
    } finally {
      setLoading(false);
    }
  };

  const updateTeam = async (
    membersIds: number[],
    teamName: string,
    teamId: number
  ) => {
    setLoading(true);
    try {
      await api.patch(`teams/${teamId}/`, {
        name: teamName,
        team_members: membersIds,
      });
      successMessage("Equipe atualizada com sucesso!");
    } catch (error) {
      console.log(error);
      errorMessage("Não foi possível atualizar equipe!");
    } finally {
      setLoading(false);
    }
  };

  const disableTeam = async (teamId: number) => {
    setLoading(true);
    try {
      await api.delete(`teams/${teamId}`);
      successMessage("Equipe apagada com sucesso!");
    } catch (error) {
      console.log(error);
      errorMessage("Não foi possível apagar equipe!");
    } finally {
      getAllTeams();
      setLoading(false);
    }
  };

  const getAllTeams = async () => {
    setLoading(true);
    try {
      const { data } = await api.get<Team[]>(`constructions/${id}/teams`);

      const allTeams = data.map((team) => ({
        id: team.id,
        active: team.active,
        name: team.name,
        member_count: team.member_count,
      }));

      setListTeams(allTeams);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const [listTeamMembers, setListTeamMembers] = useState<TeamMember[]>([]);
  const getAllTeamMembers = async (teamId: number) => {
    setLoading(true);
    try {
      const { data } = await api.get(`teams/${teamId}`);
      const teamMembers: TeamMember[] = data.members;

      setListTeamMembers(teamMembers);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return {
    loading,
    listTeams,
    // getTeam,
    addTeam,
    updateTeam,
    disableTeam,
    getAllTeams,
    listTeamMembers,
    getAllTeamMembers,
  };
};
