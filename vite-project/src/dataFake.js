import { fakerUK as faker } from '@faker-js/faker';

export function autoDataFill() {
  const book = {
    title: faker.book.title(),
    author: faker.person.fullName(),
    year: faker.date.between({from: '1950-01-01', to: Date.now()}).getFullYear(),
    genre: faker.book.genre(),
  };
  return book;
}