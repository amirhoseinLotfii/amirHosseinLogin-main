import React from "react";

function TextForForm({children}: {children: string}) {
  return (
    <div className="flex px-4 w-2/5 items-center mt-4">
      <div className="border-b border-gray-300 w-full"></div>
      <span className="text-[10px] text-gray-400 w-96 mx-2">
        {children}
      </span>
      <div className="border-b border-gray-300 w-full"></div>
    </div>
  );
}

export default TextForForm;
