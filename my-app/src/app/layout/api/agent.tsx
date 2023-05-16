import axios, { AxiosResponse } from 'axios';
import { ILibri } from '../models/libri';
import { IKategoria } from '../models/kategoria';

axios.defaults.baseURL = 'https://localhost:7226/api';

const responseBody = (response: AxiosResponse) => response.data;

const requests ={
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    del: (url: string) => axios.delete(url).then(responseBody)
}

const Librat ={
    list: (): Promise<ILibri[]> => requests.get('/Libri'),
    create: (libri: ILibri) => requests.post('/Libri', libri),
    update: (libri: ILibri) => requests.put(`/Libri/${libri.isbn}`, libri),
    delete: (isbn: string) => requests.del(`/Libri/${isbn}`)
}

const Kategorite ={
    list: (): Promise<IKategoria[]> => requests.get('/Kategoria'),
    create: (kategoria: IKategoria) => requests.post('/Kategoria', kategoria),
    update: (kategoria: IKategoria) => requests.put(`/Kategoria/${kategoria.kategoriaId}`, kategoria),
    delete: (kategoriaId: number) => requests.del(`/Kategoria/${kategoriaId}`)

}

export default {
    Librat, Kategorite
}