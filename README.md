# Placement Cell Application

## Project description

A company constantly needs to download their data to compile different reports. Here I have created an interface for the employees of the company to fill the data into the database and then download it in CSV format.

## Features

- Home page: The application consists of a home page which is the root page of the application. After logging-in user can access the features of the application.
- Signup page: To signup the employee
- Login page: To enable the employye access the application features by logging in.
- Students page: To create/add a student in placement cell and display the list of students with their details.
- Interview page: This page has multiple features like,
    - creating an interview 
    - assigning a student to an interview 
    - displaying the interview details,
        - displaying the students assigned to a particular interview
        - update the interview status of the student
- Jobs page: which displays the list of jobs fetched from an Remotive API. User can click on link to know about jobs description.
- Download CSV: Employee can download the student and respective interview details from database with this feature.

## Technology used

- Node.js
- Express.js
- mongoose
- mongoDB
- passport.js
- EJS View Engine
- CSS
- Jquery
- Ajax

## Application/Project setup

- Clone the git repository in your local machine by using command,
    - git clone https://github.com/Shivaraj777/placement_cell.git
- Open the project code in VS code.
- Open the terminal and go to root directory of the project.
- Use command, npm install to install all the dependencies.
- use "npm start" command to run the application.
- Open a new tab in any web browser and access the application using localhost:8000

## Hosting

- Hosted on: https://placement-cell-app-i3d5.onrender.com/students/display-students
