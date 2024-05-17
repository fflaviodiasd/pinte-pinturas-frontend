// import "react-modern-calendar-datepicker/lib/DatePicker.css";
// import { Calendar, DayRange } from "react-modern-calendar-datepicker";

// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

import { ActionButtons } from "../components/ActionButtons";
import { useStyles } from "../filterStyles";
import { useContext, useState } from "react";
import { MeasurementsContext } from "../../../../../contexts/MeasurementsContext";

import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import "@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css";
import "react-calendar/dist/Calendar.css";

import "./styles.css";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

type PeriodFilterProps = {
  handleClose: () => void;
};

interface DateObject {
  day: number;
  month: number;
  year: number;
}

export const PeriodFilter = ({ handleClose }: PeriodFilterProps) => {
  const { classes } = useStyles();
  const { getDataTable, getProfitability } = useContext(MeasurementsContext);

  // const [dayRange, setDayRange] = useState<DayRange>({
  //   from: null,
  //   to: null,
  // });

  const [value, onChange] = useState<Value>([new Date(), new Date()]);

  const handleApply = () => {
    // if (dayRange.from && dayRange.to) {
    //   const queryParams = `start_date=${formatDate(
    //     dayRange.from
    //   )}&end_date=${formatDate(dayRange.to)}`;
    //   getProfitability(queryParams);
    //   getDataTable(queryParams);
    //   handleClose();
    // }
    // getProfitability(queryParams);
    // getDataTable(queryParams);
    console.log(value);
    handleClose();
  };

  const handleClear = () => {
    // setDayRange({
    //   from: null,
    //   to: null,
    // });
  };

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        {/* <div style={{ width: 100 }}>
          <Calendar
            value={dayRange}
            onChange={setDayRange}
            shouldHighlightWeekends
            // locale={myCustomLocale}
            colorPrimary="#0fbcf9"
            colorPrimaryLight="rgba(75, 207, 250, 0.4)"
          />
        </div> */}

        <DateRangePicker onChange={onChange} value={value} />
      </div>
      <ActionButtons onApply={handleApply} onClear={handleClear} />
    </div>
  );
};

function formatDate(date: DateObject): string {
  const { day, month, year } = date;

  const dayStr = day.toString().padStart(2, "0");
  const monthStr = month.toString().padStart(2, "0");

  return `${year}-${monthStr}-${dayStr}`;
}

// const myCustomLocale = {
//   // months list by order
//   months: [
//     "Janeiro",
//     "Fevereiro",
//     "Março",
//     "Abril",
//     "Maio",
//     "Junho",
//     "Julho",
//     "Agosto",
//     "Setembro",
//     "Outubro",
//     "Novembro",
//     "Dezembro",
//   ],

//   // week days by order
//   weekDays: [
//     {
//       name: "Sunday", // used for accessibility
//       short: "S", // displayed at the top of days' rows
//       isWeekend: true, // is it a formal weekend or not?
//     },
//     {
//       name: "Monday",
//       short: "M",
//     },
//     {
//       name: "Tuesday",
//       short: "T",
//     },
//     {
//       name: "Wednesday",
//       short: "W",
//     },
//     {
//       name: "Thursday",
//       short: "T",
//     },
//     {
//       name: "Friday",
//       short: "F",
//     },
//     {
//       name: "Saturday",
//       short: "S",
//       isWeekend: true,
//     },
//   ],

//   // just play around with this number between 0 and 6
//   weekStartingIndex: 0,

//   // return a { year: number, month: number, day: number } object
//   getToday(gregorainTodayObject) {
//     return gregorainTodayObject;
//   },

//   // return a native JavaScript date here
//   toNativeDate(date) {
//     return new Date(date.year, date.month - 1, date.day);
//   },

//   // return a number for date's month length
//   getMonthLength(date) {
//     return new Date(date.year, date.month, 0).getDate();
//   },

//   // return a transformed digit to your locale
//   transformDigit(digit) {
//     return digit;
//   },

//   // texts in the date picker
//   nextMonth: "Next Month",
//   previousMonth: "Previous Month",
//   openMonthSelector: "Open Month Selector",
//   openYearSelector: "Open Year Selector",
//   closeMonthSelector: "Close Month Selector",
//   closeYearSelector: "Close Year Selector",
//   defaultPlaceholder: "Select...",

//   // for input range value
//   from: "from",
//   to: "to",

//   // used for input value when multi dates are selected
//   digitSeparator: ",",

//   // if your provide -2 for example, year will be 2 digited
//   yearLetterSkip: 0,

//   // is your language rtl or ltr?
//   isRtl: false,
// };
