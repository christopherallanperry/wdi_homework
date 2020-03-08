const mongoose = require('mongoose');

const databaseUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/climbing-walls';
mongoose.connect(databaseUrl);

const Wall = require('../models/wall');

Wall.collection.drop();

const walls = [
  {
    available: 'true',
    file: 'mile-end.jpg',
    lat: '51.527662',
    lng: '-0.039660',
    postcode: 'E3 5BE',
    name: 'Mile End Climbing Wall',
    website: 'https://www.mileendwall.org.uk/',
    location: 'Haverfield Road, Mile End, London'
  },
  {
    available: 'true',
    file: 'the-arch.jpg',
    lat: '51.494815',
    lng: '-0.063073',
    postcode: 'SE16 4DD',
    name: 'The Arch Climbing Wall',
    website: 'http://archclimbingwall.com',
    location: 'Tower Bridge Business Complex, Drummond Rd, London'
  },
  {
    available: 'true',
    file: 'vauxwall.jpg',
    lat: '51.485029',
    lng: '-0.122838',
    postcode: 'SW8 1SR',
    name: 'Vauxwall Climbing Centre',
    website: 'http://www.vauxwallclimbing.co.uk/',
    location: '46 - 47a S Lambeth Rd, Vauxhall, London'
  },
  {
    available: 'true',
    file: 'the-castle.jpg',
    lat: '51.565121',
    lng: '-0.092356',
    postcode: 'N4 2HA',
    name: 'The Castle Climbing Centre',
    website: 'https://www.castle-climbing.co.uk/',
    location: 'Green Lanes, Stoke Newington, London'
  },
  {
    available: 'true',
    file: 'the-reach.jpg',
    lat: '51.494403',
    lng: '0.042896',
    postcode: 'SE18 5NR',
    name: 'The Reach',
    website: 'https://www.thereach.org.uk/',
    location: 'Unit 6, Mellish Industrial Estate, Harrington Way, London, Woolwich'
  },
  {
    available: 'true',
    file: 'white-spider.jpg',
    lat: '51.372385',
    lng: '-0.291143',
    postcode: 'KT6 7LD',
    name: 'White Spider - Urban Climbing',
    website: 'http://www.whitespiderclimbing.com/',
    location: '225 Hook Rise S, Kingston, Surrey'
  }
];

walls.forEach((wall) => {
  Wall.create(wall, (err, wall) => {
    if (err) return console.log(err);
    return console.log(`${wall.name} was saved.`);
  });
});
