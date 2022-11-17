describe('Test notification icon', () => {
    it('check if movements have items', () => {
        cy.visit('/process?id=10066148920224014002');
        cy.get('.bell-button svg').should('have.css', 'color', '#d8d8d8');
        cy.get('.bell-button').click();
        cy.get('.bell-button svg').should('have.css', 'color', 'black');
    })
});