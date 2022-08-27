import React from 'react';
import './main.scss';
import Widget from './components/widget/Widget';
import WidgetSettings from './components/widget-settings/WidgetSettings';

function App() {
  return (
    <div className="App">
      <Widget />
      <WidgetSettings />
    </div>
  );
}

export default App;
