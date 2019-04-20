import { PAGES, formMap, FORMS } from '../constants';

//Get the current page which will always be on top of the stack
export const getPage = store => store.pages[store.pages.length - 1];

//Get the current list of user profiles
export const getProfiles = store => store.users.profiles;

//Get the form for the current page
export const getForm = store => {
    return formMap.get(getPage(store));
}

//Get the initial state for this form
export const getInitial = store => {
    const form = getForm(store);
    switch (form) {
        case FORMS.ADD_PARENT:
            //return the current parent for this page
            return getPage(store) === PAGES.ADD_MOM ?
                store.parents.mom :
                store.parents.dad;
        default:
            return {};
    }
};

