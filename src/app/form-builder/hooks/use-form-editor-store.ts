import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { Form, Step } from '@/types/form.types';

type FormEditorState = {
  activeStep: Step | null;
  setActiveStep: (step: Step) => void;
  form: Form;
  setForm: (form: Form) => void;
};

const useFormEditorStore = create<FormEditorState>()(
  persist(
    (set) => ({
      activeStep: null,
      setActiveStep: (step: Step) => set({ activeStep: step }),
      form: {
        id: 'form-id',
        name: 'Form Name',
        steps: [],
        config: {}
      },
      setForm: (form: Form) => set({ form })
    }),
    { name: 'formEditorStore' }
  )
);

export default useFormEditorStore;
