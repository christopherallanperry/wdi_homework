$(function() {

// CODE TO CONECT THE JSON FILE CONTAINING 'window.tweets'
  var $tweets = $(window.tweets);

// Create variables to hold each key from $tweets
  var $userThumbnail = '';
  var $createdAt = '';
  var $text = '';
  var $name = '';
  var $screenName = '';

  var $rightNow = function() {
    var $dateNow = new Date();
    var $dateIs = ('0' + ($dateNow.getDate())).slice(-2);
    var $monthIs = ('0' + ($dateNow.getMonth()+1)).slice(-2);
    var $yearIs = $dateNow.getFullYear();
    var $formattedDate = $yearIs + '-' + $monthIs + '-' + $dateIs;
    return $formattedDate;
  };

// Template literal to contain structure for displaying tweets
  var $makeTweet = function(imgSrc, fullName, screenName, createdAt,tweetContent) {
    return `
      <li class="stream-item">
        <div class="tweet">
        <a href="#"><img src="${ imgSrc }" alt="User image goes here."></a>
        <div class="content">
        <strong class="fullname">${ fullName }</strong>
        <span>&rlm;</span>
        <span>@</span><b>${ screenName }</b>&nbsp;&middot;&nbsp;
        <small class="time">${ createdAt }</small>
        <p>${ tweetContent }</p>
        </div>
      </li>
    `
  };

// - Loop over $tweets, access k/v pair info and feed into stream
  $.each($tweets, function(index, tweet) {
    $userThumbnail = tweet.user_thumbnail;
    $createdAt = tweet.created_at;
    $text = tweet.text;
    $name = tweet.name;
    $screenName = tweet.screen_name;

    // Use makeTweet (template literal) to output the data into .stream-items
    $('.stream-items').append($makeTweet($userThumbnail, $name, $screenName, $createdAt, $text));
  });

  // Create new tweet and prepend it to .stream-items

  $('#new-tweet-form').on('submit', function(e) {
    e.preventDefault();

    var $imgURL = $('#thumbnail').attr('src');
    var $userName = 'Chris Perry';
    var $userHandle = 'chris_perry_61';
    var $created = $rightNow();
    var $newTweet = $('#new-tweet-input').val();

    $('.stream-items').prepend($makeTweet($imgURL, $userName, $userHandle, $created, $newTweet));
    $('#new-tweet-input').val('').focus();
  });
});
