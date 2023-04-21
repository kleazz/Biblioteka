namespace BibliotekaMS.Models
{
    public class Libri
    {
        public string Isbn { get; set; }
        public string Titulli { get; set; }
        public string Pershkrimi { get; set; }
        public string Fotoja { get; set; }

        public ICollection<KategoriaELibrit> KategoriaELibrit { get; set; }
    }
}
