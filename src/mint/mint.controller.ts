import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MintService } from './mint.service';
import { CreateMintDto } from './dto/create-mint.dto';
import { UpdateMintDto } from './dto/update-mint.dto';

@Controller()
export class MintController {
  constructor(private readonly mintService: MintService) {}

  @MessagePattern('createMint')
  create(@Payload() createMintDto: CreateMintDto) {
    return this.mintService.create(createMintDto);
  }

  @MessagePattern('findAllMint')
  findAll() {
    return this.mintService.findAll();
  }

  @MessagePattern('findOneMint')
  findOne(@Payload() id: number) {
    return this.mintService.findOne(id);
  }

  @MessagePattern('updateMint')
  update(@Payload() updateMintDto: UpdateMintDto) {
    return this.mintService.update(updateMintDto.id, updateMintDto);
  }

  @MessagePattern('removeMint')
  remove(@Payload() id: number) {
    return this.mintService.remove(id);
  }
}
