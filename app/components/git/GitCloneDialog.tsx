import { useState } from 'react';
import { toast } from 'react-toastify';
import { Dialog, DialogButton, DialogDescription, DialogRoot, DialogTitle } from '~/components/ui/Dialog';

interface GitCloneDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onClone?: (repoUrl: string) => Promise<void>;
}

export function GitCloneDialog({ isOpen, onClose, onClone }: GitCloneDialogProps) {
  const [isPrivate, setIsPrivate] = useState(false);
  const [repoUrl, setRepoUrl] = useState('');
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      // if it's a private repo, construct the URL with the token
      const cloneUrl = isPrivate ? repoUrl.replace('https://', `https://${token}@`) : repoUrl;

      if (onClone) {
        await onClone(cloneUrl);
      }

      toast.success('Repository cloned successfully!');
      onClose();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to clone repository');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DialogRoot open={isOpen}>
      <Dialog onBackdrop={onClose} onClose={onClose}>
        <DialogTitle>Clone Repository</DialogTitle>
        <DialogDescription>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-4 mb-4">
              <label className="flex items-center gap-2">
                <input type="radio" checked={!isPrivate} onChange={() => setIsPrivate(false)} className="form-radio" />
                <span>Public Repository</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" checked={isPrivate} onChange={() => setIsPrivate(true)} className="form-radio" />
                <span>Private Repository</span>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Repository URL
                <input
                  type="text"
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                  className="mt-1 block w-full rounded-md bg-bolt-elements-background-depth-1 border border-bolt-elements-borderColor px-3 py-2"
                  placeholder="https://github.com/user/repo"
                  required
                />
              </label>
            </div>

            {isPrivate && (
              <div>
                <label className="block text-sm font-medium mb-1">
                  Personal Access Token
                  <input
                    type="password"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    className="mt-1 block w-full rounded-md bg-bolt-elements-background-depth-1 border border-bolt-elements-borderColor px-3 py-2"
                    placeholder="ghp_xxxxxxxxxxxx"
                    required
                  />
                </label>
              </div>
            )}

            <div className="flex justify-end gap-2 pt-4">
              <DialogButton type="secondary" onClick={onClose}>
                Cancel
              </DialogButton>
              <DialogButton type="primary" onClick={handleSubmit} disabled={isLoading}>
                {isLoading ? 'Cloning...' : 'Clone Repository'}
              </DialogButton>
            </div>
          </form>
        </DialogDescription>
      </Dialog>
    </DialogRoot>
  );
}
