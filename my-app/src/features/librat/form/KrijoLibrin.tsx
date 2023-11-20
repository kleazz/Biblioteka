import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { ILibri } from "../../../app/layout/models/libri";
import { IKategoria } from "../../../app/layout/models/kategoria";
import { IAutori } from "../../../app/layout/models/autori";
import agent from "../../../app/layout/api/agent";
import Select from "react-select";
import { ILibriRequest } from "../../../app/layout/models/LibriRequest";
import { Dialog } from "primereact/dialog";
import { AutoComplete } from "primereact/autocomplete";
import { InputTextarea } from "primereact/inputtextarea";
import { FileUpload, FileUploadUploadEvent } from "primereact/fileupload";
import { InputNumber } from "primereact/inputnumber";
import { MultiSelect } from "primereact/multiselect";

interface IProps {
  libri: ILibri;
  createLibri: (libri: ILibriRequest) => void;
  show: boolean;
  onHide: () => void;
}

const KrijoLibrin: React.FC<IProps> = ({ show, onHide, createLibri }) => {
  const [libri, setLibri] = useState<ILibri>({
    isbn: "",
    titulli: "",
    pershkrimi: "",
    fotoja: "",
    sasia: 0 as number,
  });

  const [autoret, setAutoret] = useState<IAutori[]>([]);
  const [kategorite, setKategorite] = useState<IKategoria[]>([]);
  const [selectedKategories, setSelectedKategories] = useState<IKategoria[]>([]);
  const [selectedAuthors, setSelectedAuthors] = useState<IAutori[]>([]);

  useEffect(() => {
    // Make an API call to fetch the list of authors from your server
    agent.Autoret.list()
      .then((response: IAutori[]) => {
        setAutoret(response);
      })
      .catch((error) => {
        // Handle any errors from the API call
        console.error("Error fetching authors: ", error);
      });
  }, []);
  // Fetch Kategoria options from your server and update the state
  useEffect(() => {
    // Make an API call to fetch Kategoria options from your server
    agent.Kategorite.list()
      .then((response: IKategoria[]) => {
        setKategorite(response);
      })
      .catch((error) => {
        // Handle any errors from the API call
        console.error("Error fetching Kategoria options: ", error);
      });
  }, []);

  const handleSubmit = () => {
    const libriRequest: ILibriRequest = {
      libri: { ...libri },
      kategorite: selectedKategories.map((kategoria) => kategoria.emriKategorise),
      autoret: selectedAuthors.map((autori) => autori.emri + ' ' + autori.mbiemri),
    };

    console.log(libriRequest);

    // Send the LibriRequest to the createLibri function
    createLibri(libriRequest);

        onHide();
  };
  function convertFile(files: FileList | null) {
    if (files && files.length > 0) {
      const fileRef = files[0];
      const reader = new FileReader();
      reader.onload = (ev: ProgressEvent<FileReader>) => {
        const imageUrl = ev.target?.result as string;
        setLibri({ ...libri, fotoja: imageUrl });
      };

      reader.readAsDataURL(fileRef);
    }
  }
  // function handleFileUpload(event: FileUploadUploadEvent) {
  //   const files = event.files;
  
  //   if (files && files.length > 0) {
  //     const fileRef = files[0];
  //     const reader = new FileReader();
  
  //     reader.onload = (ev: ProgressEvent<FileReader>) => {
  //       const base64String = ev.target?.result as string;
  //       console.log(base64String);
  //       setLibri({ ...libri, fotoja: base64String });
  //     };
  
  //     reader.readAsDataURL(fileRef);
  //   }
  // }
  return (
    <>
        <Dialog header="Krijo Librin" visible={show} style={{ width: '30vw' }} onHide={onHide}>
      <label>ISBN</label>
      <div className="modal-flex">
    <AutoComplete value={libri.isbn} onChange={(e) => setLibri({ ...libri, isbn: e.target.value })} />
    </div>
    <label>Titulli</label>
      <div className="modal-flex">
    <AutoComplete value={libri.titulli} onChange={(e) => setLibri({ ...libri, titulli: e.target.value })} />
    </div>
        <label>Përshkrimi</label>
      <div className="modal-flex">
      <InputTextarea value={libri.pershkrimi} onChange={(e) => setLibri({ ...libri, pershkrimi: e.target.value })} rows={5} cols={50} />
      </div>
    {/* <label>Kopertina</label> */}
    {/* <div className="modal-flex"> 
    { <FileUpload mode="basic" name="kopertina" accept=".png,.jpg,.jpeg" maxFileSize={1000000} onUpload={onUpload} /> */}

      {/* </div> */}
      <Form.Label>Kopertina</Form.Label>
            <Form.Control
              type="file"
              accept=".png,.jpg,.jpeg"
              onChange={(e) =>
                convertFile((e.target as HTMLInputElement).files)
              }
            /> 
      <label>Sasia</label>
      <div className="modal-flex">
      <InputNumber value={libri.sasia} onValueChange={(e) => setLibri({ ...libri, sasia: e.target.value as number })} />
      </div>
      <label>Kategoritë</label>
<div className="modal-flex">
<MultiSelect
  value={selectedKategories}
  onChange={(e) => setSelectedKategories(e.value)}
  options={kategorite.map((kategoria) => ({
    label: kategoria.emriKategorise,
    value: kategoria,
    key: kategoria.kategoriaId, // Add a unique key
  }))}
  optionLabel="label"
  display="chip"
  placeholder="Selekto kategoritë"
  maxSelectedLabels={3}
  className="w-full md:w-20rem"
/>
</div>
<label>Autorët</label>
<div className="modal-flex">
<MultiSelect
  value={selectedAuthors}
  onChange={(e) => setSelectedAuthors(e.value)}
  options={autoret.map((autori) => ({
    label: autori.emri + ' ' + autori.mbiemri,
    value: autori,
    key: autori.autoriId, // Add a unique key
  }))}
  optionLabel="label"
  filter
  placeholder="Selekto Autorët"
  maxSelectedLabels={3}
  className="w-full md:w-20rem"
/>
</div>
      <div className="modal-btn">
            <button className="submitbtn" onClick={handleSubmit}>Ruaj</button>
        </div>
    </Dialog>
    {/* <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{"Krijo Librin"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formIsbnE">
            <Form.Label>ISBN</Form.Label>
            <Form.Control
              type="text"
              placeholder="Shkruaj ISBN"
              value={libri.isbn}
              onChange={(e) => setLibri({ ...libri, isbn: e.target.value })}
              autoComplete="off"
            />
          </Form.Group>
          <Form.Group controlId="formTitulliE">
            <Form.Label>Titulli</Form.Label>
            <Form.Control
              type="text"
              placeholder="Shkruaj titullin"
              value={libri.titulli}
              onChange={(e) => setLibri({ ...libri, titulli: e.target.value })}
              autoComplete="off"
            />
          </Form.Group>
          <Form.Group controlId="formPershkrimiE">
            <Form.Label>Përshkrimi</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Shkruaj përshkrimin"
              value={libri.pershkrimi}
              onChange={(e) =>
                setLibri({ ...libri, pershkrimi: e.target.value })
              }
              autoComplete="off"
            />
          </Form.Group>
          <Form.Group controlId="formFotojaE">
            <Form.Label>Fotoja</Form.Label>
            <Form.Control
              type="file"
              accept=".png,.jpg,.jpeg"
              onChange={(e) =>
                convertFile((e.target as HTMLInputElement).files)
              }
            />
          </Form.Group>
          <Form.Group controlId="formSasiaE">
  <Form.Label>Sasia</Form.Label>
  <Form.Control
    type="number" 
    value={libri.sasia}
    onChange={(e) => {
      const inputValue = parseInt(e.target.value, 10);
      if (!isNaN(inputValue)) { 
        setLibri({ ...libri, sasia: inputValue });
      }
    }}    
  />
</Form.Group>
<Form.Group controlId="formKategoriteE">
  <Form.Label>Zgjedh Kategoritë</Form.Label>
  {kategorite.map((kategoria) => (
    <Form.Check
      key={kategoria.kategoriaId}
      type="checkbox"
      id={`kategoria-${kategoria.kategoriaId}`}
      label={kategoria.emriKategorise}
      checked={selectedKategories.some((selected) => selected.kategoriaId === kategoria.kategoriaId)}
      onChange={() => {
        // Toggle selection of Kategoria
        if (selectedKategories.some((selected) => selected.kategoriaId === kategoria.kategoriaId)) {
          setSelectedKategories(selectedKategories.filter((selected) => selected.kategoriaId !== kategoria.kategoriaId));
        } else {
          setSelectedKategories([...selectedKategories, kategoria]);
        }
      }}
    />
  ))}
</Form.Group>
          <Form.Group controlId="formAutoretE">
            <Form.Label>Autorët</Form.Label>
            <Select
              isMulti
              options={autoret.map((author) => ({
                value: author.autoriId,
                label: author.emri + ' ' + author.mbiemri,
              }))}
              value={selectedAuthors.map((author) => ({
                value: author.autoriId,
                label: author.emri + ' ' + author.mbiemri,
              }))}
              onChange={(selectedOptions) => {
                setSelectedAuthors(selectedOptions.map((option) => autoret.find((author) => author.autoriId === option.value) as IAutori));
              }}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Anulo
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Krijo
        </Button>
      </Modal.Footer>
    </Modal> */}
    </>
  );
};

export default KrijoLibrin;
