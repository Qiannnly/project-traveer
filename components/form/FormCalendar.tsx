import CalendarPicker, { ChangedDate } from "react-native-calendar-picker";

type FormCalendarProps = {
  setStartDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  setEndDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
};

const FormCalendar = ({ setStartDate, setEndDate }: FormCalendarProps) => {
  const currentDate = new Date();

  const onDateChange = (date: Date, type: ChangedDate) => {
    if (type === "END_DATE") {
      if (date) {
        setEndDate(date);
        return;
      }
      setEndDate(undefined);
    } else {
      setStartDate(date);
      setEndDate(date);
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
