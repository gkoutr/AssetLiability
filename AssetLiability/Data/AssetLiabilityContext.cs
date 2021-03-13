using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using AssetLiability;

namespace AssetLiability.Models
{
    public class AssetLiabilityContext : DbContext
    {
        public AssetLiabilityContext (DbContextOptions<AssetLiabilityContext> options)
            : base(options)
        {
        }

        public DbSet<AssetLiability.BalanceSheet> BalanceSheet { get; set; }
    }
}
