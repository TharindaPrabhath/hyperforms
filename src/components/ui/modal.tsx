'use client';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './dialog';

type ModalProps = {
  title: string;
  description?: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export const Modal: React.FC<ModalProps> = (props: ModalProps) => {
  const onChange = (open: boolean) => {
    !open && props.onClose();
  };

  return (
    <Dialog open={props.isOpen} onOpenChange={onChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{props.title}</DialogTitle>
          {props.description && <DialogDescription>{props.description}</DialogDescription>}
        </DialogHeader>
        <div className="max-h-[700px]">{props.children}</div>
      </DialogContent>
    </Dialog>
  );
};
