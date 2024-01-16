import { useState } from "react";
import { Form, Button, Modal, Container, Card } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

const TimesheetForm = () => {
  const [showModal, setShowModal] = useState(false);
  const [fullName, setFullName] = useState("");
  const [projectName, setProjectName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [hoursWorked, setHoursWorked] = useState(0.00);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ... (Same as your existing handleSubmit logic)

    try {
      // ... (Same as your existing try block)

      toast.success("Timesheet submitted");
    } catch (error) {
      // ... (Same as your existing catch block)
    }
  };

  return (
    <div>
      <Button variant="primary" onClick={handleShowModal}>
        Add Timesheet
      </Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Timesheet Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} className="form">
            {/* ... (Your existing form code) */}
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

      {hoursWorked && (
        // ... (Your existing result display code)
      )}
    </div>
  );
};

export default TimesheetForm;
