/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const bcrypt = require('bcryptjs');


exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('Users').del()

  const hashedPassword = bcrypt.hashSync("1", 10)

  await knex('Users').insert([
    {UserID: 1, Name: 'Jack WebDev', Email: 'admin@gmail.com', Password: hashedPassword, Role: "Administrator"},
  ]);
};
