import Card from "react-bootstrap/esm/Card";
import { ILibri } from "../../app/layout/models/libri";
import { Button } from "react-bootstrap";

interface IProps {
    librat: ILibri[];
  }
  
  const LibriCard: React.FC<IProps> = ({ librat }) => {
    return (
      <>
        {librat.map((libri: ILibri) => (
         <Card key={libri.isbn} style={{ width: '17rem', height: '28rem', margin: '1em', paddingLeft:'35px', paddingTop:'30px', paddingBottom:'10px'}}>
            <Card.Img variant="top" src={libri.fotoja} style={{height:'300px', width:'200px'}} />
            <Card.Body>
              <Card.Title>{libri.titulli}</Card.Title>
              <Button variant="success">Huazo</Button>
            </Card.Body>
          </Card>
        ))}
      </>
    );
  };
  
  export default LibriCard;
  