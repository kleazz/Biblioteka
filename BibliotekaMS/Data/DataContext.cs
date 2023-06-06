﻿using BibliotekaMS.Identity;
using BibliotekaMS.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace BibliotekaMS.Data
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }

        public DbSet<Kategoria> Kategoria { get; set; }
        public DbSet<Libri> Libri { get; set; }
        public DbSet<KategoriaELibrit> KategoriaELibrit { get; set; }
        public DbSet<Autori> Autori { get; set; }

        public DbSet<AutoriILibrit> AutoriILibrit { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
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

            modelBuilder.Entity<AutoriILibrit>()
                .HasKey(al => new {al.Isbn, al.AutoriId});
            modelBuilder.Entity<AutoriILibrit>()
                .HasOne(l => l.Libri)
                .WithMany(al => al.AutoriILibrit)
                .HasForeignKey(l => l.Isbn);
            modelBuilder.Entity<AutoriILibrit>()
                .HasOne(l => l.Autori)
                .WithMany(al => al.AutoriILibrit)
                .HasForeignKey(l => l.AutoriId);


        }
    }
}
