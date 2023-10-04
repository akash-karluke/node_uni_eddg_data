## Getting Started

##### First, after cloning the project, run for installing all dependencies of the project.

```bash
npm i
```

_You'll need the **env.local** file to get all important constants, get it from previous OSA app, all constants are same._

##### For running the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

##### VS Code Extentions recommended:

1. EsLint (essential)
2. Prettier (essential)
3. Better Comments (Highligh specific line/ Add todos for future.)

Change setting to automatically format your code on **Save**, so that we all have same formatting throughtout the project.

##### Add Protected Routes/Pages:

- Add object with name & component name in navigationRoutes.ts file.
- Roles Array includes roles are allowed for that perticular page, Allowed Roles are ["SalesRep", "GlobalUser", "SalesManager"].
- Visibility - Wheather is should be visible in Nav link menu or not.

##### Important Links

- [Redux Toolkit](https://redux-toolkit.js.org/usage/usage-guide)
- [Redux Persist](https://blog.logrocket.com/persist-state-redux-persist-redux-toolkit-react/)
