const arabicToRoman = (arabicNumber: string | number): string => {
  // Function to convert eastern arabic numbers to western arabic numbers
  const convertEasternToWestern = (easternArabicNumber: string): number => {
    const easternArabicMap: Record<string, number> = {
      "٠": 0,
      "١": 1,
      "٢": 2,
      "٣": 3,
      "٤": 4,
      "٥": 5,
      "٦": 6,
      "٧": 7,
      "٨": 8,
      "٩": 9,
    };

    let number = 0;

    //loop through the string and convert each digit to a number
    for (let i = 0; i < easternArabicNumber.length; i++) {
      const digit = easternArabicNumber[i];
      if (digit in easternArabicMap) {
        // this may be an issue as I think there are additional characters in the eastern arabic numeral system (eg 25)
        number = number * 10 + easternArabicMap[digit];
      } else {
        throw new Error(`Invalid Arabic number: ${easternArabicNumber}`);
      }
    }

    return number;
  };

  //check if the input is a string (assuming Eastern Arabic number), if so convert it to a number
  if (typeof arabicNumber === "string") {
    arabicNumber = convertEasternToWestern(arabicNumber);
  }

  //check if the input is a number, if not throw an error
  if (!Number.isInteger(arabicNumber) || arabicNumber < 1) {
    throw new Error("Please use a positive whole number");
  }

  const romanNumerals: [number, string][] = [
    [1000, "M"],
    [900, "CM"],
    [500, "D"],
    [400, "CD"],
    [100, "C"],
    [90, "XC"],
    [50, "L"],
    [40, "XL"],
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
  ];

  let result = "";
  //loop through the romanNumerals array and check if the arabicNumber is greater than or equal to the value of the current numeral
  for (const [value, numeral] of romanNumerals) {
    while (arabicNumber >= value) {
      result += numeral;
      arabicNumber -= value;
    }
  }

  return result;
};

export default arabicToRoman;
