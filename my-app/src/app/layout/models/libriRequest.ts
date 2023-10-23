import { ILibri } from "./libri";

export interface ILibriRequest {
    newLibri: ILibri;
    autoret: string[];  
    kategorite: string[];
  }