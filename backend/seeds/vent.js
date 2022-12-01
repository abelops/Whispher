/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('vent').del()
  await knex('vent').insert([
    {title:'first post',content:'hi this is first post',tag:'post',likes:5,dislikes:2}
  ]);
};
