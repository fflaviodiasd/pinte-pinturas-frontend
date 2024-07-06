/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
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

type Member = { id: number; weight: number };

type TeamsContextProviderProps = {
  children: ReactNode;
};

type TeamsContextProps = {
  loading: boolean;
  teamData: {
    id: number;
    teamName: string;
  };
  listTeams: Team[];
  getTeam: (teamId: number) => Promise<void>;
  addTeam: (name: string) => Promise<void>;
  disableTeam: (teamId: number) => Promise<void>;
  getAllTeams: () => Promise<void>;
  listTeamMembers: TeamMember[];
  updateTeamMembers: (
    selectedMembers: Option[],
    teamName: string,
    teamId: number
  ) => Promise<void>;
  getAllTeamMembers: (teamId: number) => Promise<void>;
  setListTeamMembers: Dispatch<SetStateAction<TeamMember[]>>;
  updateTeamRow: (teamName: string, teamId: number, active: boolean) => Promise<void>;
  setListTeams: Dispatch<SetStateAction<Team[]>>;
};

const TeamsContext = createContext<TeamsContextProps>({} as TeamsContextProps);

const TeamsContextProvider = ({ children }: TeamsContextProviderProps) => {
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

      successMessage("Equipe adicionada com sucesso!");
    } catch (error) {
      console.log(error);
      errorMessage("Não foi possível adicionar equipe!");
    } finally {
      setLoading(false);
      getAllTeams();
    }
  };

  const updateTeamRow = async (
    teamName: string,
    teamId: number,
    active: boolean
  ) => {
    setLoading(true);
    try {
      await api.patch(`teams/${teamId}/`, {
        name: teamName,
        active: active,
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

    const allMembers = allMembersToSend(currentMembersIds, newMembersIds);

    setLoading(true);
    try {
      await api.patch(`teams/${teamId}/`, {
        name: teamName,
        team_members: allMembers,
      });
      const newMembers = selectedMembers.map((member) => ({
        active: String(member.active).toLowerCase() === "true",
        avatar: "",
        cell_phone: member.cell_phone,
        id: member.id,
        name: member.name,
        profile: member.profile,
        weight: member.weight,
        office: member.office,
      }));

      setListTeamMembers((prevState) =>
        updateListTeamMembers(prevState, newMembers)
      );
      const newMemberCount = allMembers.length;
      setListTeams((prevState) =>
        prevState.map((team) => {
          if (team.id === teamId) {
            return { ...team, member_count: newMemberCount };
          } else {
            return team;
          }
        })
      );
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

      setListTeamMembers(teamMembers);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TeamsContext.Provider
      value={{
        loading,
        teamData,
        listTeams,
        setListTeams,
        getTeam,
        addTeam,
        disableTeam,
        getAllTeams,
        listTeamMembers,
        updateTeamMembers,
        getAllTeamMembers,
        setListTeamMembers,
        updateTeamRow,
      }}
    >
      {children}
    </TeamsContext.Provider>
  );
};

export { TeamsContext, TeamsContextProvider };

function allMembersToSend(currentMembers: Member[], newMembers: Member[]) {
  return currentMembers
    .map((currentMember) => {
      const newMember = newMembers.find(
        (newMember) => newMember.id === currentMember.id
      );

      return newMember ? newMember : currentMember;
    })
    .concat(
      newMembers.filter(
        (newMember) =>
          !currentMembers.some(
            (currentMember) => currentMember.id === newMember.id
          )
      )
    );
}

function updateListTeamMembers(
  currentMembers: TeamMember[],
  newMembers: TeamMember[]
) {
  return currentMembers
    .map((currentMember) => {
      const newMember = newMembers.find(
        (newMember) => newMember.id === currentMember.id
      );

      return newMember ? newMember : currentMember;
    })
    .concat(
      newMembers.filter(
        (newMember) =>
          !currentMembers.some(
            (currentMember) => currentMember.id === newMember.id
          )
      )
    );
}
