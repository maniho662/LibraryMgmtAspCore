using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace LibraryMgmt.Model
{
    public class Book
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(255)]
        public string BookName { get; set; }
        
        [Required]
        [StringLength(255)]
        public string AuthorName { get; set; }
        
        [StringLength(255)]
        public string BookCategory { get; set; }
        
        [Required]
        [StringLength(10)]
        public string Edition { get; set; }

        [Required]        
        public Decimal Price { get; set; }    

    }
}
