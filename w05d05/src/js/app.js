const App = App || {};

// ***********************************************************
// Page Templates
// ***********************************************************

// ** HOME PAGE **
App.home = function(e) {
  if (e) e.preventDefault();
  // Something goes here
  this.$main.html(
    `
    <div class="imagebackdrop">
      <h1>Welcome to our Humble Home Page</h1>
      <p>We hope you'll enjoy your stay here and choose to hang out a while</p>
    </div
    `
  );
};

// ** USER REGISTRATION FORM **
App.register = function(e) {
  if (e) e.preventDefault; // Prevents page reload
  this.$main.html(
    `
    <h2>Register</h2>
    <form method="post" action="/register">
      <div class="form-group">
        <input class="form-control" type="text" name="user[username]" placeholder="Username">
      </div>
      <div class="form-group">
        <input class="form-control" type="email" name="user[email]" placeholder="Email">
      </div>
      <div class="form-group">
        <input class="form-control" type="password" name="user[password]" placeholder="Password">
      </div>
      <div class="form-group">
        <input class="form-control" type="password" name="user[passwordConfirmation]" placeholder="Password Confirmation">
      </div>
      <input class="btn btn-primary" type="submit" value="Register">
    </form>
    `
  );
};

// ** USER LOGIN FORM ** view
App.login = function(e) {
  if (e) e.preventDefault();
  this.$main.html(
    `
    <h2>Login</h2>
    <form method="post" action="/login">
      <div class="form-group">
        <input class="form-control" type="email" name="email" placeholder="Email">
      </div>
      <div class="form-group">
        <input class="form-control" type="password" name="password" placeholder="Password">
      </div>
      <input class="btn btn-primary" type="submit" value="Login">
    </form>
    `
  );
};

// ** USER INDEX **
// First with a container for the cards
App.usersIndex = function(e) {
  if (e) e.preventDefault();
  const url = `${this.apiUrl}/users`;

  return this.ajaxRequest(url, 'get', null, data => {
    this.$main.html(
    `
      <div class="card-deck-wrapper">
        <div class="card-deck">
        </div>
      </div>
    `
  );
  // Then with the individual cards themselves, by looping over the JSON data in 'users'
    const $container = this.$main.find('.card-deck');
    $.each(data.users, (i, user) => {
      $container.append(
      `
        <div class="card col-md-4">
          <img class="card-img-top" src="http://fillmurray.com/300/300" alt="Card image cap">
          <div class="card-block">
            <h4 class="card-title"><a class="show" href="${user._id}">${user.username}</a></h4>
            <p class="card-text">${user.bio}</p>
            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
            <a class="edit" href="${user._id}">edit profile</a>
          </div>
        </div>
      `
      );
    });
    // console.log(this);
    $('.show').on('click', this.userShow);
    $('.edit').on('click', this.userEdit);
  });
};

// ** USER SHOW PAGE **
App.userShow = function(e) {
  if (e) e.preventDefault();

  const userUrl = 'http://localhost:3000/api/users';
  const url = `${userUrl}/${$(this).attr('href')}`;

  const method = 'GET';

  App.ajaxRequest(url, method, null, data => {
    App.$main.html(
      `
        <div class="card col-md-4">
          <img class="card-img-top" src="http://fillmurray.com/300/300" alt="Card image cap">
          <div class="card-block">
            <h4 class="card-title">${data.user.username}</h4>
            <p class="card-text">${data.user.bio}</p>
            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
            <a class="edit" href="${data.user._id}">edit profile</a>
          </div>
        </div>
      `
    );
    console.log('data.user._id: ' + data.user._id);
  });

};

