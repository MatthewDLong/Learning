const honorificsByCountry = [
  {
    country: 'GERMANY',
    honorifics: [/Herr/, /Herrn/, /Frau/],
  },
  {
    country: 'SWITZERLAND',
    honorifics: [/Herr/, /Herrn/, /Frau/],
  },
  {
    country: 'HONG KONG',
    honorifics: [/Mr\./, /Mrs\./],
  },
];

const extractHonorific = (country, recipient) => {
  const honorificData = honorificsByCountry.filter((honorific) => honorific.country == country)[0];
  if (!honorificData) {
    return '';
  }
  const { honorifics } = honorificData;
  return honorifics.reduce((honorific, honorificRegex) => {
    const result = honorificRegex.exec(recipient);
    if (result) {
      honorific = result[0];
    }
    return honorific;
  }, '');
};

module.exports = { extractHonorific };
