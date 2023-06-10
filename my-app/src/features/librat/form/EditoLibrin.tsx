import React, { useState, useRef } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { ILibri } from "../../../app/layout/models/libri";

interface IProps {
  libri: ILibri;
  editLibri: (libri: ILibri) => void;
  show: boolean;
  onHide: () => void;
}

const EditoLibrin: React.FC<IProps> = ({
  show,
  onHide,
  libri: initialFormState,
  editLibri,
}) => {
  const initializeForm = () => {
    if (initialFormState) {
      return initialFormState;
    } else {
      return {
        isbn: "",
        titulli: "",
        pershkrimi: "",
        fotoja: "",
      };
    }
  };

  const [libri, setLibri] = useState<ILibri>(initializeForm);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLibri({ ...libri, [name]: value });
  };

  const handleFotojaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (ev: ProgressEvent<FileReader>) => {
        const imageUrl = ev.target?.result as string;
        setLibri({ ...libri, fotoja: imageUrl });
      };

      reader.readAsDataURL(file);
    }
  };

  const handleChooseFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = () => {
    editLibri(libri);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edito Librin</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formTitulliE">
            <Form.Label>Titulli</Form.Label>
            <Form.Control
              type="text"
              name="titulli"
              value={libri.titulli}
              onChange={handleInputChange}
              autoComplete="off"
            />
          </Form.Group>
          <Form.Group controlId="formPershkrimiE">
            <Form.Label>Përshkrimi</Form.Label>
            <Form.Control
              as="textarea"
              name="pershkrimi"
              value={libri.pershkrimi}
              onChange={handleInputChange}
              autoComplete="off"
            />
          </Form.Group>
          <Form.Group controlId="formFotojaE">
            <Form.Label>Kopertina</Form.Label>
            <div>
              <Button variant="outline-primary" onClick={handleChooseFile}>
                Choose File
              </Button>
            </div>
            <div>
              <Form.Control
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                accept=".png,.jpg,.jpeg"
                onChange={handleFotojaChange}
                autoComplete="off"
              />
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onHide}>
          Mbyll
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Ruaj Ndryshimet
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditoLibrin;
