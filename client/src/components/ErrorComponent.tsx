import React from "react";
import { XCircleIcon } from "@heroicons/react/20/solid";

type Props = {
  message: string;
  clearError: () => void;
};

export default function ErrorComponent({ message, clearError }: Props) {
  return (
    <div className="absolute inset-x-0 my-10 flex items-center justify-center">
      <div className="rounded-md w-[20%] bg-red-100 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <XCircleIcon
              className="h-5 w-5 text-red-400"
              aria-hidden="true"
              onClick={clearError}
            />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-500">{message}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}