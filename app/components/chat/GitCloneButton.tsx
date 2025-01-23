import type { Message } from 'ai';
import ignore from 'ignore';
import { useState } from 'react';
import { GitCloneDialog } from '~/components/git/GitCloneDialog';
import WithTooltip from '~/components/ui/Tooltip';
import { IGNORE_PATTERNS } from '~/constants/ignorePatterns';
import { useGit } from '~/lib/hooks/useGit';

const ig = ignore().add(IGNORE_PATTERNS);
const generateId = () => Math.random().toString(36).substring(2, 15);

interface GitCloneButtonProps {
  className?: string;
  importChat?: (description: string, messages: Message[]) => Promise<void>;
}

export default function GitCloneButton({ importChat }: GitCloneButtonProps) {
  const { ready, gitClone } = useGit();
  const [showDialog, setShowDialog] = useState(false);

  const handleClone = async (repoUrl: string) => {
    if (!ready) {
      return;
    }

    const { workdir, data } = await gitClone(repoUrl);

    if (importChat) {
      const filePaths = Object.keys(data).filter((filePath) => !ig.ignores(filePath));
      console.log(filePaths);

      const textDecoder = new TextDecoder('utf-8');
      const message: Message = {
        role: 'assistant',
        content: `Cloning the repo ${repoUrl} into ${workdir}
<boltArtifact id="imported-files" title="Git Cloned Files" type="bundled" >           
        ${filePaths
          .map((filePath) => {
            const { data: content, encoding } = data[filePath];

            if (encoding === 'utf8') {
              return `<boltAction type="file" filePath="${filePath}">
${content}
</boltAction>`;
            } else if (content instanceof Uint8Array) {
              return `<boltAction type="file" filePath="${filePath}">
${textDecoder.decode(content)}
</boltAction>`;
            } else {
              return '';
            }
          })
          .join('\n')}
</boltArtifact>`,
        id: generateId(),
        createdAt: new Date(),
      };
      console.log(JSON.stringify(message));

      importChat(`Git Project:${repoUrl.split('/').slice(-1)[0]}`, [message]);
    }
  };

  return (
    <>
      <WithTooltip tooltip="Clone A Git Repo">
        <button
          onClick={() => setShowDialog(true)}
          title="Clone A Git Repo"
          className="px-4 py-2 rounded-lg border border-bolt-elements-borderColor bg-bolt-elements-prompt-background text-bolt-elements-textPrimary hover:bg-bolt-elements-background-depth-3 transition-all flex items-center gap-2"
        >
          <span className="i-ph:git-branch" />
          Clone A Git Repo
        </button>
      </WithTooltip>

      <GitCloneDialog isOpen={showDialog} onClose={() => setShowDialog(false)} onClone={handleClone} />
    </>
  );
}
