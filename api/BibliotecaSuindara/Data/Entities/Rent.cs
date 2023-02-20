using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BibliotecaSuindara.Data.Entities
{
    public class Rent
    {
        [Key]
        public int Id { get; set; }
        [ForeignKey("Book")]
        public int BookId { get; set; }

        [ForeignKey("User")]
        public int UserId { get; set; }

        public double Penalty { get; set; }

        public DateTime RentDate { get; set; }
        public DateTime? DevolutionDate { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? DeletedDate { get; set; }
    }
}
