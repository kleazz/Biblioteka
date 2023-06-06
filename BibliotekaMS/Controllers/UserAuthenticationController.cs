using BibliotekaMS.Interfaces;
using BibliotekaMS.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BibliotekaMS.Controllers
{
    public class UserAuthenticationController : Controller
    {
        private readonly IUserAuthenticationRepository _service;
        public UserAuthenticationController(IUserAuthenticationRepository service)
        {
            _service = service;
        }
        public IActionResult Login()
        {
            return View();
        }

        public IActionResult Registration()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Registration(Registration registration)
        {
            if (!ModelState.IsValid)
                return View(registration);

            registration.Role = "user";
            var result = await _service.RegistrationAsync(registration);
            return RedirectToAction(nameof(Registration));
        }

        [HttpPost]
        public async Task<IActionResult> Login(Login login)
        {
            if(!ModelState.IsValid)
            {
                return View(login);
            }

            var result = await _service.LoginAsync(login);
            if (result.StatusCode == 1)
            {
                return RedirectToAction("Display", "Dashboard");
            }
            else
            {
                TempData["msg"] = result.StatusMessage;
                return RedirectToAction(nameof(Login));
            }

        }

        [Authorize]
        public async Task<IActionResult> Logout()
        {
            await _service.LogoutAsync();
            return RedirectToAction(nameof(Login));
        }

       //public async Task<IActionResult> Reg()
       // {
       //    var reg = new Registration()
       //     {
       //         Username = "bibliotekisti",
       //         Emri = "Filan Fisteku",
       //         Email = "filanfisteku@gmail.com",
       //         Password = "Bibliotekisti.123?"
       //     };
       //     reg.Role = "admin";
       //     var result = await _service.RegistrationAsync(reg);
       //     return Ok(result);
       // }
    }
}
