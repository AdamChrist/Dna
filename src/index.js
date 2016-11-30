import './index.html';
import './index.less';
import dva from 'dva';
import createLoading from 'dva-loading';
import {notification} from 'antd';
import FetchError from './utils/fetchError';

// 1. Initialize
const app = dva();

// 2. Plugins
app.use(createLoading());
app.use({
  onError(error) {
    console.error('err', error);
    if (error instanceof Error) {
      notification.error({ message: error.message })
    } else if (error instanceof FetchError) {
      error.showError();
    }
    else {
      notification.error({ message: error })
    }
  }
});

// 3. Model
require('./models').forEach(m => app.model(m));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
