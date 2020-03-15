import * as async from 'async';

type Noop = () => void;
type Func = (arg0?: Noop) => void;

// eslint-disable-next-line
const noop = () => {};

const func1: Func = (cb = noop) => {
  setTimeout(() => {
    console.log('FIRST');

    cb();
  }, 1000);
};

const func2: Func = (cb = noop) => {
  setTimeout(() => {
    console.log('SECOND');

    cb();
  }, 500);
};

const func3: Func = (cb = noop) => {
  setTimeout(() => {
    console.log('LAST');

    cb();
  }, 100);
};

async.series([func1, func2, func3]);

// func1(() => {
//   func2(() => {
//     func3();
//   });
// });
