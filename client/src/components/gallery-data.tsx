import Link from 'next/link';
import { Card } from '@chakra-ui/react';
import { PAGE_TABS_MAP } from '@/config/navigation';
import { Data } from '@/types/data';
import GalleryWrapper from './gallery-wrapper';

type Props<T> = {
  page: keyof typeof PAGE_TABS_MAP;
  data: T[];
  render: (value: T) => React.ReactNode;
};

export default function GalleryData<T extends Data>(props: Props<T>) {
  return (
    <GalleryWrapper>
      {props.data.map((value) => (
        <Card.Root key={value.id} asChild size='sm' variant='subtle'>
          <Link href={`/${props.page}/${value.id}`}>{props.render(value)}</Link>
        </Card.Root>
      ))}
    </GalleryWrapper>
  );
}
