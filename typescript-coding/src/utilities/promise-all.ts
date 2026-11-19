function promiseAll<T>(promises: T[]): Promise<Awaited<T>[]> {
  return new Promise((resolve, reject) => {
    const results: Awaited<T>[] = [];
    let count = 0;

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((value) => {
          results[index] = value;
          count++;

          if (count === promises.length) {
            resolve(results);
          }
        })
        .catch(reject);
    });
  });
}

/*

const p1 = Promise.resolve(3);
const p2 = 42;
const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("foo");
  }, 100);
});

*/

const p1 = Promise.resolve(30);
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("An error occurred!");
  }, 100);
});

async function main() {
  // const result = await promiseAll([p1, p2, p3]);
  // console.log(result);

  try {
    await promiseAll([p1, p2]);
  } catch (err) {
    console.log(err); // 'An error occurred!'
  }
}

main();
