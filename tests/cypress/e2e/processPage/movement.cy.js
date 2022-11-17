describe('Test movement', () => {
    it('check if movements have items', () => {
        cy.visit('/process?id=10066148920224014002');
        cy.get('.vertical-timeline-element--work')
            .each( (item, index, list) => {
                expect(list).to.not.have.length(0);
            });
    })
});