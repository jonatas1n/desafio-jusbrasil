describe('Test notification icon', () => {
    it('check if movements have items', () => {
        cy.visit('/process?id=10066148920224014002');
        cy.wait(800);
        cy.get('.bell-button svg').should('have.css', 'color', 'rgb(216, 216, 216)');
        cy.get('.bell-button').click();
        cy.get('.bell-button svg').should('have.css', 'color', 'rgb(0, 0, 0)');
    })
});