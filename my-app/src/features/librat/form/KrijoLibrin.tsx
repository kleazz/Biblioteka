import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { ILibri } from "../../../app/layout/models/libri";
import axios from "axios";

interface IProps {
  show: boolean;
  onHide: () => void;
  onCreate: (libri: ILibri) => void;
}

const KrijoLibrin: React.FC<IProps> = ({ show, onHide, onCreate }) => {
  const [newLibri, setNewLibri] = useState<ILibri>({
    isbn: "",
    titulli: "",
    pershkrimi: "",
    fotoja: "",
    kategoria: [],
  });

  const handleCreateLibri = async () => {
    try {
      const response = await axios.post(
        "https://localhost:7226/api/Libri/",
        {
          isbn: newLibri.isbn,
          titulli: newLibri.titulli,
          pershkrimi: newLibri.pershkrimi,
          fotoja: newLibri.fotoja,
          kategoriaIds: newLibri.kategoria
        },
      );
      onCreate(response.data);
      setNewLibri({
        isbn: "",
        titulli: "",
        pershkrimi: "",
        fotoja: "",
        kategoria: [],
      });
      onHide();
    } catch (error) {
      console.error(error);
    }
  };
  const handleKategoriaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const kategoriaString = e.target.value;
    const kategoria = kategoriaString
      .split(",")
      .map((value) => {
        const num = parseInt(value.trim());
        return isNaN(num) ? 0 : num; // check if the value is NaN and replace with 0
      });
    setNewLibri({ ...newLibri, kategoria });
  };
  
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{"Krijo Librin"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formIsbnE">
            <Form.Label>ISBN</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter ISBN"
              value={newLibri.isbn}
              onChange={(e) =>
                setNewLibri({ ...newLibri, isbn: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group controlId="formTitulliE">
            <Form.Label>Titulli</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Titulli"
              value={newLibri.titulli}
              onChange={(e) =>
                setNewLibri({ ...newLibri, titulli: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group controlId="formPershkrimiE">
            <Form.Label>Përshkrimi</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter Përshkrimi"
              value={newLibri.pershkrimi}
              onChange={(e) =>
                setNewLibri({ ...newLibri, pershkrimi: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group controlId="formFotojaE">
            <Form.Label>Fotoja</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Fotoja"
              value={newLibri.fotoja}
              onChange={(e) =>
                setNewLibri({
                  ...newLibri,
                  fotoja: e.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group controlId="formKategoriaE">
            <Form.Label>Kategoria</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Kategoria"
              value={newLibri.kategoria.join(", ")}
              onChange={handleKategoriaChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Anulo
        </Button>
        <Button variant="primary" onClick={handleCreateLibri}>
          Krijo
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default KrijoLibrin;
