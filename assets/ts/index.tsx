import React from 'react';
import ReactDOM from 'react-dom';
import Hello from './components/Hello'

ReactDOM.render(
    <Hello message="こんにちは、世界！" />,
    document.getElementById('hello')
);