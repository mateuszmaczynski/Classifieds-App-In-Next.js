import getOfferById from 'services/offers/get';
import isAuthorized from './isAuthorized';

const getAuthorized = async (id, session) => {
  const offer = await getOfferById(id);

  if (!isAuthorized(offer, session)) return null;

  return offer;
};

export default getAuthorized;
