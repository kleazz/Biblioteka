import { useEffect, useState } from "react";
import agent from "../../../app/layout/api/agent";
import { IAutori } from "../../../app/layout/models/autori";
import AutoriDashboard from "./AutoriDashboard";

const Autoret = () => {
  const [autoret, setAutoret] = useState<IAutori[]>([]);

  const [selectedAutori, setSelectedAutori] = useState<IAutori | null>(null);

  const [createAutMode, setCreateAutMode] = useState(false);

  const [editAutMode, setEditAutMode] = useState(false);

  const handleCreateAutori = (autori: IAutori) => {
    agent.Autoret.create(autori).then(() => {
      setAutoret([...autoret, autori]);
      setSelectedAutori(autori);
      setEditAutMode(false);
    });
  };

  const handleEditAutori = (autori: IAutori) => {
    agent.Autoret.update(autori).then(() => {
      setAutoret([
        ...autoret.filter((a) => a.autoriId !== autori.autoriId),
        autori,
      ]);
      setSelectedAutori(autori);
      setEditAutMode(false);
    });
  };

  const handleDeleteAutori = (autoriId: number) => {
    agent.Autoret.delete(autoriId).then(() => {
      setAutoret([...autoret.filter((a) => a.autoriId !== autoriId)]);
    });
  };

  const handleSelectAutori = (autoriId: number) => {
    setSelectedAutori(autoret.filter((a) => a.autoriId === autoriId)[0]);
    setEditAutMode(true);
  };

  useEffect(() => {
    agent.Autoret.list().then((response: IAutori[]) => {
      setAutoret(response);
    });
  }, []);

  return (
    <AutoriDashboard
      autoret={autoret}
      selectAutori={handleSelectAutori}
      selectedAutori={selectedAutori!}
      editAutMode={editAutMode}
      setEditAutMode={setEditAutMode}
      setSelectedAutori={setSelectedAutori}
      createAutori={handleCreateAutori}
      editAutori={handleEditAutori}
      deleteAutori={handleDeleteAutori}
      createAutMode={createAutMode}
      setCreateAutMode={setCreateAutMode}
    />
  );
};

export default Autoret;
