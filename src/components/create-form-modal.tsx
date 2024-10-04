import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';

// Components
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type CreateFormModalProps = {
  open: boolean;
  loading: boolean;
  onClose: () => void;
  onSubmit: (data: z.infer<typeof formSchema>) => void;
};

const formSchema = z.object({
  name: z.string().min(1, 'Required')
});

function CreateFormModal({ open, loading, onClose, onSubmit }: CreateFormModalProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  });

  const hasName = !!form.watch('name');

  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new form</DialogTitle>
        </DialogHeader>
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
              <Button type="submit" className="w-full" disabled={!hasName}>
                Create Form
              </Button>
              <Button variant="ghost" onClick={onClose} className="flex-1">
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateFormModal;
