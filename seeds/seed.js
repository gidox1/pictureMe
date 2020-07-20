exports.seed = function(knex, Promise) {
    return deleteTables()
      .then(function() {
        return knex('users').insert([
          {
            id: 1,
            username: 'biddey',
            email: 'biddey@hmail.com',
            password: 'biddey56',
            preference: 'male',
            sex: 'female',
            blocked: null,
            created_at: new Date(),
            updated_at: new Date(),
          },
      ])
      })

    function deleteTables() {
      return knex('users').del()
    }
  };
  