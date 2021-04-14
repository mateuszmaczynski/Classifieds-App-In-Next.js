import db from 'services/airtableClient';

const create = async (payload) => {
  const offer = await db('offers').create([
    {
      fields: {
        ...payload,
        price: Number(payload.price),
        status: 'inactive'
      }
    }
  ]);

  return offer;
}

export default create;