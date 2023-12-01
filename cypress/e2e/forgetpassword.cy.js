import "cypress-xpath";
beforeEach(() => {
    cy.homepage();
    cy.get('[routerlink="/forgotPassword"]').click();
  });

describe("forget password functionality",()=>{

    it("verify forget password url correct or not",()=>
    {
        cy.url().should('eq', 'https://flamboyant-allen-00cf47.netlify.app/forgotPassword');
    });

    it("verify title and placeholder of the email address in the forget password",()=>{
     // Verify the title of the email address
    cy.get(".form-label").should("have.text", 'Email Address');
     // Verify the placeholder of the email input field
    cy.get("#email")
        .invoke('attr', 'placeholder')
        .should('eq', 'Enter Your Email');
    });

    it("Forget password with blank email address and clicking on send button should display proper validation message",()=>{
        cy.get("[text='Send']").click();
        cy.get(".error-messages > :nth-child(1)").should('be.visible').and('contain.text', ' Email is Required ');
        cy.get(".error-messages > :nth-child(2)").should('be.visible').and('contain.text', ' Please Enter Valid Email ');
    });

    it("Forget password with invalid email address and clicking on send button should display proper validation message",()=>{
        cy.get("#email").type("abc");
        cy.get("[text='Send']").click();
        cy.get(".invalid-text").should('be.visible').and('contain.text', ' Please Enter Valid Email ');
    });

    it("Forget password with not registered email address and clicking on send button",()=>{
        cy.get("#email").type("dnfskdfck213231@yopmail.sd");
        cy.get("[text='Send']").click();
        cy.get(".message").should('be.visible').and('contain.text', 'Email doesnot exist');
    });

    it("Forget password with registered and valid email address and clicking on send button",()=>{
        cy.get("#email").type("himso27@gmail.com");
        cy.get(".btn").click();
        cy.get(".emailSent-wrapper > img").should("be.visible");
    });
});
