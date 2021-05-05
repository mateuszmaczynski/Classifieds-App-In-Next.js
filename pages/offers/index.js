import { useState, useEffect } from 'react';
import BaseLayout from 'components/BaseLayout';
import OfferItem from 'components/OfferItem';
import Link from 'next/link';
import paginateOffers from 'services/offers/paginate';
import { jsonFetcher } from 'utils';
import { useRouter } from 'next/router';

export const getStaticProps = async () => {
  const offers = await paginateOffers();

  return {
    props: {
      offset: offers.offset,
      offers: offers.records.map((offer) => offer.fields)
    }
  };
};

export default function Home({ offers, offset }) {
  const { query } = useRouter();
  const [currentOffers, setOffers] = useState(offers);
  const [currentOffset, setOffset] = useState(offset);

  const loadMore = async () => {
    const response = await jsonFetcher(`/api/offers/paginate?offset=${currentOffset}`);
    setOffset(response.offset);
    setOffers([...currentOffers, ...response.offers]);
  };

  const handleFilters = async () => {
    let filters = '';
    if (query.category) {
      filters += `?category=${query.category}`;
    }
    const response = await jsonFetcher(`/api/offers/paginate${filters}`);
    setOffset(response.offset);
    setOffers([...response.offers]);
  };

  useEffect(() => {
    handleFilters();
  }, [query]);

  return (
    <BaseLayout>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex justify-end w-full mb-4">
            <Link href="/offers">
              <div className="mx-1">
                <button className={query.category ? 'btn-secondary' : 'btn-primary'}>All</button>
              </div>
            </Link>
            <Link href="?category=sale">
              <div className="mx-1">
                <button className={query.category === 'sale' ? 'btn-primary' : 'btn-secondary'}>
                  For sale
                </button>
              </div>
            </Link>
            <Link href="?category=rent">
              <button className={query.category === 'rent' ? 'btn-primary' : 'btn-secondary'}>
                For rent
              </button>
            </Link>
          </div>
          <div className="flex flex-wrap -m-4">
            {currentOffers.map((offer) => (
              <OfferItem key={offer.id} offer={offer} />
            ))}
            {currentOffset && (
              <button
                className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                onClick={loadMore}>
                Load more
              </button>
            )}
          </div>
        </div>
      </section>
    </BaseLayout>
  );
}
