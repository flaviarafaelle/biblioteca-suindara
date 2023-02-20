using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BibliotecaSuindara.Data.Entities
{
    public class BookCategory
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("Book")]
        public int BookId { get; set; }

        [ForeignKey("Category")]
        public int CategoryId { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public DateTime? DeletedDate { get; set; }

        public Category Category { get; set; }
        public Book Book { get; set; }
        //public BookCategory(int id, int bookId, int categoryId, DateTime createdDate, DateTime? updatedDate, DateTime? deletedDate, Category category, Book book)
        //{
        //    Id = id;
        //    BookId = bookId;
        //    CategoryId = categoryId;
        //    CreatedDate = createdDate;
        //    UpdatedDate = updatedDate;
        //    DeletedDate = deletedDate;
        //    Category = category;
        //    Book = book;
        //}
    }
}
