
import "cypress-xpath";
Cypress.Commands.add('login', (options = {}) => {
  const email = options.email || 'sfuyal@gmail.com';
  const password = options.password || 'Test@123';
  
    cy.visit('https://flamboyant-allen-00cf47.netlify.app/login'); 
    cy.get('#email').type(email);
    cy.get('#password').type(password);
    cy.get('.btn').click();
  });
  Cypress.Commands.add('homepage', () => {
    cy.visit('https://flamboyant-allen-00cf47.netlify.app/home'); 
  });
  
  Cypress.Commands.add('calendar', () => {
    cy.xpath("/html/body/app-root/app-signup-page/app-signup/div/div/div[1]/form/div[3]/mat-form-field/div/div[1]/div[1]/span/label/mat-label")
    .should("have.text", "Choose a date");
    //calender click
    cy.get("[aria-label='Open calendar']").click();
    //previous month select
    cy.get("[aria-label='Previous month']").click();
    //next month select
    cy.get("[aria-label='Next month']").click();
    //date select
    cy.xpath("/html/body/div[1]/div[2]/div/mat-datepicker-content/div[2]/mat-calendar/div/mat-month-view/table/tbody/tr[3]/td[5]/div[1]").click();
  });
  Cypress.Commands.add('createtask', () => {
  cy.get(".wrapper > .ant-btn").click();
  //taskname
  cy.get("#taskName").type("abcdef");
  //listname
  cy.get(":nth-child(1) > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex").click();
  cy.get("#mat-option-5 > .mat-option-text").click();
  //priority
  cy.xpath("/html/body/div[1]/div[2]/div/mat-dialog-container/app-new-task/div/div[1]/form/div[2]/div[2]/mat-form-field").click();
  cy.xpath("/html/body/div[1]/div[4]/div/div/div/mat-option[3]").click();
  //date
  cy.get("[type='datetime-local']").type("2017-06-01T08:30");
  cy.get(".new-task-btn > .mat-button-wrapper").click();
  });

  

