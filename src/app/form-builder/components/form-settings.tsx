'use client';

import { useState } from 'react';

import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';

// Components
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Sheet, SheetContent, SheetHeader } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { Settings } from 'lucide-react';

type SheetProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: EditFormProps) => void;
};

const formSchema = z.object({
  name: z.string().min(1, 'Required')
});

type EditFormProps = z.infer<typeof formSchema>;

function FormSettings({ open, onSubmit, onClose }: SheetProps) {
  const [loading, setLoading] = useState(false);

  const form = useForm<EditFormProps>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: ''
    }
  });

  const onOpenChange = (open: boolean) => {
    !open && onClose();
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-80 border-none outline-none shadow-none">
        <SheetHeader>
          <div>
            <div className="flex flex-row items-center gap-2">
              <Settings className="w-4 h-4 inline" /> <p className="text-sm font-medium">Settings</p>
            </div>
            <p className="text-xs text-gray-400 font-medium">Global configurations</p>
          </div>
        </SheetHeader>

        <Form {...form}>
          <form className="space-y-8 mt-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem placeholder="e.g. Feedback form">
                  <FormLabel>Form name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-row items-center gap-4">
              <Button type="submit" loading={loading} className="flex-1">
                Save
              </Button>
              <Button variant="ghost" onClick={onClose} className="flex-1 text-destructive hover:text-destructive hover:bg-red-100">
                Discard
              </Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}

export default FormSettings;
