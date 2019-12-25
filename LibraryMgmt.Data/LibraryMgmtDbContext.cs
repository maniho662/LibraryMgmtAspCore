using LibraryMgmt.Model;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace LibraryMgmt.Data
{
    public class LibraryMgmtDbContext : DbContext
    {
        public LibraryMgmtDbContext()
        {
            Database.EnsureCreated();
        }
        public DbSet<Book> Books { get; set; }        

        public List<Book> GetBooks()
        {
            return Books.Local.ToList<Book>();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                //While deploying to azure, make sure to change the connection string based on azure settings                
                optionsBuilder.UseInMemoryDatabase(databaseName: "LibraryMgmt");
            }
        }

        public LibraryMgmtDbContext(DbContextOptions<LibraryMgmtDbContext> options) : base(options)
        {
            //It will look for connection string from appsettings
        }

    }
}
