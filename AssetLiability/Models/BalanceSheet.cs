using AssetLiability.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AssetLiability
{
    public class BalanceSheet
    {
        public BalanceSheet()
        {
        }

        public BalanceSheet(IEnumerable<Record> records, decimal assetsTotal, decimal liabilitiesTotal, decimal netWorth)
        {
            Records = records;
            AssetsTotal = assetsTotal;
            LiabilitiesTotal = liabilitiesTotal;
            NetWorth = netWorth;
        }

        public IEnumerable<Record> Records { get; set; }
        public Decimal AssetsTotal { get; set; }
        public Decimal LiabilitiesTotal { get; set; }
        public Decimal NetWorth { get; set; }
    }
}

