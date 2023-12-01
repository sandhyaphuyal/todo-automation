import moment from "moment";
import "cypress-xpath";
describe("Dashboard test",()=>{
  beforeEach(function () {
    const currentTestTitle = this.currentTest.title;
  
    if (currentTestTitle !== 'should redirect to Dashboard if user logged in') {
      // Run cy.login() for all tests except the excluded one
      cy.login();
    }
  });

      it('should have valid dashboard url', () => {
        cy.url().should('eq', 'https://flamboyant-allen-00cf47.netlify.app/dashboard'); 
      });

      it('user should be able to logout',()=>{
        cy.get(".header-right > .ant-btn").click();
        cy.url().should('eq', 'https://flamboyant-allen-00cf47.netlify.app/home'); 
      })

      it('user should not be able to go to dasboard after logut by clicking backbutton',()=>{
        cy.get(".header-right > .ant-btn").click();
        cy.url().should('eq', 'https://flamboyant-allen-00cf47.netlify.app/home'); 
        cy.go("back");
        cy.url().should('not.eq', 'https://flamboyant-allen-00cf47.netlify.app/dashboard'); 
      })

      it('should redirect to Dashboard if user logged in', () => {
        cy.homepage();
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
        
       it(" while clicking on TODO APP should redirect to home page or not",()=>
        {
          cy.wait(200);
         cy.get("[routerlink='/home']").click();
         cy.url().should('eq', 'https://flamboyant-allen-00cf47.netlify.app/home');
        })

        it("the date in the dashboard should be today date", () => {
          // Get the current date
          const today = new Date();
          const options = { year: 'numeric', month: 'long', day: 'numeric' };
          const formattedToday = moment().format('D MMMM YYYY')
          cy.get(".date").should('have.text', formattedToday);
        });

        it("today's, overdue and upcoming tasks images should be correct",()=>{
          cy.get(":nth-child(1) > .overview-img")
          .should('have.attr', 'src', '../../../assets/icons/todayTask.svg');
          cy.get(":nth-child(2) > .overview-img")
          .should('have.attr', 'src', '../../../assets/icons/upcommingTask.svg');
          cy.get(":nth-child(3) > .overview-img")
          .should('have.attr', 'src', '../../../assets/icons/overdue.svg');
        });

        it('the sum of total tasks should be equal to todays task', () => {
          cy.wait(4000)
          // Get the content of h1 elements under :nth-child(1), :nth-child(2), and :nth-child(3)
          cy.get(':nth-child(1) > .overview-content > h1')
            .invoke('text')
            .then(text1 => {
              cy.get(':nth-child(2) > .overview-content > h1')
                .invoke('text')
                .then(text2 => {
                  cy.get(':nth-child(3) > .overview-content > h1')
                    .invoke('text')
                    .then(text3 => {
                      const sumOfContents = parseInt(text1) + parseInt(text2) + parseInt(text3)
                      cy.log({sumOfContents})
                      let myNumber = sumOfContents;
                      let myString = myNumber.toString();
                      cy.log(111, myNumber, typeof myNumber)
                      //total count of tasks
                      cy.get('h1.ng-tns-c111-0 > .ng-tns-c111-0').invoke('text')
                      .should('eq',` ${myString} `);
                    });
                });
            });
        });

        it("verify user able to delete task", () => {
          // Create task
          cy.createtask();
          // Select and delete task
          cy.get("#mat-checkbox-1 > label > span.mat-checkbox-inner-container.mat-checkbox-inner-container-no-side-margin").click();
          cy.get("app-today-task.ng-tns-c111-0 > :nth-child(1) > .ant-btn").click();
      });
      
        it("user should be able to create task with valid data user",()=>{
          cy.createtask();
        });

        it("user should not be able to create task with blank data",()=>{
          cy.get(".wrapper > .ant-btn").click();
           //taskname
         cy.get("#taskName").type("abcdef").clear();
         //listname
         cy.get(":nth-child(1) > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex").click();
         cy.get("#mat-option-0 > .mat-option-text").click();
        //priority
        cy.xpath("/html/body/div[1]/div[2]/div/mat-dialog-container/app-new-task/div/div[1]/form/div[2]/div[2]/mat-form-field").click();
        cy.xpath("/html/body/div[1]/div[4]/div/div/div/mat-option[1]/span").click();
        //date
        cy.get("[type='datetime-local']").type("2017-06-01T08:30");
          cy.get(".new-task-btn > .mat-button-wrapper").click();
          cy.xpath("/html/body/div[1]/div[2]/div/mat-dialog-container/app-new-task/div/div[1]/form/div[1]/mat-error").should('be.visible').and('contain.text', 'Task Name is invalid');
          cy.xpath("/html/body/div[1]/div[2]/div/mat-dialog-container/app-new-task/div/div[1]/form/div[2]/div[1]/mat-form-field/div/div[3]/div/mat-error").should('be.visible').and('contain.text', 'Please choose a List');
        });

        it("user should not be able to create task with invalid data",()=>{
          cy.get(".wrapper > .ant-btn").click();
          //taskname
        cy.get("#taskName").type("a");
        //listname
        cy.get(":nth-child(1) > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex").click();
        cy.get("#mat-option-0 > .mat-option-text").click();
       //priority
       cy.xpath("/html/body/div[1]/div[2]/div/mat-dialog-container/app-new-task/div/div[1]/form/div[2]/div[2]/mat-form-field").click();
       cy.xpath("/html/body/div[1]/div[4]/div/div/div/mat-option[1]/span").click();
       //date
       cy.get("[type='datetime-local']").type("2017-06-01T08:30");
         cy.get(".new-task-btn > .mat-button-wrapper").click();
         cy.xpath("/html/body/div[1]/div[2]/div/mat-dialog-container/app-new-task/div/div[1]/form/div[1]/mat-error").should('be.visible').and('contain.text', 'Task Name is invalid');
         cy.xpath("/html/body/div[1]/div[2]/div/mat-dialog-container/app-new-task/div/div[1]/form/div[2]/div[1]/mat-form-field/div/div[3]/div/mat-error").should('be.visible').and('contain.text', 'Please choose a List');
          
        });

        it("user should be able to create list with valid data",()=>{
          cy.get("header.d-flex > .ant-btn").click();
          cy.get("[name='list']").type("list");
          cy.xpath("/html/body/div[1]/div[2]/div/mat-dialog-container/app-new-list/div/div[2]/button[2]").click();
        });
        it("user should not be able to create list with invalid data",()=>{
          cy.get("header.d-flex > .ant-btn").click();
          cy.get("[name='list']").type("1");
          cy.xpath("/html/body/div[1]/div[2]/div/mat-dialog-container/app-new-list/div/div[2]/button[2]").click();
          cy.get("#mat-dialog-0 > app-new-list > div > div.mat-dialog-content > form > div > div").should('be.visible').and('contain.text', ' List name must only contain text ');

        });
        it("user should not be able to create list with blank data",()=>{
          cy.get("header.d-flex > .ant-btn").click();
          cy.xpath("/html/body/div[1]/div[2]/div/mat-dialog-container/app-new-list/div/div[2]/button[2]").click();
          cy.get("#mat-dialog-0 > app-new-list > div > div.mat-dialog-content > form > div > div").should('be.visible').and('contain.text', 'You must enter a value');

          
        });




        
        
        

})