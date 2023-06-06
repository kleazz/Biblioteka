using BibliotekaMS.Identity;
using BibliotekaMS.Interfaces;
using BibliotekaMS.Models;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using System.Text.RegularExpressions;

namespace BibliotekaMS.Repository
{
    public class UserAuthenticationRepository : IUserAuthenticationRepository
    {
        private readonly SignInManager<AppUser> signInManager;
        private readonly UserManager<AppUser> userManager;
        private readonly RoleManager<IdentityRole> roleManager;

        public UserAuthenticationRepository(SignInManager<AppUser> signInManager, UserManager<AppUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            this.signInManager = signInManager;
            this.roleManager = roleManager;
            this.userManager = userManager;
            
        }
        public async Task<Status> LoginAsync(Login login)
        {
            var status = new Status();
            var user = await userManager.FindByNameAsync(login.Username);
            if (user == null)
            {
                status.StatusCode = 0;
                status.StatusMessage = "Invalid username";
                return status;
            }

            if(!await userManager.CheckPasswordAsync(user, login.Password))
            {
                status.StatusCode = 0;
                status.StatusMessage = "Invalid password";
                return status;
            }

            var signInResult = await signInManager.PasswordSignInAsync(user, login.Password, false, true);
            if (!signInResult.Succeeded)
            {
                var userRoles = await userManager.GetRolesAsync(user);
                var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.UserName)
                };
                foreach (var userRole in userRoles)
                {
                    authClaims.Add(new Claim(ClaimTypes.Role, userRole));
                }
                status.StatusCode = 0;
                status.StatusMessage = "Logged in successfully";
                return status;
            }
            else if (signInResult.IsLockedOut)
            {
                status.StatusCode = 0;
                status.StatusMessage = "User locked out";
                return status;
            }
            else
            {
                status.StatusCode = 0;
                status.StatusMessage = "Error on logging in";
                return status;
            }
        }

        public async Task LogoutAsync()
        {
            await signInManager.SignOutAsync();
        }

        public async Task<Status> RegistrationAsync(Registration registration)
        {
            var status = new Status();
            var userExists = await userManager.FindByNameAsync(registration.Username);
            if(userExists != null)
            {
                status.StatusCode = 0;
                status.StatusMessage = "User already exists";
                return status;
            }

            AppUser user = new AppUser
            {
                SecurityStamp = Guid.NewGuid().ToString(),
                Emri = registration.Emri,
                Email = registration.Email,
                UserName = registration.Username,
                EmailConfirmed = true
            };

            var result = await userManager.CreateAsync(user, registration.Password);
            if (!result.Succeeded)
            {
                status.StatusCode = 0;
                status.StatusMessage = "User creation failed";
                return status;
            }

            //menaxhim i roleve
            if (!await roleManager.RoleExistsAsync(registration.Role))
                await roleManager.CreateAsync(new IdentityRole(registration.Role));

            if(await roleManager.RoleExistsAsync(registration.Role))
            {
                await userManager.AddToRoleAsync(user, registration.Role);
            }

            status.StatusCode = 1;
            status.StatusMessage = "User has registered successfully";
            return status;
        }
    }
}
