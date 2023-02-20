using System.ComponentModel.DataAnnotations;

namespace BibliotecaSuindara.Data.Entities
{
    public class Book
    {
        [Key]
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Author { get; set; }
        public string PublishingCompany { get; set; }

        public string ISSN { get; set; }

        public string EditionNumber { get; set; }

        public string Saga { get; set; }

        public string Volume { get; set; }
        public int PublishYear { get; set; }
        public string ISBN { get; set; }
        public int Pages { get; set; }
        public bool IsAvailable { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public DateTime? DeletedDate { get; set; }
        public int RentMaxDays { get; set; }

        //[InverseProperty("BookId")]
        public List<BookCategory> BookCategories { get; set; }

        //public Book(int id,
        //            string title,
        //            string description,
        //            string author,
        //            string publishingCompany,
        //            int publishYear,
        //            string isbn,
        //            int pages,
        //            bool isAvailable,
        //            DateTime createdDate,
        //            DateTime? updatedDate,
        //            DateTime? deletedDate,
        //            int rentMaxDays, List<BookCategory> bookCategories)
        //{
        //    Id = id;
        //    Title = title;
        //    Description = description;
        //    Author = author;
        //    PublishingCompany = publishingCompany;
        //    PublishYear = publishYear;
        //    ISBN = isbn;
        //    Pages = pages;
        //    IsAvailable = isAvailable;
        //    CreatedDate = createdDate;
        //    UpdatedDate = updatedDate;
        //    DeletedDate = deletedDate;
        //    RentMaxDays = rentMaxDays;
        //    BookCategories = bookCategories;
        //}
    }
}
