using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using AssetLiability;
using AssetLiability.Models;

namespace AssetLiability.Data
{
    public class AssetLiabilityContext : DbContext
    {
        public AssetLiabilityContext (DbContextOptions<AssetLiabilityContext> options)
            : base(options)
        {
        }

        public DbSet<Record> Record { get; set; }
    }
}
