function promiseAny<T>(promises: Array<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    const errors: string[] = [];
    let rejectedCount = 0;

    if (promises.length === 0) {
      reject(new AggregateError([], "There are no promises"));
      return;
    }

    promises.forEach((promise, index) => {
      Promise.resolve(promise).then(
        (value) => resolve(value),
        (error) => {
          errors[index] = error;
          rejectedCount++;

          if (rejectedCount === promises.length) {
            reject(new AggregateError(errors));
          }
        },
      );
    });
  });
}

// -------------------------------------------------------------

/*

const p0 = Promise.resolve(42);
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(21);
  }, 100);
});

*/

// -------------------------------------------------------------

/*

const p0 = new Promise((resolve) => {
  setTimeout(() => {
    resolve(42);
  }, 100);
});
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("Err!");
  }, 400);
});

*/

// -------------------------------------------------------------

const p0 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(42);
  }, 400);
});
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("Err!");
  }, 100);
});

async function main() {
  // const result = await promiseAny([p0, p1]);
  // console.log(result);

  try {
    await Promise.any([p0, p1]);
  } catch (err) {
    if (err instanceof AggregateError) {
      console.log(err instanceof AggregateError);
      console.log(err.errors);
    }
  }
}

main();
