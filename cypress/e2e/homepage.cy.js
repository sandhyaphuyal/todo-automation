import 'cypress-xpath';
describe('Home Page Buttons', () => {

    beforeEach(() => {
        cy.homepage();
      });
  
    it('should redirect to Dashboard if user logged in', () => {
       // if user is logged in
        localStorage.setItem("loggedIn", "True");   
        cy.wait(2000)
        const userIsLoggedIn = !!localStorage.getItem("loggedIn");   
        cy.get('[routerlink="/dashboard"]').click();
        cy.url().then(($url) => {
          if (userIsLoggedIn) {
            expect($url).to.include('https://flamboyant-allen-00cf47.netlify.app/dashboard');
          } else {
            expect($url).to.include('https://flamboyant-allen-00cf47.netlify.app/login');
          }
        });
      });

      it('should redirect to login page based if user is logged out', () => {
        // if user is logged out
          localStorage.setItem("loggedIn", "False");   
          cy.wait(2000)
          const userIsLoggedOut = !!localStorage.getItem("loggedOut");   
          cy.get('[routerlink="/dashboard"]').click();
          cy.url().then(($url) => {
            if (userIsLoggedOut) {
              expect($url).to.include('https://flamboyant-allen-00cf47.netlify.app/dashboard');
            } else {
              expect($url).to.include('https://flamboyant-allen-00cf47.netlify.app/login');
            }
          });
        });
    
    it('should redirect to the Signup page', () => {
      cy.get('[routerlink="/signUp"]').click(); 
      cy.url().should('eq', 'https://flamboyant-allen-00cf47.netlify.app/signUp');
      cy.homepage();
      cy.xpath('/html/body/app-root/app-home/nav/a[4]/button/span[1]')
      .should('have.text','Sign Up');
      cy.xpath('/html/body/app-root/app-home/nav/a[4]/button')
      .should('have.css', 'color', 'rgb(255, 255, 255)');
    });
  
    it('should redirect to the Reset Password page', () => {
      cy.get('[routerlink="/resetPassword"]').click(); 
      cy.on('window:alert', (message) => {
        expect(message).to.equal('Please Login to Continue');
      });
      cy.homepage();
      cy.xpath('/html/body/app-root/app-home/nav/a[5]/button/span[1]')
      .should('have.text','Reset Password');
      cy.xpath('/html/body/app-root/app-home/nav/a[5]/button')
      .should('have.css', 'color', 'rgb(255, 255, 255)');
    });
  
    it('should redirect to the Forget Password page', () => {
      cy.get('[routerlink="/forgotPassword"]').click();
      cy.url().should('eq', 'https://flamboyant-allen-00cf47.netlify.app/forgotPassword');
      cy.homepage();
      cy.xpath('/html/body/app-root/app-home/nav/a[6]/button/span[1]')
      .should('have.text','Forgot Password');
      cy.xpath('/html/body/app-root/app-home/nav/a[6]/button')
      .should('have.css', 'color', 'rgb(255, 255, 255)');
  });
})