---
title: General Assembly - Twitter
type: lab
duration: "1:25"
creator:
    name: Gerry Mathe & Alex Chin
    city: London
competencies: Programming, Server Applications
---

# General Assembly - Twitter

## Introduction

> ***Note:*** _This can be a pair programming activity or done independently._

Let's practice using jquery. This homework is about reproducing a light and local version of Twitter, there is data available directly in the app under the variable `window.tweets`.

## Exercise

#### Requirements

- Tweets from the variable `window.tweets` should appear in the timeline.
- A new tweet should appear at the top of the timeline when the user types some text in the text input at the top and **submits the form**
- Loops need to be written using Jquery loops rather than vanilla Javascript
- Events listeners need to be written using Jquery syntax
- This is only about JS, no need to change the css

**Bonus:**

- Add a character count to limit the length of the text to 140 characters.
- Make sure the user cannot add an empty tweet
- Display the value for how long ago the tweet was posted (11m, 3h, 6d), search on google for a library doing this job for you

#### Starter code

Below is a json object used to represent a tweet:

```
{
  "user_thumbnail":"http://pbs.twimg.com/profile_images/589705612864331777/rZPuXSEA_normal.jpg",
  "created_at":"2015-10-07 14:58:34 +0000",
  "text":"Freehold - Responsive Real Estate Theme http://t.co/e7QnameF8I ",
  "name":"Trends 2015",
  "screen_name":"trendbisnis2015"
}
```

#### Deliverable

Here is a screenshot of the final result.
![Example Image](http://s4.postimg.org/4g0ztk51p/twitter.jpg)

## Additional Resources

- A link to [something useful](http://www.w3schools.com/jsref/dom_obj_all.asp)
- Extra relevant [resource for students](https://developer.mozilla.org/en-US/docs/Web/Events)