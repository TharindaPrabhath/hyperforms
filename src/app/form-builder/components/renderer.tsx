// Components
import WelcomeRenderer from './welcome-renderer';
import QuestionRenderer from './question-renderer';
import EndRenderer from './end-renderer';

import useFormEditorStore from '@/hooks/use-form-editor-store';

function Renderer() {
  const activeStep = useFormEditorStore((state) => state.form.activeStep);

  if (activeStep?.type === 'welcome') return <WelcomeRenderer />;

  if (activeStep?.type === 'end') return <EndRenderer />;

  return <QuestionRenderer />;
}

export default Renderer;
