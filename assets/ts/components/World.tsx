import React from 'react';

type WorldProps = {
  place:            string;
  placeChange:      (place: string) => void;
  isLoadedContents: boolean;
  contents:         string[];
}

function World(props: WorldProps) {
  return (
    <div className="flex flex-col w-3/4 h-screen bg-black text-white">
      <section className="mb-8">
        <p>2314.tk 1.0.0 (Debug mode) - Work In Progress</p>
        <p>now place: {props.place}</p>
      </section>
      <section>
        <div className="text-red-500">
          <p>現在制作中です。</p>
          <p>以下は仮に置いているテキストです！</p>
        </div>
        <div className="text-xl">
          {!props.isLoadedContents ? 'Loading...' : props.contents.map(
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

export default World;