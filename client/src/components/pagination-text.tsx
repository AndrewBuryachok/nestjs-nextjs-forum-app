import { PAGE_SIZE } from '@/constants/pagination';

type Props = {
  page: number;
  total: number;
};

export default function PaginationText(props: Props) {
  const from = (props.page - 1) * PAGE_SIZE + 1;
  const to = Math.min(props.page * PAGE_SIZE, props.total);

  return `${from} - ${to} / ${props.total}`;
}
