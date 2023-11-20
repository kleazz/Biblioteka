import React, { useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { IRezervimi } from "../../../app/layout/models/rezervimi";
import { Table } from "react-bootstrap";
import { Button } from "primereact/button";
import { Paginator } from "primereact/paginator";
import { PaginatorPageChangeEvent } from "primereact/paginator";
import { ILibri } from "../../../app/layout/models/libri";

interface IProps {
  rezervimet: IRezervimi[];
  librat: ILibri[];
  setEditMode: (editMode: boolean) => void;
  setCreateMode: (createMode: boolean) => void;
  selectRezervimi: (id: number) => void;
  deleteRezervimi: (id: number) => void;
}

const RezervimiTabela: React.FC<IProps> = ({
  rezervimet,
  librat,
  setCreateMode,
  selectRezervimi,
  deleteRezervimi,
}) => {
  const [first, setFirst] = useState<number>(0);
  const itemsPerPage = 15;

  const getLibriTitle = (libriIsbn: string): string => {
    const libri = librat.find((libri) => libri.isbn === libriIsbn);
    return libri ? libri.titulli : "";
  };

  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setFirst(event.first);
  };

  const renderTabelaRows = () => {
    const startIndex = first;
    const endIndex = first + itemsPerPage;

    return rezervimet.slice(startIndex, endIndex).map((rezervimi) => (
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
    ));
  };

  return (
    <>
      <div className="tabela">
        <Row className="align-items-center justify-content-between">
          <Col>
            <h3>Lista e rezervimeve</h3>
          </Col>
        </Row>
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
          <tbody>{renderTabelaRows()}</tbody>
        </Table>
      </div>
      <Paginator
        className="paginator"
        first={first}
        rows={itemsPerPage}
        totalRecords={rezervimet.length}
        onPageChange={onPageChange}
        template={{ layout: "PrevPageLink CurrentPageReport NextPageLink" }}
      />
    </>
  );
};

export default RezervimiTabela;
