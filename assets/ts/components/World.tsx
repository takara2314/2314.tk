import React from 'react';

interface WorldProps {
  place:       string;
  placeChange: (place: string) => void;
}
interface WorldState {
  isLoadedContent: boolean;
  contents:        string[];
}

class World extends React.Component<WorldProps, WorldState> {
  constructor(props: WorldProps) {
    super(props);

    this.state = {
      isLoadedContent: false,
      contents:        []
    };
  }

  componentDidMount() {
    fetch(`http://localhost:2314/public/contents/${this.props.place}.json`)
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          isLoadedContent: true,
          contents:        result.contents
        })
      },
      (error) => {
        this.setState({
          isLoadedContent: true,
          contents:        [`エラーが発生しました。${error}`]
        })
      }
    )
  }

  render() {
    return (
      <div className="flex flex-col w-3/4 h-screen bg-black text-white">
        <section className="mb-8">
          <p>2314.tk 1.0.0 (Debug mode)</p>
          <p>now place: {this.props.place}</p>
        </section>
        <section>
          <div className="text-red-500">
            以下は仮に置いているテキストです
          </div>
          <div className="text-xl">
            {!this.state.isLoadedContent ? 'Loading...' : this.state.contents.map(
              (sentence: string, index: number) =>
                <p key={index}>
                  {sentence}
                </p>
            )}
          </div>
        </section>
      </div>
    );
  }

  componentDidUpdate() {
    fetch(`http://localhost:2314/public/contents/${this.props.place}.json`)
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          isLoadedContent: true,
          contents:        result.contents
        })
      },
      (error) => {
        this.setState({
          isLoadedContent: true,
          contents:        [`エラーが発生しました。${error}`]
        })
      }
    )
  }
}

export default World;