interface MonitorProps {
  place:          string;
  changePlace:    (name: string) => void;
  secretTimes:    number;
  setSecretTimes: (secretTimes: number) => void;
  isDebugMode:    boolean;
  setIsDebugMode: (isDebugMode: boolean) => void;

  isContact: boolean;

  clientBrowser:    string
  setClientBrowser: (clientBrowser: string) => void;
  clientDevice:     string
  setClientDevice:  (clientDevice: string) => void;

  setIsCameraMoved: (isCameraMoved: boolean) => void;
}

export default MonitorProps;