import arabicToRoman from "./challenge2";

describe("arabicToRoman", () => {
  it("should convert Arabic numbers to Roman numerals", () => {
    expect(arabicToRoman(1)).toBe("I");
    expect(arabicToRoman(4)).toBe("IV");
    expect(arabicToRoman(9)).toBe("IX");
    expect(arabicToRoman(10)).toBe("X");
    expect(arabicToRoman(40)).toBe("XL");
    expect(arabicToRoman(50)).toBe("L");
    expect(arabicToRoman(90)).toBe("XC");
    expect(arabicToRoman(100)).toBe("C");
    expect(arabicToRoman(400)).toBe("CD");
    expect(arabicToRoman(500)).toBe("D");
    expect(arabicToRoman(900)).toBe("CM");
    expect(arabicToRoman(1000)).toBe("M");
    expect(arabicToRoman(3999)).toBe("MMMCMXCIX");
  });

  it("should convert Eastern Arabic numbers to Roman numerals", () => {
    expect(arabicToRoman("١")).toBe("I");
    expect(arabicToRoman("٤")).toBe("IV");
    expect(arabicToRoman("٩")).toBe("IX");
    expect(arabicToRoman("١٠")).toBe("X");
    expect(arabicToRoman("٤٠")).toBe("XL");
    expect(arabicToRoman("٥٠")).toBe("L");
    expect(arabicToRoman("٩٠")).toBe("XC");
    expect(arabicToRoman("١٠٠")).toBe("C");
    expect(arabicToRoman("٤٠٠")).toBe("CD");
    expect(arabicToRoman("٥٠٠")).toBe("D");
    expect(arabicToRoman("٩٠٠")).toBe("CM");
    expect(arabicToRoman("١٠٠٠")).toBe("M");
    expect(arabicToRoman("٣٩٩٩")).toBe("MMMCMXCIX");
  });

  it("should throw an error for invalid input", () => {
    expect(() => arabicToRoman(0)).toThrow(
      "Please use a positive whole number"
    );
    expect(() => arabicToRoman(-10)).toThrow(
      "Please use a positive whole number"
    );
    expect(() => arabicToRoman("abc")).toThrow("Invalid Arabic number: abc");
  });
});
