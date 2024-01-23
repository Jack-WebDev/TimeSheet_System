import axios from "axios";
import { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";

const TimesheetCalendar = () => {
  const [events, setEvents] = useState([]);

  const localizer = momentLocalizer(moment);

  useEffect(() => {
    fetchTimesheets();
  }, []);

  const fetchTimesheets = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8001/api/timesheet/employee/timesheet"
      );

      // Assuming data is an array inside response.data
      const eventsData = response.data.map((timesheet) => ({
        title: `${timesheet.HoursWorked} hrs`,
        // Make the hours format look like this 10h3m
        start: new Date(timesheet.StartTime),
        end: new Date(timesheet.EndTime),
      }));

      setEvents(eventsData);
    } catch (error) {
      console.error("Error fetching timesheets:", error);
    }
  };

  return (
    <div className="d-flex justify-content-center">

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: "20px", width: 500 }}
      />
    </div>
  );
};

export default TimesheetCalendar;
