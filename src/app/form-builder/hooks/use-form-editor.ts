import useFormEditorStore from './use-form-editor-store';

function UseFormEditor() {
  const form = useFormEditorStore((state) => state.form);
  const activeStep = useFormEditorStore((state) => state.activeStep);
  const _setActiveStep = useFormEditorStore((state) => state.setActiveStep);

  const setActiveStep = (stepId: string) => {
    const activeStep = form.steps.find((step) => step.id === stepId);
    if (activeStep) {
      _setActiveStep(activeStep);
    }
  };

  return { activeStep, setActiveStep };
}

export default UseFormEditor;
