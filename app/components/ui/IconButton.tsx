import type { ReactElement } from 'react';
import React from 'react';
import { memo } from 'react';
import { classNames } from '~/utils/classNames';

type IconSize = 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

interface BaseIconButtonProps {
  size?: IconSize;
  className?: string;
  iconClassName?: string;
  disabledClassName?: string;
  title?: string;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

type IconButtonWithoutChildrenProps = {
  icon: string;
  children?: undefined;
} & BaseIconButtonProps;

type IconButtonWithChildrenProps = {
  icon?: undefined;
  children: string | ReactElement | ReactElement[];
} & BaseIconButtonProps;

type IconButtonProps = IconButtonWithoutChildrenProps | IconButtonWithChildrenProps;

export const IconButton = memo(
  ({
    icon,
    size = 'xl',
    className,
    iconClassName,
    disabledClassName,
    disabled = false,
    title,
    onClick,
    children,
  }: IconButtonProps) => {
    return (
      <button
        className={classNames(
          'flex items-center justify-center p-1.5 text-bolt-elements-item-contentActive bg-bolt-elements-item-backgroundActive rounded-md hover:bg-bolt-elements-item-backgroundHover transition-colors',
          {
            [classNames('opacity-30', disabledClassName)]: disabled,
          },
          className,
        )}
        title={title}
        disabled={disabled}
        onClick={(event) => {
          if (disabled) {
            return;
          }

          onClick?.(event);
        }}
      >
        {children ? children : <div className={classNames(icon, getIconSize(size), 'scale-125', iconClassName)}></div>}
      </button>
    );
  },
);

function getIconSize(size: IconSize) {
  switch (size) {
    case 'sm': {
      return 'text-sm';
    }
    case 'md': {
      return 'text-base';
    }
    case 'lg': {
      return 'text-lg';
    }
    case 'xl': {
      return 'text-xl';
    }
    case 'xxl': {
      return 'text-2xl';
    }
    default: {
      return 'text-base';
    }
  }
}
