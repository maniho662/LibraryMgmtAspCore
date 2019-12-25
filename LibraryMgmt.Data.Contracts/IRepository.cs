using LibraryMgmt.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace LibraryMgmt.Data.Contracts
{
    public interface IRepository<T> where T : class
    {
        //To query using LINQ
        IQueryable<T> GetAll(Pager queryObj);

        IQueryable<T> GetAll();

        //Returning Book by id
        T GetById(int id);

        //Adding Book
        void Add(T entity);

        //Updating Book
        void Update(T entity);

        //Deleting Book
        void Delete(T entity);

        //Deleting Book by id
        void Delete(int id);

    }
}
