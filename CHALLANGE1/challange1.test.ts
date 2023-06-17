import memoise from "./challange1";

describe("memoise", () => {
  let consoleOutput: string[] = [];

  beforeEach(() => {
    consoleOutput = [];
    jest.spyOn(console, "log").mockImplementation((message) => {
      consoleOutput.push(message);
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("should memoize the function and return cached result", () => {
    const memoisedFunction = memoise((x: number, y: number) => {
      console.log("Call the memoised function");
      return x + y;
    });

    const result1 = memoisedFunction(1, 1);
    const result2 = memoisedFunction(1, 1);
    const result3 = memoisedFunction(2, 2);

    expect(result1).toEqual(2);
    expect(result2).toEqual(2);
    expect(result3).toEqual(4);
    expect(consoleOutput).toEqual([
      "Call the memoised function",
      "Return cached result - no need to call memoised function",
      "Call the memoised function",
    ]);
  });

  test("should clear the cache when clearCache is called", () => {
    const memoisedFunction = memoise((x: number, y: number) => {
      console.log("Call the memoised function");
      return x + y;
    });

    const result1 = memoisedFunction(2, 3);
    memoisedFunction.clearCache();
    const result2 = memoisedFunction(2, 3);

    expect(result1).toEqual(5);
    expect(result2).toEqual(5);
    expect(consoleOutput).toEqual([
      "Call the memoised function",
      "Clear cache",
      "Call the memoised function",
    ]);
  });
});
