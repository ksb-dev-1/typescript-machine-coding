function deepOmit(val: unknown, keys: Array<string>): unknown {
  function omit(value: unknown): unknown {
    if (Array.isArray(value)) {
      return value.map((item) => omit(item));
    }

    if (value === null || typeof value !== "object") {
      return value;
    }

    const result: Record<string, unknown> = {};

    for (const [key, nestedValue] of Object.entries(value)) {
      if (keys.includes(key)) {
        continue;
      }
      result[key] = omit(nestedValue);
    }
    return result;
  }
  return omit(val);
}

const obj = {
  a: 1,
  b: 2,
  c: {
    d: 3,
    e: 4,
  },
  f: [
    5,
    6,
    {
      g: 7,
      h: 8,
    },
    {
      i: 9,
      j: 10,
    },
  ],
};
console.log(deepOmit(obj, ["b", "e", "h"]));

/*

{
  a: 1,
  c: {
    d: 3,
  },
  f: [
    5,
    6,
    {
      g: 7,
    },
    {
      i: 9,
      j: 10,
    },
  ],
}

*/
