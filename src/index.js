import 'css/app.css';

import App from 'app';
import Router from 'router';
import ScannerView from 'views/scanner-view';

const router = new Router({
  path: '',
  action: () => {
    if(App.services.led.isConnected() === false) {
      return new ScannerView();
    }

    return 'Connected!';
  },
});
