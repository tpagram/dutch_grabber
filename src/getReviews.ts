import { Review } from "./Review";

const fs = require('fs/promises');



type GetReviewsResponse = {
  learned_items: ReviewResponse[]
  _meta: {
    total_items: number
  }
};

type ReviewResponse = {
  id: string,
  display_language_text: string,
  learn_language_text: string,
  image: {
    id: string
  }
  sound: {
    id: string
  }
}

export async function getReviews(): Promise<Review[]> {
  const file = await fs.readFile(process.env.REVIEWS_FILE_PATH)

  const response: GetReviewsResponse = JSON.parse(file) as GetReviewsResponse

  return response.learned_items.map( item =>
    { 
      return {
        id: item.id,
        english: item.display_language_text,
        dutch: item.learn_language_text,
        imageId: item.image.id,
        soundId: item.sound.id
      } as Review
    }
  )
}