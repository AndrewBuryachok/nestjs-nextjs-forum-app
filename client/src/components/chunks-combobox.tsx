import { TownChunk } from '@/features/towns/types';
import NumberCombobox from './number-combobox';
import ChunkIcon from './chunk-icon';
import ChunkIconWithText from './chunk-icon-with-text';

type Props = {
  data?: TownChunk[];
  loading?: boolean;
  placeholder: string;
  value: number;
  setValue: (value: number) => void;
};

export default function ChunksCombobox(props: Props) {
  return (
    <NumberCombobox
      data={props.data}
      loading={props.loading}
      empty='chunks'
      placeholder={props.placeholder}
      start={() => <ChunkIcon />}
      value={props.value}
      setValue={props.setValue}
      itemToLabel={(chunk) => `${chunk.x} ${chunk.y}`}
      itemToValue={(chunk) => chunk.id}
      render={(chunk) => <ChunkIconWithText chunk={chunk} />}
    />
  );
}
