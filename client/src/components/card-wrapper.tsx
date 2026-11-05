import { Card } from '@chakra-ui/react';

type Props = {
  children: React.ReactNode;
};

export default function CardWrapper(props: Props) {
  return (
    <Card.Root bg='bg.subtle' size='sm' variant='subtle'>
      {props.children}
    </Card.Root>
  );
}
