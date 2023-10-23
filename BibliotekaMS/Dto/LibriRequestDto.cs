namespace BibliotekaMS.Dto
{
    public class CreateLibriRequestDto
    {
        public LibriDto LibriCreate { get; set; }
        public KategoriaDto[] KategoriaDtos { get; set; }
        public AutoriDto[] AutoriDtos { get; set; }
    }
}
