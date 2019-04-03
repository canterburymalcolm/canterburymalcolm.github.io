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

export const PAGES = {
    LANDING: 'landing',
    LOG_IN: 'log in',
    SIGN_UP: 'sign up'
};

export const pageMap = new Map([[PAGES.LANDING, PAGES.SIGN_UP]]);

export const STATES = ['MA', 'CA', 'NY'];