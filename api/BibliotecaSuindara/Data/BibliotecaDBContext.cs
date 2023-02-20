using BibliotecaSuindara.Data.Entities;
using BibliotecaSuindara.Data.Seed;
using Microsoft.EntityFrameworkCore;

namespace BibliotecaSuindara.Data
{
    public class BibliotecaDBContext : DbContext
    {
        public BibliotecaDBContext(DbContextOptions<BibliotecaDBContext> context) : base(context)
        {

        }
        public DbSet<Book> Book { get; set; }
        public DbSet<BookCategory> BookCategory { get; set; }
        public DbSet<Category> Category { get; set; }
        public DbSet<Comment> Comment { get; set; }
        public DbSet<FavoriteBook> FavoriteBook { get; set; }
        public DbSet<Permission> Permission { get; set; }
        public DbSet<Rent> Rent { get; set; }
        public DbSet<Role> Role { get; set; }
        public DbSet<RolePermission> RolePermission { get; set; }
        public DbSet<User> User { get; set; }
        public DbSet<UserRole> UserRole { get; set; }
    }
}
