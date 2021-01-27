import React from 'react';
import Navi from '../components/Navi';
import World from '../components/World';

interface RootProps {}
interface RootState {
  menu:  string[][];
  place: string;
}

class Root extends React.Component<RootProps, RootState> {
  constructor(props: RootProps) {
    super(props);

    this.state = {
      menu: [
        [ '僕について', 'about' ],
        [ 'できること', 'skills' ],
        [ '作ったもの', 'works' ],
        [ '好きなもの', 'favorites' ],
        [ 'ラボ', 'lab' ],
        [ 'お問い合わせ', 'contact' ]
      ],
      place: location.pathname.slice(1) !== '' ? location.pathname.slice(1) : this.state.menu[0][1]
    }
  }

  render() {
    return (
      <div className="flex">
        <Navi menu={this.state.menu} place={this.state.place} placeChange={(place: string) => this.placeChange(place)} />
        <World />
      </div>
    );
  }

  componentDidMount() {
    console.log("now place: " + this.state.place);
  }

  placeChange(place: string) {
    this.setState({
      place: place
    });
  }
}

export default Root;