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
    fotoja: ""
  });

  const handleSubmit = () => {
    let newLibri = {
      ...libri,
    };
    createLibri(newLibri);
    onHide();
  };

  function convertFile(files: FileList | null) {
    if (files && files.length > 0) {
      const fileRef = files[0];
      const reader = new FileReader();
      reader.onload = (ev: ProgressEvent<FileReader>) => {
        const imageUrl = ev.target?.result as string;
        setLibri({ ...libri, fotoja: imageUrl });
      };
  
      reader.readAsDataURL(fileRef);
    }
  }

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
    onChange={(e) => convertFile((e.target as HTMLInputElement).files)}
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


