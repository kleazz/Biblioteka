import { useState, useEffect, Fragment } from "react";
import { ILibri } from "./models/libri";
import NavBar from "../../features/nav/navbar";
import LibriDashboard from "../../features/librat/dashboard/LibriDashboard";
import { Route, Routes } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import agent from "./api/agent";

const App = () => {
  const [librat, setLibrat] = useState<ILibri[]>([]);

  const [selectedLibri, setSelectedLibri] = useState<ILibri | null>(null);

  const [createMode, setCreateMode] = useState(false);

  const [editMode, setEditMode] = useState(false);

  const handleCreateLibri = (libri: ILibri) => {
    agent.Librat.create(libri).then(() => {
    setLibrat([...librat, libri]);
      setSelectedLibri(libri);
      setEditMode(false);
    });
  };

  const handleEditLibri = (libri: ILibri) => {
    agent.Librat.update(libri).then(() => {
       setLibrat([...librat.filter((l) => l.isbn !== libri.isbn), libri]);
    setSelectedLibri(libri);
    setEditMode(false);
    })
  };

  const handleDeleteLibri = (isbn: string) => {
    agent.Librat.delete(isbn).then(() => {
      setLibrat([...librat.filter((l) => l.isbn !== isbn)]);
    })
  };

  const handleSelectLibri = (isbn: string) => {
    setSelectedLibri(librat.filter((l) => l.isbn === isbn)[0]);
    setEditMode(true);
  };

  useEffect(() => {
    agent.Librat.list().then((response: ILibri[]) => {
      setLibrat(response);
    });
  }, []);

  return (
    <Fragment>
      <NavBar />
      <Routes>
        <Route path="/" Component={HomePage} />
      </Routes>
      {
        <LibriDashboard
          librat={librat}
          selectLibri={handleSelectLibri}
          selectedLibri={selectedLibri!}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedLibri={setSelectedLibri}
          createLibri={handleCreateLibri}
          editLibri={handleEditLibri}
          deleteLibri={handleDeleteLibri}
          createMode={createMode}
          setCreateMode={setCreateMode}
        />
      }
    </Fragment>
  );
};

export default App;
