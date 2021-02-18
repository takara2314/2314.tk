type MonitorProps = {
  place:            string;
  changePlace:      (name: string) => void;
  isLoadedContents: boolean;
  contents:         string[];
}

export default MonitorProps;