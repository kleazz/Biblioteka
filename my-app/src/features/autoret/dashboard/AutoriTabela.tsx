import React from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { IAutori } from "../../../app/layout/models/autori";
import { Table } from "react-bootstrap";
import { Button } from "primereact/button";

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
    <div className="tabela">
      {" "}
      <Row className="align-items-center justify-content-between">
        <Col>
          <h3>Lista e autorëve</h3>
        </Col>
        <Col xs="auto">
          <Button label="New" text onClick={() => setCreateAutMode(true)}/>
        </Col>
      </Row>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th scope="col">Emri</th>
            <th scope="col">Mbiemri</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {autoret.map((autori) => (
            <tr key={autori.autoriId}>
              <td>{autori.emri}</td>
              <td>{autori.mbiemri}</td>
              <td>
                <Button label="Edit" severity="secondary" text onClick={() => selectAutori(autori.autoriId)}/>
              </td>
              <td>
                <Button label="Delete" severity="danger" text onClick={() => deleteAutori(autori.autoriId)} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
export default AutoriTabela;
