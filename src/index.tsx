import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './components/app/App';
import { data } from './utils/data';
import { Server } from "miragejs"

new Server({
  routes() {
    this.namespace = "api";
    this.get("/valutes", () => {
      return data
  })}
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);