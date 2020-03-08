// Note: This file was copied from Alex P. Chin's update pulled from lesson_notes on Githib
// after cease work on w05d03.
// Due to issues in getting the app to talk to the database, this is a 'comments only'
// homework, with no code written

// Calls 'init' function to start app
$(init);

// Sets up the path for the API data
const API = "http://localhost:4000";

// Initialisation function to start up functionality
function init() {
    // Call the usersIndex function to populate the index view on first load
    usersIndex();
    // Call the usersNew function to populate the new modal
    $(".usersNew").on("click", usersNew);
    // Call the usersIndex function to populate the index page when called from another view
    $(".usersIndex").on("click", usersIndex);
    // Call the usersCreate function to enter a new user into the database
    $("body").on("submit", ".usersCreate", usersCreate);
    // Call the usersDelete function to remove a user record from the db
    $("body").on("click", ".usersDelete", usersDelete);
    // Call the usersEdit function to access a view where users details can be edited
    $("body").on("click", ".usersEdit", usersEdit);
    // Call the usersUpdate function to modify user details in the database
    $("body").on("submit", ".usersUpdate", usersUpdate);
    // Call the usersShow view to see more detailed information unique to an individual user
    $("body").on("click", ".usersShow", usersShow);

    // The next 5 lines provide equivalent functions for projects to those for users
    $("body").on("click", ".projectsNew", projectsNew);
    $("body").on("submit", ".projectsCreate", projectsCreate);
    $("body").on("click", ".projectsDelete", projectsDelete);
    $("body").on("click", ".projectsEdit", projectsEdit);
    $("body").on("submit", ".projectsUpdate", projectsUpdate);
}

// Function to show modal for adding a new user
function usersNew(e) {
    // Prevents default action taking place
    if (e) e.preventDefault();

    // Obtains modal-content class and sets its inner HTML
    $(".modal-content").html(
        // Sets up form content
        `<form method="post" action="${API}/users" class="usersCreate">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Add User</h4>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label for="user_name">Name</label>
          <input class="form-control" type="text" name="user[name]" id="user_name" placeholder="Name">
        </div>
        <div class="form-group">
          <label for="user_image">Image</label>
          <input class="form-control" type="text" name="user[image]" id="user_image" placeholder="Image">
        </div>
        <div class="form-group">
          <label for="user_github">Github</label>
          <input class="form-control" type="text" name="user[github]" id="user_github" placeholder="Github">
        </div>
        <div class="form-group">
          <label for="user_bio">Bio</label>
          <textarea class="form-control" name="user[bio]" id="user_bio" placeholder="Bio"></textarea>
        </div>
        <div class="form-group">
          <label for="user_website">Website</label>
          <input class="form-control" type="text" name="user[website]" id="user_website" placeholder="Website">
        </div>
      </div>
      // Sets up modal-footer with a close and save button
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary">Save</button>
      </div>
    </form>`
    );
    // Triggers the jQuery modal method and changes the modal markup from hidden to show
    $(".modal").modal("show");
}

// Sets up the Create function
function usersCreate(e) {
    if (e) e.preventDefault();
    // Uses the jQuery ajax method to set up the submission of the form data
    $.ajax({
        // Directs to a URL for submitting the data
        url: $(this).attr("action"),
        // Sets the POST method  ('verb')
        type: $(this).attr("method"),
        // Converts the form data into object form that inserted into the database
        data: $(this).serialize()
        // Ensures that the insertion is complete before trying to display it on an Index view
    }).done(() => {
        // Runs the usersIndex function
        usersIndex();
        // Closes the modal
        $(".modal").modal("hide");
    });
}

// Sets up Index view
function usersIndex(e) {
    // Prevents the form from refreshing the page
    if (e) e.preventDefault();

    // Uses the GET method to access the data for the Index page
    $.get(`${API}/users`).done(data => {
        // Uses the jQuery each method to loop over the user data array and insert it into
        // the Index view
        $("main").html(`<div class="users"></div>`);
        $.each(data, (index, user) => {
            addUser(user);
        });
    });
}

// Effectively a small template used by usersIndex to display the content of each user
function addUser(user) {
    $(".users").prepend(`
    <div class="user-tile">
      <img src="${user.image}">
      <a class="usersShow" href="${API}/users/${user._id}">
        <h2>${user.name}</h2>
      </a>
      <p>${user.bio}</p>
    </div>`);
}

// Deletes users from the database
function usersDelete(e) {
    // Stops the page being refreshed
    if (e) e.preventDefault();

    // Sets up the url, method and data needed to remove a database record
    $.ajax({
        url: `${API}/users/${$(this).data("id")}`,
        type: "delete"
    }).done(() => {
        usersIndex();
    });
}

function usersEdit(e) {
    if (e) e.preventDefault();

    $.ajax({
        method: "get",
        url: `${API}/users/${$(this).data("id")}`
    }).done(user => {
        $(".modal-content").html(`
      <form method="put" action="${API}/users/${user._id}" class="usersUpdate">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title">Add User</h4>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="user_name">Name</label>
            <input class="form-control" type="text" name="user[name]" id="user_name" placeholder="Name" value="${user.name}">
          </div>
          <div class="form-group">
            <label for="user_image">Image</label>
            <input class="form-control" type="text" name="user[image]" id="user_image" placeholder="Image" value="${user.image}">
          </div>
          <div class="form-group">
            <label for="user_github">Github</label>
            <input class="form-control" type="text" name="user[github]" id="user_github" placeholder="Github" value="${user.github}">
          </div>
          <div class="form-group">
            <label for="user_bio">Bio</label>
            <textarea class="form-control" name="user[bio]" id="user_bio" placeholder="Bio">${user.bio}</textarea>
          </div>
          <div class="form-group">
            <label for="user_website">Website</label>
            <input class="form-control" type="text" name="user[website]" id="user_image" placeholder="Website" value="${user.website}">
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          <button type="submit" class="btn btn-primary">Save</button>
        </div>
      </form>`);

        $(".modal").modal("show");
    });
}

