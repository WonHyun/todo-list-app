# TO-DO List App on Android

I made a Simple TO-DO List App, Developed with [React-Native](https://facebook.github.io/react-native/)

Now, app is built on Android, but It can be built on ios later.

# Elements

- #### App.js

    Main App View, Currently the main screen and the data controll function are not separated. It can be refactor later.

- #### todolist.js

    It includes to new title input, todo component. Todo list is ordered to priority and due date.

- #### todo.js

    It shows todo title, edit and delete button. The user can edit the todo only in the edit mode. If user touches this, it expanded to the TodoDetailView. Todo components are only updated when props or state changes.

- #### TodoDetailView.js

    It shows details of todo or edit view. User can set due date on calendar view.

- #### AppTitleHeader.js

    It includes to app title, expired todo notification button. If some tasks have expired, their counts is shown on the button. If press the button to see a list of expired todos.

- #### ExpiredTodo.js

    This is a view showing a todo list that has expired. If user touch each elements, can delete each expired todo. And, It is can to delete all expired todos.

# User's Guide

[Go To Manual](/document/UserGuide.md)

# Are you want try this app?

[TRY IT](https://appetize.io/app/6c147bhkb7jth7ydbyv7dp3wg0)