import { useState } from 'react';

import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';

import { useForm as useReactForm } from 'react-hook-form';

// Components
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Sheet, SheetContent, SheetHeader } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import WelcomeStepConfig from './welcome-step-config';
import EndStepConfig from './end-step-config';

import { Settings } from 'lucide-react';

// Hooks
import useFormEditorStore from '../hooks/use-form-editor-store';

import { InputType } from '@/types/form.types';

type SheetProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: EditStepProps) => void;
};

const formSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  isRequired: z.boolean().default(false)
});

type EditStepProps = z.infer<typeof formSchema>;

function StepConfig({ open, onSubmit, onClose }: SheetProps) {
  const [loading, setLoading] = useState(false);
  const activeStep = useFormEditorStore((state) => state.activeStep);
  const hyperform = useFormEditorStore((state) => state.form);

  const form = useReactForm<EditStepProps>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: ''
    }
  });

  const onOpenChange = (open: boolean) => {
    !open && onClose();
  };

  const getLabel = (inputType?: InputType) => {
    switch (inputType) {
      case 'text':
        return 'Short Text';
      case 'email':
        return 'Email';
      default:
        return '';
    }
  };

  if (activeStep?.type === 'welcome') return <WelcomeStepConfig open={open} onSubmit={() => {}} onClose={onClose} />;

  if (activeStep?.type === 'end') return <EndStepConfig open={open} onSubmit={() => {}} onClose={onClose} />;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-80 border-none outline-none shadow-none">
        <SheetHeader>
          <div>
            <div className="flex flex-row items-center gap-2">
              <Settings className="w-4 h-4 inline" /> <p className="text-sm font-medium">Settings</p>
            </div>
            <p className="text-xs text-gray-400 font-medium">{getLabel(activeStep?.inputType)}</p>
          </div>
        </SheetHeader>

        <Form {...form}>
          <form className="space-y-8 mt-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isRequired"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between">
                  <FormLabel>Required</FormLabel>
                  <FormControl>
                    <Switch {...field} />
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

export default StepConfig;
