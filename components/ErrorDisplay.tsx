import React from 'react';

interface ErrorDisplayProps {
  error: string | null;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error }) => {
  if (!error) {
    return null;
  }

  let title = 'Oops! Something went wrong.';
  let message = error;
  let iconPath = 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'; // Warning Triangle

  const lowerCaseError = error.toLowerCase();

  if (lowerCaseError.includes('network error')) {
    title = 'Network Connection Error';
    message = 'We couldn\'t connect to the AI service. Please check your internet and try again.';
  } else if (lowerCaseError.includes('safety policies')) {
    title = 'Content Policy Issue';
    // Use the specific message from the error, don't override it
    iconPath = 'M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636'; // Ban icon
  } else if (lowerCaseError.includes('unable to process the uploaded image')) {
    title = 'Image Processing Error';
    message = 'The AI model had trouble with the uploaded image. Please try using a different image, or re-save your current one as a standard PNG or JPG file.';
    iconPath = 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'; // Image icon
  } else if (lowerCaseError.includes('gemini api error')) {
    title = 'AI Service Error';
    // Display the specific error from the service by removing the prefix.
    message = error.replace(/gemini api error: /i, '');
  } else if (lowerCaseError.includes('upload an image and select at least one edit')) {
    title = 'Missing Information';
    message = 'Please make sure you have uploaded an image and selected at least one style option.';
    iconPath = 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'; // Info circle
  } else if (lowerCaseError.includes('invalid file type')) {
    title = 'Invalid File Type';
    message = 'The selected file is not a supported image. Please upload a PNG, JPG, or other common image format.';
    iconPath = 'M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z'; // File icon
  }


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
      </div>
    </div>
  );
};
