import { PAGE_TABS_MAP } from '@/config/navigation';
import { Landmark } from '../types';
import CustomTable from '@/components/custom-table';
import CustomAvatarWithUser from '@/components/custom-avatar-with-user';
import CustomText from '@/components/custom-text';
import DateText from '@/components/date-text';
import LandmarksActions from './landmarks-actions';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.landmarks;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function LandmarksTable(props: Props) {
  return (
    <CustomTable<Landmark>
      page='landmarks'
      tab={props.tab}
      searchParams={props.searchParams}
      columns={[
        {
          value: 'responsible',
          render: (landmark) => <CustomAvatarWithUser user={landmark.user} />,
        },
        {
          value: 'landmark',
          render: (landmark) => <CustomText value={landmark.name} />,
        },
        {
          value: 'x',
          render: (landmark) => <CustomText value={`${landmark.x}`} />,
        },
        {
          value: 'y',
          render: (landmark) => <CustomText value={`${landmark.y}`} />,
        },
        {
          value: 'created',
          render: (landmark) => <DateText value={landmark.createdAt} />,
        },
        {
          value: 'actions',
          render: (landmark) => (
            <LandmarksActions tab={props.tab} landmark={landmark} />
          ),
        },
      ]}
    />
  );
}
