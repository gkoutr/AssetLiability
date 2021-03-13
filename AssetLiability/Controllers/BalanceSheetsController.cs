using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AssetLiability;
using AssetLiability.Models;

namespace AssetLiability.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BalanceSheetsController : ControllerBase
    {
        private readonly AssetLiabilityContext _context;

        public BalanceSheetsController(AssetLiabilityContext context)
        {
            _context = context;
        }

        // GET: api/BalanceSheets
        [HttpGet]
        public IEnumerable<BalanceSheet> GetBalanceSheet()
        {
            IEnumerable<BalanceSheet> balanceSheet =  _context.BalanceSheet;
            return balanceSheet;
        }

        // GET: api/BalanceSheets/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetBalanceSheet([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var balanceSheet = await _context.BalanceSheet.FindAsync(id);

            if (balanceSheet == null)
            {
                return NotFound();
            }

            return Ok(balanceSheet);
        }

        // PUT: api/BalanceSheets/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBalanceSheet([FromRoute] int id, [FromBody] BalanceSheet balanceSheet)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != balanceSheet.BalanceSheetID)
            {
                return BadRequest();
            }

            _context.Entry(balanceSheet).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BalanceSheetExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/BalanceSheets
        [HttpPost]
        public async Task<IActionResult> PostBalanceSheet([FromBody] BalanceSheet balanceSheet)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.BalanceSheet.Add(balanceSheet);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBalanceSheet", new { id = balanceSheet.BalanceSheetID }, balanceSheet);
        }

        // DELETE: api/BalanceSheets/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBalanceSheet([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var balanceSheet = await _context.BalanceSheet.FindAsync(id);
            if (balanceSheet == null)
            {
                return NotFound();
            }

            _context.BalanceSheet.Remove(balanceSheet);
            await _context.SaveChangesAsync();

            return Ok(balanceSheet);
        }

        private bool BalanceSheetExists(int id)
        {
            return _context.BalanceSheet.Any(e => e.BalanceSheetID == id);
        }
    }
}