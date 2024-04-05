import { LINK_WARNINGS } from "../../src/Components/iCalSubscription/Subscription";

describe('Public holiday calendar', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Visits the page', () => {
    cy.contains(/public holiday calendar/i);
  })

  it('Renders the empty countries and links on first visit', () => {
    cy.get('[data-testid="chosenCountry"]').should('have.length', 0);
    cy.get('[data-testid="singleLink"]').should('contain', LINK_WARNINGS.NO_COUNTRY_TEXT);
    cy.get('[data-testid="multipleLinks"]').should('contain', LINK_WARNINGS.NO_COUNTRY_TEXT);
  })

  it('supports choosing countries and updates links', () => {
    cy.get('[data-testid="searchField"]').click();
    cy.contains('Estonia').click();
    cy.get('[data-testid="chosenCountry"]').should('have.length', 1);
    cy.get('[data-testid="singleLink"]').should('contains', /EE/i);
    cy.get('[data-testid="multipleLinks"]').should('contains', LINK_WARNINGS.NOT_ENOUGH_COUNTRIES_TEXT);
  })
})
