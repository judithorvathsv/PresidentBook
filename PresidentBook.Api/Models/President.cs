using System.ComponentModel.DataAnnotations;

namespace PresidentBook.Api.Models
{
    public class President
    {
        [Key]
        public int Id { get; set; } 

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public int StartYear {get;set;}

        public int? EndYear {get;set;}        
    }
}