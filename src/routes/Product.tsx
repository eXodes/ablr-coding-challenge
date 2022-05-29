import { FC } from "react";

import { Container } from "@/components/shared/Container";
import { ProductDetails } from "@/components/feature/ProductDetails";

export const Product: FC = () => {
    return (
        <Container>
            <h1 className="mb-4 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                Product Details
            </h1>

            <ProductDetails />
        </Container>
    );
};
