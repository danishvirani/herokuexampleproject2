# herokuexampleproject2

Premise : Shared Experiences is meant to be an app where users can share experiences through image posts. The design goal was to incorporate as much functionality and control to the user as possible.

Technologies Used: Epress.js (MVC Format) / Node.Js / HTML / CSS Framework (BootStrap) / MongoDB Atlas

V 1.0 - Users are able to:

- create a profile with a profile image and Interests
- view posts from other users
- filter post made by them and access to edit and delete post
- users can like/unlike and comment on post - one-to-many relationship database relationships were used to increase functionality
- curated list is provided to the user based on the interests provided during sign-up or upon editing profile

Challenges / Future Releases

- use JQuery to dynamically show changes on screen without reload/redirect
- add location to post model and use geocoding and google MAPs APIs to dynamically show location of the post in modal
- create edit and delete routes for comments
- fix filter route

V 2.0 Goals

- add input field to add additional tags / interests

Live Site Hosted on Heroku
Link: https://shared-experiences-app.herokuapp.com/main
