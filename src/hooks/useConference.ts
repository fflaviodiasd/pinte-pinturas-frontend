/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-useless-catch */

import { useContext, useEffect, useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { errorMessage, successMessage } from "../components/Messages";
import { api } from "../services/api";
import { Construction } from "../types";
import { UserContext } from "../contexts/UserContext";
import { MRT_ColumnDef } from "material-react-table";
import { LevelComponent } from "../components/Level";

export const useConference = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useContext(UserContext);

  const [loading, setLoading] = useState(true);

  const [listConferenceData, setListConferenceData] = useState<any[]>([]);

  const getConferenceData = async (measurementId: string, disjunction: string) => {
    if (!id) {
      console.error("ID da construção não foi fornecido");
      return;
    }

    setLoading(true);
    try {
      const { data } = await api.get(`/reports_conference/${id}/measurements/?measurement=${measurementId}&disjunction=${disjunction}`);
      console.log("data:", data);
      setListConferenceData(data);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao obter serviços de construção:", error);
      setLoading(false);
    }
  };

  return {
    loading,
    setLoading,
    getConferenceData,
    listConferenceData,
  };
};
