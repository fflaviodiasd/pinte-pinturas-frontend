import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { errorMessage, successMessage } from "../components/Messages";
import { Customer } from "../types"; // Assegure-se que este tipo está importado corretamente
import { api } from "../services/api";
import { UserContext } from "../contexts/UserContext";

const LIMIT = 10;

export const useCostumers = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useContext(UserContext);

  const [loading, setLoading] = useState(true);

  const [constructionData, setConstructionData] = useState<Customer>({
    id: 0,
    user: 0,
    company: 0,
    deleted: false,
    corporateName: "",
    cnpj: "",
    municipalRegistration: "",
    responsible: "",
    avatar: null,
    fantasyName: "",
    publicPlace: null,
    cep: null,
    neighborhood: null,
    complement: null,
    number: null,
    state: null,
    county: null,
    stateRegistration: "",
    email: "",
    phoneNumber: "",
    construction: []  
  });

  const [listCustomers, setListCustomers] = useState<Customer[]>([]);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageQuantity: 1,
  });

  const handleChangePagination = (
    _: React.ChangeEvent<unknown>,
    value: number
  ) => {
    getAllCustomers(value);
  };

  const getAllCustomers = async (currentPage: number = 0) => {
    setLoading(true);
    const offset = (currentPage - 1) * LIMIT;
    try {
      const { data } = await api.get(
        `customers/?limit=${LIMIT}&offset=${offset}`
      );
      setPagination({
        currentPage: currentPage === 0 ? 1 : currentPage,
        pageQuantity: Math.ceil(data.count / LIMIT),
      });
      const allCustomers = data.results.map((result: any) => ({
        id: result.id,
        user: result.user,
        company: result.company,
        deleted: result.deleted,
        corporateName: result.corporate_name,
        cnpj: result.cnpj,
        municipalRegistration: result.municipal_registration,
        responsible: result.responsible,
        avatar: result.avatar,
        fantasyName: result.fantasy_name,
        publicPlace: result.public_place,
        cep: result.cep,
        neighborhood: result.neighborhood,
        complement: result.complement,
        number: result.number,
        state: result.state,
        county: result.county,
        stateRegistration: result.state_registration,
        email: result.email,
        phoneNumber: result.phone_number,
        createdAt: result.created_at,
        construction: result.construction
      }));
      setListCustomers(allCustomers);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return {
    loading,
    setLoading,
    pagination,
    handleChangePagination,
    constructionData,
    setConstructionData,
    listCustomers,
    getAllCustomers,
  };
};
