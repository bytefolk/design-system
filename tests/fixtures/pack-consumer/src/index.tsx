import type { Config } from 'tailwindcss';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  SidebarItem,
} from '@fullstack-ai-infra/ui';
import uiPreset from '@fullstack-ai-infra/ui/tailwind-preset';

export const tailwindConfig = {
  presets: [uiPreset],
  content: ['./src/**/*.{ts,tsx}'],
} satisfies Config;

export function PackedConsumer() {
  return (
    <>
      <SidebarItem onClick={() => undefined}>Overview</SidebarItem>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Open</Button>
        </DialogTrigger>
        <DialogContent closeLabel="Close workspace dialog">
          <DialogTitle>Workspace</DialogTitle>
        </DialogContent>
      </Dialog>
    </>
  );
}
