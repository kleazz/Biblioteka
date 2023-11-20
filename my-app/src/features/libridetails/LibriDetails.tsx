import React, { useEffect, useState } from "react";
import { Calendar } from 'primereact/calendar';
import { addLocale } from 'primereact/api';
import { Row, Col, Button, Modal, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { ILibri } from "../../app/layout/models/libri";
import { Dialog } from 'primereact/dialog';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { Nullable } from "primereact/ts-helpers";
import { ScrollPanel } from "primereact/scrollpanel";
import agent from "../../app/layout/api/agent";
import { IAutori } from "../../app/layout/models/autori";
import { IKategoria } from "../../app/layout/models/kategoria";


const LibriDetails: React.FC = () => {
  const { libriIsbn } = useParams<{ libriIsbn: string }>();

  const [libri, setLibri] = useState<ILibri | null>(null);
  const [autoret, setAutoret] = useState<string | null>(null);
  const [kategorite, setKategorite] = useState<string | null>(null);
  const [selectedDueDate, setSelectedDueDate] = useState<Nullable<Date>>(null);

  // const handleShowModal = () => {
  //   setShowModal(true);
  // };

  // const handleCloseModal = () => {
  //   setShowModal(false);
  //   console.log(getMinDate());
  // };

  const [visible, setVisible] = useState<boolean>(false)

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

    setVisible(false);
  };

  const getAutoretForLibri = async (isbn: string): Promise<string> => {
    const autoretForLibri = await agent.Librat.getAutoriNgaLibri(isbn);
    const autoretString = autoretForLibri.map((autori: IAutori) => `${autori.emri} ${autori.mbiemri}`).join(" & ");
    return autoretString;
  };

  const getKategoriteForLibri = async (isbn: string): Promise<string> => {
    const kategoriteForLibri = await agent.Librat.getKategoriaNgaLibri(isbn);
    const kategoriteString = kategoriteForLibri.map((kategoria: IKategoria) => kategoria.emriKategorise).join(", ");
    return kategoriteString;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(
          `https://localhost:7226/api/Libri/${libriIsbn}`
        );
        if (response.ok) {
          const bookData = await response.json();
          setLibri(bookData);

          const autoretString = await getAutoretForLibri(bookData.isbn);
          setAutoret(autoretString);

          const kategoriteString = await getKategoriteForLibri(bookData.isbn);
          setKategorite(kategoriteString);
        } else {
          console.log("Error fetching book details");
        }
      } catch (error) {
        console.log("Error fetching book details", error);
      }
    };

    fetchBookDetails();
  }, [libriIsbn]);

  const getMinDate = (): Date => {
    const today = new Date();
    return today;
  };
  
  const getMaxDate = (): Date => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 7);
    return maxDate;
  };
  // const [date, setDate] = useState<Nullable<Date>>(null);

  return (
    <div className="details-container">
      {libri ? (
        <div style={{ height: "600px", width: "35cm", backgroundColor: "white", padding: "1cm" }}>
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
              style={{ marginTop: "1cm", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "space-between" }}
            >
              <h1 className="details-h1">{libri.titulli}</h1>
              <h4>{autoret}</h4>
              <h6 className="details-h6">{kategorite}</h6>
              <ScrollPanel style={{ width: '100%', height: '190px' }} className="custombar2">
                <p>{libri.pershkrimi}</p>
              </ScrollPanel>
              {localStorage.getItem("role") !== "admin" && (
                <div className="modal-btn">
                  <button className="submitbtn" onClick={() => setVisible(true)}>
                    Rezervo
                  </button>
                </div>
              )}
            </Col>
          </Row>
        </div>
      ) : (
        <div></div>
      )}

        <Dialog header="Rezervo Librin" visible={visible} style={{ width: '30vw' }} onHide={() => setVisible(false)}>
                <label>Due Date</label>
                <div className="modal-flex">
            <Calendar 
              className="custom-calendar" 
              minDate={getMinDate()}
              maxDate={getMaxDate()}
              value={selectedDueDate}
              onChange={(e) => setSelectedDueDate(e.value)} />
              </div>
              <div className="modal-btn">
            <button className="submitbtn" onClick={() => { handleSave(); setVisible(false); }}>Ruaj</button>
        </div>
                {/* <Form.Group>
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              type="date"
              min={getMinDate()}
              max={getMaxDate()}
              value={selectedDueDate}
              onChange={(e) => setSelectedDueDate(e.target.value)}
            />
          </Form.Group> */}
            </Dialog>
      {/* <Modal show={showModal} onHide={handleCloseModal}>
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
      </Modal> */}
    </div>
  );
};

export default LibriDetails;
