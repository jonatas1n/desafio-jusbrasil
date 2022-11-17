describe('Test search input', () => {
    it('Typed in input', () => {
        cy.visit('/');
        cy.get('.search__input')
            .type('maria');
        cy.get('.search__btn').click();
        cy.get('.results__item').each( (item, index, list) => {
            expect(list).to.not.have.length(0);
        });
    })
});