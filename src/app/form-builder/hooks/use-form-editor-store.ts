import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { Editable, EndStep, Form, InputType, Step, WelcomeStep } from '@/types/form.types';

import { generateId } from '@/lib/utils';

type FormEditorState = {
  setActiveStep: (step: Step) => void;
  form: Form;
  addStep: (inputType: InputType) => void;
  editStep: (stepId: string, data: Editable) => void;
  removeStep: (stepId: string) => void;
};

const WelcomeStepState: WelcomeStep = {
  id: generateId(),
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
      addStep: (inputType: InputType) => {
        set((state) => {
          const newStep: Step = {
            id: generateId(),
            title: 'New Step',
            type: 'question',
            inputType,
            isRequired: false
          };

          return { activeStep: newStep, form: { ...state.form, steps: [...state.form.steps, newStep] } };
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

          return { form: { ...state.form, steps: updatedSteps } };
        });
      }
    }),
    { name: 'formEditorStore' }
  )
);

export default useFormEditorStore;
