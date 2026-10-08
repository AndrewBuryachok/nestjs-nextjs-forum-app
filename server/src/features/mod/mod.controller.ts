import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ModService } from './mod.service';
import { Town } from '../towns/town.entity';
import { UserNickDto } from '../users/user.dto';
import { CreateTownDto } from '../towns/town.dto';
import { Public } from '../../common/decorators';
import { ModApiKeyGuard } from '../../common/guards';

@Public()
@UseGuards(ModApiKeyGuard)
@Controller('mod')
export class ModController {
  constructor(private modService: ModService) {}

  @Get('towns')
  getMainTowns(): Promise<Town[]> {
    return this.modService.getMainTowns();
  }

  @Get('towns/:nick')
  getMyTown(@Param() { nick }: UserNickDto): Promise<Town> {
    return this.modService.getMyTown(nick);
  }

  @Post('towns/:nick')
  createTown(
    @Param() { nick }: UserNickDto,
    @Body() dto: CreateTownDto,
  ): Promise<void> {
    return this.modService.createTown(nick, dto);
  }
}
