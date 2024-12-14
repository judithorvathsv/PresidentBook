using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PresidentBook.Api.Models
{
    public class UpdatePresidentRequest
    {
        [Required(ErrorMessage = "The FirstName field is required")]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "The LastName field is required")]
        public string LastName { get; set; }

        [Required(ErrorMessage = "The StartYear field is required")]
        [RegularExpression(@"^([0-9]{4})$", ErrorMessage = "Please enter four digits of year.")]
        public int StartYear {get;set;}

        [RegularExpression(@"^([0-9]{4})$", ErrorMessage = "Please enter four digits of year.")]
        public int? EndYear {get;set;}     
    }
}