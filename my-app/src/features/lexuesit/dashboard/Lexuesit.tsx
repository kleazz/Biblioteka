import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { ILexuesi } from "../../../app/layout/models/lexuesi";
import agent from "../../../app/layout/api/agent";

const Lexuesit: React.FC = () => {
  const [lexuesit, setLexuesit] = useState<ILexuesi[]>([]);

  useEffect(() => {
    agent.Lexuesit.list().then((response: ILexuesi[]) => {
      setLexuesit(response);
    });
  }, []);

  const handleDeleteLexuesi = (username: string) => {
    agent.Lexuesit.delete(username).then(() => {
      setLexuesit([...lexuesit.filter((l) => l.username !== username)]);
    });
  };

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
          {lexuesit.map((lexuesi) => (
            <tr key={lexuesi.username}>
              <td>{lexuesi.username}</td>
              <td>{lexuesi.email}</td>
              <td>
                <Button variant="outline-danger" onClick={() => handleDeleteLexuesi(lexuesi.username)}
>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Lexuesit;
