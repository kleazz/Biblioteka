import React from "react";
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { IAutori } from "../../../app/layout/models/autori";

interface IProps {
  autoret: IAutori[];
  setEditAutMode: (editMode: boolean) => void;
  setCreateAutMode: (createMode: boolean) => void;
  selectAutori: (autoriId: number) => void;
  deleteAutori: (autoriId: number) => void;
}

const AutoriTabela: React.FC<IProps> = ({
  autoret,
  setCreateAutMode,
  selectAutori,
  deleteAutori,
}) => {
  return (
    <div style={{ marginTop: "7em" }}>
      {" "}
      <Row className="align-items-center justify-content-between">
        <Col>
          <h3>Lista e autorëve</h3>
        </Col>
        <Col xs="auto">
          <Button onClick={() => setCreateAutMode(true)} variant="outline-success">
            Create
          </Button>
        </Col>
      </Row>
      <table className="table table-striped">
        <thead>
          <tr>
          <th scope="col">ID</th>
            <th scope="col">Emri</th>
            <th scope="col">Mbiemri</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {autoret.map((autori) => (
            <tr key={autori.autoriId}>
              <td>{autori.autoriId}</td>
              <td>{autori.emri}</td>
              <td>{autori.mbiemri}</td>
              <td>
                <Button
                  onClick={() => selectAutori(autori.autoriId)}
                  variant="outline-primary"
                >
                  Edit
                </Button>
              </td>
              <td>
                <Button
                  variant="outline-danger"
                  onClick={() => deleteAutori(autori.autoriId)}
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
export default AutoriTabela;