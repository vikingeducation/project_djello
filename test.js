var d = () => {
  var user = {
    username: "a",
    password: "a"
  };
  var boardId = "59bfee8b52d744e4789d9676";
  var headers = new Headers();
  headers.append("Content-type", "application/json");
  var json = JSON.stringify(boardId);
  var apiData = fetch(`/boards?user=${user.username}`, {
    headers,
    method: "DELETE",
    body: boardId
  }).then(console.log);
};
d();
