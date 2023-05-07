import axios from 'axios';
import { Review } from './Review';
import { format } from 'util'

type AnkiClientResponse = {
  result: string
  error: string
};

export async function createAnkiCard(review: Review) {
  try {
    const response = await axios.post('http://127.0.0.1:8765', {
      action: 'addNote',
      version: 6,
      params: {
        note: {
          deckName: 'My German',
          modelName: 'Dutch',
          fields: {
            'Dutch': review.dutch,
            "English": review.english,
            id: review.id
          },
          options: {
            allowDuplicate: false
          },
          tags: [
            'dutch'
          ],
          audio: [{
            url: format(process.env.AUDIO_URL, review.soundId),
            filename: "dutch_audio_" + review.id,
            fields: [
                'Dutch_Audio'
            ]
          }],
          picture: [{
            url: format(process.env.IMAGE_URL, review.imageId),
            filename: "dutch_image_" + review.id,
            fields: [
                'Image'
            ]
          }],
        },
      },
    });
    const ankiResponse = response.data as AnkiClientResponse;
    if (ankiResponse.error) throw new Error(ankiResponse.error);

    console.log(`[${review.dutch}] Card added successfully.`)
  } catch (error) {
    console.error(error);
  }
}

export default createAnkiCard;
