const fs = require('fs');
const path = require('path');
const addressFormats = require('./address-formats');
const addressCases = require('./address-cases');
const { validCountries, validRawCountries } = require('./countries');
const { extractHonorific } = require('./address-honorifics');
const japaneseCharacterRange = /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f]/;

const dataFile = path.resolve(__dirname, '../data', 'addresses.json');

const removeUnwantedCharacters = (data) => {
  const reducer = (cleansedData, key) => {
    cleansedData[key] = data[key].replace(/[\n\r\t\v\f\b\0]/g, '');
    return cleansedData;
  };
  return Object.keys(data).reduce(reducer, {});
};

const trimSpaces = (data) => {
  const reducer = (trimmed, key) => {
    trimmed[key] = data[key].trim();
    return trimmed;
  };
  return Object.keys(data).reduce(reducer, {});
};

const validateCountry = (data) => {
  const { country } = data;
  if (!validRawCountries.includes(country)) {
    throw new Error(`Invalid country: ${country}`);
  }
  return true;
};

const transformCasing = (data) => {
  const transformCasingreducer = (transformedData, item) => {
    const isUpper = format[item]['upper'];
    if (isUpper) {
      transformedData[item] = data[item].toUpperCase();
    } else {
      transformedData[item] = data[item];
    }
    return transformedData;
  };
  const rawCountry = data.country;
  const transformedCountry = transformCountry(rawCountry);
  const { format } = addressCases.filter((format) => format.country == transformedCountry)[0];
  return Object.keys(format).reduce(transformCasingreducer, {});
};

const transformCountry = (country) => {
  let transformedCountry = '';

  switch (country.toLowerCase()) {
    case 'uk':
      transformedCountry = validCountries.unitedKingdom;
      break;
    case 'united kingdom':
      transformedCountry = validCountries.unitedKingdom;
      break;
    case 'italy':
      transformedCountry = validCountries.italy;
      break;
    case 'france':
      transformedCountry = validCountries.france;
      break;
    case 'usa':
      transformedCountry = validCountries.usa;
      break;
    case 'germany':
      transformedCountry = validCountries.germany;
      break;
    case 'switzerland':
      transformedCountry = validCountries.switzerland;
      break;
    case 'hong kong':
      transformedCountry = validCountries.hongKong;
      break;
    case 'japan':
      transformedCountry = validCountries.japan;
      break;
    case 'poland':
      transformedCountry = validCountries.poland;
      break;
    default:
      transformedCountry = country;
  }
  return transformedCountry;
};

const templateAddress = (data) => {
  const { country, recipient } = data;

  const containsJapaneseCharacters = japaneseCharacterRange.test(recipient);
  if (containsJapaneseCharacters) {
    return `〒 ${data.postcode && data.postcode + '\n'}${data.region && data.region}${
      data.locality && data.locality
    }${data.addressLine2 && data.addressLine2 + '\n'}${data.addressLine1 && data.addressLine1}
+--------
`;
  }

  const format = addressFormats[country];

  if (!format) {
    return false;
  }

  const templatedAddress = format.reduce((address, items) => {
    const line = items.reduce((addressLine, item, lineIndex, lineArray) => {
      const value = data[item];
      if (value && value.length > 0) {
        addressLine += value;
      }

      const lineArrayLength = lineArray.length;

      if (lineIndex + 1 < lineArrayLength) {
        addressLine += ' ';
      }

      if (addressLine.length > 0 && lineIndex + 1 == lineArrayLength) {
        addressLine += '\n';
      }

      return addressLine;
    }, '');
    if (line && line.length > 0) {
      address += line;
    }
    return address;
  }, '');

  const withSeperator = templatedAddress + '+--------\n';

  return withSeperator;
};

const printAddress = (addressData) => {
  const cleansedData = removeUnwantedCharacters(addressData);
  const trimmedData = trimSpaces(cleansedData);

  validateCountry(trimmedData);

  const transformedCountry = transformCountry(addressData.country);

  const transformedData = transformCasing(trimmedData);

  const {
    recipient,
    addressLine1,
    addressLine2,
    addressLine3,
    addressLine4,
    locality,
    region,
    postcode,
  } = transformedData;

  const honorific = extractHonorific(transformedCountry, recipient);
  const transformedRecipient = honorific && recipient.replace(honorific, '').trim();

  const printedAddress = templateAddress({
    honorific: honorific || null,
    recipient: transformedRecipient || recipient,
    addressLine1,
    addressLine2,
    addressLine3,
    addressLine4,
    locality,
    region,
    postcode,
    country: transformedCountry,
  });

  return printedAddress;
};

const loadAddressData = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(dataFile, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
};

const run = async () => {
  const data = await loadAddressData();

  const addressLabels = data.reduce((labels, addressData) => {
    const label = printAddress(addressData);
    labels += label;
    return labels;
  }, '');

  // eslint-disable-next-line no-console
  console.log(addressLabels);
};

if (require.main === module) {
  run();
} else {
  module.exports = {
    removeUnwantedCharacters,
    trimSpaces,
    validateCountry,
    transformCountry,
    transformCasing,
    printAddress,
    loadAddressData,
    run,
  };
}
