import React from 'react';

interface TailProps {
    message: string;
}
interface TailState {}

class Tail extends React.Component<TailProps, TailState> {
    constructor(props: TailProps) {
        super(props);
    }

    render() {
        return (
            <p className="text-green-500">{this.props.message}</p>
        );
    }
}

export default Tail;