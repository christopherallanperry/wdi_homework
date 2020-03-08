Continent.destroy_all
Country.destroy_all

Continent.create!([
  {
    name: "Africa",
    highpoint_name: "Mount Kilimanjaro",
    highpoint_elevation: "5895",
    lowpoint_name: "Lake Assal",
    lowpoint_elevation: "-155",
  },
  {
    name: "Antarctica",
    highpoint_name: "Vinson Massif",
    highpoint_elevation: "4892",
    lowpoint_name: "Deep Lake, Vestfold Hills",
    lowpoint_elevation: "-50"
  },
  {
    name: "Asia",
    highpoint_name: "Mount Everest",
    highpoint_elevation: "8848",
    lowpoint_name: "Dead Sea",
    lowpoint_elevation: "-427"
  },
  {
    name: "Australia",
    highpoint_name: "Puncak Jaya",
    highpoint_elevation: "4884",
    lowpoint_name: "Lake Eyre",
    lowpoint_elevation: "-15"
  },
  {
    name: "Europe",
    highpoint_name: "Mount Elbru",
    highpoint_elevation: "5642",
    lowpoint_name: "Caspian Sea",
    lowpoint_elevation: "-28"
  },
  {
    name: "North America",
    highpoint_name: "Denali",
    highpoint_elevation: "6198",
    lowpoint_name: "Death Valley",
    lowpoint_elevation: "-86"
  },
  {
    name: "South America",
    highpoint_name: "Aconcagua",
    highpoint_elevation: "6,960",
    lowpoint_name: "Laguna del Carbón",
    lowpoint_elevation: "-105"
  }

  ])

  Country.create!([
    {
      name: "United Kingdom",
      image: "https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg",
      size: 93628,
      population: 65110000,
      currency: "GBP",
      gdp: 2.65,
      continents_id: 5
    }
  ])
