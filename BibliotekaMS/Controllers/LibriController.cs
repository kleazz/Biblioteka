using AutoMapper;
using BibliotekaMS.Dto;
using BibliotekaMS.Interfaces;
using BibliotekaMS.Models;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace BibliotekaMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LibriController : Controller
    {
        private readonly ILibriRepository _libriRepository;
        private readonly IMapper _mapper;

        public LibriController(ILibriRepository libriRepository, IMapper mapper)
        {
            _libriRepository = libriRepository;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Libri>))]
        public IActionResult GetLibrat()
        {
            var librat = _mapper.Map<List<LibriDto>>(_libriRepository.GetLibrat());

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(librat);
        }

        [HttpGet("{libriIsbn}")]
        [ProducesResponseType(200, Type = typeof(Libri))]
        [ProducesResponseType(400)]

        public IActionResult GetLibri(string libriIsbn)
        {
            if (!_libriRepository.LibriExists(libriIsbn))
                return NotFound();

            var libri = _mapper.Map<LibriDto>(_libriRepository.GetLibri(libriIsbn));

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(libri);
        }

        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult CreateLibri([FromQuery] int kategoriaId, [FromBody] LibriDto libriCreate)
        {
            if (libriCreate == null)
                return BadRequest(ModelState);

            var librat = _libriRepository.GetLibrat()
                .Where(c => c.Titulli.Trim().ToUpper() == libriCreate.Titulli.TrimEnd().ToUpper())
                .FirstOrDefault();

            if (librat != null)
            {
                ModelState.AddModelError("", "Libri already exists");
                return StatusCode(422, ModelState);
            }

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var libriMap = _mapper.Map<Libri>(libriCreate);

            if (!_libriRepository.CreateLibri(kategoriaId,libriMap))
            {
                ModelState.AddModelError("", "Something went wrong while saving");
                return StatusCode(500, ModelState);
            }

            return Ok("Successfully created");
        }
        [HttpPut("{libriIsbn}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public IActionResult UpdateLibri(string libriIsbn,[FromQuery] int kategoriaId, [FromBody] LibriDto updatedLibri) 
        {
            if (updatedLibri == null)
                return BadRequest(ModelState);

            if(libriIsbn != updatedLibri.isbn)
                return BadRequest(ModelState);

            if (!_libriRepository.LibriExists(libriIsbn))
                return NotFound();

            if (!ModelState.IsValid)
                return BadRequest();

            var libriMap = _mapper.Map<Libri>(updatedLibri);

            if (!_libriRepository.UpdateLibri(kategoriaId, libriMap))
            {
                ModelState.AddModelError("", "Something went wrong updating libri");
                return StatusCode(500, ModelState);
            }

            return NoContent();

        }

        [HttpDelete("{libriIsbn}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]

        public IActionResult DeleteLibri(string libriIsbn)
        {
            if (!_libriRepository.LibriExists(libriIsbn))
            {
                return NotFound();
            }

           
            var libriToDelete = _libriRepository.GetLibri(libriIsbn);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (!_libriRepository.DeleteLibri(libriToDelete))
            {
                ModelState.AddModelError("", "Something went erong deleting Libri");
            }
            return NoContent();
        }

    }
}


