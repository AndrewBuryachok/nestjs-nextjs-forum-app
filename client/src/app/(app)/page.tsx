import Link from 'next/link';
import { useTranslations } from 'next-intl';
import {
  Button,
  ButtonGroup,
  Clipboard,
  Heading,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';

export default function Page() {
  const t = useTranslations();

  return (
    <SimpleGrid
      columns={{ base: 1, md: 2 }}
      gap={{ base: '8', md: '12' }}
      alignItems='center'
    >
      <Stack
        order={{ base: 2, md: 1 }}
        gap={{ base: '4', md: '6' }}
        textAlign={{ base: 'center', md: 'left' }}
      >
        <Heading size={{ base: '2xl', md: '3xl', lg: '4xl' }} fontWeight='bold'>
          {t('home.title')}
        </Heading>
        <Text fontSize={{ base: 'md', md: 'lg' }} color='fg.muted'>
          {t('home.description')}
        </Text>
        <ButtonGroup
          gap='4'
          justifyContent={{ base: 'center', md: 'flex-start' }}
          size={{ base: 'lg', md: 'xl' }}
        >
          <Button asChild>
            <Link href={process.env.NEXT_PUBLIC_HOME_URL!} target='_blank'>
              {t('home.button')}
            </Link>
          </Button>
          <Clipboard.Root value={process.env.NEXT_PUBLIC_HOME_IP!}>
            <Clipboard.Trigger asChild>
              <Button variant='outline'>
                <Clipboard.Indicator />
                <Clipboard.ValueText />
              </Button>
            </Clipboard.Trigger>
          </Clipboard.Root>
        </ButtonGroup>
      </Stack>
      <Image
        order={{ base: 1, md: 2 }}
        w='full'
        maxW={{ base: 'sm', md: 'full' }}
        mx='auto'
        aspectRatio={1 / 1}
        objectFit='cover'
        loading='eager'
        src={process.env.NEXT_PUBLIC_HOME_IMAGE!}
        alt=''
      />
    </SimpleGrid>
  );
}
