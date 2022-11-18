describe('Test filters in search page', () => {
  it('click in filters buttons', () => {
    cy.visit('/');
    cy.get('.filter-select').each((item, index, list) => {
      expect(list).to.have.length(4);
      cy.get(item).click();

      cy.get('.chakra-modal__close-btn').click();
    });
  })
});