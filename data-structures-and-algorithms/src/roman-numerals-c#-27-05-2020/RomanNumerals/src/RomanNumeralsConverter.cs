namespace RomanNumerals
{
    using System;
    using System.Collections;
    using System.Collections.Specialized;

    public class RomanNumeralsConverter
    {

        private OrderedDictionary _lookup = new OrderedDictionary(){
            { "M", 1000 }, { "CM", 900 }, { "D", 500 }, { "CD", 400 }, { "C", 100 }, { "XC", 90 }, { "L", 50 }, { "XL", 40 }, { "X", 10 }, { "IX", 9 }, { "V", 5 }, { "IV", 4}, { "I", 1 }
        };
        private string _romanNumeral = "";
        public string Convert(int arabicNumber)
        {
            if (arabicNumber < 1)
            {
                throw new ArgumentOutOfRangeException("arabicNumber must be greater than 0");
            }
            else if (arabicNumber > 3999)
            {
                throw new ArgumentOutOfRangeException("arabicNumber must be < 3999");
            }

            foreach (DictionaryEntry entry in _lookup)
            {
                while (arabicNumber >= (int)entry.Value)
                {
                    _romanNumeral += entry.Key;
                    arabicNumber -= (int)entry.Value;
                }
            }
            return _romanNumeral;
        }
    }
}