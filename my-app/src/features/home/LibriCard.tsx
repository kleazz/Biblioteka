import React from "react";
import Card from "react-bootstrap/Card";
import { ILibri } from "../../app/layout/models/libri";
import { Link } from "react-router-dom";

interface IProps {
  librat: ILibri[];
}

const LibriCard: React.FC<IProps> = ({ librat }) => {
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + "...";
  };

  return (
    <>
      {librat.map((libri: ILibri) => (
        <div key={libri.isbn} className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <Card
                style={{
                  width: "16rem",
                  height: "26rem",
                  padding: "20px",
                  position: "relative",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                }}
              >
                <Card.Img
                  variant="top"
                  src={libri.fotoja}
                  style={{ paddingTop: "5px", height: "300px", width: "200px" }}
                  className="mx-auto"
                />
                <Card.Body>
                  <Card.Title style={{ fontWeight: "bold" }}>
                    {libri.titulli}
                  </Card.Title>
                  <Card.Title style={{ color: "#8b9496" }}>Autori</Card.Title>
                </Card.Body>
              </Card>
            </div>
            <div className="flip-card-back">
              <Card
                style={{ width: "17rem", height: "26rem", padding: "20px", backgroundColor: "#1c2c3c", color:"white" }}
              >
                <Card.Text>{truncateText(libri.pershkrimi, 400)}</Card.Text>
                <div className="button-container">
                  <Link to={`/details/${libri.isbn}`} id="card-link">
                    Shiko më shumë &gt;
                  </Link>
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
