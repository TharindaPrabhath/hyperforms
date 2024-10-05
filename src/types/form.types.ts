export type FieldType = 'email' | 'text';

type BaseField = {
  id: string;
  title: string;
  type: FieldType;
  description?: string;
  isRequired: boolean;
};

export type EmailField = BaseField & {
  type: 'email';
};

export type TextField = BaseField & {
  type: 'text';
};

export type FormField = EmailField | TextField;

export type StepType = 'welcome' | 'question' | 'end';

export type BaseStep = {
  id: string;
  title: string;
  type: StepType;
  description?: string;
  fields: FormField[];
};

export type ImagePlacement = 'left' | 'right';

export type WelcomeStep = BaseStep & {
  type: 'welcome';
  button: {
    text: string;
  };
  image: {
    url: string;
    placement: ImagePlacement;
  };
};

export type QuestionStep = BaseStep & {
  type: 'question';
};

export type EndStep = BaseStep & {
  type: 'end';
};

export type Step = WelcomeStep | QuestionStep | EndStep;

export type Form = {
  id: string;
  name: string;
  steps: Step[];
  config: any;
};
