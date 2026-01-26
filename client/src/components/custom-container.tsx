import { Container } from '@chakra-ui/react';

type Props = {
  children: React.ReactNode;
};

export default function CustomContainer(props: Props) {
  return (
    <Container maxW='5xl' p='4'>
      {props.children}
    </Container>
  );
}
