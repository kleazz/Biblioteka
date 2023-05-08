import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { IKategoria } from "../../../app/layout/models/kategoria";
import { Modal } from "react-bootstrap";

interface IProps {
  kategoria: IKategoria;
  createKategoria: (kategoria: IKategoria) => void;
  editKategoria: (kategoria: IKategoria) => void;
  show: boolean;
  onHide: () => void;
}

const KrijoKategorine: React.FC<IProps> = ({ show, onHide, createKategoria }) => {
  const [kategoria, setKategoria] = useState<IKategoria>({
    kategoriaId:0,
    emriKategorise: ""
  });

  const handleSubmit = () => {
    let newKategoria = {
      ...kategoria,
    };
    createKategoria(newKategoria);
    onHide();
    window.location.reload();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{"Krijo Kategorine"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formEmriE">
            <Form.Label>Emri</Form.Label>
            <Form.Control
              type="text"
              placeholder="Shkruaj emrin"
              value={kategoria.emriKategorise}
              onChange={(e) => setKategoria({ ...kategoria, emriKategorise: e.target.value })}
              autoComplete="off"
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

export default KrijoKategorine;


