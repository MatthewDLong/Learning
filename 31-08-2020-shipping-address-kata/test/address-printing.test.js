const fs = require('fs');
const {
  removeUnwantedCharacters,
  trimSpaces,
  validateCountry,
  transformCountry,
  transformCasing,
  printAddress,
  loadAddressData,
  run,
} = require('../app/address-printing');

const { extractHonorific } = require('../app/address-honorifics');

const addressPrintingTestData = require('./address-printing-test-data');
const honorificTestData = require('./honorific-test-data');
const casingTestData = require('./casing-test-data');

describe('address label printer', () => {
  describe('data cleansing', () => {
    it.each([
      ['\\n', 'linefeed', '\n'],
      ['\\r', 'carriage return', '\r'],
      ['\\t', 'horizontal tab', '\t'],
      ['\\v', 'vertical tab', '\v'],
      ['\\f', 'form-feed', '\f'],
      ['\\b', 'word-boundary', '\b'],
      ['\\0', 'NUL', '\0'],
    ])('Removes all %s (%s) characters', (_escapedCharacter, _name, character) => {
      expect(
        removeUnwantedCharacters({
          recipient: `Sa${character}m S${character}mit${character}h`,
          addressLine1: `My${character} fl${character}at n${character}ame`,
          addressLine2: `My Apartment bu${character}ilding`,
          addressLine3: `My com${character}pl${character}ex`,
          addressLine4: `My Str${character}ee${character}t`,
          locality: `My${character} ${character}Town`,
          region: `M${character}y Regi${character}on`,
          country: `UK${character}`,
          postcode: `MY1${character} 2HR`,
        })
      ).toEqual({
        recipient: 'Sam Smith',
        addressLine1: 'My flat name',
        addressLine2: 'My Apartment building',
        addressLine3: 'My complex',
        addressLine4: 'My Street',
        locality: 'My Town',
        region: 'My Region',
        country: 'UK',
        postcode: 'MY1 2HR',
      });
    });
    it('trims spaces from beginning and end of values', () => {
      const data = {
        recipient: '  Yagita Asami ',
        addressLine1: '  Higashi Azabu IS Bldg 4F  ',
        addressLine2: ' Higashi Azabu 1-8-1  ',
        addressLine3: '',
        addressLine4: '',
        locality: '  Minato-ku  ',
        region: ' Tokyo  ',
        country: 'JAPAN  ',
        postcode: '106-0044  ',
      };

      expect(trimSpaces(data)).toEqual({
        recipient: 'Yagita Asami',
        addressLine1: 'Higashi Azabu IS Bldg 4F',
        addressLine2: 'Higashi Azabu 1-8-1',
        addressLine3: '',
        addressLine4: '',
        locality: 'Minato-ku',
        region: 'Tokyo',
        country: 'JAPAN',
        postcode: '106-0044',
      });
    });
  });
  describe('data validation', () => {
    it('throws an Error when an invalid country is supplied', () => {
      const data = {
        country: 'foo',
      };

      expect(() => {
        validateCountry(data);
      }).toThrow(/Invalid country: foo/);
    });

    it('returns true when a valid country is supplied', () => {
      const data = {
        country: 'UNITED KINGDOM',
      };

      expect(validateCountry(data)).toEqual(true);
    });
  });
  describe('transforming an address', () => {
    describe('converting to correct case', () => {
      it.each(casingTestData)(
        'transforms correct values to upper case for %s',
        (_country, rawData, transformedData) => {
          expect(transformCasing(rawData)).toEqual(transformedData);
        }
      );
    });
    describe('transforming a country', () => {
      it.each([
        ['UK', 'UNITED KINGDOM'],
        ['UNITED KINGDOM', 'UNITED KINGDOM'],
        ['uk', 'UNITED KINGDOM'],
        ['United Kingdom', 'UNITED KINGDOM'],
        ['united kingdom', 'UNITED KINGDOM'],
        ['Italy', 'ITALY'],
        ['italy', 'ITALY'],
        ['ITALY', 'ITALY'],
        ['france', 'FRANCE'],
        ['FRANCE', 'FRANCE'],
        ['usa', 'USA'],
        ['USA', 'USA'],
        ['Germany', 'GERMANY'],
        ['Switzerland', 'SWITZERLAND'],
        ['SWITZERLAND', 'SWITZERLAND'],
        ['Hong Kong', 'HONG KONG'],
        ['HONG KONG', 'HONG KONG'],
        ['Japan', 'JAPAN'],
        ['JAPAN', 'JAPAN'],
        ['poland', 'POLAND'],
      ])('transforms %s to %s', (rawCountryValue, transformedCountryValue) => {
        expect(transformCountry(rawCountryValue)).toEqual(transformedCountryValue);
      });
    });
    describe('extracting a honorific from a raw data recipient value', () => {
      it.each(honorificTestData)(
        'extracts %s for a recipient, within a %s address',
        (honorific, country, recipient) => {
          expect(extractHonorific(country, recipient)).toEqual(honorific);
        }
      );
    });
  });

  describe('printing an address', () => {
    it.each(addressPrintingTestData)(
      'prints an address in the correct format for: %s',
      (_country, addressData, printedAddress) => {
        expect(printAddress(addressData)).toEqual(printedAddress);
      }
    );

    it('ignores empty lines', () => {
      const data = {
        recipient: 'Nildram Ltd',
        addressLine4: '',
        addressLine2: '',
        locality: 'AYLESBURY',
        region: 'BUCKINGHAMSHIRE',
        country: 'UNITED KINGDOM',
        postcode: 'HP19 3EQ',
        addressLine1: 'Ardenham Court',
        addressLine3: '',
      };

      expect(printAddress(data)).toEqual(
        `Nildram Ltd
Ardenham Court
AYLESBURY
BUCKINGHAMSHIRE
HP19 3EQ
UNITED KINGDOM
+--------
`
      );
    });
  });

  describe('loading the data', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('fails when there is no data', async () => {
      const fsReadFileSpy = jest.spyOn(fs, 'readFile');
      const error = new Error('oops');
      fsReadFileSpy.mockImplementation((path, enc, cb) => cb(error));

      await expect(loadAddressData()).rejects.toEqual(error);
    });

    it('parses the JSON file with address data', async () => {
      const fixture = [
        {
          recipient: 'Sam Smith',
          addressLine1: 'My flat name',
          addressLine2: 'My Apartment building',
          addressLine3: 'My complex',
          addressLine4: 'My Street',
          locality: 'My Town',
          region: 'My Region',
          country: 'UK',
          postcode: 'MY1 2HR',
        },
      ];
      const fsReadFileSpy = jest.spyOn(fs, 'readFile');
      fsReadFileSpy.mockImplementation((path, enc, cb) => cb(null, JSON.stringify(fixture)));
      await expect(loadAddressData()).resolves.toEqual(fixture);
    });
  });

  describe('running the application', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
    it('prints out a list of labels', async () => {
      const fixture = [
        {
          recipient: 'Sam Smith',
          addressLine1: 'My flat name',
          addressLine2: 'My Apartment building',
          addressLine3: 'My complex',
          addressLine4: 'My Street',
          locality: 'My Town',
          region: 'My Region',
          country: 'UK',
          postcode: 'MY1 2HR',
        },
        {
          recipient: 'Alex Johnson',
          addressLine1: 'My place',
          addressLine2: '',
          addressLine3: '',
          addressLine4: '',
          locality: 'My Town',
          region: 'My Region',
          country: 'UK',
          postcode: 'MY2 3PL',
        },
        {
          recipient: 'Chris Russo',
          addressLine1: 'VIA APPIA NUOVA 123/4',
          addressLine2: '',
          addressLine3: '',
          addressLine4: '',
          locality: 'ROMA',
          region: 'RM',
          country: 'Italy',
          postcode: '00184',
        },
      ];
      const fsReadFileSpy = jest.spyOn(fs, 'readFile');
      fsReadFileSpy.mockImplementation((path, enc, cb) => cb(null, JSON.stringify(fixture)));
      // eslint-disable-next-line no-console
      console.log = jest.fn();

      await run();
      // eslint-disable-next-line no-console
      const message = console.log.mock.calls[0][0];
      expect(message).toMatchSnapshot();
    });
  });
});
