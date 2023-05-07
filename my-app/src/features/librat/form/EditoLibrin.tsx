import { Modal } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { ILibri } from '../../../app/layout/models/libri';
import { useState } from 'react';

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
  editLibri
}) => {
  const initializeForm = () => {
    if (initialFormState) {
      return initialFormState;
    } else {
      return {
        isbn: '',
        titulli: '',
        pershkrimi: '',
        fotoja: ''
      };
    }
  };

  const [libri, setLibri] = useState<ILibri>(initializeForm);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLibri({ ...libri, [name]: value });
  };

  const handleSubmit = () => {
    editLibri(libri);
    onHide();
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
              value={libri.titulli}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="formPershkrimiE">
            <Form.Label>Përshkrimi</Form.Label>
            <Form.Control
              as="textarea"
              name="pershkrimi"
              value={libri.pershkrimi}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="formFotojaE">
            <Form.Label>Kopertina</Form.Label>
            <Form.Control
              type="text"
              name="fotoja"
              value={libri.fotoja}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onHide}>
          Mbyll
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {'Ruaj Ndryshimet'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditoLibrin;

