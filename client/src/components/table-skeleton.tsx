import { useTranslations } from 'next-intl';
import { DataList, SkeletonText, Table } from '@chakra-ui/react';
import TableWrapper from './table-wrapper';
import PaginationSkeleton from './pagination-skeleton';
import { TABLE_PAGE_SIZE } from '@/constants/pagination';

type Props = {
  columns: string[];
};

export default function TableSkeleton(props: Props) {
  const t = useTranslations();

  return (
    <>
      <TableWrapper>
        <Table.Header hideBelow='md'>
          <Table.Row>
            {props.columns.map((column) => (
              <Table.ColumnHeader key={column}>
                {t(`columns.${column}`)}
              </Table.ColumnHeader>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body hideBelow='md'>
          {Array.from({ length: TABLE_PAGE_SIZE }).map((_, i) => (
            <Table.Row key={i}>
              {props.columns.map((column) => (
                <Table.Cell key={column}>
                  <SkeletonText noOfLines={2} />
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
        <Table.Body hideFrom='md'>
          {Array.from({ length: TABLE_PAGE_SIZE }).map((_, i) => (
            <Table.Row key={i}>
              <Table.Cell>
                <DataList.Root orientation='horizontal'>
                  {props.columns.map((column) => (
                    <DataList.Item key={column}>
                      <DataList.ItemLabel>
                        {t(`columns.${column}`)}
                      </DataList.ItemLabel>
                      <DataList.ItemValue>
                        <SkeletonText noOfLines={2} />
                      </DataList.ItemValue>
                    </DataList.Item>
                  ))}
                </DataList.Root>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </TableWrapper>
      <PaginationSkeleton />
    </>
  );
}
