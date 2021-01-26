import React from 'react';
import Navi from '../components/Navi';

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
      <>
        <h1>こんにちは</h1>
        <p className="text-green-500">{this.props.message}</p>
        <p>このページは、ReactとGinとTailwind CSSで作られています！</p>
        <Navi twitterID="takara2314" />
      </>
    );
  }
}

export default Root;