using System.ComponentModel.DataAnnotations;

namespace PresidentBook.Api.Models
{
    public class AddPresidentRequest
    {
        [Required(ErrorMessage = "The First Name field is required")]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "The Last Name field is required")]
        public string LastName { get; set; }

        [Required(ErrorMessage = "The Start Year field is required")]
        [RegularExpression(@"^([0-9]{4})$", ErrorMessage = "Please enter four digits of year.")]
        public int StartYear {get;set;}

        [RegularExpression(@"^(0|\d{4})$", ErrorMessage = "The End Year must be either 0 or four digits.")]
        public int? EndYear {get;set;}      
    }
}