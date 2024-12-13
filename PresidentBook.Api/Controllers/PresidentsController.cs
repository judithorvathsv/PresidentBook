
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
        public async Task<ActionResult<President>> Create(President president)
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
        public ActionResult<President> Update(int id, President president)
        {
            var presidentToUpdate = _context.Presidents.FirstOrDefault(p => p.Id == id);

            if (presidentToUpdate is null)
            {
                return NotFound();
            }

            presidentToUpdate.FirstName = president.FirstName;
            presidentToUpdate.LastName = president.LastName;
            presidentToUpdate.StartYear = president.StartYear;
            presidentToUpdate.EndYear = president.EndYear;

            if (presidentToUpdate is null)
            {
                return BadRequest("Failed to update president");
            }
            _context.SaveChanges();

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