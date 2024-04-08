import { LINK_WARNINGS } from "../../src/constants/values";

describe('Public holiday calendar', () => {
  beforeEach(() => {
    cy.visit('/');
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
    cy.get('[data-testid="multipleLinks"]').should('contain', LINK_WARNINGS.NOT_ENOUGH_COUNTRIES_TEXT);
  })
})

describe('Public holiday calendar with chosen country', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.clearLocalStorage()
    cy.get('[data-testid="searchField"]').click();
    cy.contains('Estonia').click();
  })

  it('supports two+ countries and updates links', () => {
    cy.get('[data-testid="searchField"]').click();
    cy.contains('France').click();
    cy.get('[data-testid="chosenCountry"]').should('have.length', 2);
    cy.get('[data-testid="singleLink"]').should('contains', /EE,FR/i);
    cy.get('[data-testid="links"]').should('have.length', 2);
  })

  it('removes country when clicking "Clear" button', () => {
    cy.get('[data-testid="CancelIcon"]').click();
    cy.get('[data-testid="chosenCountry"]').should('have.length', 0);
  })

  it('removes all countries when clicking "Clear all"', () => {
    cy.get('[data-testid="searchField"]').click();
    cy.contains('France').click();
    cy.get('button[title="Clear"]').click();
    cy.get('[data-testid="chosenCountry"]').should('have.length', 0);
  })
})
