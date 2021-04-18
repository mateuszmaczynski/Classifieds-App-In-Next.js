import db from 'services/airtableClient';

const get = async(id) => {
  const offers = await db('offers')
    .select({ filterByFormula: `id="${id}"`})
    .firstPage();

  if(offers && offers[0]){
    return offers[0].fields;
  }
};

export default get;
