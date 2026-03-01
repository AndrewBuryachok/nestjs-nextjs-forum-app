import { getTranslations } from 'next-intl/server';
import { DataList, Table } from '@chakra-ui/react';
import { PAGE_TABS_MAP } from '@/config/navigation';
import { Data } from '@/types/data';
import { requestSchema } from '@/types/request';
import { get } from '@/lib/api';
import TableWrapper from './table-wrapper';
import PaginationText from './pagination-text';
import CustomEmptyState from './custom-empty-state';
import CustomPagination from './custom-pagination';

type Props<T> = {
  page: keyof typeof PAGE_TABS_MAP;
  tab: string;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  columns: { value: string; render: (value: T) => React.ReactNode }[];
};

export default async function CustomTable<T extends Data>(props: Props<T>) {
  const t = await getTranslations();

  const route = `/${props.page}/${props.tab}`.replace('/main', '');

  const searchParams = await props.searchParams;

  const req = requestSchema.parse(searchParams);

  const res = await get<T>(route, req);

  return (
    <>
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
          {res.data.map((value) => (
            <Table.Row key={value.id}>
              {props.columns.map((column) => (
                <Table.Cell key={column.value}>
                  {column.render(value)}
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
        <Table.Body hideFrom='md'>
          {res.data.map((value) => (
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
        <Table.Caption>
          {res.data.length ? (
            <PaginationText page={req.page} total={res.total} />
          ) : (
            <CustomEmptyState page={props.page} />
          )}
        </Table.Caption>
      </TableWrapper>
      <CustomPagination page={req.page} total={res.total} />
    </>
  );
}
