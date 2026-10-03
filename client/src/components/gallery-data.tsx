import { Card } from '@chakra-ui/react';
import { Data } from '@/types/data';
import GalleryWrapper from './gallery-wrapper';

type Props<T> = {
  data: T[];
  render: (value: T) => React.ReactNode;
};

export default function GalleryData<T extends Data>(props: Props<T>) {
  return (
    <GalleryWrapper>
      {props.data.map((value) => (
        <Card.Root key={value.id} size='sm' variant='subtle'>
          {props.render(value)}
        </Card.Root>
      ))}
    </GalleryWrapper>
  );
}
