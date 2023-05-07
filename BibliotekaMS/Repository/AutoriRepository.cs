using BibliotekaMS.Data;
using BibliotekaMS.Interfaces;
using BibliotekaMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace BibliotekaMS.Repository
{
    public class AutoriRepository : IAutoriRepository
    {
        private readonly DataContext _context;
        public AutoriRepository(DataContext context)
        {
            _context = context;
        }

        public bool CreateAutori(Autori autori)
        {
            _context.Add(autori);
            return Save();
        }

        public bool DeleteAutori(int autoriId)
        {
            var autorToDelete = _context.Autori.FirstOrDefault(a => a.AutoriID == autoriId);
            if (autorToDelete == null)
            {
                return false;
            }
            _context.Remove(autorToDelete);
            return Save();
        }

        public Autori GetAutori(int id)
        {
            return _context.Autori.Where(k => k.AutoriID == id).FirstOrDefault();
        }

        public ICollection<Autori> GetAutori()
        {
            return _context.Autori.ToList();
        }

        public bool AutoriExists(int autoriId)
        {
            return _context.Autori.Any(k => k.AutoriID == autoriId);
        }

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }

        public bool UpdateAutori(Autori autori)
        {
            _context.Update(autori);
            return Save();
        }

        public Libri GetLibri(string isbn)
        {
            throw new NotImplementedException();
        }

        public Libri GetLibriEmri(string emri)
        {
            throw new NotImplementedException();
        }

        public bool LibriExists(string isbn)
        {
            throw new NotImplementedException();
        }

        public bool CreateAutori(Autori autori, int[] kategoriaIds)
        {
            throw new NotImplementedException();
        }

        public bool UpdateAutori(int autoriId, Autori autori)
        {
            throw new NotImplementedException();
        }

        public Libri GetAutori(string isbn)
        {
            throw new NotImplementedException();
        }

        public Libri GetAutoriEmri(string emri)
        {
            throw new NotImplementedException();
        }

        public bool AutoriExists(string autoriId)
        {
            throw new NotImplementedException();
        }

        public bool DeleteAutori(Autori autori)
        {
            throw new NotImplementedException();
        }

        Autori IAutoriRepository.GetAutori(string isbn)
        {
            throw new NotImplementedException();
        }

        Autori IAutoriRepository.GetAutoriEmri(string emri)
        {
            throw new NotImplementedException();
        }

        object IAutoriRepository.GetAutori(int autoriId)
        {
            throw new NotImplementedException();
        }

        public void DeleteAutori(object autoriEntity)
        {
            throw new NotImplementedException();
        }

        public void AddAutori(Autori autori)
        {
            throw new NotImplementedException();
        }

        public object GetAutor(int autoriId)
        {
            throw new NotImplementedException();
        }

        public void UpdateAutori(object autoriEntity)
        {
            throw new NotImplementedException();
        }

        public bool AutoriExists(string autoriId, string mbiemri)
        {
            throw new NotImplementedException();
        }

        public object GetAutori(object autoriId)
        {
            throw new NotImplementedException();
        }

     
    }
}
