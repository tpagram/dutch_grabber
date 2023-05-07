import axios from 'axios';
import { resourceLimits } from 'worker_threads';
import { Review } from './Review';

type AnkiClientResponse = {
  result: string[]
  error: string
};

export async function getAnkiCard(id: string): Promise<boolean> {
  const response = await axios.post('http://127.0.0.1:8765', {
    action: 'findNotes',
    version: 6,
    params: {
      query: `"deck:My German" note:Dutch id:${id}`
    }
  });

  const ankiResponse = response.data as AnkiClientResponse;
  if (ankiResponse.error) throw new Error(ankiResponse.error);

  return ankiResponse.result.length > 0
}

export default getAnkiCard;
