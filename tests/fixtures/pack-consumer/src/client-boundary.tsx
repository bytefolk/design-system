'use client';

import { Button, DropdownMenu } from '@fullstack-ai-infra/ui';

export function NextClientBoundary() {
  return (
    <DropdownMenu>
      <Button>Client action</Button>
    </DropdownMenu>
  );
}
