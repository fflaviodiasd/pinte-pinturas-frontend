import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { errorMessage, successMessage } from "../components/Messages";
import { Company } from "../types"; // Assegure-se que este tipo está importado corretamente
import { api } from "../services/api";
import { UserContext } from "../contexts/UserContext";

const LIMIT = 10;

export const useCompanies = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useContext(UserContext);

  const [loading, setLoading] = useState(true);

  const [constructData, setConstructData] = useState<Company>({
    deleted: false,
    customer: undefined,
    corporate_name: "",
    fantasy_name: "",
    cnpj: "",
    public_place: "",
    number: "",
    neighborhood: "",
    city: "",
    cep: "",
  });

  const [listCompanies, setListCompanies] = useState<Company[]>([]);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageQuantity: 1,
  });

  const handleChangePagination = (
    _: React.ChangeEvent<unknown>,
    value: number
  ) => {
    getAllCompanies(value);
  };

  const getAllCompanies = async (currentPage: number = 0) => {
    setLoading(true);
    const offset = (currentPage - 1) * LIMIT;
    try {
      const { data } = await api.get(
        `companies/?limit=${LIMIT}&offset=${offset}`
      );
      setPagination({
        currentPage: currentPage === 0 ? 1 : currentPage,
        pageQuantity: Math.ceil(data.count / LIMIT),
      });
      // console.log(data.results, 'data.results')
      const allCompanies = data.results.map((result: any) => ({
        id: result.id,
        deleted: result.deleted,
        corporate_name: result.corporate_name,
        customer: result.customer,
        fantasy_name: result.fantasy_name,
        cnpj: result.cnpj,
        public_place: result.public_place,
        number: result.number,
        neighborhood: result.neighborhood,
        city: result.city,
        cep: result.cep,
      }));
      setListCompanies(allCompanies);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const [listCompanyCustomers, setListCompanyCustomers] = useState<any[]>([]);

  const getAllCompanyCustomers = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(
        `/companies/${user.company}/select_customer/`
      );
      const constructionCustomersList = data.map((result: any) => ({
        id: result.id,
        name: result.name,
      }));
      setListCompanyCustomers(constructionCustomersList);
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
    constructData,
    setConstructData,
    listCompanies,
    getAllCompanies,
    getAllCompanyCustomers,
    listCompanyCustomers,
  };
};
