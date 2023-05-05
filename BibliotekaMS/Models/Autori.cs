namespace BibliotekaMS.Models
{
    public class Autori
    {
  
        
            public int AutoriID { get; set; }
            public string Emri { get; set; }
            public string Mbiemri { get; set; }
            public string Email { get; set; }
            public string Address { get; set; }

            public Autori(string emri, string mbiemri, string email, string phone, string address)
            {
                Emri = emri;
                Mbiemri = mbiemri;
                Email = email;
                Address = address;
            }

            public ICollection<Libri> Libri { get; set; }
        public object? Id { get; internal set; }
        public object autori { get; internal set; }
    }
    }
