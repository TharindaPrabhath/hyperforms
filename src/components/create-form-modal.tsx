import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';

// Components
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Modal } from '@/components/ui/modal';

type CreateFormModalProps = {
  open: boolean;
  loading: boolean;
  onClose: () => void;
  onSubmit: (data: CreateFormProps) => void;
};

const formSchema = z.object({
  name: z.string().min(1, 'Required')
});

export type CreateFormProps = z.infer<typeof formSchema>;

function CreateFormModal({ open, loading, onClose, onSubmit }: CreateFormModalProps) {
  const form = useForm<CreateFormProps>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: ''
    }
  });

  const hasName = !!form.watch('name');

  return (
    <Modal title="Create a new form" isOpen={open} onClose={onClose}>
      <Form {...form}>
        <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem placeholder="e.g. Feedback form">
                <FormLabel>Form name</FormLabel>
                <FormDescription>The name of this form is for your internal use only</FormDescription>
                <FormControl>
                  <Input placeholder="e.g. Feedback form" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col space-y-2">
            <Button type="submit" className="w-full" disabled={!hasName} loading={loading}>
              Create Form
            </Button>
            <Button variant="ghost" onClick={onClose} className="flex-1">
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
}

export default CreateFormModal;
