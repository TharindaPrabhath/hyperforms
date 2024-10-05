'use client';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './dialog';

type ModalProps = {
  title: string;
  description?: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export const Modal: React.FC<ModalProps> = ({ title, description, isOpen, children, onClose }: ModalProps) => {
  const onOpenChange = (open: boolean) => {
    !open && onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <div className="max-h-[700px]">{children}</div>
      </DialogContent>
    </Dialog>
  );
};
