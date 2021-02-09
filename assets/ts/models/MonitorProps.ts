type MonitorProps = {
  place:            string;
  placeChange:      (name: string) => void;
  isLoadedContents: boolean;
  contents:         string[];
}

export default MonitorProps;