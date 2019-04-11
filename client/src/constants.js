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
    ADD_USER: 'add-user',
    ADD_PARENT: 'add-parent',
    ADD_DONOR: 'add-donor'
}

//All the pages on the website
export const PAGES = {
    LANDING: 'landing',
    LOG_IN: 'log-in',
    ADD_USER: 'add-user',
    ADD_MOM: 'add-mom',
    ADD_DAD: 'add-dad',
    DONOR_MOM: 'donor-mom',
    DONOR_DAD: 'donor-dad'
};

//A map of each page and the page it transitions to
export const pageMap = new Map([
    [PAGES.LANDING, PAGES.ADD_USER],
    [PAGES.ADD_USER, PAGES.ADD_MOM],
    [PAGES.LOG_IN, PAGES.ADD_MOM],
    [PAGES.ADD_MOM, PAGES.ADD_DAD],
    [PAGES.DONOR_MOM, PAGES.ADD_DAD]
]);

//Given a page returns the form for that page if one exists
export const formMap = new Map([
    [PAGES.LANDING, FORMS.SIGN_UP],
    [PAGES.LOG_IN, FORMS.OLD_USER],
    [PAGES.ADD_USER, FORMS.ADD_USER],
    [PAGES.ADD_MOM, FORMS.ADD_PARENT],
    [PAGES.DONOR_MOM, FORMS.ADD_DONOR]
]);

const TITLES = {
    LANDING: "Let's create your account to get started designing a baby!",
    LOG_IN: "Welcome back! Log in with your info below.",
    ADD_USER: "Hello! Please tell us a little bit about yourself.",
    MOM: "Step one is adding a mom.",
    DAD: "Now we just need a dad"
};

export const titleMap = new Map([
    [PAGES.LANDING, TITLES.LANDING],
    [PAGES.LOG_IN, TITLES.LOG_IN],
    [PAGES.ADD_USER, TITLES.ADD_USER],
    [PAGES.ADD_MOM, TITLES.MOM],
    [PAGES.ADD_DAD, TITLES.DAD],
    [PAGES.DONOR_MOM, TITLES.MOM],
    [PAGES.DONOR_DAD, TITLES.DAD]
]);

export const optionBarMap = new Map([
    ['method', ['Create a New Parent', 'Choose From Donors']],
    ['eye', ['Blue', 'Green', 'Brown', 'Hazel']],
    ['hair', ['Brown', 'Black', 'Blond', 'Red']],
    ['emotion', ['Unstable', 'Stable', 'Very Stable']],
    ['strength', ['Weak', 'Average', 'Strong']]
]);

export const disorders = [
    'Sickle Cell Anemia',
    'Cystic Fibrosis',
    'Down Syndrome',
    'Tay-Sachs',
    'Thalassemia',
    'Marfan Syndrome'
]

export const STATES = ['MA', 'CA', 'NY'];