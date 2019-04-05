//Get the current page which will always be on top of the stack
export const getPage = store => store.pages[store.pages.length - 1];

//Get the current list of user profiles
export const getProfiles = store => store.users.profiles;