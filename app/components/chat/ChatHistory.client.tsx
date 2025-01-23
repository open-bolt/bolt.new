import { useNavigate, useLoaderData } from '@remix-run/react';
import { useEffect, useState } from 'react';
import { IconButton } from '~/components/ui/IconButton';
import { getAll } from '~/lib/persistence/db';
import type { ChatHistoryItem } from '~/lib/persistence/useChatHistory';
import { db } from '~/lib/persistence/useChatHistory';
import { classNames } from '~/utils/classNames';
import { createScopedLogger } from '~/utils/logger';

const logger = createScopedLogger('ChatHistory');

export function ChatHistory() {
  const [history, setHistory] = useState<ChatHistoryItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { id: currentId } = useLoaderData<{ id?: string }>();

  useEffect(() => {
    if (!db) {
      return;
    }

    const loadHistory = async () => {
      try {
        const items = await getAll(db!);

        // filter items to only show history for the current chat
        const filteredItems = items
          .filter((item) => item.urlId === currentId || item.id === currentId)
          .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        setHistory(filteredItems);
      } catch (error) {
        logger.error('Failed to load chat history', error);
      }
    };

    loadHistory();
  }, [currentId]);

  const handleRestore = (item: ChatHistoryItem) => {
    navigate(`/chat/${item.id}`);
    setIsOpen(false);
  };

  if (!db || history.length === 0) {
    return null;
  }

  return (
    <div className="relative">
      <IconButton
        title="Chat History"
        onClick={() => setIsOpen(!isOpen)}
        className={classNames({
          'text-bolt-elements-item-contentAccent!': isOpen,
        })}
      >
        <div className="i-ph:clock-counter-clockwise text-xl" />
      </IconButton>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-[9998]" onClick={() => setIsOpen(false)} />
          <div className="absolute bottom-full left-0 mb-2 z-[9999] min-w-[300px] max-h-[400px] overflow-y-auto bg-bolt-elements-background-depth-2 rounded-xl shadow-2xl border border-bolt-elements-borderColor overflow-hidden">
            <div className="px-4 py-3.5 border-b border-bolt-elements-borderColor">
              <h3 className="text-sm font-medium text-bolt-elements-textPrimary">Chat History</h3>
            </div>
            <div>
              {history.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleRestore(item)}
                  className="w-full px-4 py-3.5 text-left bg-bolt-elements-background-depth-2 hover:bg-bolt-elements-item-backgroundAccent text-bolt-elements-textPrimary text-sm whitespace-nowrap transition-all duration-200 flex flex-col group"
                >
                  <span className="font-medium text-bolt-elements-textPrimary group-hover:text-bolt-elements-item-contentAccent transition-colors duration-200 truncate">
                    {item.description || `Version ${new Date(item.timestamp).toLocaleTimeString()}`}
                  </span>
                  <span className="text-xs text-bolt-elements-textSecondary group-hover:text-bolt-elements-textPrimary transition-colors duration-200">
                    {new Date(item.timestamp).toLocaleDateString()} {new Date(item.timestamp).toLocaleTimeString()}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
