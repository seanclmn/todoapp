# Project for Periodic.is

Biggest bug in this file is regarding keys for the projects and contexts. 
After every change in the input, I am updating state, triggering a rerender. This rerender updates the keys, causing the inputs to lose focus.
I can't think of a way to create a unique key for each project and context, which won't change after a change in state.
One solution is to just not give a key, but doing this makes the delete project function and the delete context function fail, because keys are necessary for this to work.
Without keys, deleting any project will just result in the last project disappearing from the component.

Styling for modal. Some of this styling is from NPM's page for react-modal.
