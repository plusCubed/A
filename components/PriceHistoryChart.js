import { ResponsiveLine } from '@nivo/line';
import { format } from 'date-fns';

export default function PriceHistoryChart({ history, oracleHistory }) {
  const timestamps = history?.map(({ timestamp }) => parseInt(timestamp)) ?? [];
  const terraswapPrices = history?.map(({ price }) => parseFloat(price)) ?? [];
  const oraclePrices =
    oracleHistory?.map(({ price }) => parseFloat(price)) ?? [];

  const historyToXY = ({ timestamp, price }) => ({
    x: parseInt(timestamp),
    y: parseFloat(price),
  });
  const chartData = [
    { id: 'Oracle Price', data: oracleHistory?.map(historyToXY) ?? [] },
    { id: 'Terraswap Price', data: history?.map(historyToXY) ?? [] },
  ];

  const allPrices = [...terraswapPrices, ...oraclePrices];
  const minPrice = Math.min(...allPrices);
  const maxPrice = Math.max(...allPrices);
  const padPrice = (maxPrice - minPrice) * 0.1;

  const xTickCount = 10;
  const xTickValues = Array.from(Array(xTickCount).keys())
    .map((i) => timestamps[Math.floor((i * timestamps.length) / xTickCount)])
    .concat(timestamps[timestamps.length - 1]);

  return (
    <div className="w-full h-64">
      <ResponsiveLine
        data={chartData}
        enablePoints={false}
        yScale={{
          type: 'linear',
          stacked: false,
          min: minPrice - padPrice,
          max: maxPrice + padPrice,
        }}
        margin={{ top: 20, right: 20, bottom: 40, left: 40 }}
        enableSlices="x"
        enableGridX={false}
        axisBottom={{
          format: (value) => format(value, 'HH:mm'),
          tickValues: xTickValues,
        }}
      />
    </div>
  );
}
