using BibliotecaSuindara.Data.Entities;
using Microsoft.AspNetCore.Components;
using Microsoft.EntityFrameworkCore;
using System.Globalization;
using System.Security.Cryptography;
using System.Text;

namespace BibliotecaSuindara.Data.Seed
{
    public class DefaultSettings
    {
        private readonly BibliotecaDBContext _context;
        private readonly ConfigurationManager _config;


        public DefaultSettings(BibliotecaDBContext context, ConfigurationManager config)
        {
            _context = context;
            _config = config;
        }


        public async void Create()
        {
            // Create Permission
            CreatePermissions();

            // Create Roles
            CreateRoles();

            // Create User
            await CreateAdminUser();

        }
        private async Task CreateAdminUser()
        {
            var admin = _context.User.FirstOrDefault(u => u.Name == Global.Constants.Variables.AdminName);

            if (admin == null || string.IsNullOrEmpty(admin.Name))
            {
                var auth = new Utils.Auth();
                admin = new User()
                {
                    Name = Global.Constants.Variables.AdminName,
                    Email = Global.Constants.Variables.AdminEmail,
                    Address = Global.Constants.Variables.AdminAddress,
                    AddressCity = Global.Constants.Variables.AdminCity,
                    AddressComplement = Global.Constants.Variables.AdminComplement,
                    AddressDistrict = Global.Constants.Variables.AdminDistrict,
                    AddressNumber = Global.Constants.Variables.AdminAddressNumber,
                    AddressZipcode = Global.Constants.Variables.AdminZipcode,
                    CreatedDate = DateTime.Now,
                    DeletedDate = null,
                    IsActive = true,
                    LastLoginAt = null,
                    Surname = Global.Constants.Variables.AdminSurname,
                    UpdatedDate = DateTime.Now,
                    Password = auth.EncryptAsync(_config.GetValue("Biblioteca:AdminPass", "")),
                };
                _context.User.Add(admin);
                var verify = auth.Verify(_config.GetValue("Biblioteca:AdminPass", ""), admin.Password);
                Console.WriteLine(verify);
                _context.SaveChanges();
                var role = await _context.Role.FirstOrDefaultAsync(r => r.Name == Global.Constants.Roles.Admin);
                if (role != null)
                {
                    var adminRole = new UserRole()
                    {
                        CreatedDate = DateTime.Now,
                        UserId = admin.Id,
                        RoleId = role.Id
                    };
                    await _context.UserRole.AddAsync(adminRole);
                    _context.SaveChanges();
                }
            }
        }

