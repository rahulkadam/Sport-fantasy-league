# Quickstart React Redux App

Redux, React Typescript Project with eslint and stylelint configurations.

## Usage


    shell script

    npm run start

    Or
    
    shell script

    npm run install

    npm run start


`npm` is Node package manager for managing Project dependency, all dependency are mentioned in `package.json`

## React 

#####React Documentation

1. https://reactjs.org/docs/getting-started.html
2. https://create-react-app.dev/docs/getting-started
3. https://reactjs.org/docs/introducing-jsx.html
4. https://reactjs.org/docs/hooks-intro.html

## Redux

#####Redux Documentation

1. https://react-redux.js.org/introduction/quick-start
2. https://thoughtbot.com/blog/using-redux-with-react-hooks
3. https://react-redux.js.org/api/hooks
4. https://dev.to/bouhm/react-redux-flow-terminologies-and-example-104b
5. https://medium.com/codingthesmartway-com-blog/learn-redux-introduction-to-state-management-with-react-b87bc570b12a

## TypeScript

#####Typescript Documentation

1. https://www.typescriptlang.org/docs/home.html
2. https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html
3. https://www.typescriptlang.org/docs/handbook/jsx.html

## Testing

Project will have standard Testing framework!

## Code quality tools

Code quality tools provide static check of your code and try to fix errors. Checks are triggered inside pre-commit hook. To run them manually:

```shell script
npm lint:js # runs eslint in src directory   
npm fix:js # runs eslint in src directory with --fix parameter   
npm lint:style # runs stylelint in src directory   
npm fix:style # runs stylelint in src directory with --fix parameter   
```

### eslint

ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code, with the goal of making code more consistent and avoiding bugs.
Eslint and prettier avaialble for clean development process.
https://eslint.org/docs/user-guide/getting-started

### stylelint and Styling

A mighty, modern linter that helps you avoid errors and enforce conventions in your styles.

https://stylelint.io/


## Git hooks

Git hooks management is used in project for code quality, checking code before pushing to git repo.
we can find husky hook configuration in `package.json`

## Contents

```shell script
├── .env # dot env config file
├── .eslintrc # eslint configutation
├── .lintstagedrc # lintstaged configutation
├── .nvmrc # required Node version
├── .prettierrc # prettier configutation
├── .stylelintrc # stylelint configutation
├── README.md # this file
├── README_CRA.md # original Readme from CRA
├── .gitignore
├── huskyrc-template # template for husky configuration
├── tsconfig.json # Typescript configuration
├── public # public assets
├── @Types # define type and export module if required for typescript type definition
└── src
    ├── API # React components folder
    ├── common
        ├── components # All common component required in project e.g footer, help page, T&C page
        ├── config  # common configuration related to project, history, location object
        ├── images  # contain all common images of project
        ├── styles  # common styles for project
    ├── config   # configuration related to project , pwd, redux, route, test
        ├── pwa   # Progressive web ap configuration using service workers
        ├── redux  # all redux configuration of project
        ├── route  # This contain all project required route
        ├── test   # contain all test related configuration for project
    ├── features # features logic folder
        ├── FeatureName   # each feature will have separate folder in project
          ├── component  # This will contain all rendering component tsx files
          ├── redux  # all redux configuration of project + reducer + action + types + constant + index + hook
    ├── index.tsx # entry point file
```

## Project URL
Following are the URL which created

1. [/](localhost:3000/)
2. [/home](localhost:3000/home)
3. [/billview](localhost:3000/billview)
4. [/random](localhost:3000/random)
5. [/counter](localhost:3000/counter)

##Important concept to Read 

1. What is ts, tsx, jsx?
2. What is css,qscc,sass style?
3. What is redux, reducer, action, store in redux ?
4. what is hooks, component rendering in React?
5. How typescript helps project in reducing error and how to define types?
6. how react route works?
7. how jsx render component?
8. what is JS syntax?
9. how to pass props to Component?
10. how to import, export function, module, constant?
11. understand current react project structure?
12. how to write test for React component and other functions?