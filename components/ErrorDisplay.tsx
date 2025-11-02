import React, { useState } from 'react';
import { I18n } from '../i18n/strings';

interface ErrorDisplayProps {
  errorKey: string | null;
  t: I18n;
  actionText?: string;
  onAction?: () => void;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ errorKey, t, actionText, onAction }) => {
  const [isCopied, setIsCopied] = useState(false);

  if (!errorKey) {
    return null;
  }

  let title = t.errorTitleDefault;
  let message = errorKey;
  let iconPath = 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'; // Warning Triangle

  if (errorKey in t.errors) {
    message = t.errors[errorKey as keyof typeof t.errors];
  } else if (errorKey.startsWith('api.reason|')) {
    const reason = errorKey.split('|')[1];
    message = t.errors['api.reason'].replace('{reason}', reason);
  } else if (errorKey.startsWith('api.gemini|')) {
    const error = errorKey.split('|')[1];
    message = t.errors['api.gemini'].replace('{error}', error);
  }

  if (errorKey.includes('api.network')) {
    title = t.errorTitleNetwork;
  } else if (errorKey.includes('safety')) {
    title = t.errorTitleContentPolicy;
    iconPath = 'M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636'; // Ban icon
  } else if (errorKey.includes('api.noImageProcess')) {
    title = t.errorTitleImageProcessing;
    iconPath = 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'; // Image icon
  } else if (errorKey.includes('api.gemini')) {
    title = t.errorTitleAIService;
  } else if (errorKey === t.uploadImageFirst || errorKey === t.selectOneOption) {
    title = t.errorTitleMissingInfo;
    message = errorKey;
    iconPath = 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'; // Info circle
  } else if (errorKey === 'file.invalidDataUrl') {
    title = t.errorTitleInvalidFile;
    iconPath = 'M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z'; // File icon
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(message).then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    });
  };

  return (
    <div className="mt-6 p-4 bg-red-900/20 border border-red-700/30 text-red-200 rounded-lg flex items-start gap-4" role="alert">
      <div className="flex-shrink-0 pt-1">
         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPath} />
         </svg>
      </div>
      <div>
        <p className="font-semibold text-red-300">{title}</p>
        <p className="text-sm">{message}</p>
        <div className="mt-3 flex items-center gap-4">
          {actionText && onAction && (
            <button
              onClick={onAction}
              className="text-sm font-semibold bg-red-400/20 text-red-200 px-3 py-1.5 rounded-md hover:bg-red-400/40 transition-colors focus:outline-none focus:ring-2 focus:ring-red-300"
            >
              {actionText}
            </button>
          )}
           <button
            onClick={handleCopy}
            className="text-sm font-semibold bg-gray-500/20 text-gray-300 px-3 py-1.5 rounded-md hover:bg-gray-500/40 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            {isCopied ? t.errorCopied : t.copyError}
          </button>
        </div>
      </div>
    </div>
  );
};