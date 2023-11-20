import React, { useEffect, useState } from "react";
import { IRezervimi } from "../../app/layout/models/rezervimi";
import { Avatar } from "primereact/avatar";
import { Fieldset } from "primereact/fieldset";
import { TabPanel, TabView } from "primereact/tabview";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { ILibri } from "../../app/layout/models/libri";
interface IProps {
  rezervimet: IRezervimi[];
  librat: ILibri[];
  deleteRezervimi: (id:number) => void
}
const ProfiliDashboard: React.FC<IProps> = ({
  rezervimet,
  librat,
  deleteRezervimi

}) => {
  const e = localStorage.getItem("username");

  const getLibriFotoja = (libriIsbn: string): string => {
    const libri = librat.find((libri) => libri.isbn === libriIsbn)
    return libri? libri.fotoja: "";
  }

  const getLibriTitulli = (libriIsbn: string): string => {
    const libri = librat.find((libri) => libri.isbn === libriIsbn)
    return libri? libri.titulli: "";
  }

  // const [reservations, setReservations] = useState<any>([]);
  

  // useEffect(() => {
  //   fetchReservations();
  // }, []);

  // const fetchReservations = async () => {
  //   try {
  //     const u = localStorage.getItem("userId");
  //     const response = await fetch(
  //       `https://localhost:7226/api/Authenticate/join/${u}`
  //     );
  //     const data = await response.json();
  //     setReservations(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const deleteReservation = async (reservationId: number) => {
  //   try {
  //     await fetch(`https://localhost:7226/api/Rezervimi/${reservationId}`, {
  //       method: "DELETE",
  //     });
  //     fetchReservations();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const filteredReservations = rezervimet.filter((rezervimi) => rezervimi.username === e);

  return (
    <div style={{marginTop:"30px", padding: "90px", minHeight: "100vh"}}>
      <div className="profile-logo">
      <Avatar label={e ? e.charAt(0).toUpperCase() : ""} size="xlarge" shape="circle" />
    <h3 style={{marginTop: "20px", marginLeft: "20px"}}>{e}</h3>
    </div>
    <hr></hr>
      {filteredReservations.map((rezervimi) => {
        return (
          <div key={rezervimi.rezervimiId} className="reservation-card">
            <div>
              <img
                src={getLibriFotoja(rezervimi.isbn)}
                alt="Book Cover"
                style={{ height: "250px", width: "170px" }}
              />
              <h2>{getLibriTitulli(rezervimi.isbn)}</h2>
              <p>Due Date: {formatDate(rezervimi.dueDate)}</p>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={() => deleteRezervimi(rezervimi.rezervimiId)}
                style={{ marginTop: "7.5cm" }}
              >
                Delete
              </button>
            </div>
          </div>
        );
      })} 
    </div>
  );
};

export default ProfiliDashboard;
