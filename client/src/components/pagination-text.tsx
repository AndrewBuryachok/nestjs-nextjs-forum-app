import { Text } from '@chakra-ui/react';

type Props = {
  page: number;
  take: number;
  total: number;
};

export default function PaginationText(props: Props) {
  const from = (props.page - 1) * props.take + 1;
  const to = Math.min(props.page * props.take, props.total);
  const text = `${from} - ${to} / ${props.total}`;

  return (
    <Text fontSize='xs' textAlign='center'>
      {text}
    </Text>
  );
}
