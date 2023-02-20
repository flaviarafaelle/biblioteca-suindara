using Isopoh.Cryptography.Argon2;
using Microsoft.AspNetCore.Identity;

namespace BibliotecaSuindara.Utils
{
    public class Auth
    {
        public Auth() { }

        private readonly byte[] IV = { 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x10, 0x11, 0x12, 0x13, 0x14, 0x15, 0x16 };
        public string EncryptAsync(string pass)
        {
            return Argon2.Hash(pass);
        }
        public bool Verify(string pass, string hashed)
        {
            return Argon2.Verify(hashed, pass, 5);
        }

    }
}
