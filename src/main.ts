import 'dotenv/config'
import createAnkiCard from './createAnkiCard'
import getAnkiCard from './getAnkiCard'
import { getReviews } from './getReviews'
import { Review } from './Review'

var skippedCount = 0;
var addedCount = 0;

const main = async () => {
    let reviews = await getReviews()

    for (const review of reviews) {
        await buildAnkiCardFromReview(review)
    }

    console.log(`${addedCount} total cards added, ${skippedCount} skipped`)
}

const buildAnkiCardFromReview = async (review: Review) => {
    if (await getAnkiCard(review.id)) {
        console.log(`[${review.dutch}] Card already exists, skipping.`)
        skippedCount++
        return
    }

    createAnkiCard(review)
    addedCount++
}

main()

