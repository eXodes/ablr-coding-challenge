import { FC, ReactNode } from "react";
import { classNames } from "@/utils";

type ContainerProps = {
    className?: string;
    children: ReactNode;
};

export const Container: FC<ContainerProps> = ({ className, children }) => {
    return (
        <div className={classNames("mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8", className)}>
            {children}
        </div>
    );
};
