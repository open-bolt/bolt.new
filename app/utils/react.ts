import type { ComponentProps, ComponentType } from 'react';
import { memo } from 'react';

export const genericMemo: <T extends ComponentType<any>>(
  Component: T,
  propsAreEqual?: (prevProps: ComponentProps<T>, nextProps: ComponentProps<T>) => boolean,
) => T = memo;
