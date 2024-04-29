import { ReviewItem } from "interfaces"

export default async function updateReview(token: string, reviewId:string, reviewItem: ReviewItem) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/reviews/${reviewId}`,{
        method : "PUT",
        headers: {
            authorization : `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            stars: reviewItem.stars,
            comment : reviewItem.comment,
            title: reviewItem.title,
            service: reviewItem.service,
            food: reviewItem.food,
            convenience: reviewItem.convenience,
            facility: reviewItem.facility,
            cleanliness: reviewItem.cleanliness,
            worthiness: reviewItem.worthiness
        }),
    })

    if(!response.ok){
        console.log(response.status)
        throw new Error("Failed to edit review")
    }
    return await response.json()
}