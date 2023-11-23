import React, { ChangeEvent, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { IRezervimi } from "../../../app/layout/models/rezervimi";
import { Table } from "react-bootstrap";
import { Button } from "primereact/button";
import { Paginator } from "primereact/paginator";
import { PaginatorPageChangeEvent } from "primereact/paginator";
import { ILibri } from "../../../app/layout/models/libri";
import { IHuazimi } from "../../../app/layout/models/huazimi";
import agent from "../../../app/layout/api/agent";

interface IProps {
  huazimi: IHuazimi;
  huazimet: IHuazimi[];
  librat: ILibri[];
  setEditMode: (editMode: boolean) => void;
  setCreateMode: (createMode: boolean) => void;
  selectHuazimi: (id: number) => void;
  deleteHuazimi: (id: number) => void;
  editHuazimi: (huazimi: IHuazimi) => void;
}

const HuazimiTabela: React.FC<IProps> = ({
  huazimi: initialFormState,
  huazimet,
  librat,
  selectHuazimi,
  deleteHuazimi,
  editHuazimi
}) => {
  const INITIAL_RETURN_DATE = new Date('0001-01-01T00:00:00.000Z');

  const [first, setFirst] = useState<number>(0);
  const itemsPerPage = 15;

  const getLibriTitle = (libriIsbn: string): string => {
    const libri = librat.find((libri) => libri.isbn === libriIsbn);
    return libri ? libri.titulli : "";
  };

  const getLibriKopertina = (libriIsbn: string): string => {
    const libri = librat.find((libri) => libri.isbn === libriIsbn);
    return libri ? libri.fotoja : "";
  };

  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setFirst(event.first);
  };

  const renderTabelaRows = () => {
    const startIndex = first;
    const endIndex = first + itemsPerPage;

    return huazimet.slice(startIndex, endIndex).map((huazimi) => (
      <tr key={huazimi.huazimiId}>
        <td><img src={getLibriKopertina(huazimi.isbn)} className="kopertina"></img></td>
        <td>{huazimi.isbn}</td>
        <td>{getLibriTitle(huazimi.isbn)}</td>
        <td>{huazimi.username}</td>
        <td>{new Date(huazimi.currentDate).toLocaleDateString()}</td>
        <td>{new Date(huazimi.dueDate).toLocaleDateString()}</td>
        <td style={{ color: huazimi.isReturned ?'black': 'red' }}>
          {huazimi.isReturned ? new Date(huazimi.returnDate).toLocaleDateString() :  'NOT RETURNED'}
        </td>
        <td>
          <Button
            label="Edit"
            severity="secondary"
            text
            onClick={() => selectHuazimi(huazimi.huazimiId)}
          />
        </td>
        <td>
          <Button label="Delete" text severity="danger" onClick={() => deleteHuazimi(huazimi.huazimiId)}/>
        </td>
      </tr>
    ));
  };

  return (
    <>
      <div className="tabela">
        <Row className="align-items-center justify-content-between">
          <Col>
            <h3>Lista e huazimeve</h3>
          </Col>
        </Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th scope="col">Huazimi</th>
              <th scope="col">ISBN</th>
              <th scope="col">Titulli</th>
              <th scope="col">Username</th>
              <th scope="col">Start date</th>
              <th scope="col">Due Date</th>
              <th scope="col">Return Date</th> 
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
        totalRecords={huazimet.length}
        onPageChange={onPageChange}
        template={{ layout: "PrevPageLink CurrentPageReport NextPageLink" }}
      />
    </>
  );
};

export default HuazimiTabela;