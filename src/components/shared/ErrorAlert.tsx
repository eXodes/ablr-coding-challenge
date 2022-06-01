import { FC, ReactNode } from "react";
import { XCircleIcon } from "@heroicons/react/solid";
import { classNames } from "@/utils";

interface ErrorAlertProps {
    children: ReactNode;
    title?: string;
}

export const ErrorAlert: FC<ErrorAlertProps> = ({ title, children }) => {
    return (
        <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
                <div className="flex-shrink-0">
                    <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                    {title && <h3 className="text-sm font-medium text-red-800">{title}</h3>}

                    <div className={classNames("text-sm text-red-700", title && "mt-2")}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};
