﻿using BibliotekaMS.Models;

namespace BibliotekaMS.Interfaces
{
    public interface IAutoriRepository
    {
        ICollection<Autori> GetAutoret();

        Autori GetAutori(int autoriId);

        ICollection<Libri> GetLibriNgaAutori(int autoriId);

        bool AutoriExists(int autoriId);

        bool CreateAutori(Autori autori);
        bool UpdateAutori(Autori autori);
        bool DeleteAutori(Autori autori);
        bool Save();
    }
}
