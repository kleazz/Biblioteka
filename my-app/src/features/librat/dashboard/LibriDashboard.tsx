import { ILibri } from '../../../app/layout/models/libri';
import LibriTabela from './LibriTabela';
import KrijoLibrin from '../form/KrijoLibrin';
import EditoLibrin from '../form/EditoLibrin';

interface IProps {
  librat: ILibri[];
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
  createMode: boolean;
  setCreateMode: (createMode: boolean) => void;
  selectLibri: (isbn: string) => void;
  selectedLibri: ILibri;
  deleteLibri: (isbn: string) => void;

}

const LibriDashboard: React.FC<IProps> = ({
  librat,
  editMode,
  setEditMode,
  createMode,
  setCreateMode,
  selectLibri, 
  selectedLibri,
  deleteLibri}
  ) => {

    return (
      <>
        <LibriTabela
          librat={librat}
          setEditMode={setEditMode}
          setCreateMode={setCreateMode}
          selectLibri={selectLibri}
          deleteLibri={deleteLibri}

        />
        {createMode && (
          <KrijoLibrin
            show={true}
            onHide={() => setCreateMode(false)}
            onCreate={(libri: ILibri): void => {
              throw new Error('Function not implemented.');
            }}
          />
        )}
        {editMode && selectedLibri && (
          <EditoLibrin
            show={true}
            onHide={() => setEditMode(false)}
            libri={selectedLibri} setLibri={function (libri: ILibri): void {
              throw new Error('Function not implemented.');
            } }            />
        )}
      </>
    );
    
};

export default LibriDashboard;