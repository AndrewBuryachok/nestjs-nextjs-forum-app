import { Table } from '@chakra-ui/react';

type Props = {
  children: React.ReactNode;
};

export default function TableWrapper(props: Props) {
  return (
    <Table.Root interactive size='sm'>
      {props.children}
    </Table.Root>
  );
}
