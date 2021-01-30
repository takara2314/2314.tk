import React from 'react';
import Navi from '../components/Navi';
import World from '../components/World';

interface RootProps {}
interface RootState {
  menu:             string[][];
  place:            string;
  isLoadedContents: boolean;
  contents:         string[];
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
      place:            location.pathname.slice(1) !== '' ? location.pathname.slice(1) : 'about',
      isLoadedContents: false,
      contents:         []
    }
  }

  render() {
    return (
      <div className="flex">
        <Navi menu={this.state.menu} place={this.state.place} placeChange={(place: string) => this.placeChange(place)} />
        <World place={this.state.place} placeChange={(place: string) => this.placeChange(place)} isLoadedContents={this.state.isLoadedContents} contents={this.state.contents} />
      </div>
    );
  }

  componentDidMount() {
    console.log("now place: " + this.state.place);
    this.getContents(this.state.place);
  }

  placeChange(place: string) {
    this.setState({
      place: place
    });
    this.getContents(place);
  }

  getContents(place: string) {
    fetch(`http://localhost:2314/public/contents/${place}.json`)
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          isLoadedContents: true,
          contents:         result.contents
        })
      },
      (error) => {
        this.setState({
          isLoadedContents: true,
          contents:         [`エラーが発生しました。${error}`]
        })
      }
    );
  }
}

export default Root;