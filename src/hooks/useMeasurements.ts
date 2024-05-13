/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useState } from "react";
import { api } from "../services/api";
import { UserContext } from "../contexts/UserContext";

type Construction = {
  name: string;
  id: number;
};

type ProfitableItemReturned = {
  name_package: string;
  avg_days: string;
  price_days: string;
  price_workmanship_days: string;
};

type ProfitableItem = {
  namePackage: string;
  avgDays: string;
  priceDays: string;
  priceWorkmanshipDays: string;
};

type Execution = {
  measurement: string;
  status: { liberado: number; finalizado: number };
};

type DataItemReturned = {
  discipline: string;
  name_package: string;
  avg_days: string;
  price_days: string;
  price_workmanship_days: string;
};

type DataItem = {
  discipline: string;
  namePackage: string;
  avgDays: string;
  priceDays: string;
  priceWorkmanshipDays: string;
};

export const useMeasurements = () => {
  const { user } = useContext(UserContext);

  const [listConstructions, setListConstructions] = useState<Construction[]>(
    []
  );
  const getAllConstructions = async () => {
    try {
      const { data } = await api.get(
        `/companies/${user.company}/constructions/`
      );
      const constructionList = data.map((construction: any) => ({
        id: construction.id,
        name: construction.corporate_name,
      }));
      // console.log("constructionList", constructionList);
      setListConstructions(constructionList);
    } catch (error) {
      console.log(error);
    }
  };

  const [dataTable, setDataTable] = useState<DataItem[]>([]);

  const getDataTable = async () => {
    try {
      const { data } = await api.get(
        `/dashboard_measurements/${34}/data_table/`
      );
      // console.log("Tabela", data);
      if (data.length) {
        const dataTableResponse = data.map((item: DataItemReturned) => ({
          discipline: item.discipline,
          namePackage: item.name_package,
          avgDays: item.avg_days,
          priceDays: item.price_days,
          priceWorkmanshipDays: item.price_workmanship_days,
        }));
        setDataTable(dataTableResponse);
      } else {
        // setDataTable(fakeDataTable);
        setDataTable([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [execution, setExecution] = useState<Execution[]>([]);

  const getExecution = async () => {
    try {
      const { data } = await api.get(
        `/dashboard_measurements/${34}/execution/`
      );
      // console.log("Execução", data);
      if (data.length) {
        setExecution(data);
      } else {
        // setExecution(fakeExecution);
        setExecution([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [lessProfitable, setLessProfitable] = useState<ProfitableItem[]>([]);
  const [moreProfitable, setMoreProfitable] = useState<ProfitableItem[]>([]);

  const getProfitability = async () => {
    try {
      const { data } = await api.get(
        `/dashboard_measurements/${34}/profitability/`
      );

      // console.log("Menos rentáveis", data.less_profitable);
      if (data.less_profitable.length) {
        const lessProfitableResponse = data.less_profitable.map(
          (item: ProfitableItemReturned) => ({
            namePackage: item.name_package,
            avgDays: item.avg_days,
            priceDays: item.price_days,
            priceWorkmanshipDays: item.price_workmanship_days,
          })
        );
        setLessProfitable(lessProfitableResponse);
      } else {
        // setLessProfitable(fakeProfitability);
        setLessProfitable([]);
      }

      // console.log("Mais rentáveis", data.more_profitable);
      if (data.more_profitable.length) {
        const moreProfitableResponse = data.more_profitable.map(
          (item: ProfitableItemReturned) => ({
            namePackage: item.name_package,
            avgDays: item.avg_days,
            priceDays: item.price_days,
            priceWorkmanshipDays: item.price_workmanship_days,
          })
        );
        setMoreProfitable(moreProfitableResponse);
      } else {
        // setMoreProfitable(fakeProfitability);
        setMoreProfitable([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    execution,
    getExecution,
    dataTable,
    getDataTable,
    lessProfitable,
    moreProfitable,
    getProfitability,
    listConstructions,
    getAllConstructions,
  };
};
