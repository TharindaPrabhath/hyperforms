import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { Editable, EndStep, Form, InputType, Step, WelcomeStep } from '@/types/form.types';

import { generateId } from '@/lib/utils';

type FormEditorState = {
  setActiveStep: (step: Step) => void;
  form: Form;
  changeFormName: (name: string) => void;
  addStep: (inputType: InputType) => void;
  editStep: (stepId: string, data: Editable) => void;
  removeStep: (stepId: string) => void;
  reset: () => void;
};

const WelcomeStepState: WelcomeStep = {
  id: generateId(),
  index: 0,
  title: 'Welcome to HyperForm',
  description: 'A form builder for everyone.',
  type: 'welcome',
  button: {
    text: `Let's start`
  },
  image: {
    url: '/logo.png',
    placement: 'left'
  }
};

const EndStepState: EndStep = {
  id: generateId(),
  index: 1,
  title: 'Thank you',
  description: 'This is a description of the form end',
  type: 'end'
};

const InitFormState: Form = {
  id: generateId(),
  name: 'New Form',
  steps: [WelcomeStepState, EndStepState],
  activeStep: WelcomeStepState,
  config: {}
};

const useFormEditorStore = create<FormEditorState>()(
  persist(
    (set) => ({
      setActiveStep: (step: Step) => set((state) => ({ form: { ...state.form, activeStep: step } })),
      form: InitFormState,
      changeFormName: (name: string) => set((state) => ({ form: { ...state.form, name } })),
      addStep: (inputType: InputType) => {
        set((state) => {
          const newStep: Step = {
            id: generateId(),
            index: state.form.steps.length - 1,
            title: 'New Step',
            type: 'question',
            inputType,
            isRequired: false
          };

          // Move the end step to the end of the steps array
          const endStep = state.form.steps.find((step) => step.type === 'end') as EndStep;
          const updatedSteps = state.form.steps.filter((step) => step.type !== 'end');
          endStep.index++;
          // @ts-ignore
          updatedSteps.push(newStep, endStep);

          // return { activeStep: newStep, form: { ...state.form, steps: [...state.form.steps, newStep] } };
          return { form: { ...state.form, activeStep: newStep, steps: updatedSteps } };
        });
      },
      editStep: (stepId: string, data: Editable) => {
        set((state) => ({
          form: {
            ...state.form,
            steps: state.form.steps.map((step) => (step.id === stepId ? { ...step, ...data } : step))
          }
        }));
      },
      removeStep: (stepId: string) => {
        set((state) => {
          const updatedSteps = state.form.steps.filter((step) => step.id !== stepId);
          const welcomeStep = updatedSteps.find((step) => step.type === 'welcome');

          return { form: { ...state.form, activeStep: welcomeStep!, steps: updatedSteps } };
        });
      },
      reset: () => set({ form: InitFormState })
    }),
    { name: 'formEditorStore' }
  )
);

export default useFormEditorStore;
