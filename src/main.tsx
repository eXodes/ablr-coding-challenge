import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "flag-icons";
import "./index.css";

import App from "@/App";
import { Products } from "@/routes/Products";
import { Product } from "@/routes/Product";
import { Order } from "@/routes/Order";
import { NotFound } from "@/routes/NotFound";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<Products />} />
                    <Route path="products/:id" element={<Product />} />
                    <Route path="order" element={<Order />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);
