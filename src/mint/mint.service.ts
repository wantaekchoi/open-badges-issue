import { Injectable } from '@nestjs/common';
import { CreateMintDto } from './dto/create-mint.dto';
import { UpdateMintDto } from './dto/update-mint.dto';

@Injectable()
export class MintService {
  create(createMintDto: CreateMintDto) {
    return 'This action adds a new mint';
  }

  findAll() {
    return `This action returns all mint`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mint`;
  }

  update(id: number, updateMintDto: UpdateMintDto) {
    return `This action updates a #${id} mint`;
  }

  remove(id: number) {
    return `This action removes a #${id} mint`;
  }
}
