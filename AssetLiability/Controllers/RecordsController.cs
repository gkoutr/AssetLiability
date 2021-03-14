using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AssetLiability.Data;
using AssetLiability.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AssetLiability.Controllers
{
    [Route("api/records")]
    [ApiController]
    public class RecordsController : ControllerBase
    { 
        private readonly AssetLiabilityContext _context;

        public RecordsController(AssetLiabilityContext context)
        {
            _context = context;
        }

        // GET: api/records
        [HttpGet]
        public IEnumerable<Record> GetRecords()
        {
            IEnumerable<Record> records = _context.Record;
            return records;
        }

        // GET: api/records/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetRecord([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var record = await _context.Record.FindAsync(id);

            if (record == null)
            {
                return NotFound();
            }

            return Ok(record);
        }

        // POST: api/records
        [HttpPost]
        public async Task<IActionResult> PostRecord([FromBody] Record record)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Record.Add(record);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRecords", new { id = record.RecordId }, record);
        }

        // DELETE: api/records/1
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRecord([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var record = await _context.Record.FindAsync(id);
            if (record == null)
            {
                return NotFound();
            }

            _context.Record.Remove(record);
            await _context.SaveChangesAsync();

            return Ok(record);
        }

        private bool RecordExists(int id)
        {
            return _context.Record.Any(e => e.RecordId == id);
        }
    }
}