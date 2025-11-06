using Caverna.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Caverna.Api.Data
{
    public class CavernaDbContext : DbContext
    {
        public CavernaDbContext(DbContextOptions<CavernaDbContext> options) : base(options) { }

        public DbSet<CavernaState> States => Set<CavernaState>();
    }
}
