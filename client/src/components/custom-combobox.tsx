'use client';

import { useTranslations } from 'next-intl';
import {
  Combobox,
  InputGroup,
  useFilter,
  useListCollection,
} from '@chakra-ui/react';
import CustomText from './custom-text';

type Props<T> = {
  data: T[];
  empty: string;
  placeholder: string;
  start?: (value: T) => React.ReactNode;
  value: string;
  setValue: (value: string) => void;
  itemToLabel: (value: T) => string;
  itemToValue: (value: T) => string;
  render: (value: T) => React.ReactNode;
};

export default function CustomCombobox<T>(props: Props<T>) {
  const t = useTranslations();

  const { contains } = useFilter({ sensitivity: 'base' });

  const { collection, filter } = useListCollection<T>({
    initialItems: props.data,
    itemToString: props.itemToLabel,
    itemToValue: props.itemToValue,
    filter: contains,
    limit: 20,
  });

  const value = props.data.find((v) => props.itemToValue(v) === props.value);

  return (
    <Combobox.Root
      openOnClick
      collection={collection}
      onInputValueChange={(e) => filter(e.inputValue)}
      value={props.value === '' ? [] : [props.value]}
      onValueChange={(e) => props.setValue(e.value.length ? e.value[0] : '')}
    >
      <Combobox.Control>
        <InputGroup startAddon={props.start && value && props.start(value)}>
          <Combobox.Input placeholder={props.placeholder} />
        </InputGroup>
        <Combobox.IndicatorGroup>
          <Combobox.ClearTrigger />
          <Combobox.Trigger />
        </Combobox.IndicatorGroup>
      </Combobox.Control>
      <Combobox.Positioner>
        <Combobox.Content>
          <Combobox.Empty>
            <CustomText value={t(`emptyStates.${props.empty}.title`)} />
            <CustomText
              muted
              value={t(`emptyStates.${props.empty}.description`)}
            />
          </Combobox.Empty>
          {collection.items.map((item) => (
            <Combobox.Item key={props.itemToValue(item)} item={item}>
              {props.render(item)}
              <Combobox.ItemIndicator />
            </Combobox.Item>
          ))}
        </Combobox.Content>
      </Combobox.Positioner>
    </Combobox.Root>
  );
}
