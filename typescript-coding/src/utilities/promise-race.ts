function promiseRace<T>(promises: T[]): Promise<Awaited<T>> {
  return new Promise((resolve, reject) => {
    promises.forEach((promise) => {
      Promise.resolve(promise)
        .then((value) => resolve(value))
        .catch(reject);
    });
  });
}

// const p1 = Promise.resolve(3);
// const p2 = 42;
const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("foo");
  }, 500);
});
const p4 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("bar");
  }, 100);
});

async function main() {
  try {
    const result = await promiseRace([p3, p4]);
    console.log(result);
  } catch (err) {
    console.log(err); // 'An error occurred!'
  }
}

main();
