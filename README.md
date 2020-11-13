# SOFTWARE_PROJECT

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

使用 npm install 来安装依赖

使用 npm run start 来运行 react

运行 `npx prettier --write .`执行代码标准化

## About

### store

> There is a store that stores all states. When any of these states changes, the `mapStateToProps` get message and update the component's state.

### container

> Use `connect` to wrap the original component in a higher class component. And also define `mapStateToProps` and `mapDispatchToPros` here.

> Parameters of `mapStateToProps` is `StoreState`, while the return value contains state belongs to the component.

> Parameters of `mapDispatchToProps` is `dispatch`. Just bind component's prop function with the StoreState changing function.

### constant

> Records the action types.

### action

> Defines the action interface and the return action function.

### reducer

> Just first define reducer for each component and use `combineReducers` to combine all the reducers in one.

> Reducer defines a function which accepts state and action and changes component's storeState with the return value.

**In brief, ------>creatStore(reducer)------->events binded to components triggered------->triggered function leads to action by mapDispatchToProps-------->reducer accept action-------->reducer changes StoreState-------->mapStateToProps accept the change and modify component state**

### epic

> When fetching data from API, define a getData action that handle the request process in epics. Also define a getDataFulfilled action that send by epic handler. The getDataFulfilled action is handled by the component's reducer.
