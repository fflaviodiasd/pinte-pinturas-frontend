import { useContext, useState } from "react";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import "@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css";
import "react-calendar/dist/Calendar.css";

import { MeasurementsContext } from "../../../../../contexts/MeasurementsContext";

import { ActionButtons } from "../components/ActionButtons";
import { useStyles } from "../filterStyles";

import "./styles.css";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

type PeriodFilterProps = {
  handleClose: () => void;
};

export const PeriodFilter = ({ handleClose }: PeriodFilterProps) => {
  const { classes } = useStyles();
  const { getDataTable, getProfitability } = useContext(MeasurementsContext);

  const [value, onChange] = useState<Value>([new Date(), new Date()]);

  const handleApply = () => {
    if (Array.isArray(value) && value[0] && value[1]) {
      const startDate = value[0];
      const endDate = value[1];

      const queryParams = `start_date=${formatDate(
        startDate
      )}&end_date=${formatDate(endDate)}`;

      getProfitability(queryParams);
      getDataTable(queryParams);
      handleClose();
    }
  };

  const handleClear = () => {
    onChange([new Date(), new Date()]);
  };

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <DateRangePicker onChange={onChange} value={value} />
      </div>
      <ActionButtons onApply={handleApply} onClear={handleClear} />
    </div>
  );
};

const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};
