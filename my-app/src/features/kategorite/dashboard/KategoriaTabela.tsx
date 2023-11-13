import React from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { IKategoria } from "../../../app/layout/models/kategoria";
import { Table } from "react-bootstrap";
import { Button } from "primereact/button";

interface IProps {
  kategorite: IKategoria[];
  setEditKatMode: (editMode: boolean) => void;
  setCreateKatMode: (createMode: boolean) => void;
  selectKategoria: (kategoriaId: number) => void;
  deleteKategoria: (kategoriaId: number) => void;
}

const KategoriaTabela: React.FC<IProps> = ({
  kategorite,
  setCreateKatMode,
  selectKategoria,
  deleteKategoria,
}) => {
  return (
    <div style={{ padding:"100px" }}>
      {" "}
      <Row className="align-items-center justify-content-between">
        <Col>
          <h3>Lista e kategorive</h3>
        </Col>
        <Col xs="auto">
          <Button label="New" text onClick={() => setCreateKatMode(true)}></Button>
        </Col>
      </Row>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th scope="col">Emri</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {kategorite.map((kategoria) => (
            <tr key={kategoria.kategoriaId}>
              <td>{kategoria.emriKategorise}</td>
              <td>
                <Button label="Edit" severity="secondary" text onClick={() => selectKategoria(kategoria.kategoriaId)}/>
              </td>
              <td>
                <Button label="Delete" severity="danger" text onClick={() => deleteKategoria(kategoria.kategoriaId)} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
export default KategoriaTabela;
