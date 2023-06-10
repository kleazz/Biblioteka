import React, { useEffect, useState } from "react";
import { IRezervimi } from "../../app/layout/models/rezervimi";

const Profili: React.FC = () => {
  const [reservations, setReservations] = useState<IRezervimi[]>([]);
  const e = localStorage.getItem("username");

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const u = localStorage.getItem("userId");
      const response = await fetch(
        `https://localhost:7226/api/Authenticate/join/${u}`
      );
      const data = await response.json();
      setReservations(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteReservation = async (reservationId: number) => {
    try {
      await fetch(`https://localhost:7226/api/Rezervimi/${reservationId}`, {
        method: "DELETE",
      });
      fetchReservations();
    } catch (error) {
      console.log(error);
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div style={{ marginTop: "2.5cm" }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="35"
        height="35"
        fill="currentColor"
        className="bi bi-person-fill"
        viewBox="0 0 16 16"
      >
        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
      </svg>
      <h3>{e}</h3>
      <h4 className="text-success">Rezervimet</h4>
      {reservations.map((reservation) => {
        const { libri, rezervimi } = reservation;
        return (
          <div key={rezervimi.rezervimiId} className="reservation-card">
            <div>
              <img
                src={libri.fotoja}
                alt="Book Cover"
                style={{ height: "250px", width: "170px" }}
              />
              <h2>{libri.titulli}</h2>
              <p>Due Date: {formatDate(rezervimi.dueDate)}</p>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={() => deleteReservation(rezervimi.rezervimiId)}
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

export default Profili;
