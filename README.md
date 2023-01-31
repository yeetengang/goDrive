# GoDrive | A website for easy License Checking & Book Driving Lessons

GoDrive is a single page application (SPA) created using ReactJS. ReactJS is a well-known JavaScript library for user interfaces. The reason to use React for this project is becuase React is great in building single page application that load a single HTML page (index.html), rewrite the DOM when interact, without loading a new page (change URL). This makes the web application to be smoother as there is no waiting time for the page reload to change its content.\

Besides, code written in React can coexist with markup rendered on the server like PHP.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Backend API

GoDrive consists of both front end (This repo) and backend API. Find out more about the backend API coded in php [GoDriveAPI Repository](https://github.com/yeetengang/goDriveAPI.git)

## Installation

Node Package Manager (npm) is required to run this application. 

Use the following command to start GoDrive:
```
npm run start
```

## Screenshots

#### Home Page
![home_page](https://github.com/yeetengang/goDrive/blob/main/images/HomePage.PNG?raw=true)

#### Testimonia Page
![testi_page](https://github.com/yeetengang/goDrive/blob/main/images/Testimonia.png?raw=true)

#### Upcoming Lessons Page
![lesson_page](https://github.com/yeetengang/goDrive/blob/main/images/UpcomingLesson.PNG?raw=true)

## Features

#### User / Student
1. Show upcoming driving lessons updated by Admin
2. Track registered user's license status
3. Register driving or law exams.
4. Show registered driving lessons details (Time, Lesson type, Venue)
5. Send feedback email or contact admin.

#### Admin
1. Check registered users' details.
2. Create and update lessons.
3. Check users that registered for an exam.
4. Update user's license type.
5. Receive feedback email or contact from users.

#### Upcoming Features
1. Show registered exam status (Approved or Rejected)
2. Add Map with marker to show driving center venue.
3. Add driving coach or driving instructor panel.

