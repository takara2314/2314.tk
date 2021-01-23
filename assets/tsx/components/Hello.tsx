import React from 'react';

interface HelloProps {
    message: string;
}
interface HelloState {}

class Hello extends React.Component<HelloProps, HelloState> {
    constructor(props: HelloProps) {
        super(props);
    }

    render() {
        return (
            <h1>{this.props.message}</h1>
        );
    }
}

export default Hello;