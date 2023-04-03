<h1 align="center">School Management System Backend</h1>

<p align="center">
  <img alt="Github top language" src="https://img.shields.io/github/languages/top/manuel2u/DCIT-205-Mini-Project?color=56BEB8">

  <img alt="Github language count" src="https://img.shields.io/github/languages/count/manuel2u/DCIT-205-Mini-Project?color=56BEB8">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/manuel2u/DCIT-205-Mini-Project?color=56BEB8">

  <!-- <img alt="License" src="https://img.shields.io/github/license/qbentil/crowncast-backend?color=56BEB8"> -->

  <img alt="Github issues" src="https://img.shields.io/github/issues/manuel2u/DCIT-205-Mini-Project?color=56BEB8" />

  <img alt="Github forks" src="https://img.shields.io/github/forks/manuel2u/DCIT-205-Mini-Project?color=56BEB8" />

  <img alt="Github stars" src="https://img.shields.io/github/stars/manuel2u/DCIT-205-Mini-Project?color=56BEB8" />
</p>

<br>

## :dart: About ##
This is the backend for the School management system. 

## :sparkles: ENDPOINTS ##

:heavy_check_mark: <strong>/api/v1/create-student</strong>
- <p>This endpoint uses a POST request</p>
- <p>This endpoint takes in a request body of properties : fName, lName, programme and residence</p>
- <p>If the student is created, it returns a Status code of 201 and the Student Created.</p>


:heavy_check_mark: <strong>/api/v1/find-student/<<id>id></strong>
- <p> This endpoint uses a GET request</p>
- <p> It returns a the student whose student ID is placed after the endpoint</p>
- <p>example : localhost:5000/api/v1/find-student/10945448</p>

## :rocket: Technologies ##

The following tools were used in this project:


- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/en/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
