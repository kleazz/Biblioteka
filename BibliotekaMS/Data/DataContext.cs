using BibliotekaMS.Models;
using Microsoft.EntityFrameworkCore;

namespace BibliotekaMS.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }

        public DbSet<Kategoria> Kategoria { get; set; }
        public DbSet<Libri> Libri { get; set; }
        public DbSet<KategoriaELibrit> KategoriaELibrit { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Libri>()
            .HasKey(l => l.Isbn);
            modelBuilder.Entity<KategoriaELibrit>()
                .HasKey(pc => new { pc.Isbn, pc.KategoriaId });
            modelBuilder.Entity<KategoriaELibrit>()
                .HasOne(p => p.Libri)
                .WithMany(pc => pc.KategoriaELibrit)
                .HasForeignKey(p => p.Isbn);
            modelBuilder.Entity<KategoriaELibrit>()
               .HasOne(p => p.Kategoria)
               .WithMany(pc => pc.KategoriaELibrit)
               .HasForeignKey(c => c.KategoriaId);
        }
    }
}
