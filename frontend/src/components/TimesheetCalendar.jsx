import useAxios from "../hooks/useAxios"
import { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import ModalForm from "./ModalForm";

const TimesheetCalendar = () => {
  const axios = useAxios()
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleDoubleClick = e => {
    setSelectedEvent(e);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  const localizer = momentLocalizer(moment);

  useEffect(() => {
    fetchTimesheets();
  }, []);

  const fetchTimesheets = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8001/api/timesheet/employee/timesheet"
      );

      const eventsData = response.data.map((timesheet, index) => ({
        title: `${timesheet.HoursWorked} hrs`,
        projectName: `Task Description: ${timesheet.ProjectName}`,
        start: new Date(timesheet.StartTime),
        end: new Date(timesheet.EndTime),
        color: index % 2 === 0 ? "#6495ed" : "#4682b4",
      }));

      setEvents(eventsData);
    } catch (error) {
      console.error("Error fetching timesheets:", error);
    }
  };

  const customComponents = {
    toolbar: (toolbar) => (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "10px",
            background: "rgb(31, 41, 57)",
            color: "white",
          }}
        >
          <div>
            <button
              onClick={() => toolbar.onNavigate("TODAY")}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontWeight: "700",
                color: "white",
              }}
            >
              Today
            </button>
            <button
              onClick={() => toolbar.onNavigate("PREV")}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontWeight: "700",
                color: "white",
              }}
            >
              Previous
            </button>
            <button
              onClick={() => toolbar.onNavigate("NEXT")}
              style={{
                background: "none",
                color: "white",
                border: "none",
                cursor: "pointer",
                fontWeight: "700",
              }}
            >
              Next
            </button>
          </div>
          <div>
            <button
              onClick={() => toolbar.onView("month")}
              style={{
                background: "none",
                color: "white",
                border: "none",
                cursor: "pointer",
                fontWeight: "700",
              }}
            >
              Month
            </button>
            <button
              onClick={() => toolbar.onView("week")}
              style={{
                background: "none",
                color: "white",
                border: "none",
                cursor: "pointer",
                fontWeight: "700",
              }}
            >
              Week
            </button>
            <button
              onClick={() => toolbar.onView("day")}
              style={{
                background: "none",
                color: "white",
                border: "none",
                cursor: "pointer",
                fontWeight: "700",
              }}
            >
              Day
            </button>
          </div>
        </div>
        {toolbar.view === "month" && (
          <div
            style={{
              textAlign: "center",
              fontSize: "16px",
              backgroundColor: "rgb(31, 41, 57)",
              color: "white",
              fontWeight: "700",
              BlockEnd: "1rem",
            }}
          >
            {moment(toolbar.date).format("MMMM YYYY")}
          </div>
        )}
        {toolbar.view === "day" && (
          <div
            style={{
              textAlign: "center",
              fontSize: "16px",
              backgroundColor: "rgb(31, 41, 57)",
              color: "white",
              fontWeight: "700",
              padding: "10px",
              BlockEnd: "1rem",
            }}
          >
            {moment(toolbar.date).format("MMMM DD")}
          </div>
        )}
        {toolbar.view === "week" && (
          <div
            style={{
              textAlign: "center",
              fontSize: "16px",
              backgroundColor: "rgb(31, 41, 57)",
              color: "white",
              fontWeight: "700",
              padding: "10px",
              BlockEnd: "1rem",
            }}
          >
            {moment(toolbar.date).format("MMMM DD")}
          </div>
        )}
      </div>
    ),
    event: ({ event }) => (
      <div
        style={{
          backgroundColor: event.color,
          padding: "10px",
          borderRadius: "4px",
          color: "white",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        {event.title}
        <p></p>
        <p>{event.projectName}</p>
      </div>
    ),
  };

  return (
    <div className="d-flex justify-content-center">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{
          height: 500,
          margin: "20px",
          width: 800,
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
        components={customComponents}
        onDoubleClickEvent={handleDoubleClick}
      />

      {selectedEvent && <ModalForm onClose={handleCloseModal} event={selectedEvent}/>}
    </div>
  );
};

export default TimesheetCalendar;
