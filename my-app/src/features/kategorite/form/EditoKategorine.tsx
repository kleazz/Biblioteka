import { Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { IKategoria } from "../../../app/layout/models/kategoria";

interface IProps {
  kategoria: IKategoria;
  editKategoria: (kategoria: IKategoria) => void;
  show: boolean;
  onHide: () => void;
}

const EditoKategorine: React.FC<IProps> = ({
  show,
  onHide,
  kategoria: initialFormState,
  editKategoria,
}) => {
  const initializeForm = () => {
    if (initialFormState) {
      return initialFormState;
    } else {
      return {
        kategoriaId:0,
        emriKategorise:""
      };
    }
  };

  const [kategoria, setKategoria] = useState<IKategoria>(initializeForm);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setKategoria({ ...kategoria, [name]: value });
  };

  const handleSubmit = () => {
    editKategoria(kategoria);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{"Edito Kategorine"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formKategoriaE">
            <Form.Label>Emri</Form.Label>
            <Form.Control
              type="text"
              name="emriKategorise"
              value={kategoria.emriKategorise}
              onChange={handleInputChange}
              autoComplete="off"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onHide}>
          Mbyll
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {"Ruaj Ndryshimet"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditoKategorine;
