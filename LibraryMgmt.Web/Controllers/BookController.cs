using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using LibraryMgmt.Data.Contracts;
using LibraryMgmt.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LibraryMgmt.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : Controller
    {
        private readonly ILibraryMgmtUow UOW;

        public BookController(ILibraryMgmtUow uow)
        {
            UOW = uow;
        }

        [HttpGet("")]
        public IEnumerable<Book> Get()
        {
            return UOW.Books.GetAll().OrderBy(m => m.Id);
        }

        [HttpGet("{id}")]
        public IEnumerable<Book> Get(int Id)
        {
            return UOW.Books.GetAll().Where(m => m.Id == Id);
        }

        [HttpGet("[action]")]
        public Book GetByBookId(int id)
        {
            return UOW.Books.GetAll().FirstOrDefault(m => m.Id == id);
        }
        
        [HttpGet("[action]")]
        public Book GetByBookName(string value)
        {
            var book = UOW.Books.GetAll().FirstOrDefault(m => m.BookName.StartsWith(value));

            if (book != null) return book;
            throw new Exception(new HttpResponseMessage(HttpStatusCode.NotFound).ToString());
        }

        // Update an existing book
        // PUT /api/Books/
        [HttpPut("")]
        public HttpResponseMessage Put([FromBody]Book book)
        {
            UOW.Books.Update(book);
            UOW.Commit();
            return new HttpResponseMessage(HttpStatusCode.NoContent);
        }

        // Create a new book
        // POST /api/Books
        [HttpPost("")]
        public int Post([FromBody]Book book)
        {            
            UOW.Books.Add(book);
            UOW.Commit();
            return Response.StatusCode = (int)HttpStatusCode.Created;
        }

        //Delete a book
        //Delete /api/Books/5
        [HttpDelete("{id}")]
        public HttpResponseMessage Delete(int id)
        {
            UOW.Books.Delete(id);
            UOW.Commit();
            return new HttpResponseMessage(HttpStatusCode.NoContent);
        }
    }
}