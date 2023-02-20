using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BibliotecaSuindara.Data.Entities
{
    public class Category
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string DisplayName { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public DateTime? DeletedDate { get; set; }

        //public Category(int id, string name, string displayName, DateTime createdDate, DateTime? updatedDate, DateTime? deletedDate)
        //{
        //    Id = id;
        //    Name = name;
        //    DisplayName = displayName;
        //    CreatedDate = createdDate;
        //    UpdatedDate = updatedDate;
        //    DeletedDate = deletedDate;
        //}
    }
}
