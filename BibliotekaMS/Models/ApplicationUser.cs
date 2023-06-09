using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace BibliotekaMS.Models
{
    public class ApplicationUser : IdentityUser
    {
        public ICollection<Rezervimi> Rezervimet { get; set; }
    }
}
