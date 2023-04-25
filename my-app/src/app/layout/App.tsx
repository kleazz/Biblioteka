
import { useState, useEffect, Fragment} from "react";
import axios from 'axios';
import { ILibri } from "./models/libri";
import NavBar from "../../features/nav/navbar";
import LibriDashboard from "../../features/librat/dashboard/LibriDashboard";


const App =()=>{
  const [librat, setLibrat]=useState<ILibri[]>([]);

  const [editMode, setEditMode]=useState(false);

  const [createMode, setCreateMode]=useState(false);

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
       setCreateMode={setCreateMode}/>  
      </Fragment>
    )
}

export default App;