// ** USER EDIT PAGE **
App.userEdit = function(e) {
  if (e) e.preventDefault();

  const userUrl = 'http://localhost:3000/api/users';
  const url = `${userUrl}/${$(this).attr('href')}`;
  console.log('URL: ' + url);
  console.log('This is: ' + this);

  const method = 'PUT';

  App.ajaxRequest(url, method, null, data => {
    // console.log('ajaxRequest: ' + url);
    App.$main.html(
      `
      <h2>Edit User Profile</h2>
      <form method="put" action="/users/${data.user._id}">
        <div class="form-group">
          <label for="username">User Name</label>
          <input id="username" class="form-control" type="text" name="user[username]" placeholder="Username" value="${data.user.username}">
        </div>
        <div class="form-group">
          <label for="bio">User Biography</label>
          <input id="bio" class="form-control" type="text" name="user[bio]" placeholder="User bio" value="${data.user.bio}">
        </div>
        <div class="form-group">
          <label for="img">Profile Image URL</label>
          <input id="img" class="form-control" type="text" name="user[img]" value="${data.user.img}">
        </div>
        <input class="btn btn-primary" type="submit" value="Update Profile">
      </form>
      `
    );
  });
};


// ***********************************************************
// Helper Functions
// ***********************************************************

// When called, the function calls a function to remove the jwt token and another
// to change the state of the links in the menu bar
App.logout = function(e) {
  e.preventDefault();
  this.removeToken();
  this.loggedOutState();
};

// If user logs in, the link state is toggled to 'Logout',
// and the usersIndex function is called to display the Index view.
App.loggedInState = function() {
  $('.loggedIn').show();
  $('.loggedOut').hide();
  this.usersIndex();
};

// If a logged-in user clicks the logout link, the link states are toggled to 'Login'
// and the register function is called to show the user registration form
App.loggedOutState = function() {
  $('.loggedIn').hide();
  $('.loggedOut').show();
  // this.register();
  this.home();
};

// On logout, this function is called to remove the jwt token from local storage
App.removeToken = function() {
  return window.localStorage.clear();
};

// This function deals with the content of a submitted form
App.handleForm = function(e) {
  e.preventDefault();
  // console.log('Form submitted');
  // Builds the URL values based on the requested action,
  // adds a method, and serializes the form data
  const url = `${App.apiUrl}${$(this).attr('action')}`;
  const method = $(this).attr('method');
  const data = $(this).serialize();

  // Calls the ajaxRequest function, and if an account exists for the user
  // sets a jwt token and alters the state of the menu bar login/out options
  return App.ajaxRequest(url, method, data, data => {
    // Sets token into localStorage using the function setToken()
    // Sets to a logged in state
    if (data.token) {
      App.setToken(data.token);
      App.loggedInState();
    }
  });
};

//
App.ajaxRequest = function(url, method, data, callback) {
  return $.ajax({
    url,
    method,
    data,
    beforeSend: this.setRequestHeader.bind(this)
  })
  .done(callback)
  .fail(data => {
    console.log(data);
  });
};

//
App.setRequestHeader = function(xhr) {
  return xhr.setRequestHeader('Authorization', `Bearer ${this.getToken()}`);
};

// Sets the jwt token into local storage
App.setToken = function(token) {
  return window.localStorage.setItem('token', token);
};

// Retrieves the jwt token from local storage
App.getToken = function() {
  return window.localStorage.getItem('token');
};

// ***********************************************************
// INIT FUNCTION - Start point of app
// Sets base variables, adds event handlers, and checks
// whether a user is logged in or out
// ***********************************************************
App.init = function() {
  // Builds the base URL for subsequent Ajax requests
  this.apiUrl = 'http://localhost:3000/api';

  // makes 'main' available to us as required as an OO App variable
  this.$main = $('main');

  // The 'this' in .bind(this) is back to App again rather than the click event
  $('.home').on('click', this.home.bind(this));
  $('.register').on('click', this.register.bind(this));
  $('.login').on('click', this.login.bind(this));
  $('.logout').on('click', this.logout.bind(this));
  $('.usersIndex').on('click', this.usersIndex.bind(this));
  this.$main.on('click', '.edit', this.userEdit);

   // ** Check understanding **
   // Think sets up which function is to be called when the form is submitted
  this.$main.on('submit', 'form', this.handleForm);

  // Checks whether there is a user logged in or not
  if (this.getToken()) {
    this.loggedInState();
  } else {
    this.loggedOutState();
  }
};

// Needs to be after the App.init function itself, otherwise the app dies
// ** Not sure why - ask question. **
// Binds init to the App object, rather than document
$(App.init.bind(App));
