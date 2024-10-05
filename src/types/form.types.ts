export type InputType = 'email' | 'text';

// type BaseField = {
//   id: string;
//   title: string;
//   type: FieldType;
//   description?: string;
// };

// export type EmailField = BaseField & {
//   type: 'email';
// };

// export type TextField = BaseField & {
//   type: 'text';
// };

// export type FormField = EmailField | TextField;

export type StepType = 'welcome' | 'question' | 'end';

export type BaseStep = {
  id: string;
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
