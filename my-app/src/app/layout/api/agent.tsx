import axios, { AxiosResponse } from 'axios';
import { ILibri } from '../models/libri';
import { IKategoria } from '../models/kategoria';
import { IAutori } from '../models/autori';
import Registration from '../../../features/registration/Registration';
import { IRegistration } from '../models/registration';

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

const Autoret ={
    list: (): Promise<IAutori[]> => requests.get('/Autori'),
    create: (autori: IAutori) => requests.post('/Autori', autori),
    update: (autori: IAutori) => requests.put(`/Autori/${autori.autoriId}`, autori),
    delete: (autoriId: number) => requests.del(`/Autori/${autoriId}`)

}

const Register ={
    create: (register: IRegistration) => requests.post('',register)
}

const Login ={
    create: (register: IRegistration) => requests.post('',register)
}
  
export default {
    Librat, Kategorite, Autoret, Register, Login
}