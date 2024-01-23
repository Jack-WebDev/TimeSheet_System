import { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";

const localizer = momentLocalizer(moment);

function Test() {
  const [events, setEvents] = useState([]);

  const API_ENDPOINT = "http://localhost:8001/api/timesheet/employee/timesheet";

  useEffect(() => {
    fetchTimesheets();
  }, []);

  const fetchTimesheets = async () => {
    try {
      const response = await fetch(API_ENDPOINT);
      const data = await response.json();
      console.log(data);
      // Map timesheets to events with only start and end properties
      const eventsData = data.map((timesheet) => ({
        start: new Date(timesheet.StartTime),
        end: new Date(timesheet.EndTime),
      }));

      setEvents(eventsData);
    } catch (error) {
      console.error("Error fetching timesheets:", error);
    }
  };

  return (
    <div className="App">
      <h1>Timesheet Calendar</h1>

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: "20px" }}
      />
    </div>
  );
}

export default Test;
