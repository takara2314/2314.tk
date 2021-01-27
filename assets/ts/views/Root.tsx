import React from 'react';
import Navi from '../components/Navi';
import World from '../components/World';

interface RootProps {
  message: string;
}
interface RootState {}

class Root extends React.Component<RootProps, RootState> {
  constructor(props: RootProps) {
      super(props);
  }

  render() {
    return (
      <div className="flex">
        <Navi />
        <World />
      </div>
    );
  }
}

export default Root;