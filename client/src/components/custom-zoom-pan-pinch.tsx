'use client';

import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

type Props = {
  children: React.ReactNode;
};

export default function CustomZoomPanPinch(props: Props) {
  return (
    <TransformWrapper>
      <TransformComponent>{props.children}</TransformComponent>
    </TransformWrapper>
  );
}
