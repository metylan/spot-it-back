import { PartialType } from '@nestjs/swagger';
import { CreateLookDto } from './create-look.dto';

export class UpdateLookDto extends PartialType(CreateLookDto) {}
