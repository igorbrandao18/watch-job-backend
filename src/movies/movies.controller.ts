import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@UseGuards(AuthGuard('jwt'))
@ApiTags('Filmes')
@ApiBearerAuth()
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get('popular')
  @ApiOperation({ summary: 'Listar filmes populares' })
  @ApiResponse({ status: 200, description: 'Lista de filmes populares', schema: { example: { page: 1, results: [ { id: 550, title: 'Fight Club', overview: 'Descrição do filme...', release_date: '1999-10-15' } ], total_pages: 500, total_results: 10000 } } })
  getPopular() {
    return this.moviesService.getPopular();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Detalhar filme por ID' })
  @ApiResponse({ status: 200, description: 'Detalhes do filme', schema: { example: { id: 550, title: 'Fight Club', overview: 'Descrição do filme...', release_date: '1999-10-15', genres: [ { id: 18, name: 'Drama' } ] } } })
  getDetails(@Param('id') id: string) {
    return this.moviesService.getDetails(id);
  }
}
