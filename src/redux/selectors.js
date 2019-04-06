//Get the current page which will always be on top of the stack
export const getPage = store => store.pages[store.pages.length - 1];

//Get the current list of user profiles
export const getProfiles = store => store.users.profiles;


//Return this parent if they already exist otherwise
//return the current parent
export const getMom = store => {
    return curIfEmpty(store.parents, store.parents.mom);
};

export const getDad = store => {
    return curIfEmpty(store.parents, store.parents.dad);
};

const curIfEmpty = (parents, parent) => {
    if (Object.entries(parent).length === 0) {
        return parents.current;
    } else {
        return parent;
    }
};