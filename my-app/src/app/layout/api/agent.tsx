import axios, { AxiosResponse } from "axios";
import { ILibri } from "../models/libri";
import { IKategoria } from "../models/kategoria";
import { IAutori } from "../models/autori";
import { ILexuesi } from "../models/lexuesi";
import { ILibriRequest } from "../models/LibriRequest";
import { IRezervimi } from "../models/rezervimi";

axios.defaults.baseURL = "https://localhost:7226/api";

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  del: (url: string) => axios.delete(url).then(responseBody),
};

const Librat = {
  list: (): Promise<ILibri[]> => requests.get("/Libri"),
  create: (libriRequest: ILibriRequest) => requests.post("/Libri", libriRequest),
  update: (libri: ILibri) => requests.put(`/Libri/${libri.isbn}`, libri),
  delete: (isbn: string) => requests.del(`/Libri/${isbn}`),
  getKategoriaNgaLibri: (isbn: string): Promise<IKategoria[]> => requests.get(`/Libri/kategoria/${isbn}`),
  getAutoriNgaLibri: (isbn: string): Promise<IAutori[]> => requests.get(`/Libri/autori/${isbn}`),
};

const Kategorite = {
  list: (): Promise<IKategoria[]> => requests.get("/Kategoria"),
  create: (kategoria: IKategoria) => requests.post("/Kategoria", kategoria),
  update: (kategoria: IKategoria) =>
    requests.put(`/Kategoria/${kategoria.kategoriaId}`, kategoria),
  delete: (kategoriaId: number) => requests.del(`/Kategoria/${kategoriaId}`),
};

const Autoret = {
  list: (): Promise<IAutori[]> => requests.get("/Autori"),
  create: (autori: IAutori) => requests.post("/Autori", autori),
  update: (autori: IAutori) =>
    requests.put(`/Autori/${autori.autoriId}`, autori),
  delete: (autoriId: number) => requests.del(`/Autori/${autoriId}`),
};

const Rezervimet = {
  list: (): Promise<IRezervimi[]> => requests.get("/Rezervimi"),
  create: (rezervimi: IRezervimi) => requests.post("/Rezervimi", rezervimi),
  update: (rezervimi: IRezervimi) =>
    requests.put(`/Rezervimi/${rezervimi.rezervimiId}`, rezervimi),
  delete: (rezervimiId: number) => requests.del(`/Rezervimi/${rezervimiId}`),
}

const Lexuesit = {
  list: (): Promise<ILexuesi[]> => requests.get("Authenticate/users"),
  delete: (username: string) => requests.del(`/Authenticate/user/${username}`),
};

export default {
  Librat,
  Kategorite,
  Autoret,
  Rezervimet,
  Lexuesit,
};
