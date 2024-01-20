import { useState, useEffect } from "react";
import axios from "axios";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";

const localizer = momentLocalizer(moment);

const timePeriodOptions = [
  { value: "day", label: "Daily" },
  { value: "week", label: "Weekly" },
  { value: "biweek", label: "Bi-Weekly" },
  { value: "month", label: "Monthly" },
];

function Test() {
  const [timesheets, setTimesheets] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectedTimePeriod, setSelectedTimePeriod] = useState("week");

  useEffect(() => {
    // Fetch timesheets for a specific time period on component mount
    if (startDate && endDate) {
      // const formattedStartDate = moment(startDate).format("YYYY-MM-DD");
      // const formattedEndDate = moment(endDate).format("YYYY-MM-DD");

      axios
        .get(`http://localhost:8001/api/timesheet`)
        .then((response) => {
          setTimesheets(
            response.data.map((timesheet) => ({
              id: timesheet.TimesheetID,
              title: `${timesheet.HoursWorked} hours`,
              start: new Date(timesheet.StartDate),
              end: new Date(timesheet.EndDate),
            }))
          );
        });
    }
  }, [startDate, endDate, selectedTimePeriod]);

  const handleTimePeriodChange = (value) => {
    setSelectedTimePeriod(value);
    // Adjust start and end dates based on the selected time period
    // You may need to modify this logic based on your specific requirements
    const today = moment();
    switch (value) {
      case "day":
        setStartDate(today.startOf("day").toDate());
        setEndDate(today.endOf("day").toDate());
        break;
      case "week":
        setStartDate(today.startOf("week").toDate());
        setEndDate(today.endOf("week").toDate());
        break;
      case "biweek":
        setStartDate(today.startOf("week").toDate());
        setEndDate(today.add(1, "week").endOf("week").toDate());
        break;
      case "month":
        setStartDate(today.startOf("month").toDate());
        setEndDate(today.endOf("month").toDate());
        break;
      default:
        break;
    }
  };

  return (
    <div className="App">
      <h1>Timesheet Calendar</h1>
      <label>
        Time Period:
        <select
          value={selectedTimePeriod}
          onChange={(e) => handleTimePeriodChange(e.target.value)}
        >
          {timePeriodOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
      <br />
      {/* Display timesheets in a calendar format */}
      <Calendar
        localizer={localizer}
        events={timesheets}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
}

export default Test;
