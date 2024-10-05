import useFormEditorStore from './use-form-editor-store';

import { FieldType } from '@/types/form.types';

function UseForm() {
  const form = useFormEditorStore((state) => state.form);
  const setForm = useFormEditorStore((state) => state.setForm);

  const addField = (field: FieldType) => {
    console.log('field', field);
  };

  const removeField = (fieldId: string) => {
    console.log('fieldId', fieldId);
  };

  const changeConfig = (config: any) => {};

  return { form, addField, removeField, changeConfig };
}

export default UseForm;
