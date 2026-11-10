'use client';

import { useState } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

type Props = {
  children: React.ReactNode;
};

export default function CustomZoomPanPinch(props: Props) {
  const [active, setActive] = useState(false);

  return (
    <TransformWrapper
      centerOnInit
      initialScale={4}
      maxScale={32}
      onPanningStart={() => setActive(true)}
      onPanningStop={() => setActive(false)}
    >
      <TransformComponent
        wrapperStyle={{
          cursor: active ? 'grabbing' : 'grab',
          height: '100dvh',
          width: '100dvw',
        }}
      >
        {props.children}
      </TransformComponent>
    </TransformWrapper>
  );
}
