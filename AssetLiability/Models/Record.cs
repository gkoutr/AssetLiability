using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AssetLiability.Models
{
    public class Record
    {
        [Key]
        public int RecordId { get; set; }
        public String Type { get; set; }
        public String Name { get; set; }
        public Decimal Balance { get; set; }
    }
}
