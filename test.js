var user = {
  username: "a",
  password: "a"
};
var doTheFetch = user => {
  // const headers = new Headers();
  // headers.append("Content-Type", "application/json");
  // const options = {
  //   headers,
  //   method: "POST",
  //   body: user
  // };
  // if (token) headers.append("token", token);
  // return options;
  //
  // var request = new Request(`/users/${user.username}`, {
  //   method: "POST",
  //   body: JSON.stringify(user)
  // });
  fetch(`/users/${user.username}`, {
    method: "POST",
    body: JSON.stringify(user)
  }).then(console.log);
  // fetch(request).then(data => console.log(data));
};
doTheFetch(user);
//
// const apiData = await fetch(`/users/${user.username}`, {
//   method: "POST",
//   body: user
// });

var user = {
  username: "a",
  password: "a"
};
var headers = new Headers();
headers.append("Content-type", "application/json");
var json = JSON.stringify(user);
fetch(`/users/${user.username}`, {
  headers
  method: "POST",
  body: json
}).then(console.log);

////////
