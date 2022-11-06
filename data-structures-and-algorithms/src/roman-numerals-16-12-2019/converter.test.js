var converter = require('./converter');

describe('Integer to Roman Numeral converter', () => {
    it('Converts 1 -> I', () => {
        expect(converter(1)).toEqual("I");
    });

    it('Converts 2 -> II', () => {
        expect(converter(2)).toEqual("II");        
    });

    it('Converts 3 -> III', () => {
        expect(converter(3)).toEqual("III");        
    });

    it('Converts 4 -> IV', () => {
        expect(converter(4)).toEqual("IV");        
    });

    it('Converts 5 -> V', () => {
        expect(converter(5)).toEqual("V");        
    });

    it('Converts 9 -> IX', () => {
        expect(converter(9)).toEqual("IX");        
    });

    it('Converts 10 -> X', () => {
        expect(converter(10)).toEqual("X");        
    });

    it('Converts 20 -> XX', () => {
        expect(converter(20)).toEqual("XX");        
    });

    it('Converts 30 -> XXX', () => {
        expect(converter(30)).toEqual("XXX");        
    });

    it('Converts 40 -> XL', () => {
        expect(converter(40)).toEqual("XL");        
    });

    it('Converts 50 -> L', () => {
        expect(converter(50)).toEqual("L");        
    });

    it('Converts 90 -> XC', () => {
        expect(converter(90)).toEqual("XC");        
    });

    it('Converts 100 -> C', () => {
        expect(converter(100)).toEqual("C");        
    });

    it('Converts 500 -> D', () => {
        expect(converter(500)).toEqual("D");        
    });

    it('Converts 900 -> CM', () => {
        expect(converter(900)).toEqual("CM");        
    });

    it('Converts 3999 -> MMMCMXCIX', () => {
        expect(converter(3999)).toEqual("MMMCMXCIX");        
    });
});
