import { setSeederFactory } from 'typeorm-extension';
import { Card } from '../../features/cards/card.entity';

export const CardFactory = setSeederFactory(Card, () => {
  const card = new Card();
  return card;
});