        private async void CreateRoles()
        {
            var roles = _context.Role.ToList();
            var admin = new Role()
            {
                CreatedDate = DateTime.Now,
                DeletedDate = null,
                DisplayName = ConvertToDisplayName(Global.Constants.Roles.Admin),
                Name = Global.Constants.Roles.Admin,
                UpdatedDate = DateTime.Now,
            };
            if (roles == null)
            {
                _context.Role.Add(admin);
                _context.SaveChanges();
                var permissions = _context.Permission.ToList();

                permissions.ForEach(async p =>
                {
                    await _context.RolePermission.AddAsync(new RolePermission()
                    {
                        CreatedDate = DateTime.Now,
                        PermissionId = p.Id,
                        RoleId = admin.Id,
                    });
                });
                _context.SaveChanges();

            }
            else
            {
                if (!roles.Any(r => r.Name == Global.Constants.Roles.Admin))
                {
                    _context.Role.Add(admin);
                    _context.SaveChanges();

                    var permissions = _context.Permission.ToList();
                    permissions.ForEach(async p =>
                    {
                        await _context.RolePermission.AddAsync(new RolePermission()
                        {
                            CreatedDate = DateTime.Now,
                            PermissionId = p.Id,
                            RoleId = admin.Id,
                        });
                    });
                    _context.SaveChanges();
                }
            }

        }
        private void CreatePermissions()
        {
            var permissions = _context.Permission.ToList();

            // User
            var user = new Permission
            {
                CreatedDate = DateTime.Now,
                DeletedDate = null,
                DisplayName = ConvertToDisplayName(Global.Constants.Permissions.User),
                Name = Global.Constants.Permissions.User,
                UpdatedDate = DateTime.Now,
            };
            var userCreate = new Permission
            {
                CreatedDate = DateTime.Now,
                DeletedDate = null,
                DisplayName = ConvertToDisplayName(Global.Constants.Permissions.UserCreate),
                Name = Global.Constants.Permissions.UserCreate,
                UpdatedDate = DateTime.Now,
            };
            var userUpdate = new Permission
            {
                CreatedDate = DateTime.Now,
                DeletedDate = null,
                DisplayName = ConvertToDisplayName(Global.Constants.Permissions.UserUpdate),
                Name = Global.Constants.Permissions.UserUpdate,
                UpdatedDate = DateTime.Now,
            };
            var userView = new Permission
            {
                CreatedDate = DateTime.Now,
                DeletedDate = null,
                DisplayName = ConvertToDisplayName(Global.Constants.Permissions.UserView),
                Name = Global.Constants.Permissions.UserView,
                UpdatedDate = DateTime.Now,
            };
            // Book
            var book = new Permission
            {
                CreatedDate = DateTime.Now,
                DeletedDate = null,
                DisplayName = ConvertToDisplayName(Global.Constants.Permissions.Book),
                Name = Global.Constants.Permissions.Book,
                UpdatedDate = DateTime.Now,
            };
            var bookCreate = new Permission
            {
                CreatedDate = DateTime.Now,
                DeletedDate = null,
                DisplayName = ConvertToDisplayName(Global.Constants.Permissions.BookCreate),
                Name = Global.Constants.Permissions.BookCreate,
                UpdatedDate = DateTime.Now,
            };
            var bookUpdate = new Permission
            {
                CreatedDate = DateTime.Now,
                DeletedDate = null,
                DisplayName = ConvertToDisplayName(Global.Constants.Permissions.BookUpdate),
                Name = Global.Constants.Permissions.BookUpdate,
                UpdatedDate = DateTime.Now,
            };
            var bookView = new Permission
            {
                CreatedDate = DateTime.Now,
                DeletedDate = null,
                DisplayName = ConvertToDisplayName(Global.Constants.Permissions.BookView),
                Name = Global.Constants.Permissions.BookView,
                UpdatedDate = DateTime.Now,
            };
            // Category
            var category = new Permission
            {
                CreatedDate = DateTime.Now,
                DeletedDate = null,
                DisplayName = ConvertToDisplayName(Global.Constants.Permissions.Category),
                Name = Global.Constants.Permissions.Category,
                UpdatedDate = DateTime.Now,
            };
            var categoryCreate = new Permission
            {
                CreatedDate = DateTime.Now,
                DeletedDate = null,
                DisplayName = ConvertToDisplayName(Global.Constants.Permissions.CategoryCreate),
                Name = Global.Constants.Permissions.CategoryCreate,
                UpdatedDate = DateTime.Now,
            };
            var categoryView = new Permission
            {
                CreatedDate = DateTime.Now,
                DeletedDate = null,
                DisplayName = ConvertToDisplayName(Global.Constants.Permissions.CategoryView),
                Name = Global.Constants.Permissions.CategoryView,
                UpdatedDate = DateTime.Now,
            };
            var categoryUpdate = new Permission
            {
                CreatedDate = DateTime.Now,
                DeletedDate = null,
                DisplayName = ConvertToDisplayName(Global.Constants.Permissions.CategoryUpdate),
                Name = Global.Constants.Permissions.CategoryUpdate,
                UpdatedDate = DateTime.Now,
            };

            // Role
            var role = new Permission
            {
                CreatedDate = DateTime.Now,
                DeletedDate = null,
                DisplayName = ConvertToDisplayName(Global.Constants.Permissions.Role),
                Name = Global.Constants.Permissions.Role,
                UpdatedDate = DateTime.Now,
            };
            var roleCreate = new Permission
            {
                CreatedDate = DateTime.Now,
                DeletedDate = null,
                DisplayName = ConvertToDisplayName(Global.Constants.Permissions.RoleCreate),
                Name = Global.Constants.Permissions.RoleCreate,
                UpdatedDate = DateTime.Now,
            };
            var roleUpdate = new Permission
            {
                CreatedDate = DateTime.Now,
                DeletedDate = null,
                DisplayName = ConvertToDisplayName(Global.Constants.Permissions.RoleUpdate),
                Name = Global.Constants.Permissions.RoleUpdate,
                UpdatedDate = DateTime.Now,
            };
            var roleView = new Permission
            {
                CreatedDate = DateTime.Now,
                DeletedDate = null,
                DisplayName = ConvertToDisplayName(Global.Constants.Permissions.RoleView),
                Name = Global.Constants.Permissions.RoleView,
                UpdatedDate = DateTime.Now,
            };
            // Rent
            var rent = new Permission
            {
                CreatedDate = DateTime.Now,
                DeletedDate = null,
                DisplayName = ConvertToDisplayName(Global.Constants.Permissions.Rent),
                Name = Global.Constants.Permissions.Rent,
                UpdatedDate = DateTime.Now,
            };
            var rentCreate = new Permission
            {
                CreatedDate = DateTime.Now,
                DeletedDate = null,
                DisplayName = ConvertToDisplayName(Global.Constants.Permissions.RentCreate),
                Name = Global.Constants.Permissions.RentCreate,
                UpdatedDate = DateTime.Now,
            };
            var rentDelete = new Permission
            {
                CreatedDate = DateTime.Now,
                DeletedDate = null,
                DisplayName = ConvertToDisplayName(Global.Constants.Permissions.RentDelete),
                Name = Global.Constants.Permissions.RentDelete,
                UpdatedDate = DateTime.Now,
            };
            var rentUpdate = new Permission
            {
                CreatedDate = DateTime.Now,
                DeletedDate = null,
                DisplayName = ConvertToDisplayName(Global.Constants.Permissions.RentUpdate),
                Name = Global.Constants.Permissions.RentUpdate,
                UpdatedDate = DateTime.Now,
            };
            if (permissions == null)
            {
                // User
                _context.Permission.Add(user);
                _context.Permission.Add(userCreate);
                _context.Permission.Add(userUpdate);
                _context.Permission.Add(userView);

                // Book
                _context.Permission.Add(book);
                _context.Permission.Add(bookCreate);
                _context.Permission.Add(bookUpdate);
                _context.Permission.Add(bookView);

                // Category
                _context.Permission.Add(category);
                _context.Permission.Add(categoryCreate);
                _context.Permission.Add(categoryView);
                _context.Permission.Add(categoryUpdate);

                // Role
                _context.Permission.Add(role);
                _context.Permission.Add(roleCreate);
                _context.Permission.Add(roleUpdate);
                _context.Permission.Add(roleView);

                // Rent
                _context.Permission.Add(rent);
                _context.Permission.Add(rentCreate);
                _context.Permission.Add(rentDelete);
                _context.Permission.Add(rentUpdate);
                _context.SaveChanges();
            }
            else
            {
                // User
                if (!permissions.Any(p => p.Name == Global.Constants.Permissions.User))
                {
                    _context.Permission.Add(user);
                }
                if (!permissions.Any(p => p.Name == Global.Constants.Permissions.UserCreate))
                {
                    _context.Permission.Add(userCreate);
                }
                if (!permissions.Any(p => p.Name == Global.Constants.Permissions.UserUpdate))
                {
                    _context.Permission.Add(userUpdate);
                }
                if (!permissions.Any(p => p.Name == Global.Constants.Permissions.UserView))
                {
                    _context.Permission.Add(userView);
                }

                // Book
                if (!permissions.Any(p => p.Name == Global.Constants.Permissions.Book))
                {
                    _context.Permission.Add(book);
                }
                if (!permissions.Any(p => p.Name == Global.Constants.Permissions.BookCreate))
                {
                    _context.Permission.Add(bookCreate);
                }
                if (!permissions.Any(p => p.Name == Global.Constants.Permissions.BookUpdate))
                {
                    _context.Permission.Add(bookUpdate);
                }
                if (!permissions.Any(p => p.Name == Global.Constants.Permissions.BookView))
                {
                    _context.Permission.Add(bookView);
                }

                // Category
                if (!permissions.Any(p => p.Name == Global.Constants.Permissions.Category))
                {
                    _context.Permission.Add(category);
                }
                if (!permissions.Any(p => p.Name == Global.Constants.Permissions.CategoryCreate))
                {
                    _context.Permission.Add(categoryCreate);
                }
                if (!permissions.Any(p => p.Name == Global.Constants.Permissions.CategoryView))
                {
                    _context.Permission.Add(categoryView);
                }
                if (!permissions.Any(p => p.Name == Global.Constants.Permissions.CategoryUpdate))
                {
                    _context.Permission.Add(categoryUpdate);
                }
                // Role
                if (!permissions.Any(p => p.Name == Global.Constants.Permissions.Role))
                {
                    _context.Permission.Add(role);
                }
                if (!permissions.Any(p => p.Name == Global.Constants.Permissions.RoleCreate))
                {
                    _context.Permission.Add(roleCreate);
                }
                if (!permissions.Any(p => p.Name == Global.Constants.Permissions.RoleUpdate))
                {
                    _context.Permission.Add(roleUpdate);
                }
                if (!permissions.Any(p => p.Name == Global.Constants.Permissions.RoleView))
                {
                    _context.Permission.Add(roleView);
                }

                // Rent
                if (!permissions.Any(p => p.Name == Global.Constants.Permissions.Rent))
                {
                    _context.Permission.Add(rent);
                }
                if (!permissions.Any(p => p.Name == Global.Constants.Permissions.RentCreate))
                {
                    _context.Permission.Add(rentCreate);
                }
                if (!permissions.Any(p => p.Name == Global.Constants.Permissions.RentDelete))
                {
                    _context.Permission.Add(rentDelete);
                }
                if (!permissions.Any(p => p.Name == Global.Constants.Permissions.RentUpdate))
                {
                    _context.Permission.Add(rentUpdate);
                }
                _context.SaveChanges();
            }
        }

        private static string ConvertToDisplayName(string name)
        {
            return CultureInfo.CurrentCulture.TextInfo.ToTitleCase(name.Replace(".", " "));
        }
    }
}
