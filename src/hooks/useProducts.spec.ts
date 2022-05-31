import { act, renderHook } from "@testing-library/react-hooks";
import { useProducts } from "@/hooks/useProducts";

describe("useProducts", () => {
    it("should load products", () => {
        const { result } = renderHook(() => useProducts());
        const [products] = result.current;

        expect(Array.isArray(products)).toBe(true);
    });

    it("should return a product with selected id", () => {
        const { result } = renderHook(() => useProducts());
        const [, { getById }] = result.current;

        const product = getById(1);

        expect(product).toEqual(expect.objectContaining({ id: 1 }));
    });

    it("should add a new product", () => {
        const { result } = renderHook(() => useProducts());

        act(() => {
            const newProduct = {
                id: 7,
                name: "Test product",
                description: "A newly added test product for testing purposes.",
                color: "Black",
                imageSrc: "https://images.unsplash.com/photo-1555375771-14b2a63968a9",
                imageAlt: "Test product in black with wooden handle",
                price: 100,
            };

            result.current[1].add(newProduct);
        });

        expect(result.current[0].length).toEqual(7);
    });

    it("should remove a product", () => {
        const { result } = renderHook(() => useProducts());

        act(() => {
            result.current[1].remove(1);
        });

        expect(result.current[0].length).toEqual(5);
    });
});
