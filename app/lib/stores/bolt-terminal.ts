import type { WebContainer, WebContainerProcess } from '@webcontainer/api';
import { atom, type WritableAtom } from 'nanostores';
import type { ITerminal } from '~/types/terminal';
import { newShellProcess } from '~/utils/shell';
import { coloredText } from '~/utils/terminal';

export class BoltTerminalStore {
  #webcontainer: Promise<WebContainer>;
  #terminal: { terminal: ITerminal; process: WebContainerProcess } | null = null;
  showBoltTerminal: WritableAtom<boolean> = atom(false);

  constructor(webcontainerPromise: Promise<WebContainer>) {
    this.#webcontainer = webcontainerPromise;

    if (import.meta.hot) {
      import.meta.hot.data.showBoltTerminal = this.showBoltTerminal;
    }
  }

  toggleBoltTerminal(value?: boolean) {
    this.showBoltTerminal.set(value !== undefined ? value : !this.showBoltTerminal.get());
  }

  async attachTerminal(terminal: ITerminal) {
    try {
      const shellProcess = await newShellProcess(await this.#webcontainer, terminal);
      this.#terminal = { terminal, process: shellProcess };
    } catch (error: any) {
      terminal.write(coloredText.red('Failed to spawn shell\n\n') + error.message);
      return;
    }
  }

  onTerminalResize(cols: number, rows: number) {
    if (this.#terminal) {
      this.#terminal.process.resize({ cols, rows });
    }
  }

  writeToTerminal(data: string) {
    if (this.#terminal) {
      this.#terminal.terminal.write(data);
    }
  }
}
