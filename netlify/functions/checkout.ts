import { Handler } from "@netlify/functions";
import fetch, { Response } from "node-fetch";
import { CheckoutData } from "@/types";

const { BASE_URL, ABLR_API_URL, SG_STORE_ID, MY_STORE_ID, SG_SECRET_KEY, MY_SECRET_KEY } =
    process.env;

type ApiResponse = {
    success: true;
    data: CheckoutData;
    message: null;
    errors: null;
};

const handler: Handler = async (event) => {
    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            body: JSON.stringify({
                message: "Method not allowed.",
            }),
        };
    }

    const currency = event.queryStringParameters?.currency;
    let storeId: string | undefined;
    let secretKey: string | undefined;

    switch (currency) {
        case "SGD":
            storeId = SG_STORE_ID;
            secretKey = SG_SECRET_KEY;
            break;
        case "MYR":
            storeId = MY_STORE_ID;
            secretKey = MY_SECRET_KEY;
            break;
        default:
            return {
                statusCode: 400,
                body: JSON.stringify({
                    error: "Invalid currency.",
                }),
            };
    }

    if (!BASE_URL || !ABLR_API_URL || !storeId || !secretKey) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                error: "Missing required environment variables.",
            }),
        };
    }

    const checkoutUrl = `${ABLR_API_URL}/public/merchant/checkout/`;
    const redirectUrl = `${BASE_URL}/order`;

    if (!event.body) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                error: "Missing required body.",
            }),
        };
    }

    const body = JSON.parse(event.body) as { amount: string };

    try {
        console.log({ storeId, secretKey, url: checkoutUrl, body });
        const response: Response = await fetch(checkoutUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${secretKey}`,
            },
            body: JSON.stringify({
                store_id: storeId,
                amount: body.amount,
                redirect_url: redirectUrl,
            }),
        });

        if (!response.ok) {
            return {
                statusCode: 500,
                body: JSON.stringify({
                    error: "Error while processing request.",
                }),
            };
        }

        const { data } = (await response.json()) as ApiResponse;

        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (error) {
        return {
            statusCode: 422,
            body: JSON.stringify(error),
        };
    }
};

export { handler };
