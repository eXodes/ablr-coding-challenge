import { Layout } from "@/components/shared/Layout";
import { Container } from "@/components/shared/Container";
import { CurrencyProvider } from "@/context/currency";

function App() {
    return (
        <CurrencyProvider>
            <Layout>
                <Container>
                    <></>
                </Container>
            </Layout>
        </CurrencyProvider>
    );
}

export default App;
