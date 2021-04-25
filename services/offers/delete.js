import db from 'services/airtableClient';

const deleteOffer = async (airtableId) => {
  const offer = await db('offers').destroy([airtableId]);

  return offer;
};

export default deleteOffer;
