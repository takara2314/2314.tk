import React from 'react';

interface WorldProps {}
interface WorldState {}

class World extends React.Component<WorldProps, WorldState> {
  constructor(props: WorldProps) {
    super(props);
  }

  render() {
    return (
      <div className="flex flex-col w-3/4 h-screen bg-black">
          Hello World
      </div>
    );
  }
}

export default World;