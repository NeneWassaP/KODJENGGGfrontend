import { Tags } from "interfaces";

export default async function getReviews(tags: Tags, hid: string, stars?: number) {
    let query = "";
    for (const [key, value] of Object.entries(tags)) {
        if (value !== null && value !== false) {
            query += `&${key}=${value}`;
        }
    }

    if (stars !== undefined) {
        query += `&stars=${stars}`;
    }

    try {
        const response = await fetch(`${process.env.BACKEND_URL}/api/v1/reviews?hotelid=${hid}${query}`, {
            cache: 'no-store',
            method: "GET",
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(`Failed to get reviews: ${errorResponse.message}`);
        }

        return await response.json();
    } catch (error) {
        console.log("PPP") ;
        console.error(error);
        throw new Error("Failed to fetch reviews. Please try again later.");
    }
}
