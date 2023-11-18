import React from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { IRezervimi } from "../../../app/layout/models/rezervimi";
import { Container, Table } from "react-bootstrap";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ILexuesi } from "../../../app/layout/models/lexuesi";
import { ILibri } from "../../../app/layout/models/libri";

interface IProps {
  rezervimet: IRezervimi[];
  librat: ILibri[];
  setEditMode: (editMode: boolean) => void;
  setCreateMode: (createMode: boolean) => void;
  selectRezervimi: (id: number) => void;
  deleteRezervimi: (isbn: number) => void;
}

const RezervimiTabela: React.FC<IProps> = ({
  rezervimet,
  librat,
  setCreateMode,
  selectRezervimi,
  deleteRezervimi,
}) => {
  console.log(librat);
  const getLibriTitle = (libriIsbn: string): string => {
    const libri = librat.find((libri) => libri.isbn === libriIsbn);
    return libri ? libri.titulli : "";
  };
  return (
    <div className="tabela">
      <Row className="align-items-center justify-content-between">
        <Col>
          <h3>Lista e rezervimeve</h3>
        </Col>
        <Col xs="auto">
          <Button label="New" text onClick={() => setCreateMode(true)}></Button>
        </Col>
      </Row>
      {/* <DataTable value={librat} tableStyle={{ minWidth: '50rem' }}>
    <Column field="isbn" header="ISBN"></Column>
    <Column field="titulli" header="Titulli"></Column>
    <Column field="pershkrimi" header="Përshkrimi"></Column>
    <Column field="kopertina" header="Kopertina"></Column>
    <Column field="sasia" header="Sasia"></Column>
    <Column field="edit"></Column>
    <Column field="delete"></Column>
</DataTable> */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th scope="col">ISBN</th>
            <th scope="col">Titulli</th>
            <th scope="col">Username</th>
            <th scope="col">DueDate</th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {rezervimet.map((rezervimi) => {
  console.log(rezervimi);
  return (
    <tr key={rezervimi.rezervimiId}>
    <td>{rezervimi.isbn}</td>
    <td>{getLibriTitle(rezervimi.isbn)}</td> 
    <td>{rezervimi.username}</td>
    <td>{rezervimi.dueDate}</td>
    <td>
        <Button
          label="Edit"
          severity="secondary"
          text
          onClick={() => selectRezervimi(rezervimi.rezervimiId)}
        />
      </td>
      <td>
        <Button
          label="Delete"
          severity="danger"
          text
          onClick={() => deleteRezervimi(rezervimi.rezervimiId)}
        />
      </td>
      <td>
        <Button label="Huazo" severity="danger" text />
      </td>
    </tr>
  );
})}
        </tbody>
      </Table>
    </div>
  );
};

export default RezervimiTabela;
