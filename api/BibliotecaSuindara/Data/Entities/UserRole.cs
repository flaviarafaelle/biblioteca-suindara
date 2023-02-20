using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BibliotecaSuindara.Data.Entities
{
    public class UserRole
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("Role")]
        public int RoleId { get; set; }

        [ForeignKey("User")]
        public int UserId { get; set; }

        public DateTime CreatedDate { get; set; }
        public DateTime? DeletedDate { get; set; }

        public Role Role { get; set; }
        public User User { get; set; }
        //public UserRole(int id, int roleId, int userId, DateTime createdDate, DateTime? deletedDate, Role role, User user)
        //{
        //    Id = id;
        //    RoleId = roleId;
        //    UserId = userId;
        //    CreatedDate = createdDate;
        //    DeletedDate = deletedDate;
        //    Role = role;
        //    User = user;
        //}
    }
}
