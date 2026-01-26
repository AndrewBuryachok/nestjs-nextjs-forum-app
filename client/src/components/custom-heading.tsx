import { useTranslations } from 'next-intl';
import { Heading } from '@chakra-ui/react';

type Props = {
  page: string;
};

export default function CustomHeading(props: Props) {
  const t = useTranslations();

  return <Heading>{t(`pages.${props.page}`)}</Heading>;
}
