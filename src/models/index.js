/**
 * 注册Model
 * 把 reducer, initialState, action, saga 封装到一起
 */
const context = require.context('./', true, /\.js$/);
const keys = context.keys().filter(item => item !== './index.js');
const models = keys.map(key => context(key), []);
export default models;
