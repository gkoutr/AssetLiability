using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AssetLiability;
using AssetLiability.Models;
using AssetLiability.Data;

namespace AssetLiability.Controllers
{
    [Route("api/balancesheet")]
    [ApiController]
    public class BalanceSheetController : ControllerBase
    {
        private readonly AssetLiabilityContext _context;

        public BalanceSheetController(AssetLiabilityContext context)
        {
            _context = context;
        }

        // GET: api/balancesheet
        [HttpGet]
        public BalanceSheet GetBalanceSheet()
        {
            IEnumerable<Record> records = _context.Record;
            var assetsTotal = records.Where(x => x.Type == "Asset").Select(x => x.Balance).Sum();
            var liabilitiesTotal = records.Where(x => x.Type == "Liability").Select(x => x.Balance).Sum();
            var netWorth = assetsTotal - liabilitiesTotal;
            BalanceSheet balanceSheet = new BalanceSheet(records, assetsTotal, liabilitiesTotal, netWorth);
            return balanceSheet;
        }
    }
}