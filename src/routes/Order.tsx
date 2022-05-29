import { FC } from "react";
import { useSearchParams } from "react-router-dom";

import { Container } from "@/components/shared/Container";
import { OrderDetails } from "@/components/feature/OrderDetails";

export const Order: FC = () => {
    const [searchParams] = useSearchParams();

    const amount = searchParams.get("amount");
    const orderCode = searchParams.get("order_code");
    const orderState = searchParams.get("order_state");

    return (
        <Container>
            <h1 className="mb-4 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                Order Details
            </h1>

            <div className="mt-2 border-b border-gray-200 pb-5 text-sm sm:flex sm:justify-between">
                <dl className="flex">
                    <dt className="text-gray-500">Order number</dt>
                    <dd className="ml-1 font-medium text-gray-900">{orderCode}</dd>
                </dl>
            </div>

            <OrderDetails status={orderState} amount={amount} />
        </Container>
    );
};
