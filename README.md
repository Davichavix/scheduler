# Interview Scheduler

Interview Scheduler is a single-page application (SPA) that allows users to book interviews between students and interviewer. The React front end makes requests to an API to fetch and store appointment data from a seperate database.

A link to the scheduler API is here - Both Scheduler and Scheduler-api are requried to run simultaneously for full project functionality.
[scheduler-api](https://github.com/Davichavix/scheduler-api)

# Interview Scope
- Appointments are between 12PM and 5PM, Monday to Friday
- Each appointment is one student and one interviewer
- Interviewer is chosen from predefined list
- students can register a chosen name

## Project

### Interview Scheduler Main Page
!["screenshot of Scheduler front page Desktop"](https://github.com/Davichavix/scheduler/blob/main/docs/Scheduler_front_page.png?raw=true)

### Interview Create Appointment
!["screenshot of Scheduler create appointment"](https://github.com/Davichavix/scheduler/blob/main/docs/Scheduler_Create_appointment.png?raw=true)

### Interview Delete Appointment
!["screenshot of Scheduler delete appointment"](https://github.com/Davichavix/scheduler/blob/main/docs/Scheduler_Delete_appointment.png?raw=true)

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Dependencies

- axios
- classnames
- normalize.css
- React
- React-dom
- React-scripts