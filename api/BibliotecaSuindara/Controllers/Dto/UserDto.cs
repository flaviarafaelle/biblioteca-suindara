namespace BibliotecaSuindara.Controllers.Dto
{
    public class UserDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

        public string Address { get; set; }
        public string AddressNumber { get; set; }

        public string AddressComplement { get; set; }
        public string AddressDistrict { get; set; }
        public string AddressCity { get; set; }
        public string AddressZipcode { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? LastLoginAt { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public DateTime? DeletedDate { get; set; }
    }
}
