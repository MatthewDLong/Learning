namespace RomanNumerals
{
    using System;
    using System.Collections.Generic;
    public class RomanNumeralsConverter
    {
        private List<KeyValuePair<string, int>> _lookup;
        private string _romanNumeral;

        public RomanNumeralsConverter()
        {
            _romanNumeral = "";
            _lookup = new List<KeyValuePair<string, int>>(){
                new KeyValuePair<string, int>("M", 1000),
                new KeyValuePair<string, int>("CM", 900),
                new KeyValuePair<string, int>("D", 500),
                new KeyValuePair<string, int>("CD", 400),
                new KeyValuePair<string, int>("C", 100),
                new KeyValuePair<string, int>("XC", 90),
                new KeyValuePair<string, int>("L", 50),
                new KeyValuePair<string, int>("XL", 40),
                new KeyValuePair<string, int>("X", 10),
                new KeyValuePair<string, int>("IX", 9),
                new KeyValuePair<string, int>("IV", 4),
                new KeyValuePair<string, int>("I", 1)
            };
        }
        public string Convert(int arabicNumber)
        {
            if (arabicNumber < 1 || arabicNumber > 3999)
            {
                throw new ArgumentOutOfRangeException("arabicNumber must be between 0 - 3999");
            }
            foreach (KeyValuePair<string, int> entry in _lookup)
            {
                while (arabicNumber >= entry.Value)
                {
                    _romanNumeral += entry.Key;
                    arabicNumber -= entry.Value;
                }
            }
            return _romanNumeral;
        }
    }
}