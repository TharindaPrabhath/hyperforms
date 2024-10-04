// Components
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

import { Menu, Dot, GripVertical, Plus, Cloud, Trash2, X } from 'lucide-react';

function FormContent() {
  return (
    <div className="flex flex-col justify-between ">
      <div className="flex-1">
        <div className="mt-8">
          <div className="flex flex-row items-center gap-1">
            <Menu className="w-3 h-3" /> <p className="text-sm font-medium">Steps</p>
          </div>
          <p className="mt-1 text-xs text-gray-500">The steps users will take to complete the form</p>
        </div>

        <div className="mt-4">
          <Tab type="welcome-screen" label="Welcome screen" onClick={() => {}} />
          <Tab type="question" label="Welcome screen" onClick={() => {}} />
        </div>

        <Button variant="outline" size="sm" className="mt-6">
          <Plus className="w-4 h-4 mr-1" /> Add field
        </Button>

        <Separator className="my-10" />

        <Tab type="end-screen" label="End screen" onClick={() => {}} />

        <div className="mt-8 flex flex-row items-center gap-2">
          <Button className="flex-1">
            <Cloud className="w-4 h-4  mr-2 inline" />
            Save & Publish
          </Button>
          <Button className="flex-1 text-destructive hover:text-destructive hover:bg-red-100" variant="ghost">
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
  type: 'welcome-screen' | 'question' | 'end-screen';
  label: string;
  onClick: () => void;
  onDelete?: () => void;
};

function Tab({ type, label, onClick, onDelete }: TabProps) {
  return (
    <div onClick={onClick} className="flex flex-row items-center justify-between bg-gray-50 hover:bg-gray-100 py-2 px-2 rounded-lg cursor-pointer">
      <div className="flex flex-row items-center gap-2 ">
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
