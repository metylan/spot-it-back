import { Module } from '@nestjs/common';
import { MarkersService } from './markers.service';
import { MarkersController } from './markers.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Marker} from "./entities/marker.entity";

@Module({
  controllers: [MarkersController],
  providers: [MarkersService],
  imports:[TypeOrmModule.forFeature([Marker])]
})
export class MarkersModule {}
