import { Markdown } from './Markdown';
import { modificationsRegex } from '~/utils/diff';

interface MessageContent {
  type: string;
  text?: string;
  image?: string;
}

interface UserMessageProps {
  content: string | MessageContent[];
}

export function UserMessage({ content }: UserMessageProps) {
  return (
    <div className="overflow-hidden pt-[4px]">
      {Array.isArray(content) ? (
        <div className="flex flex-col gap-4">
          {content.map((item, index) => {
            if (item.type === 'text') {
              return (
                <Markdown key={index} limitedMarkdown>
                  {sanitizeUserMessage(item.text || '')}
                </Markdown>
              );
            } else if (item.type === 'image') {
              return (
                <div key={index} className="max-w-[300px]">
                  <img src={item.image} alt="User uploaded" className="rounded-lg" />
                </div>
              );
            }

            return null;
          })}
        </div>
      ) : (
        <Markdown limitedMarkdown>{sanitizeUserMessage(content)}</Markdown>
      )}
    </div>
  );
}

function sanitizeUserMessage(content: string) {
  return content.replace(modificationsRegex, '').trim();
}
