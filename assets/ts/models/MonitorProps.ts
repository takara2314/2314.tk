interface MonitorProps {
  place:            string;
  changePlace:      (name: string) => void;
  secretTimes:      number;
  setSecretTimes:   (secretTimes: number) => void;
  isDebugMode:      boolean;
  setIsDebugMode:   (isDebugMode: boolean) => void;
}

export default MonitorProps;