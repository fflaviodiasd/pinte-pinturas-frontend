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
  weight: number;
};

type Option = {
  id: number;
  firstLetter: string;
  active: boolean;
  name: string;
  office: string;
  cell_phone: string;
  profile: string;
  weight: number;
};

export const useTeams = () => {
  const { id } = useParams();

  const [teamData, setTeamData] = useState({
    id: 0,
    teamName: "",
  });

  const [loading, setLoading] = useState(false);
  const [listTeams, setListTeams] = useState<Team[]>([]);

  const getTeam = async (teamId: number) => {
    setLoading(true);
    try {
      const { data } = await api.get(`teams/${teamId}/`);
      setTeamData({
        id: data.id,
        teamName: data.name,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

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

  const updateTeamRow = async (teamName: string, teamId: number) => {
    setLoading(true);
    try {
      await api.patch(`teams/${teamId}/`, {
        name: teamName,
      });
      successMessage("Equipe atualizada com sucesso!");
    } catch (error) {
      console.log(error);
      errorMessage("Não foi possível atualizar equipe!");
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

  const updateTeamMembers = async (
    selectedMembers: Option[],
    teamName: string,
    teamId: number
  ) => {
    const currentMembersIds = listTeamMembers.map((member) => ({
      id: member.id,
      weight: member.weight,
    }));
    const newMembersIds = selectedMembers.map((selectedMember) => ({
      id: selectedMember.id,
      weight: selectedMember.weight,
    }));

    const membersIds = currentMembersIds.concat(newMembersIds);

    console.log("backend", membersIds);

    setLoading(true);
    try {
      await api.patch(`teams/${teamId}/`, {
        name: teamName,
        team_members: membersIds,
      });
      const newMembers = selectedMembers.map((member) => ({
        active: member.active,
        avatar: "",
        cell_phone: member.cell_phone,
        id: member.id,
        name: member.name,
        profile: member.profile,
        weight: member.weight,
        office: member.office,
      }));
      setListTeamMembers((prevState) => prevState.concat(newMembers));
      successMessage("Equipe atualizada com sucesso!");
    } catch (error) {
      console.log(error);
      errorMessage("Não foi possível atualizar equipe!");
    } finally {
      setLoading(false);
    }
  };

  const getAllTeamMembers = async (teamId: number) => {
    setLoading(true);
    try {
      const { data } = await api.get(`teams/${teamId}`);
      const teamMembers: TeamMember[] = data.members;
      console.log("data", data);
      setListTeamMembers(teamMembers);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    teamData,
    listTeams,
    getTeam,
    addTeam,
    updateTeam,
    disableTeam,
    getAllTeams,
    listTeamMembers,
    updateTeamMembers,
    getAllTeamMembers,
    setListTeamMembers,
    updateTeamRow,
  };
};
