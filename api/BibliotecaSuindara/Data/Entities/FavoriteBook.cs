using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BibliotecaSuindara.Data.Entities
{
    public class FavoriteBook
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("Book")]
        public int BookId { get; set; }

        [ForeignKey("User")]
        public int UserId { get; set; }

        public DateTime CreatedDate { get; set; }
        public DateTime? DeletedDate { get; set; }

        public User User { get; set; }
        public Book Book { get; set; }
        //public FavoriteBook(int id, int bookId, int userId, DateTime createdDate, DateTime? deletedDate, User user, Book book)
        //{
        //    Id = id;
        //    BookId = bookId;
        //    UserId = userId;
        //    CreatedDate = createdDate;
        //    DeletedDate = deletedDate;
        //    User = user;
        //    Book = book;

        //}
    }
}
