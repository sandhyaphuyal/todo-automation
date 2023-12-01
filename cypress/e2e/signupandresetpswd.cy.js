import 'cypress-xpath';
describe('Signup Tests', () => {
    beforeEach(() => {
      cy.homepage();
      cy.get('[routerlink="/signUp"]').click();
    });
    const emailtest="sfuyal@gmail.com";
  
    it('should have valid signup url', () => {
      cy.url().should('eq', 'https://flamboyant-allen-00cf47.netlify.app/signUp'); 
    });

    it("verify whether it is signup module or not", () => {
      cy.xpath("/html/body/app-root/app-signup-page/app-signup/div/div/div[1]/div/h2")
        .should('have.text', "Let's get started");
    });
    it("verify title and placeholder of Name in the signup model", () => {
      // Verify the title of the name
      cy.get("[for='name']")
        .should("have.text", 'Name');
      // Verify the placeholder of the email input field
      cy.get("#name")
        .should("have.attr", "placeholder", "Enter Your Name");
    });


    it("verify title and radio elements of Gender are clickable in the signup model", () => {
    // Verify the title of the name
    cy.get("[for='gender']")
     .should("have.text", 'Gender');
     //Male button
     cy.get("#mat-radio-2-input").click({ force: true });
     //female button
     cy.get("#mat-radio-3-input").click({ force: true });
     //others button
     cy.get("#mat-radio-4-input").click({ force: true });
  });


   it("Verify choose a date title and placeholder and calender clickability",()=>{
    // Verify the title of the date
      cy.get("[for='date']")
        .should("have.text", 'DOB');
       cy.calendar();
     });


     it("Verify Phone number field has title and proper place holder and country select drop down function",()=>{
     
      cy.xpath("/html/body/app-root/app-signup-page/app-signup/div/div/div[1]/form/div[4]/ngx-intl-tel-input/div/input")
        .should("have.attr", "placeholder", "+93 23 456 7890");
        //country dropdown
        cy.get(".iti__arrow").click();
        cy.get("#iti-0__item-dz").click();
         //title of phone number
      cy.get("[for='phone number']").should('exist');
     });


     it("verify title and place holder of email address", () => {
    // Verify the title of the name
    cy.get("[for='email']")
     .should("have.text", 'Email Address');
     });


     it("Verify behavior when 'Next' button is clicked without filling any field", () => {
    // Click on the 'Next' button without filling any field
    cy.get('[text="Next"]').click();
    cy.get(":nth-child(1) > .error-messages > .invalid-text").should('be.visible').and('contain.text', ' Name is Required ');
    cy.get(":nth-child(2) > .error-messages > .invalid-text").should('be.visible').and('contain.text', ' Gender is Required ');
    cy.get(":nth-child(3) > .error-messages > .invalid-text").should('be.visible').and('contain.text', ' Date of Birth is Required ');
    cy.get(":nth-child(4) > .error-messages > .invalid-text").should('be.visible').and('contain.text', ' Phone Number is Required ');
    cy.get(":nth-child(5) > .error-messages > .invalid-text").should('be.visible').and('contain.text', ' Email is Required ');
  });

  it("Verify behavior of signup page with with invalid data", () => {
    // Enter invalid name (less than 3 characters and number)
    cy.get('#name').type('2');
    // Select gender
    cy.get('#mat-radio-2-input').click({ force: true });
    // Select date of birth
    cy.xpath("/html/body/app-root/app-signup-page/app-signup/div/div/div[1]/form/div[3]/mat-form-field/div/div[1]/div[1]/span/label/mat-label")
        .should("have.text", "Choose a date");
        //calender click
        cy.get("[aria-label='Open calendar']").click();
        //previous month select
        cy.get("[aria-label='Previous month']").click();
        //date select
        cy.xpath("/html/body/div[1]/div[2]/div/mat-datepicker-content/div[2]/mat-calendar/div/mat-month-view/table/tbody/tr[3]/td[5]/div[1]").click();
    // Enter invalid phone number
    cy.get('#phone').type('123');
    // Enter invalid email
    cy.get('#email').type('invalidemail@');
    // Click on the 'Next' button
    cy.get('[text="Next"]').click();
    // error messages are displayed for each invalid field
    cy.get(":nth-child(1) > .error-messages > .invalid-text").should('be.visible').and('contain.text', ' Enter Valid Name ');
    cy.get(".error-messages > :nth-child(2)").should('be.visible').and('contain.text', ' Name can only contain letters ');
    cy.get(":nth-child(4) > .error-messages > .invalid-text").should('be.visible').and('contain.text', ' Please Enter Valid Phone ');
    cy.get(":nth-child(5) > .error-messages > .invalid-text").should('be.visible').and('contain.text', ' Please Enter Valid Email ');
});


it("Verify behavior of signup page with spaces containig first name and other invalid data", () => {
    // Enter name with spaces only
    cy.get('#name').type('    ');
    // Select gender
    cy.get('#mat-radio-2-input').click({ force: true });
    // Select date of birth
    cy.xpath("/html/body/app-root/app-signup-page/app-signup/div/div/div[1]/form/div[3]/mat-form-field/div/div[1]/div[1]/span/label/mat-label")
     .should("have.text", "Choose a date");
        //calender click
        cy.get("[aria-label='Open calendar']").click();
        //previous month select
        cy.get("[aria-label='Previous month']").click();
        //date select
        cy.xpath("/html/body/div[1]/div[2]/div/mat-datepicker-content/div[2]/mat-calendar/div/mat-month-view/table/tbody/tr[3]/td[5]/div[1]").click();
    // Enter invalid phone number
    cy.get('#phone').type('123');
    // Enter invalid email
    cy.get('#email').type('invalidemail@');
    // Click on the 'Next' button
    cy.get('[text="Next"]').click();
    //error messages are displayed for each invalid field
      cy.get(":nth-child(4) > .error-messages > .invalid-text").should('be.visible').and('contain.text', ' Please Enter Valid Phone ');
    cy.get(":nth-child(5) > .error-messages > .invalid-text").should('be.visible').and('contain.text', ' Please Enter Valid Email ');
    cy.get(":nth-child(1) > .error-messages > .invalid-text").should('be.visible').and('contain.text', ' Enter Valid Name ');
  
});

it("Verify signup allowed for already registered email user or not", () => {
    cy.get('#name').type('John Doe');
    cy.get('#mat-radio-2-input').click({ force: true }); 
    // Select date of birth
     cy.calendar();
    cy.get('#email').type(emailtest);
    cy.get('[text="Next"]').click();
    //  sign up again with the same email
    cy.visit('https://flamboyant-allen-00cf47.netlify.app/signUp'); 
    //  signup form with the same email
    cy.get('#name').type('sandhya phuyal');
    cy.get('#mat-radio-2-input').click({ force: true });
    //date of birth
    cy.calendar();
        cy.get('#phone-number').type('9876543210'); 
        //alrady existed user
        cy.get('#email').type(emailtest);
      // 'Next' button
    cy.get('[text="Next"]').click();
    //validation state is visible for the duplicate email
    cy.get(":nth-child(5) > .error-messages > .invalid-text")
        .should('be.visible')
        .and('contain.text', 'Email is already registered');
});


   it("Verify signup page with invalid data (future date selected)", () => {
    // Select date of birth
    cy.xpath("/html/body/app-root/app-signup-page/app-signup/div/div/div[1]/form/div[3]/mat-form-field/div/div[1]/div[1]/span/label/mat-label")
        .should("have.text", "Choose a date");
    // Open the calendar
    cy.get("[aria-label='Open calendar']").click();
    const futureDate = new Date();
    futureDate.setMonth(futureDate.getMonth() + 1); 
    const futureDay = futureDate.getDate();
    // Date select
     cy.get(".mat-calendar-body-active .mat-calendar-body-cell-content")
        .contains(futureDay)
        .click();
    // Click on the 'Next' button
    cy.get('[text="Next"]').click();
    // an error message or validation state is visible
    cy.get(":nth-child(3) > .error-messages > .invalid-text")
        .should('be.visible')
        .and('contain.text', 'Please select a valid date of birth');
});


it("Verify clickable functionality and redirection after clicking next button in signup page with valid data ", () => {
    cy.get('#name').type('sandhya phuyal');
    cy.get('#mat-radio-2-input').click({ force: true });
    cy.calendar();
    cy.get('#phone').type('9869416100');
    cy.get('#email').type('invalidemail@gmail.com');
    cy.get('[text="Next"]').click();
    // redirection to the 'setPassword' page
    cy.url().should('eq', 'https://flamboyant-allen-00cf47.netlify.app/signUp/setPassword')
});


it("Verify Reset password functionality with invalid new password ", () => {
    cy.get('#name').type('sandhya phuyal');
    cy.get('#mat-radio-2-input').click({ force: true });
   cy.calendar();
    cy.get('#phone').type('9869416100');
    cy.get('#email').type('invalidemail@gmail.com');
    cy.get('[text="Next"]').click();
    // redirection to the 'setPassword' page
    cy.url().should('eq', 'https://flamboyant-allen-00cf47.netlify.app/signUp/setPassword');
    //set password page
    cy.get("[name='password']").type("1@");
        cy.get(".error-messages > :nth-child(1)")
        .should('be.visible')
        .and('contain.text', ' Must Be atleast 8 characters! ');
        cy.get(".text-sucess")
        .should('be.visible')
        .and('contain.text', ' Must contain atleast 1 number! ');
        cy.get(".error-messages > :nth-child(3)")
        .should('be.visible')
        .and('contain.text', ' Must contain atleast one uppercase character! ');
        cy.get(".error-messages > :nth-child(4)")
        .should('be.visible')
        .and('contain.text', ' Must contain atleast one lowercase character! ');
        cy.get(".text-sucess")
        .should('be.visible')
        .and('contain.text', ' Must contain atleast one special character! ');

});

it("Verify reset password with valid new password and not matching confirm password ", () => {
    cy.get('#name').type('sandhya phuyal');
    cy.get('#mat-radio-2-input').click({ force: true });
    cy.calendar();
    cy.get('#phone').type('9869416100');
    cy.get('#email').type('invalidemail@gmail.com');
    cy.get('[text="Next"]').click();
    // redirection to the 'setPassword' page
    cy.url().should('eq', 'https://flamboyant-allen-00cf47.netlify.app/signUp/setPassword');
    //set password page
    cy.get("[name='password']").type("Test@123");
    //confirm password
    cy.get("[name='confirmPassword']").type("Test@000");
     cy.get(":nth-child(2) > .error-messages > .invalid-text")
        .should('be.visible')
        .and('contain.text', ' Password Must Match ');
});


it('verify toggle visibility of the new password and confirm password field in reset password page', () => {
  cy.get('#name').type('sandhya phuyal');
  cy.get('#mat-radio-2-input').click({ force: true });
 cy.calendar();
  cy.get('#phone').type('9869416100');
  cy.get('#email').type('invalidemail@gmail.com');
  cy.get('[text="Next"]').click();
  // redirection to the 'setPassword' page
  cy.url().should('eq', 'https://flamboyant-allen-00cf47.netlify.app/signUp/setPassword');
  // Ensure the password field is initially masked
  const invalidPassword = 'Test@000';
  cy.get("[name='password']").type(invalidPassword);
  cy.get("[name='confirmPassword']").type(invalidPassword);
  cy.get("[name='password']")
      .should('have.attr', 'type', 'password');
  cy.get("[name='confirmPassword']")
      .should('have.attr', 'type', 'password');
  // Click on the toggle button to reveal the new password
  cy.get(':nth-child(1) > .right-icon').click();
  // Click on the toggle button to reveal the confirm password
  cy.get(':nth-child(2) > .right-icon').click();
  // Verify if the new password is visible
  cy.get("[name='password']")
      .should('have.attr', 'type', 'text');
  // Verify if the confirm password is visible 
  cy.get("[name='confirmPassword']")
  .should('have.attr', 'type', 'text');
});

it("Verify reset password functionality with valid new password and matching confirm password ", () => {
    cy.get('#name').type('sandhya phuyal');
    cy.get('#mat-radio-2-input').click({ force: true });
    cy.calendar();
    cy.get('#phone').type('9869416100');
    cy.get('#email').type('invalidemail@gmail.com');
    cy.get('[text="Next"]').click();
    // redirection to the 'setPassword' page
    cy.url().should('eq', 'https://flamboyant-allen-00cf47.netlify.app/signUp/setPassword');
    //set password page
    cy.get("[name='password']").type("Test@123");
    //confirm password
    cy.get("[name='confirmPassword']").type("Test@123");
    //signup btn
    cy.get("[text='Sign up']").click();
    cy.url().should('eq', 'https://flamboyant-allen-00cf47.netlify.app/dashboard');
    
});
});