function usersUpdate(e) {
    if (e) e.preventDefault();

    const url = $(this).attr("action");

    $.ajax({
        method: $(this).attr("method"),
        url: url,
        data: $(this).serialize()
    }).done(() => {
        usersShow(null, url);
        $(".modal").modal("hide");
    });
}

function usersShow(e, url) {
    if (e) e.preventDefault();

    $.ajax({
        method: "GET",
        url: url || $(this).attr("href")
    }).done(user => {
        $("main").html(`
      <div class="user">
        <div class="user-tile">
          <img src="${user.image}">
          <h2 id="username">${user.name}</h2>
          <p>${user.bio}</p>
          <ul class="list-inline">
            <li><a href="https://github.com/${user.github}">Github</a></li>
            <li><a href="${user.portfolio}">Portfolio</a></li>
          </ul>
          <ul class="list-inline">
            <li><a href="#" class="usersEdit" data-id="${user._id}">Edit</a></li>
            <li><a data-id="${user._id}" class="usersDelete" href="#">Delete</a></li>
          </ul>
          <a class="projectsNew btn btn-primary" href="#" data-id="${user._id}">Add a project</a>
        </div>
      </div>
      <h2>Projects</h2>
      <div class="projectsIndex">
      </div>`);

        projectsIndex(user);
    });
}

// And do it all over again for the projects
function projectsNew(e) {
    if (e) e.preventDefault();

    const id = $(this).data("id");

    $(".modal-content").html(`
    <form method="post" action="${API}/users/${id}/projects" class="projectsCreate" data-user_id="${id}">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Add Project</h4>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label for="project_title">Title</label>
          <input class="form-control" type="text" name="project[title]" id="project_title" placeholder="Title">
        </div>
        <div class="form-group">
          <label for="project_description">Description</label>
          <textarea class="form-control" name="project[description]" id="project_description" placeholder="Description"></textarea>
        </div>
        <div class="form-group">
          <label for="project_github">Github</label>
          <input class="form-control" type="text" name="project[github]" id="project_github" placeholder="Github">
        </div>
        <div class="form-group">
          <label for="project_website">Website</label>
          <input class="form-control" type="text" name="project[website]" id="project_website" placeholder="Website">
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary">Save</button>
      </div>
    </form>`);

    $(".modal").modal("show");
}

function projectsCreate(e) {
    if (e) e.preventDefault();

    $.ajax({
        url: $(this).attr("action"),
        type: $(this).attr("method"),
        data: $(this).serialize()
    }).done(project => {
        usersShow(null, `${API}/users/${$(this).data("user_id")}`);
        $(".modal").modal("hide");
    });
}

function projectsIndex(user) {
    $.each(user.projects, (index, project) => {
        addProject(user, project);
    });
}

function addProject(user, project) {
    $(".projectsIndex").prepend(`
    <div class='project-tile'>
      <h2>${project.title}</h2>
      <p>${project.description}</p>
      <ul class="list-inline">
        <li><a href='https://github.com/${project.github}'>Github</a>
        <li><a href='${project.website}'>Website</a></li>
      </ul>
      <ul class="list-inline">
        <li><a href="#" class="projectsEdit" data-user_id="${user._id}" data-id="${project._id}">Edit</a></li>
        <li><a data-user_id="${user._id}" data-id="${project._id}" class="projectsDelete" href="#">Delete</a></li>
      </ul>
  </div>`);
}

function projectsDelete(e) {
    if (e) e.preventDefault();

    $.ajax({
        url: `${API}/users/${$(this).data("user_id")}/projects/${$(this).data("id")}`,
        type: "delete"
    }).done(() => {
        $(this)
            .parents(".project-tile")
            .remove();
    });
}

function projectsEdit(e) {
    if (e) e.preventDefault();

    $.ajax({
        method: "get",
        url: `${API}/users/${$(this).data("user_id")}/projects/${$(this).data("id")}`
    }).done(project => {
        $(".modal-content").html(`
      <form method="put" action="${API}/users/${$(this).data("user_id")}/projects/${
            project._id
        }" class="projectsUpdate" data-user_id="${$(this).data("user_id")}">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title">Edit Project</h4>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="project_title">Title</label>
            <input class="form-control" type="text" name="project[title]" id="project_title" placeholder="Title" value="${
                project.title
            }">
          </div>
          <div class="form-group">
            <label for="project_description">Description</label>
            <textarea class="form-control" name="project[description]" id="project_description" placeholder="Description">${
                project.description
            }</textarea>
          </div>
          <div class="form-group">
            <label for="project_github">Github</label>
            <input class="form-control" type="text" name="project[github]" id="project_github" placeholder="Github" value="${
                project.github
            }">
          </div>
          <div class="form-group">
            <label for="project_website">Website</label>
            <input class="form-control" type="text" name="project[website]" id="project_website" placeholder="Website" value="${
                project.website
            }">
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          <button type="submit" class="btn btn-primary">Save</button>
        </div>
      </form>`);

        $(".modal").modal("show");
    });
}

function projectsUpdate(e) {
    if (e) e.preventDefault();

    $.ajax({
        url: $(this).attr("action"),
        method: $(this).attr("method"),
        data: $(this).serialize()
    }).done(() => {
        usersShow(null, `${API}/users/${$(this).data("user_id")}`);
        $(".modal").modal("hide");
    });
}

// Can I go to bed now?
