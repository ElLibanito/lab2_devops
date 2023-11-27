const db = require('../dbClient')

module.exports = {
  create: (user, callback) => {
    // Check parameters
    if(!user.username)
      return callback(new Error("Wrong user parameters"), null)
    // Create User schema
    const userObj = {
      firstname: user.firstname,
      lastname: user.lastname,
    }
    // Save to DB
    // TODO check if user already exists
    db.hmgetall(user.username, userObj, (err, res) => {
      if (err) return callback(err, null)
      if (!res){

        db.hmset(user.username,userObj, (err,res) => {

          if(err) return callback(err,null)
          callback(null,res)
        })
      }

      else {callback(new Error("User already exists"), null)}
    })
  },

  
   get: (username, callback) => {
     // TODO create this method
     if(!username)
          return callback(new Error("Username must be provided"),null),
      
      db.hgetall(username,function(err,res) {

        if(err) return callback(err,null)
        if(res) callback(null,res)

        else
          callback(new Error("User doesn't exists"), null)
      })
   }
}
