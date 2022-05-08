# group 40 project: Fantasy Sports Tracker

## Description

This website functions as a fantasy sports tracker. Users can create a profile that enables them to look at the latest news in their chosen sport. Users will be able to use this website as a guide to their fantasy league by utilizing the player ranking section as well as the individual player statistics page. All data will be taken from publicly available API.

#### Setup

Clone the repo:

```console
git clone <repourl>
```

install dependencies

```console
npm i
```

run the db seed

```console
npm run seed
```

run the repo locally:

```console
npm start
```

#### Usage

- Make a user profile
- Check some news

@TODO

- Landing Page
- AJAX form submission
- Defense against XSS attacks
- Client-side JS
- Error-handling
- Validate user input in 3 places (client-side, routes, DB fns)
- Database seed
- Latest News page
- Individual player statistics page
- User profile
- Create user team functionality
- Player ranking ladder
- Add match tickets page
- Add watch matches page
- Add ajax functionality
- Add css
- Extras: add discussion board, add predictive service

### Project Map

##### Routes
- auth
    - POST "/login"
    - GET "/signup"
    - POST "/signup"
    - GET "/logout"
- home
    - GET "/"
- news 
    - handled on client side
- profile
    - GET "/myprofile"
    - POST "/myprofile/changepfp"
    - POST "/myprofile/changename"
    - POST "/myprofile/changeusn"
    - POST "/myprofile/changepwd"
    - POST "/myprofile/changeem"
    - GET "/myprofile/myteam"
    - POST "/myprofile/addplayer"
- players 
    - GET "/playersearch"
    - POST "/searchplayers"

- GET "/"
  - root route
- GET "/player"
  - search for individual players
- POST "/searchplayers"
  - individual player page
- GET "/signup"
- POST "/signup"
- POST "/login"
- GET "/private"
- GET "/logout"
- GET "/playerrank"
- GET "/watchmatches"
- GET "/matchtickets"

##### Data:

- users
- players
- userteam
- discussions
- posts (subdocument)

##### Team

- Sean
- Jacob
- Patrick
