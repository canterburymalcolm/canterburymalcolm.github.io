import { PAGES, formMap, FORMS } from '../constants';

//Get the current page which will always be on top of the stack
export const getPage = (store, source) => {
    return store.pages[store.pages.length - 1]
}

//Get the current list of user profiles
export const getProfiles = store => store.users.profiles;

//Get the form for the current page
export const getForm = store => {
    const page = getPage(store);
    return formMap.get(page);
}

//Get the initial state for this form
export const getInitial = store => {
    const form = getForm(store);
    switch (form) {
        case FORMS.ADD_PARENT:
            //return the current parent for this page
            return getPage(store, 'initial') === PAGES.ADD_MOM ?
                store.parents.mom :
                store.parents.dad;
        case FORMS.ADD_DONOR:
            return { method: 'Choose From Donors' };
        default:
            return {};
    }
}

//Returns the gender of the parent currently being added
export const getGender = store => {
    const page = getPage(store);
    return (page === PAGES.ADD_MOM || page === PAGES.DONOR_MOM) ? 1 : 2
}

