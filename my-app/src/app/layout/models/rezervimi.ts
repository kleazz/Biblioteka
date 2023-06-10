import { ILibri } from "./libri";

export interface IRezervimi {
  libri: ILibri;
  rezervimi: {
    rezervimiId: number;
    dueDate: string;
    username: string;
  };
}
