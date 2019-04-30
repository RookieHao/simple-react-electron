import dva from 'dva';
import createHistory from 'history/createHashHistory';

const app = dva({
  history: createHistory(),
});

app.router(require('./router').default);

app.start('#root');

export default app._store;
