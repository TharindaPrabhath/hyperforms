export type InputType = 'email' | 'text';

export type StepType = 'welcome' | 'question' | 'end';

export type BaseStep = {
  id: string;
  index: number;
  title: string;
  type: StepType;
  description?: string;
};

export type ImagePlacement = 'left' | 'right';

export type WelcomeStep = BaseStep & {
  type: 'welcome';
  button: {
    text: string;
  };
  image?: {
    url: string;
    placement: ImagePlacement;
  };
};

export type QuestionStep = BaseStep & {
  type: 'question';
  inputType: InputType;
  isRequired: boolean;
};

export type EndStep = BaseStep & {
  type: 'end';
};

export type Step = WelcomeStep | QuestionStep | EndStep;

export type Form = {
  id: string;
  name: string;
  activeStep: Step;
  steps: Step[];
  config: any;
};

export type Editable = {
  title?: string;
  description?: string;
  isRequired?: boolean;
  button?: {
    text: string;
  };
  image?: {
    url: string;
    placement: ImagePlacement;
  };
};
