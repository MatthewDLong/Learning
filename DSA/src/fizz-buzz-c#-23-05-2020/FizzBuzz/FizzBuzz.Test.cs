using System;
using Xunit;

namespace FizzBuzz
{
    public class FizzBuzzHandlerTests
    {
        [Theory]
        [InlineData(1,"1")]
        [InlineData(2,"2")]
        public void HandlesStandardNumbers(int value, string expected)
        {
            FizzBuzzHandler sut = new FizzBuzzHandler();

            string result = sut.Handle(value);

            Assert.Equal(expected, result);
        }

        [Theory]
        [InlineData(3,"Fizz")]
        [InlineData(6,"Fizz")]
        [InlineData(9,"Fizz")]
        public void HandlesMultiplesOfThree(int value, string expected)
        {
            FizzBuzzHandler sut = new FizzBuzzHandler();

            string result = sut.Handle(value);

            Assert.Equal(expected, result);
        }

        [Theory]
        [InlineData(5,"Buzz")]
        [InlineData(10,"Buzz")]
        [InlineData(20,"Buzz")]
        public void HandlesMultiplesOfFive(int value, string expected)
        {
            FizzBuzzHandler sut = new FizzBuzzHandler();

            string result = sut.Handle(value);

            Assert.Equal(expected, result);
        }

        [Theory]
        [InlineData(15,"FizzBuzz")]
        [InlineData(30,"FizzBuzz")]
        [InlineData(60,"FizzBuzz")]
        public void HandlesMultiplesOfFiveAndThree(int value, string expected)
        {
            FizzBuzzHandler sut = new FizzBuzzHandler();

            string result = sut.Handle(value);

            Assert.Equal(expected, result);
        }
    }
}
