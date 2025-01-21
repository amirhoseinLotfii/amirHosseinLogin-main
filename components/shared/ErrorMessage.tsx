import React from 'react';
import type { FieldError } from 'react-hook-form';


function ErrorMessage({forInput}: {forInput: FieldError | undefined}) {
  return (
    <p className="w-2/5 flex justify-start mt-1 mb-1">
      {forInput && (
        <span className="text-red-500 text-[10px]" dir="rtl">
          {forInput.message}
        </span>
      )}
    </p>
  );
}

export default ErrorMessage;
