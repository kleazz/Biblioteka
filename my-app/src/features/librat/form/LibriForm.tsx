import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { ILibri } from '../../../app/layout/models/libri';

import axios from "axios"; 

interface IProps {
  show: boolean;
  onHide: () => void;
  onCreate: (libri: ILibri) => void;
  mode: 'create' | 'edit';
}

const LibriForm: React.FC<IProps> = ({ show, onHide, onCreate, mode }) => {
  const [newLibri, setNewLibri] = useState<ILibri>({
    isbn: '',
    titulli: '',
    pershkrimi: '',
    fotoja: ''
  });

  const handleCreateLibri = async () => {
    try {
      const response = await axios.post('https://localhost:7226/api/Libri', newLibri);
      onCreate(response.data);
      setNewLibri({
        isbn: '',
        titulli: '',
        pershkrimi: '',
        fotoja: ''
      });
      onHide();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{mode === 'create' ? 'Krijo Librin' : 'Edito Librin'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formIsbnE">
            <Form.Label>ISBN</Form.Label>
            <Form.Control type="text" placeholder="Enter ISBN" value={newLibri.isbn} onChange={(e) => setNewLibri({ ...newLibri, isbn: e.target.value })} />
          </Form.Group>
          <Form.Group controlId="formTitulliE">
            <Form.Label>Titulli</Form.Label>
            <Form.Control type="text" placeholder="Enter Titulli" value={newLibri.titulli} onChange={(e) => setNewLibri({ ...newLibri, titulli: e.target.value })} />
          </Form.Group>
          <Form.Group controlId="formPershkrimiE">
            <Form.Label>Përshkrimi</Form.Label>
            <Form.Control as="textarea" placeholder="Enter Përshkrimi" value={newLibri.pershkrimi} onChange={(e) => setNewLibri({ ...newLibri, pershkrimi: e.target.value })} />
          </Form.Group>
          <Form.Group controlId="formFotojaE">
            <Form.Label>Kopertina</Form.Label>
            <Form.Control type="text" placeholder="Enter URL for Fotoja" value={newLibri.fotoja} onChange={(e) => setNewLibri({ ...newLibri, fotoja: e.target.value })} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onHide}>
Mbyll
</Button>
<Button variant="primary" onClick={handleCreateLibri}>
{mode === 'create' ? 'Krijo' : 'Ruaj Ndryshimet'}
</Button>
</Modal.Footer>
</Modal>
);
};

export default LibriForm;