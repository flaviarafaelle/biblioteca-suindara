using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BibliotecaSuindara.Data;
using BibliotecaSuindara.Data.Entities;
using BibliotecaSuindara.Data.Seed;
using BibliotecaSuindara.Controllers.Dto;

namespace BibliotecaSuindara.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly BibliotecaDBContext _context;

        public UsersController(BibliotecaDBContext context)
        {
            _context = context;

        }

        [HttpGet]
        [Route("GetAll")]
        public async Task<List<User>> GetAll()
        {
            return await _context.User.ToListAsync();
        }

        [HttpGet]
        [Route("Get")]
        public async Task<ActionResult<User>> Get(int id)
        {
            var user = new User();
            user = await _context.User.FirstOrDefaultAsync(u => u.Id == id);
            if (user == null)
            {
                return NotFound();
            }
            return user;
        }

        [HttpPost]
        [Route("Update")]
        public async Task<ActionResult<User>> Update(UserDto input)
        {
            var user = new User();
            user = await _context.User.FirstOrDefaultAsync(u => u.Id == input.Id);
            if (user == null)
            {
                return NotFound();
            }
            user.Address = input.Address;
            user.AddressNumber = input.AddressNumber;
            user.AddressCity = input.AddressCity;
            user.AddressZipcode = input.AddressZipcode;
            user.AddressDistrict = input.AddressDistrict;
            user.AddressComplement = input.AddressComplement;
            user.Name = input.Name;
            user.Surname = input.Surname;
            user.Email = input.Email;
            user.IsActive = input.IsActive;
            user.UpdatedDate = DateTime.Now;
            user.Password = new Utils.Auth().EncryptAsync(input.Password);

            _context.User.Update(user);
            await _context.SaveChangesAsync();

            return user;
        }

        [HttpPost]
        [Route("Create")]
        public async Task<User> Create(UserDto input)
        {
            var user = new User
            {
                Address = input.Address,
                AddressNumber = input.AddressNumber,
                AddressCity = input.AddressCity,
                AddressZipcode = input.AddressZipcode,
                AddressDistrict = input.AddressDistrict,
                AddressComplement = input.AddressComplement,
                Name = input.Name,
                Surname = input.Surname,
                Email = input.Email,
                IsActive = input.IsActive,
                UpdatedDate = DateTime.Now,
                Password = new Utils.Auth().EncryptAsync(input.Password)
            };

            _context.User.Update(user);
            await _context.SaveChangesAsync();

            return user;
        }

        [HttpDelete]
        [Route("Delete")]
        public async Task Delete(int id)
        {
            var user = await _context.User.FindAsync(id);
            if (user != null)
            {
                _context.User.Remove(user);
            }

        }
    }
}
