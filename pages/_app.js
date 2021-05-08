import Head from 'next/head';
import 'styles/globals.css';
import { Provider } from 'next-auth/client';

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Head>
        <title>{pageProps.metaTitle ?? 'Classifieds APP - Rent and sale your boat'}</title>
        <meta
          name="description"
          content="Search for all types of boat rentals near you, including sailing boats, motorboats"
        />
      </Head>
      <Component {...pageProps} />;
    </Provider>
  );
}

export default MyApp;
