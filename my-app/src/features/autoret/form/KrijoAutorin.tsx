import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Modal } from "react-bootstrap";
import { IAutori } from "../../../app/layout/models/autori";

interface IProps {
  autori: IAutori;
  createAutori: (autori: IAutori) => void;
  editAutori: (autori: IAutori) => void;
  show: boolean;
  onHide: () => void;
}

const KrijoAutorin: React.FC<IProps> = ({ show, onHide, createAutori }) => {
  const [autori, setAutori] = useState<IAutori>({
    autoriId: 0,
    emri: "",
    mbiemri: "",
  });

  const handleSubmit = () => {
    let newAutori = {
      ...autori,
    };
    createAutori(newAutori);
    onHide();
    window.location.reload();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{"Krijo Autorin"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formEmriE">
            <Form.Label>Emri</Form.Label>
            <Form.Control
              type="text"
              placeholder="Shkruaj emrin"
              value={autori.emri}
              onChange={(e) => setAutori({ ...autori, emri: e.target.value })}
              autoComplete="off"
            />
          </Form.Group>
          <Form.Group controlId="formMbiemriE">
            <Form.Label>Mbiemri</Form.Label>
            <Form.Control
              type="text"
              placeholder="Shkruaj mbiemrin"
              value={autori.mbiemri}
              onChange={(e) =>
                setAutori({ ...autori, mbiemri: e.target.value })
              }
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

export default KrijoAutorin;
