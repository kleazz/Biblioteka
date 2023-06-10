import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { IRezervimi } from "../../app/layout/models/rezervimi";


const Rezervimet: React.FC = () => {
  const [rezervimet, setRezervimet] = useState<IRezervimi[]>([]);

//   useEffect(() => {
//     agent.Rezervimet.list().then((response: IRezervimi[]) => {
//       setRezervimet(response);
//     });
//   }, []);


  return (
    <div style={{ marginTop: "7em" }}>
      <Row className="align-items-center justify-content-between">
        <Col>
          <h3>Lista e lexuesve</h3>
        </Col>
      </Row>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">username</th>
            <th scope="col">email</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {rezervimet.map((rezervimi) => (
            <tr key={rezervimi.rezervimi.rezervimiId}>
              <td>{rezervimi.rezervimi.username}</td>
              <td>{rezervimi.rezervimi.dueDate}</td>
    
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Rezervimet;
