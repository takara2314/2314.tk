import '../css/styles.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Hello from './components/Hello';
import Tail from './components/Tail';

ReactDOM.render(
    <Hello message="こんにちは、世界！" />,
    document.getElementById('hello')
);

ReactDOM.render(
    <Tail message="グリーン！" />,
    document.getElementById('tail')
);