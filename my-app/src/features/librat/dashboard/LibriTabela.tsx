import React from "react";
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { ILibri } from "../../../app/layout/models/libri";

interface IProps {
  librat: ILibri[];
  setEditMode: (editMode: boolean) => void;
  setCreateMode: (createMode: boolean) => void;
  selectLibri: (isbn: string) => void;
  deleteLibri: (isbn: string) => void;
}

const LibriTabela: React.FC<IProps> = ({
  librat,
  setCreateMode,
  selectLibri,
  deleteLibri,
}) => {
  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <div style={{ marginTop: "7em" }}>
      <Row className="align-items-center justify-content-between">
        <Col>
          <h3>Lista e librave</h3>
        </Col>
        <Col xs="auto">
          <Button onClick={() => setCreateMode(true)} variant="outline-success">
            Create
          </Button>
        </Col>
      </Row>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">ISBN</th>
            <th scope="col">Titulli</th>
            <th scope="col">Përshkrimi</th>
            <th scope="col">Kopertina</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {librat.map((libri) => (
            <tr key={libri.isbn}>
              <td>{libri.isbn}</td>
              <td>{libri.titulli}</td>
              <td>{truncateText(libri.pershkrimi, 50)}</td>
              <td>{truncateText(libri.fotoja, 50)}</td>
              <td>
                <Button
                  onClick={() => selectLibri(libri.isbn)}
                  variant="outline-primary"
                >
                  Edit
                </Button>
              </td>
              <td>
                <Button
                  variant="outline-danger"
                  onClick={() => deleteLibri(libri.isbn)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LibriTabela;
