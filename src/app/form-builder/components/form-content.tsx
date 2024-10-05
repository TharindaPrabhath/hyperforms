'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

// Components
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import AddFieldModal, { Field } from './add-field-modal';
import StepConfig from './step-config';

import { Menu, Dot, GripVertical, Plus, Cloud, Trash2, X } from 'lucide-react';

import useFormEditorStore from '@/hooks/use-form-editor-store';

import { Step } from '@/types/form.types';

function FormContent() {
  const router = useRouter();

  const [openAddFieldModal, setOpenAddFieldModal] = useState(false);
  const [openStepConfigDrawer, setOpenStepConfigDrawer] = useState(false);

  // Form state management
  const form = useFormEditorStore((state) => state.form);
  const addStep = useFormEditorStore((state) => state.addStep);
  const removeStep = useFormEditorStore((state) => state.removeStep);
  const setActiveStep = useFormEditorStore((state) => state.setActiveStep);
  const reset = useFormEditorStore((state) => state.reset);

  const handleAddField = (selectedField: Field) => {
    // Essentially, what happens here is that adding a new step of type question.
    addStep(selectedField.type);
    setOpenStepConfigDrawer(true);
    setOpenAddFieldModal(false);
  };

  const handleTabClick = (step: Step) => {
    // Set the active step to the selected step. This will be used to display the step configuration drawer.
    setActiveStep(step);
    setOpenStepConfigDrawer(true);
  };

  const handleTabDelete = (stepId: string) => {
    // Remove the step from the form state.
    removeStep(stepId);
  };

  const handleDeleteForm = () => {
    // Reset the form state to the initial state.
    // This will remove all the steps and reset the active step to the welcome step.
    reset();
  };

  const handlePublishForm = () => {
    setActiveStep(form.steps.find((step) => step.type === 'welcome') ?? form.steps[0]);
    router.push(`/forms/${form.id}`);
  };

  return (
    <div className="flex flex-col justify-between ">
      <div className="flex-1">
        <div className="mt-8">
          <div className="flex flex-row items-center gap-1">
            <Menu className="w-3 h-3" /> <p className="text-sm font-medium">Steps</p>
          </div>
          <p className="mt-1 text-xs text-gray-500">The steps users will take to complete the form</p>
        </div>

        <div className="mt-4 space-y-2">
          <Tab
            type="welcome"
            label="Welcome screen"
            onClick={() => {
              const welcomeStep = form.steps.find((step) => step.type === 'welcome');
              if (welcomeStep) handleTabClick(welcomeStep);
            }}
          />

          {form.steps
            .filter((step) => step.type === 'question')
            .map((step) => (
              <Tab key={step.id} type="question" label={step.title || 'Untitled question'} onClick={() => handleTabClick(step)} onDelete={() => handleTabDelete(step.id)} />
            ))}
        </div>

        <Button variant="outline" size="sm" className="mt-6" onClick={() => setOpenAddFieldModal(true)}>
          <Plus className="w-4 h-4 mr-1" /> Add field
        </Button>

        <AddFieldModal open={openAddFieldModal} loading={false} onSubmit={handleAddField} onClose={() => setOpenAddFieldModal(false)} />

        <StepConfig open={openStepConfigDrawer} onSubmit={() => {}} onClose={() => setOpenStepConfigDrawer(false)} />

        <Separator className="my-10" />

        <Tab
          type="end"
          label="End screen"
          onClick={() => {
            const endStep = form.steps.find((step) => step.type === 'end');
            if (endStep) handleTabClick(endStep);
          }}
        />

        <div className="mt-8 flex flex-row items-center gap-2">
          <Button className="flex-1" onClick={handlePublishForm}>
            <Cloud className="w-4 h-4  mr-2 inline" />
            Save & Publish
          </Button>
          <Button className="flex-1 text-destructive hover:text-destructive hover:bg-red-100" variant="ghost" onClick={handleDeleteForm}>
            <Trash2 className="w-4 h-4  mr-2 inline" />
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}

export default FormContent;

type TabProps = {
  type: 'welcome' | 'question' | 'end';
  label: string;
  onClick: () => void;
  onDelete?: () => void;
};

function Tab({ type, label, onClick, onDelete }: TabProps) {
  return (
    <div className="flex flex-row items-center justify-between bg-gray-50 hover:bg-gray-100  px-2 rounded-lg cursor-pointer">
      <div onClick={onClick} className="flex flex-1 py-1 flex-row items-center gap-2 ">
        {type === 'question' ? <GripVertical className="w-3 h-3 text-gray-500 cursor-grab" /> : <Dot className="w-6 h-6 text-gray-500" />}
        <p className="text-xs font-medium">{label}</p>
      </div>
      {type === 'question' && (
        <Button size="sm" variant="ghost" onClick={onDelete}>
          <X className="w-3 h-3 text-gray-500" />
        </Button>
      )}
    </div>
  );
}
