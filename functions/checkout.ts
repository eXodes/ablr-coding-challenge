import { Handler } from "@netlify/functions";
import fetch, { Response } from "node-fetch";
import { formattedResponse } from "@/libs/utils";
import { ApiResponse, CheckoutData } from "@/libs/types";

const { BASE_URL, ABLR_API_URL, SG_STORE_ID, MY_STORE_ID, SG_SECRET_KEY, MY_SECRET_KEY } =
    process.env;

const handler: Handler = async (event) => {
    if (event.httpMethod !== "POST") {
        return formattedResponse(405, {
            message: "Method not allowed.",
        });
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
            return formattedResponse(400, {
                message: "Invalid currency.",
            });
    }

    if (!BASE_URL || !ABLR_API_URL || !storeId || !secretKey) {
        return formattedResponse(400, {
            message: "Missing required environment variables.",
        });
    }

    if (!event.body) {
        return formattedResponse(400, {
            message: "Missing required body.",
        });
    }

    const body = JSON.parse(event.body) as { amount: string };

    const checkoutUrl = `${ABLR_API_URL}/public/merchant/checkout/`;
    const redirectUrl = `${event.headers.referer as string}?currency=${currency}`;

    try {
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

        const { data, message } = (await response.json()) as ApiResponse<CheckoutData>;

        if (!response.ok) {
            return formattedResponse(500, {
                message: message ?? response.statusText,
            });
        }

        return formattedResponse(200, {
            checkout_url: data.checkout_url,
        });
    } catch (error) {
        return formattedResponse(422, error);
    }
};

export { handler };
