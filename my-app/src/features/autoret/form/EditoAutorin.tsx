import { Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { IAutori } from "../../../app/layout/models/autori";

interface IProps {
  autori: IAutori;
  editAutori: (autori: IAutori) => void;
  show: boolean;
  onHide: () => void;
}

const EditoAutorin: React.FC<IProps> = ({
  show,
  onHide,
  autori: initialFormState,
  editAutori,
}) => {
  const initializeForm = () => {
    if (initialFormState) {
      return initialFormState;
    } else {
      return {
        autoriId: 0,
        emri: "",
        mbiemri: "",
      };
    }
  };

  const [autori, setAutori] = useState<IAutori>(initializeForm);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setAutori({ ...autori, [name]: value });
  };

  const handleSubmit = () => {
    editAutori(autori);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{"Edito Autorin"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formEmriE">
            <Form.Label>Emri</Form.Label>
            <Form.Control
              type="text"
              name="emri"
              value={autori.emri}
              onChange={handleInputChange}
              autoComplete="off"
            />
          </Form.Group>
          <Form.Group controlId="formMbiemriE">
            <Form.Label>Mbiemri</Form.Label>
            <Form.Control
              type="text"
              name="mbiemri"
              value={autori.mbiemri}
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

export default EditoAutorin;
