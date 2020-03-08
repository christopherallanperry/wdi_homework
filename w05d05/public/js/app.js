"use strict";var App=App||{};App.home=function(e){e&&e.preventDefault(),this.$main.html('\n    <div class="imagebackdrop">\n      <h1>Welcome to our Humble Home Page</h1>\n      <p>We hope you\'ll enjoy your stay here and choose to hang out a while</p>\n    </div\n    ')},App.register=function(e){e&&e.preventDefault,this.$main.html('\n    <h2>Register</h2>\n    <form method="post" action="/register">\n      <div class="form-group">\n        <input class="form-control" type="text" name="user[username]" placeholder="Username">\n      </div>\n      <div class="form-group">\n        <input class="form-control" type="email" name="user[email]" placeholder="Email">\n      </div>\n      <div class="form-group">\n        <input class="form-control" type="password" name="user[password]" placeholder="Password">\n      </div>\n      <div class="form-group">\n        <input class="form-control" type="password" name="user[passwordConfirmation]" placeholder="Password Confirmation">\n      </div>\n      <input class="btn btn-primary" type="submit" value="Register">\n    </form>\n    ')},App.login=function(e){e&&e.preventDefault(),this.$main.html('\n    <h2>Login</h2>\n    <form method="post" action="/login">\n      <div class="form-group">\n        <input class="form-control" type="email" name="email" placeholder="Email">\n      </div>\n      <div class="form-group">\n        <input class="form-control" type="password" name="password" placeholder="Password">\n      </div>\n      <input class="btn btn-primary" type="submit" value="Login">\n    </form>\n    ')},App.usersIndex=function(e){var t=this;e&&e.preventDefault();var n=this.apiUrl+"/users";return this.ajaxRequest(n,"get",null,function(e){t.$main.html('\n      <div class="card-deck-wrapper">\n        <div class="card-deck">\n        </div>\n      </div>\n    ');var n=t.$main.find(".card-deck");$.each(e.users,function(e,t){n.append('\n        <div class="card col-md-4">\n          <img class="card-img-top" src="http://fillmurray.com/300/300" alt="Card image cap">\n          <div class="card-block">\n            <h4 class="card-title"><a class="show" href="'+t._id+'">'+t.username+'</a></h4>\n            <p class="card-text">'+t.bio+'</p>\n            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>\n            <a class="edit" href="'+t._id+'">edit profile</a>\n          </div>\n        </div>\n      ')}),$(".show").on("click",t.userShow),$(".edit").on("click",t.userEdit)})},App.userShow=function(e){e&&e.preventDefault();var t="http://localhost:3000/api/users",n=t+"/"+$(this).attr("href"),s="GET";App.ajaxRequest(n,s,null,function(e){App.$main.html('\n        <div class="card col-md-4">\n          <img class="card-img-top" src="http://fillmurray.com/300/300" alt="Card image cap">\n          <div class="card-block">\n            <h4 class="card-title">'+e.user.username+'</h4>\n            <p class="card-text">'+e.user.bio+'</p>\n            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>\n            <a class="edit" href="'+e.user._id+'">edit profile</a>\n          </div>\n        </div>\n      '),console.log("data.user._id: "+e.user._id)})},App.userEdit=function(e){e&&e.preventDefault();var t="http://localhost:3000/api/users",n=t+"/"+$(this).attr("href");console.log("URL: "+n),console.log("This is: "+this);var s="PUT";App.ajaxRequest(n,s,null,function(e){console.log("ajaxRequest: "+n),App.$main.html('\n      <h2>Edit User Profile</h2>\n      <form method="put" action="/users/'+e.user._id+'">\n        <div class="form-group">\n          <label for="username">User Name</label>\n          <input id="username" class="form-control" type="text" name="user[username]" placeholder="Username" value="'+e.user.username+'">\n        </div>\n        <div class="form-group">\n          <label for="bio">User Biography</label>\n          <input id="bio" class="form-control" type="text" name="user[bio]" placeholder="User bio" value="'+e.user.bio+'">\n        </div>\n        <div class="form-group">\n          <label for="img">Profile Image URL</label>\n          <input id="img" class="form-control" type="text" name="user[img]" value="'+e.user.img+'">\n        </div>\n        <input class="btn btn-primary" type="submit" value="Update Profile">\n      </form>\n      ')})},App.logout=function(e){e.preventDefault(),this.removeToken(),this.loggedOutState()},App.loggedInState=function(){$(".loggedIn").show(),$(".loggedOut").hide(),this.usersIndex()},App.loggedOutState=function(){$(".loggedIn").hide(),$(".loggedOut").show(),this.home()},App.removeToken=function(){return window.localStorage.clear()},App.handleForm=function(e){e.preventDefault();var t=""+App.apiUrl+$(this).attr("action"),n=$(this).attr("method"),s=$(this).serialize();return App.ajaxRequest(t,n,s,function(e){e.token&&(App.setToken(e.token),App.loggedInState())})},App.ajaxRequest=function(e,t,n,s){return $.ajax({url:e,method:t,data:n,beforeSend:this.setRequestHeader.bind(this)}).done(s).fail(function(e){console.log(e)})},App.setRequestHeader=function(e){return e.setRequestHeader("Authorization","Bearer "+this.getToken())},App.setToken=function(e){return window.localStorage.setItem("token",e)},App.getToken=function(){return window.localStorage.getItem("token")},App.init=function(){this.apiUrl="http://localhost:3000/api",this.$main=$("main"),$(".home").on("click",this.home.bind(this)),$(".register").on("click",this.register.bind(this)),$(".login").on("click",this.login.bind(this)),$(".logout").on("click",this.logout.bind(this)),$(".usersIndex").on("click",this.usersIndex.bind(this)),this.$main.on("click",".edit",this.userEdit),this.$main.on("submit","form",this.handleForm),this.getToken()?this.loggedInState():this.loggedOutState()},$(App.init.bind(App));