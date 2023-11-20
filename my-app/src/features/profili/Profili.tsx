import React, { useEffect, useState } from "react";
import { IRezervimi } from "../../app/layout/models/rezervimi";
import { Avatar } from "primereact/avatar";
import { Fieldset } from "primereact/fieldset";
import { TabPanel, TabView } from "primereact/tabview";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { ILibri } from "../../app/layout/models/libri";
import agent from "../../app/layout/api/agent";
import ProfiliDashboard from "./ProfiliDashboard";

const Profili = () => {
  const [rezervimet, setRezervimet] = useState <IRezervimi[]>([]);

  const[librat, setLibrat] = useState <ILibri[]>([]);

  const handleDeleteRezervimi = (id: number) => {
    agent.Rezervimet.delete(id).then(() => {
      setRezervimet([...rezervimet.filter((r) => r.rezervimiId !== id)]);
    });
  };

  useEffect(() => {
    agent.Rezervimet.list().then((response: IRezervimi[]) => {
      setRezervimet(response);
    });

    agent.Librat.list().then((libratResponse: ILibri[]) => {
      setLibrat(libratResponse);
    });
  }, []);

  return(
    <ProfiliDashboard
    rezervimet={rezervimet}
    librat={librat}
    deleteRezervimi={handleDeleteRezervimi}/>
  );
};

export default Profili;




