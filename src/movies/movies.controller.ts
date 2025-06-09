import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get('popular')
  getPopular() {
    return this.moviesService.getPopular();
  }

  @Get(':id')
  getDetails(@Param('id') id: string) {
    return this.moviesService.getDetails(id);
  }
}
