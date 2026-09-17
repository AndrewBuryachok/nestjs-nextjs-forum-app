'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { IconButton, Menu, Portal } from '@chakra-ui/react';
import { LuArrowUpDown, LuCheck, LuDot } from 'react-icons/lu';
import { PAGE_TABS_MAP } from '@/config/navigation';
import { Sort } from '@/constants/sorts';

export default function SortButton() {
  const t = useTranslations();

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = pathname.split('/')[1] as keyof typeof PAGE_TABS_MAP;

  if (page !== 'plots' && page !== 'products' && page !== 'orders') {
    return null;
  }

  const createHref = (sort?: Sort) => {
    const params = new URLSearchParams(searchParams);
    params.delete('page');
    if (!sort) {
      params.delete('sort');
    } else {
      params.set('sort', sort);
    }
    const query = params.toString();
    return query ? `${pathname}?${query}` : pathname;
  };

  return (
    <Menu.Root positioning={{ placement: 'bottom-end' }}>
      <Menu.Trigger asChild focusRing='none'>
        <IconButton>
          <LuArrowUpDown />
        </IconButton>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.Item asChild value='default'>
              <Link href={createHref()}>
                {!searchParams.get('sort') ? <LuCheck /> : <LuDot />}
                {t('sorts.default')}
              </Link>
            </Menu.Item>
            {Object.values(Sort).map((sort) => (
              <Menu.Item key={sort} asChild value={sort}>
                <Link href={createHref(sort)}>
                  {searchParams.get('sort') === sort ? <LuCheck /> : <LuDot />}
                  {t(`sorts.${sort}`)}
                </Link>
              </Menu.Item>
            ))}
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
}
