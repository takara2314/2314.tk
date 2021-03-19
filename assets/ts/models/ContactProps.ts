interface ContactProps {
  name:       string;
  setName:    (name: string) => void;
  email:      string;
  setEmail:   (email: string) => void;
  message:    string;
  setMessage: (message: string) => void;

  isNameError:        boolean;
  setIsNameError:     (isNameError: boolean) => void;
  isEmailError:       boolean;
  setIsEmailError:    (isEmailError: boolean) => void;
  isTextAreaError:    boolean;
  setIsTextAreaError: (isTextAreaError: boolean) => void;
  isComplete:         boolean;
  setIsComplete:      (isComplete: boolean) => void;
}

export default ContactProps;