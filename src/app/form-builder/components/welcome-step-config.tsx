import { useState } from 'react';

import Image from 'next/image';

import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';

import { useForm as useReactForm } from 'react-hook-form';

// Components
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Sheet, SheetContent, SheetHeader } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

import { Settings, Upload, AlignLeft, AlignRight } from 'lucide-react';

// Hooks
import useFormEditorStore from '../hooks/use-form-editor-store';

import { WelcomeStep } from '@/types/form.types';

type SheetProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: EditStepProps) => void;
};

const formSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  buttonText: z.string().optional(),
  image: z
    .object({
      url: z.string().optional(),
      placement: z.string().optional()
    })
    .optional()
});

type EditStepProps = z.infer<typeof formSchema>;

function WelcomeStepConfig({ open, onSubmit, onClose }: SheetProps) {
  const [loading, setLoading] = useState(false);
  const activeStep = useFormEditorStore((state) => state.activeStep) as WelcomeStep;
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

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-80 border-none outline-none shadow-none">
        <SheetHeader>
          <div>
            <div className="flex flex-row items-center gap-2">
              <Settings className="w-4 h-4 inline" /> <p className="text-sm font-medium">Settings</p>
            </div>
            <p className="text-xs text-gray-400 font-medium">Welcome Step</p>
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
              name="buttonText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Button Text</FormLabel>
                  <FormControl>
                    <Input placeholder="Let's start" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button size="sm" variant="outline">
              <Upload className="w-4 h-4 mr-1" /> Upload
            </Button>

            <div className="space-y-2">
              <Image src={activeStep.image.url} alt="Uploaded image" width={500} height={500} />
              <div className="flex flex-row items-center justify-between">
                <Button size="sm" variant="outline" className="">
                  Remove Image
                </Button>

                <ToggleGroup type="single">
                  <ToggleGroupItem value="a">
                    <AlignLeft className="w-4 h-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="b">
                    <AlignRight className="w-4 h-4" />
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
            </div>

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

export default WelcomeStepConfig;
