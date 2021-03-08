import { startOfMinute, subHours } from 'date-fns';
import { gql, useQuery } from '@apollo/client';
import PriceHistoryChart from './PriceHistoryChart';
import { useState, useEffect } from 'react';

const PRICE_HISTORY = gql`
  query PriceHistory(
    $token: String!
    $interval: Float! # integer expected
    $from: Float!
    $to: Float!
  ) {
    asset(token: $token) {
      prices {
        price
        oraclePrice
        history(interval: $interval, from: $from, to: $to) {
          timestamp
          price
        }
        oracleHistory(interval: $interval, from: $from, to: $to) {
          timestamp
          price
        }
      }
    }
  }
`;

function useCurrentDate(interval) {
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    const updateDate = () => {
      setDate(new Date());
    };
    setInterval(updateDate, interval);
    return () => {
      clearInterval(updateDate);
    };
  }, [interval]);
  return date;
}

export default function PriceHistory({ token }) {
  const nowDate = useCurrentDate(1000);
  const now = startOfMinute(nowDate);

  const [data, setData] = useState(null);
  const { error } = useQuery(PRICE_HISTORY, {
    variables: {
      token,
      interval: 1,
      from: subHours(now, 1).getTime(),
      to: now.getTime(),
    },
    onCompleted: setData,
  });
  const { price, oraclePrice, history, oracleHistory } =
    data?.asset?.prices ?? {};

  if (error) {
    return <div>Error</div>;
  }
  return (
    <div>
      <div>Oracle Price: {oraclePrice ? `${oraclePrice} UST` : null}</div>
      <div>Terraswap Price: {price ? `${price} UST` : null}</div>
      {history && oracleHistory ? (
        <PriceHistoryChart history={history} oracleHistory={oracleHistory} />
      ) : (
        <div>Loading chart...</div>
      )}
    </div>
  );
}
