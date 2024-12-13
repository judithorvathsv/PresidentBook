using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using PresidentBook.Api.Models;

namespace PresidentBook.Api.Controllers
{
    [ApiController, Route("api/v1/[controller]")]
    public class PresidentsController : ControllerBase
    {

        private readonly ApplicationDbContext _context;
        public PresidentsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<President>> CreatePresident(President president)
        {
            if (president == null)
            {
                return BadRequest("Fronted problem");
            }

            _context.Presidents.Add(president);
            await _context.SaveChangesAsync();

            return Ok(president);
        }

        [HttpGet]
        public ActionResult<President> GetPresidentList(){
           return  Ok(_context.Presidents.ToList());
        }
    }
}