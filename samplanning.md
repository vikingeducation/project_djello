//rails app
//login functionality with devise
//be sure to namespce under devise

//Angular App
//home state is just
//has ng-app
//nav bar as application.html state
//then ui-view

//Boards
//index is just board title + dropdown + links + sample board
//need createboard, deleteboard, showboard function
//To create a board-to we do once they add a title (this subs for our ng-click?)
//edit board is just board
//switch board is an Api call-single call returns board obj, contains list obj(contains card objs)--in a promise
  --this is done in a service
//boardCtrl needed

//Lists
//Each list is a state (use ng-repeat)
//do not use resolve-can show framework
//need add list, delete list, no edit list
//listsCtrl

//not sure if drop/drop functionality lives with card or list

//Cards
//each card is a state (use ng-repeat)
//resolve load
//create card, edit card, delete card, show card
//show/edit in a modal?
//cardsCtrl
