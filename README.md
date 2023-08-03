# Admin-Side
In commercial services their should be admins controlled feature where only admin can access and alter the information
so this repo is designed to handle all task handle by admins for client interface


#### About Project
Functionality of app
Only admins can login to app
Admins can Alter the Category list
Admins can alter the Product list 
Admins will be notified for newly ordered item
Admins can create new page of store to publish in user side

#### Tools used
The framework used: NodeJS,\
The database used : MongoDB\
Models/Scema used for various dataset:
1) User - To store login credential as well as user information
2) Category- to list various category for user in app
3) Product - to list varoius product in category
4) cart - to save information of user for added items in cart
5) Address - To deliver item in particular address of user after confirmation of order
6) Page - To display separate page of a particular brand like : Apple, MI etc
7) Order - To Store ordered items by user for further process
Authentication: bcrypt library used to encrypt user password.


## Installation

Install my-project with npm

run "clone https/ssh link" to local terminal in root directory of your folder
```bash
git clone "link here"
cd cloned_project_folder
```
then

```bash
  npm install --save
```

after installation of packages  
run
```bash
 npm start
 ```
 for fully functionality,
 have to setup "server side" as well



