type Result = {
  status: "fulfilled" | "rejected";
  value?: unknown;
  reason?: unknown;
};

function promiseAllSettled<T>(promises: T[]): Promise<Result[]> {
  return new Promise((resolve) => {
    const results: Result[] = [];
    let completed = 0;

    if (promises.length === 0) {
      resolve(results);
      return;
    }

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((value) => {
          results[index] = {
            status: "fulfilled",
            value,
          };
        })
        .catch((err) => {
          results[index] = {
            status: "rejected",
            reason: err,
          };
        })
        .finally(() => {
          completed++;

          if (completed === promises.length) {
            resolve(results);
          }
        });
    });
  });
}

promiseAllSettled([
  new Promise((resolve) => setTimeout(() => resolve("A"), 1000)),
  new Promise((_, reject) => setTimeout(() => reject("B"), 400)),
  new Promise((resolve) => setTimeout(() => resolve("C"), 500)),
])
  .then(console.log)
  .catch(console.log);
