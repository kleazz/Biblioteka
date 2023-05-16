import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import { ILibri } from '../../app/layout/models/libri';
import { Button } from 'react-bootstrap';


interface IProps {
  librat: ILibri[];
}

const LibriCard: React.FC<IProps> = ({ librat }) => {
  return (
    <>
      {librat.map((libri: ILibri) => (
        <div
          key={libri.isbn}
          className="flip-card"
        >
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <Card
                style={{
                  width: '19rem',
                  height: '27rem',
                  margin: '1em',
                  padding: '20px',
                  position: 'relative', 
                }}
              >
                <Card.Img
                  variant="top"
                  src={libri.fotoja}
                  style={{paddingTop:'15px', height: '300px', width: '200px' }}
                  className="mx-auto"
                />
                <Card.Body>
                  <Card.Title style={{fontWeight:'bold'}}>{libri.titulli}</Card.Title>
                  <Card.Title style={{color:'#198754'}}>Autori</Card.Title>
                </Card.Body>
              </Card>
            </div>
            <div className="flip-card-back">
              <Card
                style={{
                  width: '19rem',
                  height: '27rem',
                  margin: '1em',
                  padding: '20px',
                }}
              >
                <Card.Text>{libri.pershkrimi}</Card.Text>
                <div className="button-container"> 
                    <Button variant="success" className="card-button">Huazo</Button> {/* Added */}
                  </div>
              </Card>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default LibriCard;
