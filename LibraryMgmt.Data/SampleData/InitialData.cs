using LibraryMgmt.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace LibraryMgmt.Data.SampleData
{
    public class InitialData
    {
        private LibraryMgmtDbContext _dbContext;

        public InitialData(LibraryMgmtDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void SeedData()
        {
            //Making sure that database has nothing before seeding
            if (!_dbContext.Books.Any())
            {
                //Add New Data
                Book book = new Book() 
                { 
                    BookName = "C++", 
                    AuthorName = "Balagurusamy", 
                    BookCategory = "Computer", 
                    Edition = "2.0", 
                    Price = 100.00m 
                };
                _dbContext.Books.Add(book);
              
                _dbContext.SaveChanges();
            }
        }
    }
}
