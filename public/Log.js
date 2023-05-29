


document.getElementById("loginForm").addEventListener("submit", function(event) {
 event.preventDefault(); // Prevent form submission

  var username = document.getElementById("loginUsername").value;
  var password = document.getElementById("loginPassword").value;

  if (username === "" || password === "") {
    alert("Please fill in all fields");
    return;
  }

  // Perform login logic here (e.g., make an AJAX request to the server)
  // You can use the values of 'username' and 'password' to send to the server
  // Once the login is successful, you can redirect the user to another page
});

document.getElementById("signupForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent form submission

  var username = document.getElementById("signupUsername").value;
  var password = document.getElementById("signupPassword").value;

  if (username === "" || password === "") {
    alert("Please fill in all fields");
    return;
  }

  // Perform signup logic here (e.g., make an AJAX request to the server)
  // You can use the values of 'username' and 'password' to send to the server
  // Once the signup is successful, you can redirect the user to another page
});