import { Layout } from "@/components/shared/Layout";
import { Container } from "@/components/shared/Container";
import { ProductList } from "@/components/feature/ProductList";

function App() {
    return (
        <Layout>
            <Container>
                <h1 className="mb-4 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                    Products
                </h1>

                <ProductList />
            </Container>
        </Layout>
    );
}

export default App;
