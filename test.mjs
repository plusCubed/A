import { LCDClient } from '@terra-money/terra.js';
import { Mirror } from '@mirror-protocol/mirror.js';

const mirror = new Mirror();
const res = await mirror.oracle.getPrices(
  'terra1cc3enj9qgchlrj34cnzhwuclc4vl2z3jl7tkqg'
);
console.log(JSON.stringify(res));
