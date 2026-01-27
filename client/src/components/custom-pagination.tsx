'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ButtonGroup, IconButton, Pagination } from '@chakra-ui/react';
import { PAGE_SIZE } from '@/constants/pagination';

type Props = {
  page: number;
  total: number;
};

export default function CustomPagination(props: Props) {
  const pathname = usePathname();

  return (
    <Pagination.Root count={props.total} page={props.page} pageSize={PAGE_SIZE}>
      <ButtonGroup size='xs' variant={{ base: 'ghost', _selected: 'subtle' }}>
        <Pagination.Items
          render={(page) => (
            <IconButton asChild>
              <Link href={page.value === 1 ? pathname : `?page=${page.value}`}>
                {page.value}
              </Link>
            </IconButton>
          )}
        />
      </ButtonGroup>
    </Pagination.Root>
  );
}
