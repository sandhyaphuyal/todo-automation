import 'cypress-xpath';
describe('Login Tests', () => {
    beforeEach(() => {
      cy.homepage();
      cy.get('[routerlink="/login"]').click();
    });
  
    it('should have valid login url', () => {
      cy.url().should('eq', 'https://flamboyant-allen-00cf47.netlify.app/login'); 
    });

    it("verify whether it is login module or not", () => {
      cy.xpath("/html/body/app-root/app-login/div/div/div[1]/div/h2")
        .should('have.text', 'Login to your account');
    });
    
    it("verify title and placeholder of email address in the login model", () => {
      // Verify the title of the email address field
      cy.xpath("/html/body/app-root/app-login/div/div/div[1]/form/div[1]/label")
        .should("have.text", 'Email address');
      // Verify the placeholder of the email input field
      cy.get("#email")
        .should("have.attr", "placeholder", "Enter Your Email");
    });

    it("verify title and placeholder of Password in the login model", () => {
      // Verify the title of the email address field
      cy.xpath("/html/body/app-root/app-login/div/div/div[1]/form/div[2]/label")
        .should("have.text", 'Password');
      // Verify the placeholder of the email input field
      cy.get("#password")
        .should("have.attr", "placeholder", "Enter Your Password");
    });

    it ("verify forget password link clickability and redirection",()=>{
      cy.get('.forgot-password').click();
      cy.url().should('eq', 'https://flamboyant-allen-00cf47.netlify.app/forgotPassword'); 
      cy.get('[routerlink="/login"]').click();   
    });

    it("verify login button clickability function, background color, and font color", () => {
      cy.login();
      cy.visit('https://flamboyant-allen-00cf47.netlify.app/login'); 
      cy.get(".btn")
        // Check the background color
        .should('have.css', 'background-color', 'rgb(190, 38, 59)') 
        // Check the font color 
        .and('have.css', 'color', 'rgb(255, 255, 255)');
    });

    it('should display an error for empty email and password', () => {
      const invalidPassword = " ";
      const email = " ";
     // Perform login with empty email and password
    cy.visit('https://flamboyant-allen-00cf47.netlify.app/login'); 
    cy.get('#email').type(email);
    cy.get('#password').type(invalidPassword);
    //  login button is disabled
      cy.get('.btn')
      .should('have.attr', 'disabled');
  });

      it('should login successfully with valid credentials', () => {
        cy.login();
      // user is redirected to the expected page after successful login
        cy.url().should('eq', 'https://flamboyant-allen-00cf47.netlify.app/dashboard');
      });
    
      it('should display an error for valid email and invalid password', () => {
        //password to an invalid one
        const invalidPassword = 'Test@000';
        // Plogin with valid email and invalid password
        cy.login({
          password: invalidPassword
        });
        // error message is displayed
        cy.xpath('/html/body/app-root/app-login/div/div/div[1]/form/div[2]/div[3]')
          .should('have.class', 'invalid-text')
          .and('contain.text', " Incorrect Password ! ");
    });


    it('should display an error for invalid email and invalid password', () => {
      // password to an invalid one
      const email="abc";
      const invalidPassword = 'Test@000';
      // login with valid email and invalid password
      cy.visit('https://flamboyant-allen-00cf47.netlify.app/login'); 
      cy.get('#email').type(email);
      cy.get('#password').type(invalidPassword);
      // error message is displayed with class 'invalid-text'
      cy.xpath('/html/body/app-root/app-login/div/div/div[1]/form/div[1]/div')
        .should('have.class', 'invalid-text')
        .and('contain.text', " Invalid Input ");
    
  });

  it('should display an error for not registered email users', () => {
    const email="abc@yopmail.com";
    const invalidPassword = 'Test@000';
    //login with unregistered email
    cy.visit('https://flamboyant-allen-00cf47.netlify.app/login'); 
    cy.get('#email').type(email);
    cy.get('#password').type(invalidPassword);
    // error message is displayed 
    cy.xpath('/html/body/app-root/app-login/div/div/div[1]/form/div[1]/div')
      .should('have.class', 'invalid-text')
      .and('contain.text', " Invalid Input ");
  
});

it('should toggle visibility of the password field', () => {
  //password field is initially masked
  const invalidPassword = 'Test@000';
  cy.get('#password').type(invalidPassword);
  cy.get('#password')
      .should('have.attr', 'type', 'password');
  // Click on the toggle button to reveal the password
  cy.xpath('/html/body/app-root/app-login/div/div/div[1]/form/div[2]/fa-icon[2]').click();
  // Verify if the password is visible
  cy.get('#password')
      .should('have.attr', 'type', 'text');
});
    
});
    


    
    

  
  
  