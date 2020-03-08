const API = 'http://localhost:4000';

function usersCreate(e) {
  e.preventDefault();
  $.ajax({
    url: $(this).attr('action'),
    type: $(this).attr('method'),
    data: $(this).serialize()
  }).done(user => {
    $('main').prepend(`<div class='user-tile'>
      <img src='${user.image}'>
      <a data-id='${user._id}' class='usersShow' href='/users/${user._id}'>
        <h2>${user.name}</h2>
      </a>
      <p>${user.bio}</p>
    </div>`);

    $('.modal').modal('hide');
  });
}

function usersNew() {
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

function usersIndex() {
  // console.log('Clicked');
  $.ajax({
    url: `${API}/users`,
    type: 'get'
  }).done(data => {
    $('main').html('<div class="users"></div>');
    $.each(data, (index, user) => {
      $('main').prepend(`<div class='user-tile'>
        <img src='${user.image}'>
          <a data-id='${user._id}' class='usersShow' href='/users/${user._id}'>
            <h2>${user.name}</h2>
          </a>
        <p>${user.bio}</p>
      </div>`);
    });
  });
}

function init() {
  usersIndex();
  $('.usersIndex').on('click', usersIndex);
  $('.usersNew').on('click', usersNew);
  $('body').on('submit', '.usersCreate', usersCreate);
}

$(init);
