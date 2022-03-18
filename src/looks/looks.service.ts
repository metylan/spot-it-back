import { Injectable } from '@nestjs/common';
import { CreateLookDto } from './dto/create-look.dto';
import { UpdateLookDto } from './dto/update-look.dto';

@Injectable()
export class LooksService {
  create(createLookDto: CreateLookDto) {
    return 'This action adds a new look';
  }

  findAll() {
    return `This action returns all looks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} look`;
  }

  update(id: number, updateLookDto: UpdateLookDto) {
    return `This action updates a #${id} look`;
  }

  remove(id: number) {
    return `This action removes a #${id} look`;
  }
}
