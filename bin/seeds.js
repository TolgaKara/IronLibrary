const mongoose = require('mongoose');
const Book = require('../models/Book')
const Author = require('../models/Author');

mongoose.connect('mongodb://localhost/ironlibrary', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const books = [
  {
    title: "Der Corona-Schock",
    description:
      "Die Corona-Krise ist der tiefste wirtschaftliche Einbuch in Friedenszeiten seit der Weltwirtschaftskrise vor 90 Jahren. Die neue Krise trifft auf eine ohnehin schwächelnde europäische Wirtschaft. Wie erhalten wir unseren Wohlstand? Wie vermeiden wir einen ökonomischen Absturz mit Massenarbeitslosigkeit und Radikalisierung der Politik? Und gibt es einen Weg, den Kontinent zu alter Prosperität zurückzuführen und die Staaten politisch zu stabilisieren? Mit Hans-Werner Sinn äußert sich der bekannteste deutschsprachige Ökonom fundiert und kompakt dazu, wie wir diesen beispiellosen ökonomischen Crash überwinden und ihn dazu nutzen, längst fällige Strukturprobleme der europäischen Wirtschaft und des Geldwesen anzupacken. Nur dann hat auch die europäische Idee, die im Augenblich gefährdet ist wie nie, eine Überlebenschance. Ein wegweisende und mutiges Zukunftsprogramm zur richtigen Zeit. Hans-Werner Sinn, geb. 1948",
    author: {
      name: "Hans-Werner",
      lastName: "Sinn",
      nationality: "Deutsch",
      birthday: new Date(1948, 07, 11),
      pictureUrl:
        "https://cdn.prod.www.spiegel.de/images/b57fcfe9-98d7-4b28-8303-13e1e8e7325b_w948_r1.77_fpx64_fpy27.jpg"
    },
    rating: 10
  },
  {
    title: "Salate",
    description:
      "Recipes for Salats",
    author: {
      name: "Joanne",
      lastName: "Rowling",
      nationality: "English",
      birthday: new Date(1965, 06, 31),
      pictureUrl:
        "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1935&q=80"
    },
    rating: 9
  },
  {
    title: "Kochbuch für Salate ",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    author: {
      name: "Mirko",
      lastName: "Lee",
      nationality: "German",
      birthday: new Date(1996, 03, 28),
      pictureUrl:
        "https://images.unsplash.com/photo-1542010589005-d1eacc3918f2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1969&q=80"
    },
    rating: 8
  },
  {
    title: "Vegan Food Porn",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    author: {
      name: "Bianca",
      lastName: "Zapatca",
      nationality: "English",
      birthday: new Date(1977, 11, 16),
      pictureUrl:
        "https://assets.thalia.media/img/artikel/69b9e0421d7c122861101c494a18f87d0f4202b1-00-00.jpeg"
    },
    rating: 9
  },
  {
    title: "Veggies",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    author: {
      name: "Jamie",
      lastName: "Oliver",
      nationality: "British",
      birthday: new Date(1973, 11, 24),
      pictureUrl:
        "https://assets.thalia.media/img/artikel/ea4adc7e0fc5416b606f3ebec2f2792bb7b8c557-00-00.jpeg"
    },
    rating: 10
  },
  {
    title: "SIMPLE DAS KOCHBUCH",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    author: {
      name: "Otto",
      lastName: "Lenghi",
      nationality: "German",
      birthday: new Date(1975, 05, 23),
      pictureUrl: "https://images-na.ssl-images-amazon.com/images/I/41KNkNCOaDL._SX403_BO1,204,203,200_.jpg"
    },
    rating: 7
  },
  {
    title: "Essen gegen ARTHROSE",
    description:
      "Vegane Genussrezepte bei Schmerzen und Gelenkbeschwerden",
    author: {
      name: "Johann",
      lastName: "Lafer",
      nationality: "Deutsch",
      birthday: new Date(1959, 10, 29),
      pictureUrl:
        "https://kaisergranat.com/~fx/rezensionen/essen-gegen-arthrose-kochbuch/x007143.490x327.jpg,qb2h4.pagespeed.ic.r9L7tAW1CY.jpg"
    },
    rating: 8
  },
  {
    title: "Der Silberlöffel",
    description:
      "Bibel der italienischen Küche",
    author: {
      name: "Phaidon",
      lastName: "Edel",
      nationality: "German",
      birthday: new Date(1953, 05, 25),
      pictureUrl:
        "https://cdn.koch-form.de/1500/Silberloeffel_3D_NEU.jpg"
    },
    rating: 9
  },
  {
    title: "Bayern das Kochbuch ",
    description:
      "Bayrisches Kochbuch von Starkoch Alfons Schuhbeck",
    author: {
      name: "Alfons",
      lastName: "Schuhbeck",
      nationality: "Deutsch",
      birthday: new Date(1951, 10, 08),
      pictureUrl:
        "https://www.bonvinitas.com/media/reviews/photos/original/0f/6b/20/bayern-das-kochbuch-von-alfons-schuhbeck-18-1578581219.jpg"
    },
    rating: 10
  },
  {
    title: "Meine Küche der Gewürze ",
    description:
      "Gewürzrezepte von Herrn Schuhbeck",
    author: {
      name: "Alfons",
      lastName: "Schuhbeck",
      nationality: "Deutsch",
      birthday: new Date(1951, 10, 08),
      pictureUrl:
        "https://images-na.ssl-images-amazon.com/images/I/61PGLOJiiBL._SX385_BO1,204,203,200_.jpg"
    },
    rating: 8
  }
];

books.forEach(book => {
  Author.create(book.author).then(dbAuthor => {
    book.author = dbAuthor._id;
    Book.create(book);
  })
});
