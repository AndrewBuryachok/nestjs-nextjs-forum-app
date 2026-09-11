import {
  CreatePlaceWithCardAndUserDto,
  CreatePlaceWithCardDto,
} from '../places/place.dto';

export class CreateMarketDto extends CreatePlaceWithCardDto {}

export class CreateMarketWithUserDto extends CreatePlaceWithCardAndUserDto {}
