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

      setListConstructions(constructionList);
    } catch (error) {
      console.log(error);
    }
  };

  const [dataTable, setDataTable] = useState<DataItem[]>([]);

  const getDataTable = async () => {
    try {
      const { data } = await api.get(
        `/dashboard_measurements/${9}/data_table/`
      );
      //   console.log("Tabela", data);
      if (data.length) {
        data.map((item: DataItemReturned) => ({
          discipline: item.discipline,
          namePackage: item.name_package,
          avgDays: item.avg_days,
          priceDays: item.price_days,
          priceWorkmanshipDays: item.price_workmanship_days,
        }));
      } else {
        setDataTable(fakeDataTable);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [execution, setExecution] = useState<Execution[]>([]);

  const getExecution = async () => {
    try {
      const { data } = await api.get(`/dashboard_measurements/${9}/execution/`);
      //   console.log("Execução", data);
      if (data.length) {
        setExecution(data);
      } else {
        setExecution(fakeExecution);
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
        `/dashboard_measurements/${9}/profitability/`
      );

      //   console.log("Menos rentáveis", data.less_profitable);
      if (data.less_profitable.length) {
        data.less_profitable.map((item: ProfitableItemReturned) => ({
          namePackage: item.name_package,
          avgDays: item.avg_days,
          priceDays: item.price_days,
          priceWorkmanshipDays: item.price_workmanship_days,
        }));
      } else {
        setLessProfitable(fakeProfitability);
      }

      //   console.log("Mais rentáveis", data.more_profitable);
      if (data.more_profitable.length) {
        data.more_profitable.map((item: ProfitableItemReturned) => ({
          namePackage: item.name_package,
          avgDays: item.avg_days,
          priceDays: item.price_days,
          priceWorkmanshipDays: item.price_workmanship_days,
        }));
      } else {
        setMoreProfitable(fakeProfitability);
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

const fakeExecution = [
  { measurement: "M01", status: { liberado: 40, finalizado: 12 } },
  { measurement: "M02", status: { liberado: 41, finalizado: 36 } },
  { measurement: "M03", status: { liberado: 20, finalizado: 35 } },
  { measurement: "M04", status: { liberado: 27, finalizado: 47 } },
  { measurement: "M05", status: { liberado: 53, finalizado: 55 } },
];

const fakeProfitability = [
  {
    namePackage: "Pintura externa 1",
    avgDays: "30",
    priceDays: "R$ 40,23",
    priceWorkmanshipDays: "R$ 23,23",
  },
  {
    namePackage: "Pintura externa 2",
    avgDays: "30",
    priceDays: "R$ 40,23",
    priceWorkmanshipDays: "R$ 23,23",
  },
  {
    namePackage: "Pintura externa 3",
    avgDays: "30",
    priceDays: "R$ 40,23",
    priceWorkmanshipDays: "R$ 23,23",
  },
  {
    namePackage: "Pintura externa 4",
    avgDays: "30",
    priceDays: "R$ 40,23",
    priceWorkmanshipDays: "R$ 23,23",
  },
  {
    namePackage: "Pintura externa 5",
    avgDays: "30",
    priceDays: "R$ 40,23",
    priceWorkmanshipDays: "R$ 23,23",
  },
];

const fakeDataTable = [
  {
    discipline: "Gesso",
    namePackage: "Pintura ",
    avgDays: "30",
    priceDays: "R$ 23,00",
    priceWorkmanshipDays: "R$ 23,23",
  },
  {
    discipline: "Gesso",
    namePackage: "Pintura Externa",
    avgDays: "30",
    priceDays: "R$ 23,00",
    priceWorkmanshipDays: "R$ 23,23",
  },
  {
    discipline: "Gesso",
    namePackage: "Pintura Externa",
    avgDays: "30",
    priceDays: "R$ 23,00",
    priceWorkmanshipDays: "R$ 23,23",
  },
  {
    discipline: "Exemplo de disciplina",
    namePackage: "Pintura Externa",
    avgDays: "30",
    priceDays: "R$ 23,00",
    priceWorkmanshipDays: "R$ 23,23",
  },
  {
    discipline: "Gesso",
    namePackage: "Pintura Interna",
    avgDays: "30",
    priceDays: "R$ 23,00",
    priceWorkmanshipDays: "R$ 23,23",
  },
  {
    discipline: "Gesso",
    namePackage: "Pintura Interna",
    avgDays: "30",
    priceDays: "R$ 23,00",
    priceWorkmanshipDays: "R$ 23,23",
  },
  {
    discipline: "Gesso",
    namePackage: "Pintura Interna",
    avgDays: "30",
    priceDays: "R$ 23,00",
    priceWorkmanshipDays: "R$ 23,23",
  },
  {
    discipline: "Gesso",
    namePackage: "Pintura Interna",
    avgDays: "30",
    priceDays: "R$ 23,00",
    priceWorkmanshipDays: "R$ 23,23",
  },
  {
    discipline: "Gesso",
    namePackage: "Pintura Interna",
    avgDays: "30",
    priceDays: "R$ 23,00",
    priceWorkmanshipDays: "R$ 23,23",
  },
  {
    discipline: "Gesso",
    namePackage: "Pintura Interna",
    avgDays: "30",
    priceDays: "R$ 23,00",
    priceWorkmanshipDays: "R$ 23,23",
  },
];
