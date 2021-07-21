# Project name

<!--- These are examples. See https://shields.io for others or to customize this set of shields. You might want to include dependencies, project status and licence info here --->
<!-- ![GitHub contributors](https://img.shields.io/github/contributors/nicolerae/README-templateFSA.md)
![GitHub stars](https://img.shields.io/github/stars/nicolerae/README-templateFSA.md?style=social)
![GitHub forks](https://img.shields.io/github/forks/nicolerae/README-templateFSA.md?style=social)
![Twitter Follow](https://img.shields.io/twitter/follow/nicole_rae?style=social)
 -->
<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/Chack-App">
    <img src="https://avatars.githubusercontent.com/u/86743163?s=60&v=4" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Chack</h3>

  <p align="center">
    A mobile event management and payment application
    <br />

Let's be honest, We all love to go out with friends, but sometimes it can be a big pain, especially when it's time to figure out the check. When you’re out with a large group, often times one person is stuck putting down their card. No one enjoys the task of figuring out what everyone owes and making sure that if you’re putting your card down, that you’re getting paid back the right amount. Chack makes it easy to track what everyone ordered, calculate what each person should be paying, and finally, collect payments so that you can focus on having a great time with your friends.
  
<div align="center">

## Login Screen:

  <img src="https://user-images.githubusercontent.com/80492369/126558057-c9ccbcc1-7f51-474b-a628-d787ccd1a72c.png" alt="Logo" width="350"></img>

## Event Screen:
  <img src="https://user-images.githubusercontent.com/80492369/126558247-72977d60-3adc-4b21-9185-27dbbddef37b.png" alt="Logo" width="350"></img>

## Inside an Event Screen:

  <img src="https://user-images.githubusercontent.com/80492369/126558243-397837e3-0909-49d7-9c8b-741e9dd707a2.png" alt="Logo" width="350"></img>

## Single Receipt Screen:

  <img src="https://user-images.githubusercontent.com/80492369/126558250-eae8d27c-0f09-4910-82ad-b070165514d0.png" alt="Logo" width="350"></img>

## Final Checkout Screen:

  <img src="https://user-images.githubusercontent.com/80492369/126558248-2d5f0988-ef94-4dc9-9b72-6076697cd7a3.png" alt="Logo" width="350"></img>
</div>


## Prerequisites:

Before you begin, ensure you have met the following requirements:
<!--- These are just example requirements. Add, duplicate or remove as required --->
* You have installed a recent version of Node.js
* An understanding of expo and how run it.
* Your own Google Camera API Key <a href="https://console.cloud.google.com/projectselector2/home/dashboard?authuser=2&supportedpurview=project"> here
  </a>
   * Follow Link
   * Create a project
   * Enable the Google Cloud Vision API
   * Request a key
* You have also pulled the chack-server repo to be used in conjunction <a href="https://github.com/Chack-App/chack-server"> here
  </a>.
* postgres database up and running

## Installing Chack:

To install Chack, follow these steps:
  
Linux and macOS:
```
npm install
```

## Using Chack:

To use Chack, follow these steps:

run the chack-server repo
```
createdb chack
```
create a secrets.js file and copy and paste from below:
  
```
const devJWT = "testServer"
module.exports = devJWT
```
Then run the following: 
```
npm install
npm run seed
npm run start
```
  
create a secrets.js file and copy and paste form below:
```
export const DEV_SERVER = "http://localhost:8000/graphql"
```
run the chack repo
```
npm run start
```

## Contributors/Collaborators:

Thanks to the following people who have contributed to this project:

* [@Andrew Larsen](https://github.com/Andrew26L) 🎨
* [@Jason Chen](https://github.com/jchen258) 🌱
* [@David Degenstein](https://github.com/SgtPepper634) 👀
* [@Cody Swithenbank](https://github.com/cswithen) 🔑


## Roadmap:

If you have ideas for releases in the future, it is a good idea to list them in the README.
<!--- This is also a place to share any edge cases you're working on, any current limitations of the project currently and future rollouts  --->
* Expand features for the application:
* Deploy on App / Google Play Store

## Contact:
<!--- You can add in your linkedin, medium, stack overflow, dev.to account, etc. here --->
If you want to contact Andrew at <a href="/linkedin.com/in/andrew-larsen-coding">LinkedIn </a> <br/>
If you want to contact Jason at <a href="/linkedin.com/in/jchen258">LinkedIn </a><br/>
If you want to contact David at <a href="/linkedin.com/in/david-degenstein">LinkedIn </a><br/>
If you want to contact Cody at <a href="/linkedin.com/in/codyswithenbank">LinkedIn </a><br/>

