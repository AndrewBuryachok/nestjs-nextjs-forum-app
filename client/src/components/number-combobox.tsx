import { Skeleton } from '@chakra-ui/react';
import CustomCombobox from './custom-combobox';

type Props<T> = {
  data?: T[];
  loading?: boolean;
  empty: string;
  placeholder: string;
  start?: (value: T) => React.ReactNode;
  value: number;
  setValue: (value: number) => void;
  itemToLabel: (value: T) => string;
  itemToValue: (value: T) => number;
  render: (value: T) => React.ReactNode;
};

export default function NumberCombobox<T>(props: Props<T>) {
  if (props.loading) {
    return <Skeleton h='10' w='full' />;
  }

  return (
    <CustomCombobox
      data={props.data ?? []}
      empty={props.empty}
      placeholder={props.placeholder}
      start={props.start}
      value={props.value ? String(props.value) : ''}
      setValue={(value) => props.setValue(value ? Number(value) : 0)}
      itemToLabel={props.itemToLabel}
      itemToValue={(value) => String(props.itemToValue(value))}
      render={props.render}
    />
  );
}
