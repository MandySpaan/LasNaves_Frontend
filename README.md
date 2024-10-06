# Coworking Las Naves

Access Control and Coworking Space Management Project

## Index 🔍

- [Description](#)
- [Stack](#stack)
- [Local Installation](#local-installation-️)
- [In the Pipeline](#in-the-pipeline-)
- [Points of Improvement](#points-of-improvement)

## Description 📖

An access control and management application for the coworking space Las Naves. <br/>
Users can register, check in and out of rooms, make reservations, and view real-time room availability. <br/>
Administrators can also monitor user entry and exit, as well as generate detailed administrative reports.

You can find the related backend project here: [LasNaves_Backend](https://github.com/MandySpaan/LasNaves_Backend)

## Stack 💻

<a href="https://www.reactjs.com/">
    <img src= "https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>
</a>
<a href="https://www.typescriptlang.org/">
    <img src= "https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white"/>
</a>
<a href="https://nodejs.org/es/">
    <img src= "https://img.shields.io/badge/node.js-026E00?style=for-the-badge&logo=node.js&logoColor=white" alt="Node JS"/>
</a>
<a href="">
    <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white" alt="JWT" />
</a>
<a href="">
    <img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white" alt="NPM" />
</a>
<a href="">
    <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
</a>
<a href="">
    <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
</a>

## Local installation 🛠️

### Backend

You can find the related backend project here: [LasNaves_Backend](https://github.com/MandySpaan/LasNaves_Backend)

1. Clone the repository
   `$ git clone https://github.com/MandySpaan/LasNaves_Backend`
2. Install dependencies
   `$ npm install --y`
3. Copy the file .env.example, change the name to .env and fill in all the fields
4. Plant the seeds into the tables
   `$ npm run db:seed`
5. Start the server
   `$ npm run dev`

### Frontend

1. Clone the repository
   `$ git clone https://github.com/MandySpaan/LasNaves_Frontend`
2. Install dependencies
   `$ npm install --y`
3. Start the server
   `$ npm run dev`

## In the Pipeline 🔜

Ongoing work includes the following:

- For users:

  - Own access history on Profile page
  - Change your own email address

- For admins:

  - Search/Sort rooms by name, type, capacity and availability
  - Search/Sort users by name, startup, dni, email and phone

- For super admins:
  - Super admin view which includes the following:
    - Create, update and delete rooms
    - Update and deactivate users

## Points of Improvement 💡

Areas for improvement include the following:

- Usability:

  - Get a message and forwarded to the login page when token expires

- Layout:

  - Refactor css files to have more centralized css
  - Improve overal design and responsive design

- Tests:

  - Implement automated testing for critical components and user interactions
  - Establish a process for running tests consistently
