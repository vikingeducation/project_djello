# assignment_djello
Project management with that great wobbly taste.

So how is our auth architect-ed?
User posts to /sessions
Returns a jwt with user's id
User saves jwt in local storage and redux state
user then uses jwt to authenticate api calls
all api calls require jwt (express-jwt is the library we need)