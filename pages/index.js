import Head from 'next/head';

import PriceHistory from '../components/PriceHistory';

export default function Home() {
  const mQQQToken = 'terra1csk6tc7pdmpr782w527hwhez6gfv632tyf72cp';

  return (
    <div>
      <Head>
        <title>A</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="mx-auto p-2 max-w-4xl">
        <div>
          <div className="font-bold text-lg">mQQQ</div>
          <PriceHistory token={mQQQToken} />
        </div>
      </main>
    </div>
  );
}
