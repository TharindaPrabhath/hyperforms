'use client';

import { useState } from 'react';

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import FormSettings from './components/form-settings';
import FormContent from './components/form-content';
import Renderer from './components/renderer';

import { Box, Settings } from 'lucide-react';

function FormBuilder() {
  const [openSettings, setOpenSettings] = useState(false);

  return (
    <div className="bg-white p-2 flex flex-row h-screen overflow-y-hidden">
      <section className="w-80 py-3 px-3 flex flex-col">
        <div className="flex flex-row items-center justify-between">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="text-xs font-medium hover:text-blue-700">
                  <Box className="w-3 h-3 mr-0 inline" /> Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink className="text-xs">Test</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <Button variant="ghost" type="button" size="sm" onClick={() => setOpenSettings(true)}>
            <Settings className="w-4 h-4" />
          </Button>
          <FormSettings open={openSettings} onSubmit={() => {}} onClose={() => setOpenSettings(false)} />
        </div>
        <Tabs defaultValue="content" className="w-full mt-4 flex-1">
          <TabsList className="w-fit mx-auto">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="design">Design</TabsTrigger>
            <TabsTrigger value="share">Share</TabsTrigger>
            <TabsTrigger value="replies">Replies</TabsTrigger>
          </TabsList>
          <TabsContent value="content" className="h-full">
            <FormContent />
          </TabsContent>
        </Tabs>
      </section>

      <section className="flex-1">
        <Renderer />
      </section>
    </div>
  );
}

export default FormBuilder;
