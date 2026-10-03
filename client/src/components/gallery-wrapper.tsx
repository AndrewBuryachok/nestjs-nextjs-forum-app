import { SimpleGrid } from '@chakra-ui/react';

type Props = {
  children: React.ReactNode;
};

export default function GalleryWrapper(props: Props) {
  return (
    <SimpleGrid columns={[1, 2, 3]} gap='4'>
      {props.children}
    </SimpleGrid>
  );
}
