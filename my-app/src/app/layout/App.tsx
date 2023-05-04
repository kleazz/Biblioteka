import { useState, useEffect, Fragment} from "react";
import axios from 'axios';
import { ILibri } from "./models/libri";
import NavBar from "../../features/nav/navbar";
import LibriDashboard from "../../features/librat/dashboard/LibriDashboard";


const App =()=>{
  const [librat, setLibrat]=useState<ILibri[]>([]);

  const[selectedLibri, setSelectedLibri]=useState<ILibri | null>(null);

  const [createMode, setCreateMode]=useState(false);

  const [editMode, setEditMode]=useState(false);

  const handleSelectLibri =(isbn: string)=>{
    setSelectedLibri(librat.filter(l=>l.isbn===isbn)[0])
    setEditMode(true)
    }

  const handleDeleteLibri =(isbn: string) =>{
    setLibrat([...librat.filter(l=>l.isbn !== isbn)])
  }

  useEffect(()=>{
    axios
    .get<ILibri[]>('https://localhost:7226/api/Libri')
    .then(response =>{
      setLibrat(response.data)
    });
  }, []);
 
    return(
      <Fragment>
        <NavBar></NavBar>
       <LibriDashboard librat={librat} 
       editMode={editMode}
       setEditMode={setEditMode}
       createMode={createMode}
       setCreateMode={setCreateMode}
       selectLibri={handleSelectLibri}
       selectedLibri={selectedLibri!}
       deleteLibri={handleDeleteLibri}
       />  
      </Fragment>
    )
}

export default App;