import { Card } from '@chakra-ui/react';

type Props = {
  asChild?: boolean;
  children: React.ReactNode;
};

export default function CardWrapper(props: Props) {
  return (
    <Card.Root
      asChild={props.asChild}
      bg='bg.subtle'
      size='sm'
      variant='subtle'
    >
      {props.children}
    </Card.Root>
  );
}
