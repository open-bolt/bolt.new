import * as Dialog from '@radix-ui/react-dialog';
import type { ChangeEvent, KeyboardEvent, MouseEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import { type ChatHistoryItem } from '~/lib/persistence';

interface HistoryItemProps {
  item: ChatHistoryItem;
  onDelete?: (event: MouseEvent) => void;
  onRename?: (id: string, newDescription: string) => void;
  onExport?: (item: ChatHistoryItem) => void;
}

export function HistoryItem({ item, onDelete, onRename, onExport }: HistoryItemProps) {
  const [hovering, setHovering] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(item.description || '');
  const hoverRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | undefined;

    function mouseEnter() {
      setHovering(true);

      if (timeout) {
        clearTimeout(timeout);
      }
    }

    function mouseLeave() {
      setHovering(false);
    }

    hoverRef.current?.addEventListener('mouseenter', mouseEnter);
    hoverRef.current?.addEventListener('mouseleave', mouseLeave);

    return () => {
      hoverRef.current?.removeEventListener('mouseenter', mouseEnter);
      hoverRef.current?.removeEventListener('mouseleave', mouseLeave);
    };
  }, []);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleRename = () => {
    if (editedDescription.trim() && onRename) {
      onRename(item.id, editedDescription.trim());
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleRename();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setEditedDescription(item.description || '');
    }
  };

  return (
    <div
      ref={hoverRef}
      className="group rounded-md text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary hover:bg-bolt-elements-background-depth-3 overflow-hidden flex justify-between items-center px-2 py-1"
    >
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={editedDescription}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEditedDescription(e.target.value)}
          onBlur={handleRename}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent border border-bolt-elements-borderColor rounded px-2 py-1 text-bolt-elements-textPrimary focus:outline-none focus:border-bolt-elements-borderColorFocus"
        />
      ) : (
        <a href={`/chat/${item.urlId}`} className="flex w-full relative truncate block">
          {item.description}
          <div className="absolute right-0 z-1 top-0 bottom-0 bg-gradient-to-l from-bolt-elements-background-depth-2 group-hover:from-bolt-elements-background-depth-3 to-transparent w-10 flex justify-end group-hover:w-24 group-hover:from-45%">
            {hovering && (
              <div className="flex items-center gap-2 p-1">
                <button
                  className="i-ph:pencil-simple scale-110 text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary"
                  onClick={(event: MouseEvent) => {
                    event.preventDefault();
                    setIsEditing(true);
                  }}
                />
                <button
                  className="i-ph:export scale-110 text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary"
                  onClick={(event: MouseEvent) => {
                    event.preventDefault();
                    onExport?.(item);
                  }}
                />
                <Dialog.Trigger asChild>
                  <button
                    className="i-ph:trash scale-110 text-bolt-elements-textSecondary hover:text-bolt-elements-item-contentDanger"
                    onClick={(event: MouseEvent) => {
                      event.preventDefault();
                      onDelete?.(event);
                    }}
                  />
                </Dialog.Trigger>
              </div>
            )}
          </div>
        </a>
      )}
    </div>
  );
}
