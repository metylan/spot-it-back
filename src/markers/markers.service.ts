import {Injectable, NotFoundException} from '@nestjs/common';
import { CreateMarkerDto } from './dto/create-marker.dto';
import { UpdateMarkerDto } from './dto/update-marker.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Marker} from "../markers/entities/marker.entity";
import {DeleteResult, Repository} from "typeorm";
import {User} from "../users/entities/user.entity";
import {UpdateUserDto} from "../users/dto/update-user.dto";

@Injectable()
export class MarkersService {
  constructor(@InjectRepository(Marker) private data: Repository<Marker>) { }
  create(createMarkerDto: CreateMarkerDto) {
    return this.data.save(createMarkerDto);
  }
  findAll(): Promise<Marker[]> {
    return this.data.find();
  }

  findOne(id: number): Promise<Marker> {
    // @ts-ignore
    return this.data.findOneOrFail(id).catch(() => {
      throw new NotFoundException(id);
    });
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
