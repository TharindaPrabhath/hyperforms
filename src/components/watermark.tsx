import Image from 'next/image';

import { Button } from './ui/button';

import { ArrowDown, ArrowUp } from 'lucide-react';

function Watermark() {
  return (
    <div className="absolute bottom-3 right-3 flex flex-row items-center gap-4">
      <Image src="/logo.png" alt="HyperForms logo" width={80} height={50} />
      <div>
        <Button size="icon" variant="secondary">
          <ArrowUp className="w-4 h-4" />
        </Button>
        <Button size="icon" variant="secondary">
          <ArrowDown className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

export default Watermark;
