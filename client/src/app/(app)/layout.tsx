import { Box, Stack } from '@chakra-ui/react';
import CustomHeader from '@/components/custom-header';
import CustomContainer from '@/components/custom-container';

type Props = {
  children: React.ReactNode;
};

export default function Layout(props: Props) {
  return (
    <>
      <CustomHeader />
      <Box as='main'>
        <CustomContainer>
          <Stack>{props.children}</Stack>
        </CustomContainer>
      </Box>
    </>
  );
}
