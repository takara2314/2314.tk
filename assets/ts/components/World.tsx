import React from 'react';

interface WorldProps {
  place:            string;
  placeChange:      (place: string) => void;
  isLoadedContents: boolean;
  contents:         string[];
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

  render() {
    return (
      <div className="flex flex-col w-3/4 h-screen bg-black text-white">
        <section className="mb-8">
          <p>2314.tk 1.0.0 (Debug mode) - Work In Progress</p>
          <p>now place: {this.props.place}</p>
        </section>
        <section>
          <div className="text-red-500">
            <p>現在制作中です。</p>
            <p>以下は仮に置いているテキストです！</p>
          </div>
          <div className="text-xl">
            {!this.props.isLoadedContents ? 'Loading...' : this.props.contents.map(
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
}

export default World;