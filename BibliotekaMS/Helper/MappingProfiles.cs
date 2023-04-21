using AutoMapper;
using BibliotekaMS.Models;
using BibliotekaMS.Dto;
namespace BibliotekaMS.Helper
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Libri, LibriDto>();
            CreateMap<LibriDto, Libri>();
        }
    }
}
