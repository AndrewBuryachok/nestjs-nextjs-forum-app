import { useTranslations } from 'next-intl';
import { DataList, Table } from '@chakra-ui/react';
import { Data } from '@/types/data';
import TableWrapper from './table-wrapper';

type Props<T> = {
  data: T[];
  columns: { value: string; render: (value: T) => React.ReactNode }[];
};

export default function TableData<T extends Data>(props: Props<T>) {
  const t = useTranslations();

  return (
    <TableWrapper>
      <Table.Header hideBelow='md'>
        <Table.Row>
          {props.columns.map((column) => (
            <Table.ColumnHeader key={column.value}>
              {t(`columns.${column.value}`)}
            </Table.ColumnHeader>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body hideBelow='md'>
        {props.data.map((value) => (
          <Table.Row key={value.id}>
            {props.columns.map((column) => (
              <Table.Cell key={column.value}>{column.render(value)}</Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
      <Table.Body hideFrom='md'>
        {props.data.map((value) => (
          <Table.Row key={value.id}>
            <Table.Cell>
              <DataList.Root orientation='horizontal'>
                {props.columns.map((column) => (
                  <DataList.Item key={column.value}>
                    <DataList.ItemLabel>
                      {t(`columns.${column.value}`)}
                    </DataList.ItemLabel>
                    <DataList.ItemValue>
                      {column.render(value)}
                    </DataList.ItemValue>
                  </DataList.Item>
                ))}
              </DataList.Root>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </TableWrapper>
  );
}
