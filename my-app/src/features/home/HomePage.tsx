import { Col, Container, Row } from 'react-bootstrap';
import LibriCard from './LibriCard';
import { useEffect, useState } from 'react';
import { ILibri } from '../../app/layout/models/libri';
import agent from '../../app/layout/api/agent';

const HomePage = () => {
  const [librat, setLibrat] = useState<ILibri[]>([]);

  useEffect(() => {
    agent.Librat.list().then((response: ILibri[]) => {
      setLibrat(response);
    });
  }, []);

  const renderLibriCards = (librat: ILibri[]) => {
    const rows = [];
    for (let i = 0; i < librat.length; i += 3) {
      const row = (
        <Row key={i}>
          {librat.slice(i, i + 3).map((libri: ILibri) => (
            <Col md={4} key={libri.isbn}>
              <LibriCard librat={[libri]} />
            </Col>
          ))}
        </Row>
      );
      rows.push(row);
    }
    return rows;
  };

  return (
    <Container style={{marginTop:'100px', marginLeft:'17px'}}>
      {renderLibriCards(librat)}
    </Container>
  );
};

export default HomePage;
