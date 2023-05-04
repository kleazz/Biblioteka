import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { ILibri } from '../../../app/layout/models/libri';
import { useState } from 'react';
import axios from 'axios';

interface IProps {
  show: boolean;
  onHide: () => void;
  libri: ILibri;
  setLibri: (libri: ILibri) => void;
}

const EditoLibrin: React.FC<IProps> = ({ show, onHide, libri, setLibri }) => {
  
  const [editedLibri, setEditedLibri] = useState<ILibri>(libri);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditedLibri(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {
    const updatedLibri = {
      ...libri,
      titulli: editedLibri.titulli,
      pershkrimi: editedLibri.pershkrimi,
      fotoja: editedLibri.fotoja,
    };
  
   
    axios.put(`https://localhost:7226/api/Libri/${libri.isbn}`, updatedLibri)
      .then((response) => {
        setLibri(response.data);
        onHide();
      })
      .catch((error) => {
        console.error('Error updating book:', error);
      });
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{'Edito Librin'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formTitulliE">
            <Form.Label>Titulli</Form.Label>
            <Form.Control
              type="text"
              name="titulli"
              value={editedLibri.titulli}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="formPershkrimiE">
            <Form.Label>Përshkrimi</Form.Label>
            <Form.Control
              as="textarea"
              name="pershkrimi"
              value={editedLibri.pershkrimi}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="formFotojaE">
            <Form.Label>Kopertina</Form.Label>
            <Form.Control
              type="text"
              name="fotoja"
              value={editedLibri.fotoja}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onHide}>
          Mbyll
        </Button>
        <Button variant="primary" onClick={handleSaveChanges}>
          {'Ruaj Ndryshimet'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditoLibrin;
