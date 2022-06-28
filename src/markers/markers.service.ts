import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMarkerDto } from './dto/create-marker.dto';
import { UpdateMarkerDto } from './dto/update-marker.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Marker } from '../markers/entities/marker.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class MarkersService {
  constructor(@InjectRepository(Marker) private data: Repository<Marker>) {}

  create(dto: CreateMarkerDto) {
    return this.data.save(dto);
  }

  findAll(): Promise<Marker[]> {
    return this.data.find();
  }

  async findOne(id: number): Promise<Marker> {
    try {
      return await this.data.findOneByOrFail({ id: id });
    } catch (err) {
      throw new NotFoundException(id);
    }
  }

  async update(id: number, dto: UpdateMarkerDto): Promise<Marker> {
    const done = await this.data.update(id, dto);
    if (done.affected != 1) throw new NotFoundException(id);
    return this.findOne(id);
  }

  async remove(id: number) {
    const done: DeleteResult = await this.data.delete(id);
    if (done.affected !== 1) throw new NotFoundException(id);
  }
}
