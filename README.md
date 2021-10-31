# Expense-tracker 2.0
* This project provides user with functions to create, read, update, and delete expenditure records.
## Feature
* The user can create an account(with email or Facebook) to use the app.
* The user can see the following information about the expenditure records on the home page: name, category icon, date, and amount.
* The user can click the `新增支出` button to create a new expenditure record.
* The user can click the `修改` button to edit information about the expenditure record.
* The user can click the `刪除 ` button to delete the expenditure record.
* The user can select the `類別` to show all expenditure records of this category.
## How to use it 
1. Download with Terminal：
    ```
    git clone https://github.com/tree12132002/expense-tracker.git
    ```
2. Download on the webpage：
   I. Click『Code』
   II. Choose『Download ZIP』
3. Open Terminal，`cd` to restaurant list file
   I. Install npm packages
    ```
    npm install
    ```
    II. Create default data
    ```
    npm run speed

    ```
4. Start the server
    ```
    npm run dev
    ```
5. When Terminal show Express is listening on localhost:3000, you can use any browser and type http://localhost:3000 to enter the website.
6. End the server
   ```
   ctrl + c
   ```
## Default users
Run `npm run seed`to create two default users.
The user can use the information of default users to login the website.
* email: user1@example.com password: 12345678
## Environment Variable
Rename the file `.env.example` to `.env` so that you can run the app successfully.
Or you can create a file named `.env` and type the following content inside.
```
FACEBOOK_ID=SKIP
FACEBOOK_SECRET=SKIP
FACEBOOK_CALLBACK=http://localhost:3000/auth/facebook/callback
SESSION_SECRET=ThisIsMySecret
MONGODB_URI=mongodb://localhost/restaurant-list
PORT=3000`

```