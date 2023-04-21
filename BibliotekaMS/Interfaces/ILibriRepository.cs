using BibliotekaMS.Models;

namespace BibliotekaMS.Interfaces
{
    public interface ILibriRepository
    {
        ICollection<Libri> GetLibrat();
        Libri GetLibri(string isbn);

        Libri GetLibriTitulli(string titulli);

        bool LibriExists(String libriId);

        bool CreateLibri(int kategoriaId, Libri libri);

        bool UpdateLibri(int kategoriaId, Libri libri);

        bool DeleteLibri(Libri libri);

        bool Save();

    }
}
