# Creating Angular 2 App Step By Step

## Step 0
Environment setup for angular 2 app

## Step 1
Bootstrapping app with root component

## Step 2
Displaying Projects list which covers below angular 2 concepts:
- Component nesting
- Built-in structural directive
- One-way data binding, property binding and event binding
- Component lifecycle hooks

## Step 3
Displaying selected project details. This shows how to perform communication using below concepts:
- @Input decorator
- Communication using local variable in template
- Communication using event binding and @Output decorator

## Step 4
Displaying date in readable format and filtering projects by name. This covers below angular 2 concepts:
- Built-in pipes
- How to create custom filter pipe

## Step 5
Converting filter textbox to material design text field and showing client details in popover. This covers below angular 2 concepts:
- How to create custom attribute directives
- Usage of third party library, like jquery, in directive

## Step 6
Fetching project data from dummy api to show use of services, dependency injection and Http service.

### Step 6.1
Moving hardcoded project data to project service. This covers below angular 2 concepts:
- Usage of angular 2 service
- How dependency injection works

### Step 6.2
As we know that project data is going to come from some api, it is good to have models/interfaces for all entities for better maintainability. 
So in this step we created project model class and interfaces for employee and client. Then we added type annotation wherever project entity is used.

### Step 6.3
Using Http service of angular 2 to load project list. Here, we are using a2-in-memory-web-api simulator to simulate Http calls.

### Step 6.4
Adding methods for CRUD operation of project. Common exception service is created to handle exeption from project, employee and client services. This shows how to 
inject dependency in service.

## Step 7
Adding functionality to add/update/delete project. This covers below angular 2 concepts:
- Usage of ngModel directive
- How to implement custom two-way data binding
- How to maintain validity of form using ngControl and ngForm
- Usage of ViewChild decorator to access child component's methods from parent component 

## Step 8
Adding dashboard to have quick access to active projects. This step covers below angular 2 concepts: 
- How to configure routing
- Routing using routeLink directive or using Router service
- How to pass route params 
- How to use route lifecycle hooks like routerCanDeactivate
- How to intercept routing in parent component