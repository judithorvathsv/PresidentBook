using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PresidentBook.Api.Models
{
    public class President
    {
        public int Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public int StartYear {get;set;}

        public int EndYear {get;set;}        
    }
}