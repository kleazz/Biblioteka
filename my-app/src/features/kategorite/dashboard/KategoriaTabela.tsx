import React from "react";
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { IKategoria } from "../../../app/layout/models/kategoria";

interface IProps {
  kategorite: IKategoria[];
  setEditKatMode: (editMode: boolean) => void;
  setCreateKatMode: (createMode: boolean) => void;
  selectKategoria: (id: number) => void;
  deleteKategoria: (id: number) => void;
}

const KategoriaTabela: React.FC<IProps> = ({
  kategorite,
  setCreateKatMode,
  selectKategoria,
  deleteKategoria,
}) => {
  return (
    <div style={{ marginTop: "7em" }}>
      {" "}
      <Row className="align-items-center justify-content-between">
        <Col>
          <h3>Lista e kategorive</h3>
        </Col>
        <Col xs="auto">
          <Button onClick={() => setCreateKatMode(true)} variant="outline-success">
            Create
          </Button>
        </Col>
      </Row>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Emri</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {kategorite.map((kategoria) => (
            <tr key={kategoria.id}>
              <td>{kategoria.id}</td>
              <td>{kategoria.emri}</td>
              <td>
                <Button
                  onClick={() => selectKategoria(kategoria.id)}
                  variant="outline-primary"
                >
                  Edit
                </Button>
              </td>
              <td>
                <Button
                  variant="outline-danger"
                  onClick={() => deleteKategoria(kategoria.id)}
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
export default KategoriaTabela;