using System;
using System.Collections.Generic;
using System.Text;
using LibraryMgmt.Model;

namespace LibraryMgmt.Data.Contracts
{
    public interface ILibraryMgmtUow
    {
        void Commit();
        IRepository<Book> Books { get; }
    }
}
