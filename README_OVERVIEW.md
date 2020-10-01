# APP STRUCTURE OVERVIEW NOTES

# /components
Contain all the COMMON view components that are used in most projects and also common to multiple parts of the project that will be used in multiple places of the project. For example, you can expect to see HUD, ALERTS, CONTROLS, ETC.

# /hooks
Here will have all the React Hooks. Hook into React's application lifecyles much easier.

# /screens
This is where all the Views will be for the actual projects.  For local components that only apply to a specific view should be stored in /screens/ComponentName/components. Look at structure of /screens/Home

# /screens/modals
I think modals should be moved up a level to /src/modals unless its a modal only for a specific view, then it should be put in /screens/ComponentName/components. Otherwise, if its a modal that is related to nothing in the Component, then it should be independent and stored in /src/modals

For example, New article modal. Users can view this from the Player View, bu news articles are not related to Video Player, I’m sure other views should be able to view news articles, so therefore, it should be independent and put in /src/modals

# /store
This is where all the dynamic data for the views are managed. OvermindJS is used for state management, which is hybrid of redux and mobx.

Within store, the important parts are:
## /store/effects
All the GQL/REST api calls are handled in effects.  Only ACTIONS should make calls to effects. No view should ever make calls to effects. ONLY actions should call effects, get the data and do something with it.

## /store/namespaces
Namespaces are for organizational purposes only. Namespaces contain actions and states of a given entity for example, User, Product, Order, etc…  So instead of accessing top level state or action, you can access based on namespace. For example:

Top Level: actions.login() or state.isLoggedIn
Namespace: actions.user.getUserDetail() or state.user.username

### Common Namespaces
/store/namespaces/alert
/store/namespaces/hud
/store/namespaces/window
/store/namespaces/pushNotification

## /store/actions
These are the top level actions that not related to any particular namespace. For example:
Top Level: actions.login()

## /store/state
These are the top level state that not related to any particular namespace. For example:
Top Level: state.isLoggedIn

The main thing about OvermindJS is that state and actions are accessible globally in the entire application. So no matter where you are, you can access any state or any action. The views should only be interacting with state or action.  This should make the View layer very clean and straightforward.

## /store/onInitialize
This is important because this is where state is initialized. This always runs first!

# Config.ts
Configuration details should be stored in here. For example, different settings per environment.

# Router.tsx
Obviously this is where the routes are created and managed.

# /styles
Global and common styles should go here.  Always think responsive for all the views we created for different device sized. We use ‘size-matters’ package to help with this. Note that only styled-components should be used.

# /utils
This is for common helpful utility functions