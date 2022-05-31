import { useEffect, useState } from "react";

export interface ProductData {
    id: number;
    name: string;
    description: string;
    color: string;
    imageSrc: string;
    imageAlt: string;
    price: number;
}

const productsData: ProductData[] = [
    {
        id: 1,
        name: "Leica M3",
        description:
            "The LEICA M3 is a brilliantly simple jewel of mechanical and optical perfection and is an entirely mechanical rangefinder camera which uses interchangeable lenses and whose viewfinder selects framelines automatically as any lens is attached.",
        color: "Silver",
        imageSrc: "https://images.unsplash.com/photo-1610811132115-b86887c118fd",
        imageAlt: "Leica M3 in silver",
        price: 3123,
    },
    {
        id: 2,
        name: "RayBan Aviator",
        description:
            "Currently one of the most iconic sunglass models in the world, Ray-Ban Aviator Classic sunglasses were originally designed for U.S. aviators in 1937. Aviator Classic sunglasses are a timeless model that combines great aviator styling with exceptional quality, performance and comfort.",
        color: "Black",
        imageSrc: "https://images.unsplash.com/photo-1572635196237-14b3f281503f",
        imageAlt: "RayBan Aviator in black",
        price: 247.99,
    },
    {
        id: 3,
        name: "Xbox One X Controller",
        description:
            "The Xbox One X Controller is a revolutionary controller for Xbox One. It features a new wireless controller, a new touch screen, and a new way to play games.",
        color: "White and black",
        imageSrc: "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08",
        imageAlt: "Xbox One X Controller in white and black",
        price: 209,
    },
    {
        id: 4,
        name: "Airpods",
        description:
            "The AirPods are a pair of headphones that deliver on-ear listening experience.",
        color: "White",
        imageSrc: "https://images.unsplash.com/photo-1504274066651-8d31a536b11a",
        imageAlt: "Airpods in white",
        price: 169,
    },
    {
        id: 5,
        name: "Rolleiflex",
        description:
            "Rolleiflex, twin-lens reflex roll-film camera introduced by the German firm Franke & Heidecke in 1928. It had two lenses of identical focal length—one transmitting the image to the film and the other functioning as a viewfinder and part of the focusing mechanism.",
        color: "Black",
        imageSrc: "https://images.unsplash.com/photo-1495121553079-4c61bcce1894",
        imageAlt: "Rolleiflex in black",
        price: 329,
    },
    {
        id: 6,
        name: "Cooking pan",
        description:
            "A frying pan, frypan, or skillet is a flat-bottomed pan used for frying, searing, and browning foods. It is typically 20 to 30 cm (8 to 12 in) in diameter with relatively low sides that flare outwards, a long handle, and no lid. Larger pans may have a small grab handle opposite the main handle.",
        color: "Black",
        imageSrc: "https://images.unsplash.com/photo-1592156328697-079f6ee0cfa5",
        imageAlt: "Cooking pan in black with wooden handle",
        price: 45,
    },
];

interface ProductMethods {
    add: (product: ProductData) => void;
    getById: (id: number) => ProductData | undefined;
    remove: (id: number) => void;
}

export const useProducts = (): [ProductData[], ProductMethods] => {
    const [products, setProducts] = useState<ProductData[]>([]);

    const getProductById = (id: number) => {
        return products.find((product) => product.id === id);
    };

    const addProduct = (product: ProductData) => {
        setProducts([...products, product]);
    };

    const removeProduct = (id: number) => {
        const newProducts = products.filter((product) => product.id !== id);
        setProducts(newProducts);
    };

    useEffect(() => {
        // Can be replaced with api call
        setProducts(productsData);
    }, []);

    return [products, { add: addProduct, remove: removeProduct, getById: getProductById }];
};
