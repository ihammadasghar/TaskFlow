# TaskFlow
Effortlessly organize, prioritize, and conquer tasks with the all-in-one task manager app powered by Express.js, Node.js, React, Redux, and MongoDB.

![TaskBoard](https://github.com/ihammadasghar/TaskFlow/blob/add-screenshots/screenshots/Taskboard.png)
![Manager](https://github.com/ihammadasghar/TaskFlow/blob/add-screenshots/screenshots/SwitchThemes.png)
![Task-Details](https://github.com/ihammadasghar/TaskFlow/blob/add-screenshots/screenshots/TaskDetails.png)

### Try it out
1. Clone the Repository
```
git clone https://github.com/ihammadasghar/TaskFlow.git
```

2. Set environment variables by creating a ".env" file in the `taskflow/server/` directory containing:
```
REACT_APP_ENV=DEV
DATABASE_URL=mongodb+srv://guest:guestattaskflow@taskflowcluster.4pdqme2.mongodb.net/?retryWrites=true&w=majority
``` 

3. Start the api server:
```
cd TaskFlow\server
npm install
npm start
```

4. Lauch the app front-end in a new command line window
```
cd TaskFlow\client
npm install
npm start
```

It should be live at http://localhost:3000/

### Developers Guideline
-  Always create new work in a new branch.
-  Create a PR and wait for review.
-  Follow TDD (Test First approach), so support your every work with tests where possible.
