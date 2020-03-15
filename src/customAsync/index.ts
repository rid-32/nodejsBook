const asyncFunc = (callback: () => void): void => {
  setTimeout(callback, 0);
};
//
// const asyncFunc1 = (callback: () => void): void => {
//   setImmediate(callback);
// };
//
// asyncFunc1(() => {
//   console.log('SET_IMMEDIATE');
// });
//
// asyncFunc(() => {
//   console.log('SET_TIMEOUT');
// });
//
// const prom = new Promise(res => {
//   console.log('PROMISE');
//   res();
// });
//
// prom.then(() => {
//   console.log('THEN');
// });
//
// console.log('PLAIN');

let color = 'blue';

(color => {
  asyncFunc(() => {
    console.log({ color });
  });
})(color);

color = 'green';
