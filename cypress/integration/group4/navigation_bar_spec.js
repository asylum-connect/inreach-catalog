/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/// <reference types="cypress" />

//compound url

//Test Suite
describe('Home Page Navigation Bar Tests', () => {
	let viewports = [
		Cypress.env('desktop'),
		Cypress.env('tablet'),
		Cypress.env('mobile')
	];

	beforeEach(() => {
		cy.visit(Cypress.env('baseUrl'));
		cy.fixture('user_new.json').as('user');
	});
	afterEach(() => {
		//Do the clean up
		cy.deleteUsersIfExist();
	});

	//Root
	it('Root Test - Elements', () => {
		cy.root().should('match', 'html');
	});

	//Components and Action
	viewports.forEach((viewport) => {
		context(`Testing the ${viewport} Version of the application`, () => {
			it(`Navigation Bar Elements`, () => {
				cy.get('@user').then((user) => {
					cy.addUser(user).then(()=>{
						cy.testNavigationBar(viewport, user);
					});
				});
			});
		});
	});
});
