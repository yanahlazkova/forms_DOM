import { fakerUK as faker } from '@faker-js/faker';

export function fakerData() {
  const book = {
    id: faker.database.mongodbObjectId(),
    title: faker.book.title(),
    author: faker.person.fullName(),
    year: faker.date.between({from: '1950-01-01', to: Date.now()}).getFullYear(),
    genre: faker.book.genre(),
    ebook: randomEBook()
  };
  return book;
}

const randomEBook = () => {
  const isEBook = Math.floor(Math.random() * 2);
  if (isEBook) {
    return {
      path: faker.internet.url(),
      name: faker.internet.domainName(),
      size: faker.number.int(1000000000),
      format: faker.book.format()}

  } else false;
}

export function createID() {
  return faker.database.mongodbObjectId();
}