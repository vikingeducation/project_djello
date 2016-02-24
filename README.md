# project_djello
By Dustin Lee

Project provided by [Viking Code School](http://www.vikingcodeschool.com)

[View the project live](http://djl-djello.heroku.com)

Technologies used

  Backend

    - Ruby on Rails
      - Devise for login and signup flow
      - RSpec with Guard for testing
      - Twitter-bootstrap-rails for styling

  Frontend

    - HTML
    - CSS
    - JavaScript
      - AJAX
    - AngularJS
      - angular-animate
      - angular-modal-service
      - angular-sanitize
      - angular-ui-router
      - restangular
      - underscore

Description:

  An application that allows teams to maintain "Boards" of "Cards", each of which represents a task that needs to be done.  The app smooths the process of assigning team members to particular tasks and prioritizing them while they are being worked on.

  Login-based application where home screen is a simple login form.  Any attempts to access pages that aren't authorized redirect to this screen.

  The boards screen is the main screen of the app which shows a single Board at a time.  The Board in the main view can be selected from teh dropdown on the right.  When a new board is created, it starts with no Lists but the user can add an unlimited number of Lists to each Board by clicking "Add a List".

  Lists are an ordered stack of Cards.  Each Card represents a task which needs to be done by the team.  New Cards are added to a List by clicking the "Add a Card" link.

  When clicked, Cards are displayed on top of the existing Boards layout as a modal.  Cards keep track of lists of users who have been assigned to it.  Team members can be assigned to a particular Card by being placed as a Member of that card.  All activity on a Card is recorded as part of that card's Activity Feed.

  Most fields in the interface can be edited by simply clicking them.  When an editiable field is clicked, it is replaced by a simple AJAX-enabled text field.  There are no separate EDIT views for cards - all editing is done in-place for a single attribute at a time.  Cards can be marked "completed" by clicking the appropriate link within the Card, in which case they are removed from the Board entirely and not displayed again.
