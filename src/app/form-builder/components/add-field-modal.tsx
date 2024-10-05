import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';

import { FieldType } from '@/types/form.types';

type AddFieldModalProps = {
  open: boolean;
  loading: boolean;
  onClose: () => void;
  onSubmit: (data: Field) => void;
};

export type Field = {
  type: FieldType;
  label: string;
};

const Fields: Field[] = [
  { type: 'email', label: 'Email' },
  { type: 'text', label: 'Short Text' }
];

function AddFieldModal({ open, loading, onSubmit, onClose }: AddFieldModalProps) {
  return (
    <Modal title="Add Field" isOpen={open} onClose={onClose}>
      <div className="flex flex-col gap-2">
        {Fields.map((field) => (
          <Button variant="outline" onClick={() => onSubmit(field)}>
            {field.label}
          </Button>
        ))}
      </div>
    </Modal>
  );
}

export default AddFieldModal;
