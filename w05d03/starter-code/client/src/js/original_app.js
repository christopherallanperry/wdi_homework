$(init);

const API = 'http://localhost:4000';

function init() {
  usersIndex();
  $('.usersNew').on('click', usersNew);
  $('.usersIndex').on('click', usersIndex);

  $('body').on('submit', '.usersCreate', usersCreate);
  $('body').on('click', '.usersDelete', usersDelete);
  $('body').on('click', '.usersEdit', usersEdit);
  $('body').on('submit', '.usersUpdate', usersUpdate);
  $('body').on('click', '.usersShow', usersShow);

  $('body').on('click', '.projectsNew', projectsNew);
  $('body').on('submit', '.projectsCreate', projectsCreate);
}

function usersNew(){
  if (event) event.preventDefault();

  $('.modal-content').html(`
    <form method="post" action="${API}/users" class="usersCreate">
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
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary">Save</button>
      </div>
    </form>`);

  $('.modal').modal('show');
}

function usersCreate(){
  event.preventDefault();

  $.ajax({
    url: $(this).attr('action'),
    type: $(this).attr('method'),
    data: $(this).serialize()
  }).done(() => {
    usersIndex();
    $('.modal').modal('hide');
  });
}

function usersIndex(){
  if (event) event.preventDefault();

  $.get(`${API}/users`).done(data => {
    $('main').html(`<div class="users"></div>`);
    $.each(data, (index, user) => {
      addUser(user);
    });
  });
}

function addUser(user){
  $('.users').prepend(`
    <div class='user-tile'>
      <img src='${user.image}'>
      <a data-id='${user._id}' class='usersShow' href='#'>
        <h2>${user.name}</h2>
      </a>
      <p>${user.bio}</p>
    </div>`);
}

function usersDelete(){
  event.preventDefault();

  $.ajax({
    url: `${API}/users/${$(this).data('id')}`,
    type: 'delete'
  }).done(() => {
    $(this).parent().remove();
  });
}

function usersEdit(){
  event.preventDefault();

  $.ajax({
    method: 'get',
    url: `${API}/users/${$(this).data('id')}`
  }).done(user => {

    $('.modal-content').html(`
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

    $('.modal').modal('show');
  });
}

function usersUpdate(){
  event.preventDefault();

  $.ajax({
    method: $(this).attr('method'),
    url: $(this).attr('action'),
    data: $(this).serialize()
  }).done(() => {
    usersIndex();
    $('.modal').modal('hide');
  });
}

function usersShow(){
  event.preventDefault();

  $.ajax({
    method: 'GET',
    url: `${API}/users/${$(this).data('id')}`
  }).done(user => {
    $('main').html(`
      <div class="usersShow">
        <div class='user-tile' data-id=${user._id}>
          <img src='${user.image}'>
          <h2 id='username'>${user.name}</h2>
          <p>${user.bio}</p>
          <ul class="list-inline">
            <li><a href='https://github.com/${user.github}'>Github</a></li>
            <li><a href='${user.portfolio}'>Portfolio</a></li>
          </ul>
          <ul class="list-inline">
            <li><a href='#' class='usersEdit' data-id='${user._id}'>Edit</a></li>
            <li><a data-id='${user._id}' class='usersDelete' href='#'>Delete</a></li>
          </ul>
          <a class="projectsNew btn btn-primary" href="#" data-id="${user._id}">Add a project</a>
        </div>
      </div>
      <h2>Projects</h2>
      <div class="projectsIndex">
      </div>`
    );

    projectsIndex(user);
  });
}

function projectsNew(){
  event.preventDefault();

  const id = $(this).data('id');

  $('.modal-content').html(`
    <form method="post" action="${API}/users/${id}/projects" class="projectsCreate">
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

  $('.modal').modal('show');
}

function projectsCreate(){
  event.preventDefault();

  $.ajax({
    url: $(this).attr('action'),
    type: $(this).attr('method'),
    data: $(this).serialize()
  }).done(project => {
    addProject(project);
    $('.modal').modal('hide');
  });
}

function projectsIndex(user) {
  $.each(user.projects, (index, project) => {
    addProject(project);
  });
}

function addProject(project){
  $('.projectsIndex').prepend(`
    <div class='project-tile'>
    <h2>${project.title}</h2>
    <p>${project.description}</p>
    <a href='https://github.com/${project.github}'>Github</a> | <a href='${project.website}'>Website</a>
  </div>`);
}
