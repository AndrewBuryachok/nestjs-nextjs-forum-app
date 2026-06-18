'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { ButtonGroup, IconButton, Pagination } from '@chakra-ui/react';
import { PAGE_SIZE } from '@/constants/pagination';

type Props = {
  page: number;
  total: number;
};

export default function CustomPagination(props: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createHref = (page: number) => {
    const params = new URLSearchParams(searchParams);
    if (page === 1) {
      params.delete('page');
    } else {
      params.set('page', String(page));
    }
    const query = params.toString();
    return query ? `${pathname}?${query}` : pathname;
  };

  return (
    <Pagination.Root count={props.total} page={props.page} pageSize={PAGE_SIZE}>
      <ButtonGroup size='xs' variant={{ base: 'ghost', _selected: 'subtle' }}>
        <Pagination.Items
          render={(page) => (
            <IconButton asChild>
              <Link href={createHref(page.value)}>{page.value}</Link>
            </IconButton>
          )}
        />
      </ButtonGroup>
    </Pagination.Root>
  );
}
