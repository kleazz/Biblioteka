using BibliotekaMS.Models;

namespace BibliotekaMS.Interfaces
{
    public interface IUserAuthenticationRepository
    {
        Task<Status> LoginAsync(Login login);
        Task<Status> RegistrationAsync(Registration registration);

        Task LogoutAsync();
    }
}
