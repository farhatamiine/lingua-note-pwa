describe("Testing Home Pages", () => {
  it("renders the notes on the screen", () => {
    cy.visit("http://localhost:5173/");
    cy.get('[data-testid="note-"]');
  });
});
