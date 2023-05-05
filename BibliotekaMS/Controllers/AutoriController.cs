using AutoMapper;
using BibliotekaMS.Dto;
using BibliotekaMS.Interfaces;
using BibliotekaMS.Models;
using BibliotekaMS.Repository;
using Microsoft.AspNetCore.Mvc;

namespace BibliotekaMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AutoriController : ControllerBase
    {
        private readonly IAutoriRepository _autoriRepository;
        private readonly IMapper _mapper;
        private object autoriRepository;
        private Autori autoriToDelete;

        public AutoriController(IAutoriRepository autoriRepository, IMapper mapper)
        {
            _autoriRepository = autoriRepository;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Autori>))]
        public IActionResult GetAutoret()
        {
            var autoret = _mapper.Map<List<AutoriDto>>(_autoriRepository.GetAutori());

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(autoret);
        }

        [HttpGet("{autoriId}")]
        [ProducesResponseType(200, Type = typeof(Autori))]
        [ProducesResponseType(400)]
        public IActionResult GetAutori(int autoriId)
        {
            if (!_autoriRepository.AutoriExists(autoriId))
                return NotFound();

            var autori = _mapper.Map<AutoriDto>(_autoriRepository.GetAutori(autoriId));

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(autori);
        }

        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult CreateAutori([FromBody] AutoriDto autoriDto)
        {
            if (autoriDto == null)
                return BadRequest();

            if (_autoriRepository.AutoriExists(autoriDto.Emri, autoriDto.Mbiemri))
            {
                ModelState.AddModelError("", "Ky autor ekziston tashmë!");
                return StatusCode(404, ModelState);
            }

            var autori = _mapper.Map<Autori>(autoriDto);

            if (!_autoriRepository.CreateAutori(autori))
            {
                ModelState.AddModelError("", $"Diçka shkoi keq duke shtuar autorin {autori.Emri} {autori.Mbiemri}");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }

        [HttpPut("{autoriId}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        public IActionResult UpdateAutori(string autoriId, [FromQuery] int autoriId, [FromBody] AutoriDto updatedAutori)
        {
            if (updatedAutori == null)
                return BadRequest(ModelState);

            if (autoriId == updatedAutori.id)
            {
                if (_autoriRepository.AutoriExists(autoriId))
                {
                    if (!ModelState.IsValid)
                        return BadRequest();

                    var autoriMap = _mapper.Map<Autori>(updatedAutori);

                    if (!_autoriRepository.UpdateAutori(autoriId, autoriMap))
                    {
                        ModelState.AddModelError("", "Something went wrong updating autori");
                        return StatusCode(500, ModelState);
                    }

                    return NoContent();
                }

                return NotFound();
            }

            return BadRequest(ModelState);

        }

        [HttpDelete("{autoriId}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        public IActionResult DeleteAutori(string autoriId)
        {
            if (!_autoriRepository.AutoriExists(autoriId))
            {
                return NotFound();
            }


            var libriToDelete = _autoriRepository.GetAutori(autoriId);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (!_autoriRepository.DeleteAutori(autoriToDelete))
            {
                ModelState.AddModelError("", "Something went erong deleting Autori");
            }
            return NoContent();
        }

    }
}
