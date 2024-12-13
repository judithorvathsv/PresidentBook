using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PresidentBook.Api.Models;

namespace PresidentBook.Api.Controllers
{
    [ApiController, Route("api/v1/[controller]")]
    public class PresidentsController : ControllerBase
    {
        public PresidentsController()
        {
        }

        [HttpPost]
        public IActionResult CreatePresident(President president)
        {
            if (president == null)
            {
                return BadRequest("Fronted problem");
            }

            Console.WriteLine($"Received: {president.FirstName}, {president.LastName}, {president.StartYear}, {president.EndYear}");

            return Ok(president);
        }
    }
}