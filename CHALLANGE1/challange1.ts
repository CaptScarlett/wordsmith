const memoise = <T extends (...args: any[]) => any>(
  func: T
): ((...args: Parameters<T>) => ReturnType<T>) & { clearCache: () => void } => {
  const cache = new Map<string, ReturnType<T>>();

  const memoisedFunc = (...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args);

    //check if the key is in the cache (eg been ran before), if it is return the cached value
    if (cache.has(key)) {
      console.log("Return cached result - no need to call memoised function");
      const cachedValue = cache.get(key);
      if (cachedValue !== undefined) {
        return cachedValue;
      }
    }

    //run the memorised function and store the result in the cache
    const result = func(...args);
    cache.set(key, result);

    return result;
  };

  //clear the cache
  memoisedFunc.clearCache = () => {
    console.log("Clear cache");
    cache.clear();
  };

  return memoisedFunc;
};

export default memoise;
