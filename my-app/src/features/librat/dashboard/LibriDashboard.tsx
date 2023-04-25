import React, { useState } from 'react';
import { ILibri } from '../../../app/layout/models/libri';
import LibriTabela from './LibriTabela';
import LibriForm from '../form/LibriForm';

interface IProps {
  librat: ILibri[];
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
  createMode: boolean;
  setCreateMode: (createMode: boolean) => void;

}

const LibriDashboard: React.FC<IProps> = ({
  librat,
  editMode,
  setEditMode,
  createMode,
  setCreateMode,}
  ) => {

  return (
    <>
      <LibriTabela librat={librat} setEditMode={setEditMode} setCreateMode={setCreateMode}
      />
        {createMode && (
        <LibriForm
          show={true}
          onHide={() => setCreateMode(false)}
          onCreate={(libri: ILibri): void => {
            throw new Error('Function not implemented.');
          } } mode={'create'}        />
      )}
           {editMode && (
        <LibriForm 
          show={true}
          onHide={() => setEditMode(false)}
          onCreate={(libri: ILibri): void => {
            throw new Error('Function not implemented.');
          } } mode={'edit'}   />
      )}

  
    </>
    
);
};

export default LibriDashboard;