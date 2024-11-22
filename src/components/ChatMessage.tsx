import React from 'react';
import { marked } from 'marked';
import type { ChatMessage } from '../types/chat';

interface ChatMessageProps {
  message: ChatMessage;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const renderStructuredContent = () => {
    if (!message.structured) return null;

    const { type, content } = message.structured;

    switch (type) {
      case 'practice_question':
        return (
          <div className="space-y-4">
            {content.title && <h4 className="font-semibold">{content.title}</h4>}
            {content.question && (
              <div className="space-y-3">
                <p>{content.question.text}</p>
                {content.question.options && (
                  <div className="space-y-2">
                    {content.question.options.map((option, idx) => (
                      <div key={idx} className="pl-4">{option}</div>
                    ))}
                  </div>
                )}
                {content.question.answer && (
                  <div className="mt-2 pt-2 border-t border-gray-600">
                    <p className="font-semibold">Answer: {content.question.answer}</p>
                    {content.question.explanation && (
                      <p className="mt-1 text-gray-300">{content.question.explanation}</p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        );

      default:
        return (
          <div className="space-y-3">
            {content.title && <h4 className="font-semibold">{content.title}</h4>}
            {content.details && <p>{content.details}</p>}
            {content.points && content.points.length > 0 && (
              <ul className="list-disc pl-4 space-y-1">
                {content.points.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            )}
          </div>
        );
    }
  };

  return (
    <div
      className={`${
        message.sender === 'user' ? 'ml-auto bg-purple-600' : 'mr-auto bg-gray-700'
      } max-w-[80%] rounded-lg p-3`}
    >
      {message.structured ? (
        renderStructuredContent()
      ) : (
        <div
          dangerouslySetInnerHTML={{
            __html: marked(message.text, { breaks: true })
          }}
        />
      )}
    </div>
  );
};

export default ChatMessage;