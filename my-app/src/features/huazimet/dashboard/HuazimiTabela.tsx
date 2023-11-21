import React, { useState } from "react";
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
  huazimet: IHuazimi[];
  librat: ILibri[];
  setEditMode: (editMode: boolean) => void;
  setCreateMode: (createMode: boolean) => void;
  selectHuazimi: (id: number) => void;
  deleteHuazimi: (id: number) => void;
}

const HuazimiTabela: React.FC<IProps> = ({
  huazimet,
  librat,
  selectHuazimi,
  deleteHuazimi
}) => {
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

  const handleReturnHuazimi = async (huazimiId: number) => {
    try {
      const currentDate = new Date();
    
      // Assuming huazimi is an array and you want to find the specific huazimi object
      const huazimiToUpdate = huazimet.find((huazimi) => huazimi.huazimiId === huazimiId);
    
      if (!huazimiToUpdate) {
        console.log("Huazimi not found");
        return;
      }
    
      // Create a deep copy of the huazimiToUpdate object
      const updatedHuazimiData = JSON.parse(JSON.stringify(huazimiToUpdate));
    
      // Update the returnDate property
      updatedHuazimiData.returnDate = currentDate.toISOString();
    
      // Stringify the updatedHuazimiData
      const updatedHuazimiDataString = JSON.stringify(updatedHuazimiData);
    
      // Call the API to update the huazimi using the correct PUT method
      const response = await fetch(`https://localhost:7226/api/Huazimi/${huazimiId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: updatedHuazimiDataString,
      });
    
      if (response.ok) {
        console.log("Huazimi updated successfully");
        // You may want to update the state or fetch the updated data after a successful edit
      } else {
        console.log("Error updating Huazimi");
      }
    } catch (error) {
      console.log("Error updating Huazimi", error);
    }
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
        <td>{new Date(huazimi.returnDate).toLocaleDateString()}</td>
        <td>
          <Button
            label="Edit"
            severity="secondary"
            text
            onClick={() => selectHuazimi(huazimi.huazimiId)}
          />
        </td>
        <td>
          <Button label="Kthe" text onClick={() => handleReturnHuazimi(huazimi.huazimiId)}/>
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
