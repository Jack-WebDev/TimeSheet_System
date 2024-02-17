import knex from "knex";
import knexfile from "../Knexfile.js";

const db = knex(knexfile);

function authUserEmail() {
  return console.log(db);
}

//  export function validateUser(email) {
//   return db('Users').where({ email }).first();
// }

//  export function getUsers() {
//   return db('Users').select('*');
// }

//  export function getUserById(id) {
//   return db('Users').where('UserID', id).first();
// }

//  export function updateUser(userId, name, email, role) {
//   return db('Users')
//     .where('UserID', userId)
//     .update({
//       Name: name,
//       Email: email,
//       Role: role
//     });
// }

//  export function deleteUser(id) {
//   return db('Users').where('UserID', id).delete();
// }

authUserEmail();
