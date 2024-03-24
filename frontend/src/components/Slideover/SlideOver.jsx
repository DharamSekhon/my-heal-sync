import React from "react";

const SlideOver = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 overflow">
      <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex sm:pl-16">
        <div className="relative w-screen max-w-md">
          <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll fixed right-0 top-0 bottom-0">
            <div className="px-4 sm:px-6">
              <div className="flex items-start justify-between">
                <button
                  className="text-gray-900 rounded-md text-xl leading-6 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={onClose}
                >
                  <span className="sr-only">Close panel</span>
                  &times;
                </button>
              </div>
              <div className="mt-6">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideOver;
