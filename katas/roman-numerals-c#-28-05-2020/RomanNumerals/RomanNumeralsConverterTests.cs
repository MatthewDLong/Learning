using System;
using Xunit;

namespace RomanNumerals
{
    public class RomanNumeralsConverterTests
    {
        [Theory]
        [InlineData("I", 1)]
        [InlineData("IV", 4)]
        [InlineData("IX", 9)]
        [InlineData("X", 10)]
        [InlineData("XL", 40)]
        [InlineData("XC", 90)]
        [InlineData("C", 100)]
        [InlineData("CD", 400)]
        [InlineData("D", 500)]
        [InlineData("CM", 900)]
        [InlineData("M", 1000)]
        public void ConvertsCorrectly(string expectedRomanNumeral, int arabicNumber)
        {
            RomanNumeralsConverter converter = new RomanNumeralsConverter();

            string romanNumeral = converter.Convert(arabicNumber);

            Assert.Equal(expectedRomanNumeral, romanNumeral);
        }

        [Theory]
        [InlineData(4000)]
        [InlineData(0)]
        public void ThrowsArgumentOutOfRangeException(int arabicNumber)
        {
            RomanNumeralsConverter converter = new RomanNumeralsConverter();

            Assert.Throws<ArgumentOutOfRangeException>(() =>
            {
                converter.Convert(arabicNumber);
            });
        }
    }
}
