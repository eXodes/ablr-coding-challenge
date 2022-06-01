import { FC, ReactNode } from "react";
import { CheckCircleIcon } from "@heroicons/react/solid";
import { classNames } from "@/libs/utils";

interface SuccessAlertProps {
    children: ReactNode;
    title?: ReactNode;
}

export const SuccessAlert: FC<SuccessAlertProps> = ({ title, children }) => {
    return (
        <div className="rounded-md bg-green-50 p-4">
            <div className="flex">
                <div className="flex-shrink-0">
                    <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                    {title && <h3 className="text-sm font-medium text-green-800">{title}</h3>}

                    <div className={classNames("text-sm text-green-700", !!title && "mt-2")}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};
