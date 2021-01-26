import React from 'react';

interface NaviProps {
  twitterID: string;
}
interface NaviState {}

class Navi extends React.Component<NaviProps, NaviState> {
  constructor(props: NaviProps) {
    super(props);
  }

  render() {
    let twitterURL: string = `https://twitter.com/${this.props.twitterID}`;
    return (
      <p>
        <a href={twitterURL}>Twitter</a>
      </p>
    );
  }
}

export default Navi;