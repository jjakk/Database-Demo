
function deleteBlock(firstName, lastName, age){
  fetch('/deleteUser', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      firstName: firstName,
      lastName: lastName,
      age: age
    })
  });
}
