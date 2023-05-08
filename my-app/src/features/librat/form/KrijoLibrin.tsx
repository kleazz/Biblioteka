import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { ILibri } from "../../../app/layout/models/libri";

interface IProps {
  libri: ILibri;
  createLibri: (libri: ILibri) => void;
  editLibri: (libri: ILibri) => void;
  show: boolean;
  onHide: () => void;
}

const KrijoLibrin: React.FC<IProps> = ({ show, onHide, createLibri }) => {
  const [libri, setLibri] = useState<ILibri>({
    isbn: "",
    titulli: "",
    pershkrimi: "",
    fotoja: "",
  });

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLibri({ ...libri, fotoja: URL.createObjectURL(file) });
    }
  };

  const handleSubmit = () => {
    let newLibri = {
      ...libri,
    };
    createLibri(newLibri);
    onHide();
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
              placeholder="Shkruaj ISBN"
              value={libri.isbn}
              onChange={(e) => setLibri({ ...libri, isbn: e.target.value })}
              autoComplete="off"
            />
          </Form.Group>
          <Form.Group controlId="formTitulliE">
            <Form.Label>Titulli</Form.Label>
            <Form.Control
              type="text"
              placeholder="Shkruaj titullin"
              value={libri.titulli}
              onChange={(e) => setLibri({ ...libri, titulli: e.target.value })}
              autoComplete="off"
            />
          </Form.Group>
          <Form.Group controlId="formPershkrimiE">
            <Form.Label>Përshkrimi</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Shkruaj përshkrimin"
              value={libri.pershkrimi}
              onChange={(e) =>
                setLibri({ ...libri, pershkrimi: e.target.value })
              }
              autoComplete="off"
            />
          </Form.Group>
          <Form.Group controlId="formFotojaE">
            <Form.Label>Fotoja</Form.Label>
            <Form.Control
              type="file"
              accept=".png,.jpg,.jpeg"
              onChange={handleFileInputChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Anulo
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Krijo
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default KrijoLibrin;
