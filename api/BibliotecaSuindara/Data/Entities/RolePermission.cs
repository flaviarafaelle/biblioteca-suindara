using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BibliotecaSuindara.Data.Entities
{
    public class RolePermission
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("Role")]
        public int RoleId { get; set; }

        [ForeignKey("Permission")]
        public int PermissionId { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? DeletedDate { get; set; }
        public Permission Permission { get; set; }
        public Role Role { get; set; }
        //public RolePermission(int id, int roleId, int permissionId, DateTime createdDate, DateTime? deletedDate, Permission permission, Role role)
        //{
        //    Id = id;
        //    RoleId = roleId;
        //    PermissionId = permissionId;
        //    CreatedDate = createdDate;
        //    DeletedDate = deletedDate;
        //    Permission = permission;
        //    Role = role;
        //}
    }
}
