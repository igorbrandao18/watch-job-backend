import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class MoviesService {
  private readonly apiKey = process.env.TMDB_API_KEY;
  private readonly baseUrl = 'https://api.themoviedb.org/3';
  private readonly logger = new Logger(MoviesService.name);

  async getPopular() {
    try {
      this.logger.log('Buscando filmes populares no TMDb');
      const { data } = await axios.get(`${this.baseUrl}/movie/popular`, {
        params: { api_key: this.apiKey, language: 'pt-BR' },
      });
      return data;
    } catch (e) {
      this.logger.error('Erro ao buscar filmes populares', e);
      throw new InternalServerErrorException('Erro ao buscar filmes populares');
    }
  }

  async getDetails(id: string) {
    try {
      this.logger.log(`Buscando detalhes do filme ${id} no TMDb`);
      const { data } = await axios.get(`${this.baseUrl}/movie/${id}`, {
        params: { api_key: this.apiKey, language: 'pt-BR' },
      });
      return data;
    } catch (e) {
      this.logger.error(`Erro ao buscar detalhes do filme ${id}`, e);
      throw new InternalServerErrorException('Erro ao buscar detalhes do filme');
    }
  }
}
