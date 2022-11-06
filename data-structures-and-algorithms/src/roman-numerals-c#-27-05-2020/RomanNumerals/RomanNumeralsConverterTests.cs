using System;
using Xunit;

namespace RomanNumerals
{
    public class RomanNumeralsConverterTests
    {
        [Theory]
        [InlineData("I", 1)]
        [InlineData("II", 2)]
        [InlineData("III", 3)]
        [InlineData("IV", 4)]
        [InlineData("V", 5)]
        [InlineData("IX", 9)]
        [InlineData("X", 10)]
        [InlineData("XL", 40)]
        [InlineData("L", 50)]
        [InlineData("XC", 90)]
        [InlineData("C", 100)]
        [InlineData("CD", 400)]
        [InlineData("D", 500)]
        [InlineData("CM", 900)]
        [InlineData("M", 1000)]
        [InlineData("MMMCMXCIX", 3999)]
        public void ReturnsCorrectRomanNumeral(string expectedRomanNumeral, int arabicNumber)
        {
            RomanNumeralsConverter converter = new RomanNumeralsConverter();

            string romanNumeral = converter.Convert(arabicNumber);

            Assert.Equal(expectedRomanNumeral, romanNumeral);
        }

        [Fact]
        public void ThrowsExceptionIfArabicNumberIsGreaterThan3999()
        {
            RomanNumeralsConverter converter = new RomanNumeralsConverter();

            Assert.Throws<ArgumentOutOfRangeException>(() =>
            {
                converter.Convert(4000);
            });
        }

        [Fact]
        public void ThrowsExceptionIfArabicNumberIsLessThan1()
        {
            RomanNumeralsConverter converter = new RomanNumeralsConverter();

            Assert.Throws<ArgumentOutOfRangeException>(() =>
            {
                converter.Convert(0);
            });
        }
    }
}
