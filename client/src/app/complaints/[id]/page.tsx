import { notFound } from 'next/navigation';
import { Box, Container, Flex } from '@chakra-ui/react';
import { generateComplaintMetadata } from '@/features/complaints/metadata';
import { ComplaintWithMessages } from '@/features/complaints/types';
import ComplaintsHeader from '@/features/complaints/components/complaints-header';
import ComplaintsTimeline from '@/features/complaints/components/complaints-timeline';
import ComplaintsFooter from '@/features/complaints/components/complaints-footer';
import { fetch } from '@/lib/api';
import { idSchema } from '@/types/id';

type Props = {
  params: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(props: Props) {
  const params = await props.params;
  return generateComplaintMetadata(String(params.id));
}

export default async function Page(props: Props) {
  const params = await props.params;
  const result = idSchema.safeParse(params);
  if (!result.success) {
    notFound();
  }
  const id = result.data.id;
  const complaint = await fetch<ComplaintWithMessages>(`/complaints/${id}`);
  if (!complaint) {
    notFound();
  }
  return (
    <Box as='main'>
      <Container maxW='xl'>
        <Flex direction='column' h='100dvh'>
          <Box flexShrink='0' py='4'>
            <ComplaintsHeader complaint={complaint} />
          </Box>
          <Box flex='1' overflowY='auto'>
            <ComplaintsTimeline complaint={complaint} />
          </Box>
          <Box flexShrink='0' py='4'>
            <ComplaintsFooter complaint={complaint} />
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}
