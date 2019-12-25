using System;
using System.Collections.Generic;
using System.Text;
using LibraryMgmt.Data.Contracts;
using LibraryMgmt.Data.Helpers;
using LibraryMgmt.Model;
using Microsoft.EntityFrameworkCore;

namespace LibraryMgmt.Data
{
    public class LibraryMgmtUow : ILibraryMgmtUow, IDisposable
    {
        private LibraryMgmtDbContext DbContext { get; set; }
        protected IRepositoryProvider RepositoryProvider { get; set; }
        public LibraryMgmtUow(IRepositoryProvider repositoryProvider)
        {
            CreateDbContext();
            repositoryProvider.DbContext = DbContext;
            RepositoryProvider = repositoryProvider;
        }

        public IRepository<Book> Books { get { return GetStandardRepo<Book>(); } }

        public void Commit()
        {
            DbContext.SaveChanges();
        }

        protected void CreateDbContext()
        {
            DbContext = new LibraryMgmtDbContext();
        }

        private IRepository<T> GetStandardRepo<T>() where T : class
        {
            return RepositoryProvider.GetRepositoryForEntityType<T>();
        }

        private T GetRepo<T>() where T : class
        {
            return RepositoryProvider.GetRepository<T>();
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
                if (DbContext != null)
                {
                    DbContext.Dispose();
                }
            }
        }
    }
}
