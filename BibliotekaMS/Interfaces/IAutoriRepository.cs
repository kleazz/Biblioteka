using BibliotekaMS.Models;

namespace BibliotekaMS.Interfaces
{
    public interface IAutoriRepository
    {
        ICollection<Autori> GetAutori();
        Autori GetAutori(string isbn);

        Autori GetAutoriEmri(string emri);

        bool AutoriExists(String autoriId, string mbiemri);

        bool CreateAutori(Autori autori, int[] kategoriaIds);

        bool UpdateAutori(int kategoriaId, Autori autori);

        bool DeleteAutori(Autori autori);

        bool Save();
        bool AutoriExists(int autoriId);
        object GetAutori(int autoriId);
        void DeleteAutori(object autoriEntity);
        void AddAutori(Autori autori);
        object GetAutor(int autoriId);
        void UpdateAutori(object autoriEntity);
        bool CreateAutori(Autori autori);
        object GetAutori(object autoriId);
        bool DeleteAutori(object autoriToDelete);
        bool AutoriExists(string autoriId);
    }
}
