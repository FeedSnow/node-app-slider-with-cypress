describe('Swiper Gallery Test', function () {
  it('Checks if second slide contains "United Kingdom"', function () {
    cy.visit('http://localhost:3000');
    cy.get('.swiper-button-next').click();
    cy.get('.swiper-slide-active').should('contain', 'United Kingdom');
  });

  it('Checks if third slide contains "Paris"', function () {
    cy.visit('http://localhost:3000');
    cy.get('.swiper-button-next').click();
    cy.wait(2000);
    cy.get('.swiper-button-next').click({ force: true });
    cy.wait(2000);
    cy.get('.swiper-slide-active').should('contain', 'Paris');
  });

  it('Allows user to navigate slides using next and previous buttons', function () {
    cy.visit('http://localhost:3000');
    cy.get('.swiper-button-next').click();
    cy.get('.swiper-slide-active').should('exist');
    cy.get('.swiper-button-prev').click();
    cy.get('.swiper-slide-active').should('exist');
  });

  it('Displays title and description correctly for each slide', function () {
    cy.visit('http://localhost:3000');
    let slideCount = 3;
    const titles = ["Rome", "London", "Paris"];
    const descs = ["Italy", "United Kingdom", "France"];
    for (let i = 0; i < slideCount; i++) {
      cy.get('.swiper-slide-active').within(() => {
        cy.get('h1').should('be.visible').should('contain', titles[i]);
        cy.get('p').should('be.visible').should('contain', descs[i]);
      });
      cy.get('.swiper-button-next').click();
      cy.wait(2000);
    }
  });

  it('Ensures gallery adapts correctly on different devices', function () {
    const viewports = [
      { device: 'macbook-15', width: 1440, height: 900 },
      { device: 'ipad-2', width: 768, height: 1024 },
      { device: 'iphone-6', width: 375, height: 667 }
    ];

    viewports.forEach((viewport) => {
      cy.viewport(viewport.width, viewport.height);
      cy.visit('http://localhost:3000');
      cy.get('.swiper').should('be.visible');
      cy.get('.swiper-button-next').should('be.visible').and('not.be.disabled');
      cy.get('.swiper-button-prev').should('be.visible').and('not.be.disabled');
    });
  });

  it('Ensures gallery elements are visible on load', function () {
    cy.visit('http://localhost:3000');
    cy.get('.swiper').should('be.visible');
    cy.get('.swiper-slide').should('have.length.at.least', 3);
    cy.get('.swiper-button-next').should('be.visible').and('not.be.disabled');
    cy.get('.swiper-button-prev').should('be.visible').and('not.be.disabled');
  });
});
