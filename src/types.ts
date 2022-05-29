export type CheckoutData = {
    id: string;
    checkout_url: string;
    store_id: string;
    amount: string;
    merchant_reference_id: string;
    redirect_url: string;
    source: string;
    expires_at: string | null;
    created_at: string;
    updated_at: string;
};
