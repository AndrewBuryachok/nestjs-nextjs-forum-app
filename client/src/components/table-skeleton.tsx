import { DataList, SkeletonText, Table } from '@chakra-ui/react';
import TableWrapper from './table-wrapper';

export default function TableSkeleton() {
  const rows = 10;
  const columns = 7;

  return (
    <TableWrapper>
      <Table.Header hideBelow='md'>
        <Table.Row>
          {Array.from({ length: columns }).map((_, i) => (
            <Table.ColumnHeader key={i}>
              <SkeletonText noOfLines={1} />
            </Table.ColumnHeader>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body hideBelow='md'>
        {Array.from({ length: rows }).map((_, i) => (
          <Table.Row key={i}>
            {Array.from({ length: columns }).map((_, j) => (
              <Table.Cell key={j}>
                <SkeletonText noOfLines={2} />
              </Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
      <Table.Body hideFrom='md'>
        {Array.from({ length: rows }).map((_, i) => (
          <Table.Row key={i}>
            <Table.Cell>
              <DataList.Root orientation='horizontal'>
                {Array.from({ length: columns }).map((_, j) => (
                  <DataList.Item key={j}>
                    <DataList.ItemLabel>
                      <SkeletonText noOfLines={1} />
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
  );
}
