
deleteBlock(firstName, lastName, age){
  var xhr = new XMLHttpRequest();
  xhr.open("POST", '/deleteUser', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({
      firstName: firstName,
      lastName: lastName,
      age: age
  }));
}
