using Microsoft.AspNetCore.Identity;

namespace BibliotekaMS.Identity
{
    public class AppUser : IdentityUser
    {
        public string Emri { get; set; }

    }
}
