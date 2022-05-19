const addressPrintingTestData = [
  [
    'UNITED KINGDOM',
    {
      recipient: 'Nildram Ltd',
      addressLine4: '',
      addressLine2: 'Oxford Road',
      locality: 'Aylesbury',
      region: 'Buckinghamshire',
      country: 'united kingdom',
      postcode: 'HP19 3EQ',
      addressLine1: 'Ardenham Court',
      addressLine3: '',
    },
    `Nildram Ltd
Ardenham Court
Oxford Road
AYLESBURY
BUCKINGHAMSHIRE
HP19 3EQ
UNITED KINGDOM
+--------
`,
  ],
  [
    'ITALY',
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
    `CHRIS RUSSO
VIA APPIA NUOVA 123/4
00184 ROMA RM
ITALY
+--------
`,
  ],
  [
    'FRANCE',
    {
      recipient: 'Madame Duval',
      addressLine1: '27 RUE PASTEUR',
      addressLine2: '',
      addressLine3: '',
      addressLine4: '',
      locality: '',
      region: 'CABOURG',
      country: 'FRANCE',
      postcode: '14390',
    },
    `Madame Duval
27 RUE PASTEUR
14390 CABOURG
FRANCE
+--------
`,
  ],
  [
    'USA',
    {
      recipient: 'Chris Niswandee',
      addressLine1: 'SMALLSYS INC',
      addressLine2: '795 E DRAGRAM',
      addressLine3: '',
      addressLine4: '',
      locality: 'TUCSON',
      region: 'AZ',
      country: 'USA',
      postcode: '85705',
    },
    `CHRIS NISWANDEE
SMALLSYS INC
795 E DRAGRAM
TUCSON AZ 85705
USA
+--------
`,
  ],
  [
    'GERMANY',
    {
      recipient: 'Herrn Eberhard Wellhausen',
      addressLine1: 'Wittekindshof',
      addressLine2: 'Schulstrasse 4',
      addressLine3: '',
      addressLine4: '',
      locality: '',
      region: 'Bad Oyenhausen',
      country: 'GERMANY',
      postcode: '32547',
    },
    `Herrn
Eberhard Wellhausen
Wittekindshof
Schulstrasse 4
32547 Bad Oyenhausen
GERMANY
+--------
`,
  ],
  [
    'SWITZERLAND',
    {
      recipient: 'Frau\nWilhemlina Waschbaer',
      addressLine1: 'Hochbaumstrasse 123 A',
      addressLine2: '',
      addressLine3: '',
      addressLine4: '',
      locality: '',
      region: 'Bern',
      country: 'SWITZERLAND',
      postcode: '5678',
    },
    `Frau
Wilhemlina Waschbaer
Hochbaumstrasse 123 A
5678 Bern
SWITZERLAND
+--------
`,
  ],
  [
    'HONG KONG',
    {
      recipient: 'Mr. CHAN Kwok-kwong',
      addressLine1: 'Flat 25, 12/F, Acacia Building',
      addressLine2: '150 Kennedy Road',
      addressLine3: '',
      addressLine4: '',
      locality: '',
      region: 'WAN CHAI',
      country: 'HONG KONG',
      postcode: '',
    },
    `Mr. CHAN Kwok-kwong
Flat 25, 12/F, Acacia Building
150 Kennedy Road
WAN CHAI
HONG KONG
+--------
`,
  ],
  [
    'JAPAN',
    {
      recipient: 'Yagita Asami',
      addressLine1: 'Higashi Azabu IS Bldg 4F ',
      addressLine2: 'Higashi Azabu 1-8-1',
      addressLine3: '',
      addressLine4: '',
      locality: 'Minato-ku',
      region: 'Tokyo',
      country: 'JAPAN',
      postcode: '106-0044',
    },
    `Yagita Asami
Higashi Azabu IS Bldg 4F
Higashi Azabu 1-8-1
Minato-ku Tokyo 106-0044
+--------
`,
  ],
  [
    'JAPAN',
    {
      recipient: '麻美  八木田',
      addressLine1: '東麻布ISビル4F',
      addressLine2: '東麻布1-8-1',
      addressLine3: '',
      addressLine4: '',
      locality: '港区',
      region: '東京都',
      country: 'JAPAN',
      postcode: '106-0044',
    },
    `〒 106-0044
東京都港区東麻布1-8-1
東麻布ISビル4F
+--------
`,
  ],
  [
    'POLAND',
    {
      recipient: 'Mme Anna Kowalska',
      addressLine1: 'Ul. Bosmanska 1',
      addressLine2: '',
      addressLine3: '',
      addressLine4: '',
      locality: 'gdynia',
      region: '',
      country: 'POLAND',
      postcode: '81-116',
    },
    `Mme Anna Kowalska
Ul. Bosmanska 1
81-116 GDYNIA
POLAND
+--------
`,
  ],
];

module.exports = addressPrintingTestData;
