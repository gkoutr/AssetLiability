using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AssetLiability
{
    public class BalanceSheet
    {
        [Key]
        public int BalanceSheetID { get; set; }
        public String Type { get; set; }
        public String Name { get; set; }
        public Decimal Balance { get; set; }
    }
}
