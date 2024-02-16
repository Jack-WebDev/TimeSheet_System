
exports.up = function(knex) {
    return knex.schema.createTable('Users', function(table) {
        table.increments('UserID').primary();
        table.string('Name', 50).notNullable();
        table.string('Email', 100).notNullable();
        table.string('Password', 100).notNullable();
        table.enu('Role', ['Employee', 'Manager', 'Administrator']).defaultTo('Administrator');
        table.dateTime('CREATED_AT').defaultTo(knex.fn.now());
      }).then(function() {
        console.log('Users table created successfully.');
      }).catch(function(err) {
        console.error('Error creating table:', err);
      }).finally(function() {
        knex.destroy();
      });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('Users');
  };
  