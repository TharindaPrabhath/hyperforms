import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { Form, InputType, Step } from '@/types/form.types';

import { generateId } from '@/lib/utils';

type FormEditorState = {
  activeStep: Step | null;
  setActiveStep: (step: Step) => void;
  form: Form;
  // setForm: (form: Form) => void;
  addStep: (inputType: InputType) => void;
  removeStep: (stepId: string) => void;
};

const InitFormState: Form = {
  id: generateId(),
  name: 'New Form',
  steps: [
    {
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
    },
    {
      id: generateId(),
      title: 'Thank you',
      description: 'This is a description of the form end',
      type: 'end'
    }
  ],
  config: {}
};

const useFormEditorStore = create<FormEditorState>()(
  persist(
    (set) => ({
      activeStep: null,
      setActiveStep: (step: Step) => set({ activeStep: step }),
      form: InitFormState,
      // setForm: (form: Form) => set({ form }),
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
