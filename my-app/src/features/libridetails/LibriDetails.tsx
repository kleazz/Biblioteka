import React, { useEffect, useState } from "react";
import { Row, Col, Button, Modal, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { ILibri } from "../../app/layout/models/libri";

const LibriDetails: React.FC = () => {
  const { libriIsbn } = useParams<{ libriIsbn: string }>();

  const [libri, setLibri] = useState<ILibri | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedDueDate, setSelectedDueDate] = useState<string>("");

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    console.log(getMinDate());
  };

  const handleSave = async () => {
    if (libri) {
      let u = localStorage.getItem("userId");
      let e = localStorage.getItem("username");

      const reservationData = {
        username: e,
        id: u,
        isbn: libriIsbn,
        dueDate: selectedDueDate,
      };

      try {
        const response = await fetch("https://localhost:7226/api/Rezervimi", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reservationData),
        });

        if (response.ok) {
          console.log("Reservation created");
        } else {
          console.log("Error creating reservation");
        }
      } catch (error) {
        console.log("Error creating reservation", error);
      }
    }

    setShowModal(false);
  };

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(
          `https://localhost:7226/api/Libri/${libriIsbn}`
        );
        if (response.ok) {
          const bookData = await response.json();
          setLibri(bookData);
        } else {
          console.log("Error fetching book details");
        }
      } catch (error) {
        console.log("Error fetching book details", error);
      }
    };

    fetchBookDetails();
  }, [libriIsbn]);

  const getMinDate = (): string => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // Months are zero-based
    const day = today.getDate();
    return `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
  };

  const getMaxDate = (): string => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 7);
    const year = maxDate.getFullYear();
    const month = maxDate.getMonth() + 1; // Months are zero-based
    const day = maxDate.getDate();
    return `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
  };

  return (
    <div className="container">
      {libri ? (
        <div
          style={{
            height: "600px",
            width: "32cm",
            backgroundColor: "white",
            marginTop: "2.5cm",
            marginLeft: "-1.2cm",
            padding: "1cm",
            borderRadius: "10px",
            boxShadow: " 0 2px 4px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Row>
            <Col xs={12} md={4}>
              <img
                src={libri.fotoja}
                style={{
                  marginTop: "1cm",
                  height: "450px",
                  width: "325px",
                  borderTopRightRadius: "10px",
                  borderBottomRightRadius: "10px",
                }}
                alt={libri.titulli}
                className="img-fluid"
              />
            </Col>
            <Col
              xs={12}
              md={8}
              style={{ marginTop: "1cm", overflow: "hidden" }}
            >
              <h2>{libri.titulli}</h2>
              <p className="text-success">Autori</p>
              <p>Kategoria</p>
              <div style={{ maxHeight: "300px", overflowY: "scroll" }}>
                <p>{libri.pershkrimi}</p>
              </div>
              {localStorage.getItem("role") !== "admin" && (
                <div>
                  <Button variant="success" onClick={handleShowModal}>
                    Rezervo
                  </Button>
                </div>
              )}
            </Col>
          </Row>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Rezervo Librin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              type="date"
              min={getMinDate()}
              max={getMaxDate()}
              value={selectedDueDate}
              onChange={(e) => setSelectedDueDate(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Ruaj
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default LibriDetails;
