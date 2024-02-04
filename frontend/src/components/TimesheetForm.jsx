import { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { FaCalendarPlus } from "react-icons/fa";

const TimesheetForm = () => {
  const [showModal, setShowModal] = useState(false);
  const [fullName, setFullName] = useState("");
  const [projectName, setProjectName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [hoursWorked, setHoursWorked] = useState(null);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const start = new Date(startTime);
    const end = new Date(endTime);
    const millisecondsDiff = end - start;
    const hours = millisecondsDiff / (1000 * 60 * 60);

    setHoursWorked(parseFloat(hours.toFixed(2)));

    try {
      axios.defaults.withCredentials = true;
      await axios.post(
        "http://localhost:8001/api/timesheet/employee/timesheet",
        {
          fullName,
          projectName,
          startTime,
          endTime,
          hoursWorked: parseFloat(hours.toFixed(2)),
        }
      );

      toast.success("Timesheet submitted");
      window.location.reload();
    } catch (error) {
      toast.error("Error submitting timesheet. Try again!");
    }
  };

  return (
    <div className="addTimesheet">
      <Button
        variant="primary"
        onClick={handleShowModal}
        className="d-flex justify-content-center align-items-center py-3 gap-1 mb-5 mt-5"
      >
        <FaCalendarPlus /> Add Timesheet
      </Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Timesheet Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h2 className="text-center">Timesheet Form</h2>
          <Form onSubmit={handleSubmit} className="form">
            <Form.Group controlId="formName">
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formProjectName">
              <Form.Label>Task Description:</Form.Label>
              <Form.Control
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formStartTime">
              <Form.Label>Start Time:</Form.Label>
              <Form.Control
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formEndTime">
              <Form.Label>End Time:</Form.Label>
              <Form.Control
                type="datetime-local"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TimesheetForm;
