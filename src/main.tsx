import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "flag-icons";
import "./index.css";

import App from "@/App";
import { Products } from "@/routes/Products";
import { Product } from "@/routes/Product";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<Products />} />
                    <Route path="products/:id" element={<Product />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);
