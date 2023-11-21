import React, { useState, ChangeEvent } from "react";
import { Dialog } from "primereact/dialog";
import { Form } from "react-bootstrap";
import { IHuazimi } from "../../../app/layout/models/huazimi";

interface IProps {
  huazimi: IHuazimi;
  editHuazimi: (huazimi: IHuazimi) => void;
  show: boolean;
  onHide: () => void;
}

const EditoHuazimin: React.FC<IProps> = ({
  show,
  onHide,
  huazimi: initialFormState,
  editHuazimi,
}) => {
  const initializeForm = () => {
    if (initialFormState) {
      return initialFormState;
    } else {
      return {
        huazimiId: 0,
        currentDate: "",
        dueDate: new Date().toISOString().split("T")[0], // Initialize with a Date object
        returnDate: "",
        isbn: "",
        id: "",
        username: "",
      };
    }
  };

  const [huazimi, setHuazimi] = useState<IHuazimi>(initializeForm);

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value; // Keep it as a string
    setHuazimi({ ...huazimi, dueDate: selectedDate });
  };

  const handleSubmit = () => {
    editHuazimi(huazimi);
    onHide();
  };

  return (
    <>
      <Dialog header="Edito Huazimin" visible={show} style={{ width: '30vw' }} onHide={onHide}>
        <label>Emri</label>
        <div className="modal-flex">
          <Form.Control
            type="date"
            value={huazimi.dueDate}
            onChange={handleDateChange}
          />
        </div>
        <div className="modal-btn">
          <button className="submitbtn" onClick={handleSubmit}>
            Ruaj Ndryshimet
          </button>
        </div>
      </Dialog>
    </>
  );
};

export default EditoHuazimin;
