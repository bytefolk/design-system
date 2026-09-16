import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { axe } from 'vitest-axe';

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardTitle,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Input,
  Skeleton,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../src';

describe('core primitives', () => {
  it('keeps buttons safe by default and observable to user input', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Save memory</Button>);

    const button = screen.getByRole('button', { name: 'Save memory' });
    expect(button).toHaveAttribute('type', 'button');
    await user.click(button);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('exposes validation state without changing the input contract', () => {
    render(<Input aria-label="Workspace name" invalid defaultValue="Atlas" />);
    expect(screen.getByRole('textbox', { name: 'Workspace name' })).toHaveAttribute(
      'aria-invalid',
      'true',
    );
  });

  it('forwards a native input ref for focus, selection and DOM listeners', () => {
    const ref = createRef<HTMLInputElement>();
    const { unmount } = render(
      <Input ref={ref} aria-label="Rename document" defaultValue="Atlas" />,
    );
    const input = screen.getByRole('textbox', { name: 'Rename document' });
    expect(ref.current).toBe(input);
    const onFocus = vi.fn();
    ref.current!.addEventListener('focus', onFocus);
    ref.current!.focus();
    expect(input).toHaveFocus();
    expect(onFocus).toHaveBeenCalledOnce();
    ref.current!.select();
    expect(ref.current!.selectionStart).toBe(0);
    expect(ref.current!.selectionEnd).toBe(5);
    ref.current!.removeEventListener('focus', onFocus);
    unmount();
    expect(ref.current).toBeNull();
  });

  it('clears and replaces callback refs with native input nodes', () => {
    const first = vi.fn();
    const second = vi.fn();
    const { rerender, unmount } = render(<Input ref={first} aria-label="Search" />);
    const input = screen.getByRole('textbox', { name: 'Search' });
    expect(first).toHaveBeenLastCalledWith(input);
    rerender(<Input ref={second} aria-label="Search" />);
    expect(first).toHaveBeenLastCalledWith(null);
    expect(second).toHaveBeenLastCalledWith(input);
    unmount();
    expect(second).toHaveBeenLastCalledWith(null);
  });

  it('renders cards, badges, and skeleton semantics', () => {
    render(
      <Card>
        <CardTitle>Source</CardTitle>
        <CardContent>
          <Badge tone="success">Connected</Badge>
          <Skeleton aria-label="Loading source" />
        </CardContent>
      </Card>,
    );
    expect(screen.getByRole('heading', { name: 'Source' })).toBeVisible();
    expect(screen.getByText('Connected')).toHaveClass('ui-badge--success');
    expect(screen.getByRole('status', { name: 'Loading source' })).toBeVisible();
  });

  it('moves focus into a dialog and returns it to its trigger on Escape', async () => {
    const user = userEvent.setup();
    render(
      <Dialog>
        <DialogTrigger asChild>
          <Button>Open details</Button>
        </DialogTrigger>
        <DialogContent closeLabel="Close memory details">
          <DialogTitle>Memory details</DialogTitle>
          <DialogDescription>Review where this memory came from.</DialogDescription>
          <Button>Confirm</Button>
        </DialogContent>
      </Dialog>,
    );

    const trigger = screen.getByRole('button', { name: 'Open details' });
    await user.click(trigger);
    expect(screen.getByRole('dialog', { name: 'Memory details' })).toBeVisible();
    expect(screen.getByRole('button', { name: 'Confirm' })).toHaveFocus();
    expect(screen.getByRole('button', { name: 'Close memory details' })).toBeVisible();

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it('supports keyboard opening and selection in dropdown menus', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>Actions</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={onSelect}>Archive</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    const trigger = screen.getByRole('button', { name: 'Actions' });
    trigger.focus();
    await user.keyboard('{Enter}');
    const item = await screen.findByRole('menuitem', { name: 'Archive' });
    expect(item).toHaveFocus();
    await user.keyboard('{Enter}');
    expect(onSelect).toHaveBeenCalledOnce();
  });

  it('reveals tooltip content to keyboard users', async () => {
    const user = userEvent.setup();
    render(
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button>Source help</Button>
          </TooltipTrigger>
          <TooltipContent>Sources are explicitly allowlisted.</TooltipContent>
        </Tooltip>
      </TooltipProvider>,
    );
    await user.tab();
    expect(await screen.findByRole('tooltip')).toHaveTextContent('explicitly allowlisted');
  });

  it('has no detectable accessibility violations across the primitive surface', async () => {
    const { container } = render(
      <main>
        <Button>Continue</Button>
        <Input aria-label="Search" />
        <Card>
          <CardTitle>Workspace</CardTitle>
          <CardContent>
            <Badge>Draft</Badge>
          </CardContent>
        </Card>
      </main>,
    );
    const results = await axe(container, { rules: { 'color-contrast': { enabled: false } } });
    expect(results.violations).toEqual([]);
  });
});
