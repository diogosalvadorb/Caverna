using Caverna.Api.Data;
using Caverna.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Caverna.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CavernaController : ControllerBase
    {
        private readonly CavernaDbContext _context;

        public CavernaController(CavernaDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<CavernaState>> Get()
        {
            var state = await _context.States.FirstOrDefaultAsync();
            if (state == null)
            {
                state = new CavernaState();
                _context.States.Add(state);
                await _context.SaveChangesAsync();
            }

            return Ok(state);
        }

        [HttpPost("fazer-fogo")]
        public async Task<ActionResult<CavernaState>> FazerFogo()
        {
            var state = await _context.States.FirstAsync();
            state.Fogueiras++;
            await _context.SaveChangesAsync();
            return Ok(state);
        }

        [HttpPost("criar-roda")]
        public async Task<ActionResult<CavernaState>> CriarRoda()
        {
            var state = await _context.States.FirstAsync();
            state.Rodas++;
            await _context.SaveChangesAsync();
            return Ok(state);
        }
    }
}
