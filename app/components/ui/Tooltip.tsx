import * as RadixTooltip from '@radix-ui/react-tooltip';
import { memo } from 'react';

interface WithTooltipProps {
  tooltip: string;
  children: React.ReactNode;
}

export default memo(({ tooltip, children }: WithTooltipProps) => {
  return (
    <RadixTooltip.Provider>
      <RadixTooltip.Root>
        <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            className="bg-bolt-elements-background-depth-2 text-bolt-elements-textPrimary px-3 py-2 rounded-md text-sm shadow-md"
            sideOffset={5}
          >
            {tooltip}
            <RadixTooltip.Arrow className="fill-bolt-elements-background-depth-2" />
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
});
