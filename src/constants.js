export const CREATION_METHODS = {
    PARENT: 'parent',
    DONOR: 'donor',
    NONE: 'none'
};

export class Parent {
    constructor(first, last, dob, age, height, weight, eyes, hair, diorders) {
        this.first = first || '';
        this.last = last || '';
        this.dob = dob || '';
        this.age = age || '';
        this.height = height || '';
        this.weight = weight || '';
        this.eyes = eyes || 'blue';
        this.hair = hair || 'brown';
        this.disorders = diorders || [];
    }
}

export const exampleDonors = [
    new Parent("first", "donor", "1", "1", "1", "1", "green", "blond", ['none']),
    new Parent("second", "donor", "2", "2", "2", "2", "brown", "black", ['none']),
    new Parent("third", "donor", "3", "3", "3", "3", "hazel", "red", ['tay-sachs disease', 'cystic fibrosis']),
];

//All the form ids, 
//to be used to link up submit buttons from outside the forms
export const FORMS = {
    SIGN_UP: 'sign-up-user',
    OLD_USER: 'old-user',
    ADD_USER: 'add-user'
}

//All the pages on the website
export const PAGES = {
    LANDING: 'landing',
    LOG_IN: 'log-in',
    ADD_USER: 'add-user'
};

//A map of each page and the page it transitions to
export const pageMap = new Map([
    [PAGES.LANDING, PAGES.ADD_USER],
    [PAGES.ADD_USER, PAGES.ADD_USER],
    [PAGES.LOG_IN, PAGES.LOG_IN]
]);

//Given a page returns the form for that page if one exists
export const formMap = new Map([
    [PAGES.LANDING, FORMS.SIGN_UP],
    [PAGES.LOG_IN, FORMS.OLD_USER],
    [PAGES.ADD_USER, FORMS.ADD_USER]
]);

export const STATES = ['MA', 'CA', 'NY'];