const { faker } = require('@faker-js/faker')
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex('contacts').del()
  faker.seed(123)
  const contacts = []

  for (let j = 1; j <= 100; j++) {
    contacts.push({
      id: j++,
      name: `${faker.person.firstName()} ${faker.person.lastName()}`,
      email: faker.internet.email(),
      phone: faker.phone.number(),
      created_at: faker.date.past(),
    })
  }

  await knex('contacts').insert(contacts)
}
