/**
 * Created by haojiachen on 2016/9/1.
 * 封装fetch错误请求
 */
import{notification} from 'antd';

export default class FetchError {
  constructor(type = 0, description = '未知错误!', message = '错误', onClose = () => null) {
    this.type = type;
    this.description = description;
    this.message = message;
    this.onClose = onClose;
  }

  showError() {
    notification.error({
      key: 'busiError',
      message: this.message,
      description: this.description,
      onClose: this.onClose
    })
  }
}
