import { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { Button, Modal, Form } from 'react-bootstrap';

const localizer = momentLocalizer(moment);

const Test = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    projectName: '',
    startTime: '',
    endTime: '',
    hoursWorked: '',
  });

  // Replace this with your actual API endpoint
  const API_ENDPOINT = 'http://localhost:8001/api/employee/timesheet';

  useEffect(() => {
    // Fetch timesheets from the API
    fetchTimesheets();
  }, []);

  const fetchTimesheets = async () => {
    try {
      const response = await fetch(API_ENDPOINT);
      const data = await response.json();
      console.log(data)
      // Map timesheets to events with only start and end properties
      const eventsData = data.map((timesheet) => ({
        start: new Date(timesheet.StartTime),
        end: new Date(timesheet.EndTime),
      }));

      setEvents(eventsData);
    } catch (error) {
      console.error('Error fetching timesheets:', error);
    }
  };

  const handleAddTimesheet = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = () => {
    // Handle form submission and add the new timesheet
    // Update the events state or make an API call to update the backend
    // Reset the form data and close the modal
    setFormData({
      name: '',
      projectName: '',
      startTime: '',
      endTime: '',
      hoursWorked: '',
    });
    setShowModal(false);
  };

  return (
    <div>
      <Button variant="primary" onClick={handleAddTimesheet}>
        Add Timesheet
      </Button>

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: '20px' }}
      />

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Timesheet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
              />
            </Form.Group>

            <Form.Group controlId="formProjectName">
              <Form.Label>Project Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter project name"
                name="projectName"
                value={formData.projectName}
                onChange={handleFormChange}
              />
            </Form.Group>

            <Form.Group controlId="formStartTime">
              <Form.Label>Start Time</Form.Label>
              <Form.Control
                type="datetime-local"
                placeholder="Enter start time"
                name="startTime"
                value={formData.startTime}
                onChange={handleFormChange}
              />
            </Form.Group>

            <Form.Group controlId="formEndTime">
              <Form.Label>End Time</Form.Label>
              <Form.Control
                type="datetime-local"
                placeholder="Enter end time"
                name="endTime"
                value={formData.endTime}
                onChange={handleFormChange}
              />
            </Form.Group>

            <Form.Group controlId="formHoursWorked">
              <Form.Label>Hours Worked</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter hours worked"
                name="hoursWorked"
                value={formData.hoursWorked}
                onChange={handleFormChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleFormSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Test;
