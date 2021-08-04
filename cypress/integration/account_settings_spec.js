/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/// <reference types="cypress" />

//compound url

//Test Suite
describe('Home Page Navigation Bar Tests', () => {
    let viewports = [Cypress.env('desktop'),Cypress.env('tablet'),Cypress.env('mobile')];
    
    beforeEach(() => {
        cy.visit(Cypress.env('baseUrl'));
        cy.fixture('user_new_update.json').as('user_update');
        cy.fixture('user_new.json').as('user').then(user=>{
            //Add User
            cy.addUser(user);
        });
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
    viewports.forEach(viewport=>{
        context(`Testing the ${viewport} Version of the application`,()=>{
                it(`Account Settings Elements`,()=>{
                    cy.get('@user').then(user=>{
                        cy.testAccountSettingsElements(viewport,user);
                    });
                });
                it(`Account Settings Change Email`,()=>{
                    cy.get('@user').then(user=>{
                        cy.get('@user_update').then(update_user=>{
                            cy.testChangeUserEmail(viewport,user,update_user);
                        });
                       
                    });
                });
                it(`Account Settings Change Password`,()=>{
                    cy.get('@user').then(user=>{
                        cy.get('@user_update').then(update_user=>{
                            cy.testChangeUserPassword(viewport,user,update_user);
                        });
                       
                    });
                });
                it(`Account Settings Delete Account`,()=>{
                    cy.get('@user').then(user=>{
                            cy.testDeleteAccount(viewport,user);
                        });
                    });
        });
    });
});