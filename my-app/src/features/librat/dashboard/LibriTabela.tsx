import React from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { ILibri } from "../../../app/layout/models/libri";
import { Table } from "react-bootstrap";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

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
    <div style={{ padding:"100px" }}>
      <Row className="align-items-center justify-content-between">
        <Col>
          <h3>Lista e librave</h3>
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
            <th scope="col">Përshkrimi</th>
            <th scope="col">Kopertina</th>
            <th scope="col">Sasia</th>
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
              <td>{libri.sasia}</td>
              <td>
                <Button label="Edit" severity="secondary" text onClick={() => selectLibri(libri.isbn)}/>
              </td>
              <td>
                <Button label="Delete" severity="danger" text onClick={() => deleteLibri(libri.isbn)} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default LibriTabela;
