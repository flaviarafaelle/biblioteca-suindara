using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BibliotecaSuindara.Data.Entities
{
    public class Comment
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("Book")]
        public int BookId { get; set; }

        [ForeignKey("User")]
        public int UserId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }

        public double Stars { get; set; }

        public DateTime CreatedDate { get; set; }
        public DateTime? DeletedDate { get; set; }

        public User User { get; set; }
        public Book Book { get; set; }

        //public Comment(int id, int bookId, int userId, string title, string description, double stars, DateTime createdDate, DateTime? deletedDate, User user,Book book)
        //{
        //    Id = id;
        //    BookId = bookId;
        //    UserId = userId;
        //    Title = title;
        //    Description = description;
        //    Stars = stars;
        //    CreatedDate = createdDate;
        //    DeletedDate = deletedDate;
        //    User = user;
        //    Book = book;
        //}
    }
}
