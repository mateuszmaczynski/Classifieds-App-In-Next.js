import BaseLayout from 'components/BaseLayout';
import { getSession } from 'next-auth/client';
import isAuthorized from 'services/offers/isAuthorized';
import finalizeCheckout from 'services/checkout/finalize';

export const getServerSideProps = async ({ req, query }) => {
  const session = await getSession({ req });
  const { offer } = await finalizeCheckout(query.id);

  if (!isAuthorized(offer, session) || !offer) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      offer
    }
  };
};

export default function OfferEdit({ offer }) {
  return (
    <BaseLayout>
      <section className="text-gray-600 body-font relative">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Payment status: {offer.stripeCheckoutStatus}
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify.
            </p>
          </div>
        </div>
      </section>
    </BaseLayout>
  );
}
