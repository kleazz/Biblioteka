using System.ComponentModel.DataAnnotations;

namespace BibliotekaMS.Models
{
    public class Registration
    {
        [Required]
        public string Emri { get; set; }
        [Required]
        public string Mbiemri { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string Username { get; set; }
        [Required]
        [RegularExpression("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@#$%^&+=]).{8,}$")]
        public string Password { get; set; }
        [Required]
        [Compare("Password")]
        public string PasswordConfirm { get; set;}
        [Required]
        public string? Role { get; set; }


    }
}
