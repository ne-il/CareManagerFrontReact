import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/omega/theme.css';
import 'primereact/resources/themes/omega/customTree.css';
import 'font-awesome/css/font-awesome.css';
import 'react-bootstrap-table/css/react-bootstrap-table.css';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
