
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
        public async Task<ActionResult<President>> Create(AddPresidentRequest request)
        {
            var president = new President
            {
                FirstName = request.FirstName,
                LastName = request.LastName,
                StartYear = request.StartYear,
                EndYear = request.EndYear
            };

            _context.Presidents.Add(president);       

            int result = await _context.SaveChangesAsync(); 
            if (result <= 0)
            {
                return BadRequest("Failed to save president");
            }
            return CreatedAtAction(nameof(Get), new { id = president.Id }, president);
        }

        [HttpGet]
        public ActionResult<President> GetPresidentList()
        {
            return Ok(_context.Presidents.ToList());
        }

        [HttpGet("{id}")]
        public ActionResult<President> Get(int id)
        {

            var president = _context.Presidents.FirstOrDefault(p => p.Id == id);

            if (president is null)
            {
                return NotFound();
            }

            return Ok(president);
        }

        [HttpPut("{id}")]
        public ActionResult<President> Update(int id, UpdatePresidentRequest request)
        {
            var presidentToUpdate = _context.Presidents.FirstOrDefault(p => p.Id == id);

            if (presidentToUpdate is null)
            {
                return NotFound();
            }

            presidentToUpdate.FirstName = request.FirstName;
            presidentToUpdate.LastName = request.LastName;
            presidentToUpdate.StartYear = request.StartYear;
            presidentToUpdate.EndYear = request.EndYear;    
           
            try
            {
                _context.SaveChanges(); 
            }
            catch (DbUpdateException)
            {
                return BadRequest("Failed to update president");
            }      
            return Ok(presidentToUpdate);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var president = _context.Presidents.FirstOrDefault(p => p.Id == id);

            if (president is null)
            {
                return NotFound();
            }

            _context.Presidents.Remove(president);
            _context.SaveChanges();
            return NoContent();
        }
    }
}