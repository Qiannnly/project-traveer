import CalendarPicker, { ChangedDate } from "react-native-calendar-picker";
import dayjs from "dayjs";

type FormCalendarProps = {
  setStartDate: React.Dispatch<React.SetStateAction<string>>;
  setEndDate: React.Dispatch<React.SetStateAction<string>>;
};

const convertCalendarDateToString = (date: Date) => {
  const newDate = date.toString();
  const dateWithDayjs = dayjs(newDate);
  return dateWithDayjs.format("YYYY-MM-DD");
};

const FormCalendar = ({ setStartDate, setEndDate }: FormCalendarProps) => {
  const currentDate = new Date();

  const onDateChange = (date: Date, type: ChangedDate) => {
    if (type === "END_DATE") {
      if (date) {
        const convertedDate = convertCalendarDateToString(date);
        setEndDate(convertedDate);
        return;
      }
      setEndDate("");
    } else {
      const convertedDate = convertCalendarDateToString(date);
      setStartDate(convertedDate);

      setEndDate(convertedDate);
    }
  };

  return (
    <>
      <CalendarPicker
        allowRangeSelection={true}
        minDate={currentDate}
        selectedDayColor="#A67B5B"
        onDateChange={onDateChange}
      />
    </>
  );
};

export default FormCalendar;
