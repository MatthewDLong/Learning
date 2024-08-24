import { leapYear } from '../leap-year';

describe('leapYear', () => {
    it('Returns true for atypical leap year: 2000', () => {
        expect(leapYear(2000)).toEqual(true);
    });

    it('Returns true for typical leap year: 1996', () => {
        expect(leapYear(1996)).toEqual(true);
    });

    it('Returns false for atypical common year: 1900', () => {
        expect(leapYear(1900)).toEqual(false);
    });

    it('Returns false for typical common year: 2001', () => {
        expect(leapYear(2001)).toEqual(false);
    });
});