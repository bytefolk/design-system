import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Bot, Brain, FileText } from 'lucide-react';
import { axe } from 'vitest-axe';

import {
  AIStatus,
  AppShell,
  EmptyState,
  ModuleRail,
  PageHeader,
  Sidebar,
  SourceStatus,
  Topbar,
} from '../src';

const railItems = [
  { id: 'employees', label: 'Digital Employees', icon: <Bot />, active: true },
  { id: 'memory', label: 'Memory', icon: <Brain /> },
  { id: 'docs', label: 'Docs', icon: <FileText /> },
];

describe('application patterns', () => {
  it('exposes one empty-state heading and a keyboard reachable consumer action', async () => {
    const user = userEvent.setup();
    const onAction = vi.fn();
    const { container } = render(
      <EmptyState
        icon={<FileText aria-label="Decorative document" />}
        title="No documents yet"
        description="Create your first document."
        action={<button onClick={onAction}>Create document</button>}
      />,
    );
    expect(screen.getAllByRole('heading')).toHaveLength(1);
    expect(screen.getByRole('heading', { name: 'No documents yet' })).toBeVisible();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    await user.tab();
    expect(screen.getByRole('button', { name: 'Create document' })).toHaveFocus();
    await user.keyboard('{Enter}');
    expect(onAction).toHaveBeenCalledOnce();
    expect(
      (await axe(container, { rules: { 'color-contrast': { enabled: false } } })).violations,
    ).toEqual([]);
  });

  it('supports a compact read-only empty state without inventing an action', () => {
    render(<EmptyState compact title="No matching records" description="Try another filter." />);
    expect(screen.getByRole('heading', { name: 'No matching records' })).toBeVisible();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('moves module focus with arrow, Home, and End keys', async () => {
    const user = userEvent.setup();
    render(<ModuleRail items={railItems} />);
    const employees = screen.getByRole('button', { name: 'Digital Employees' });
    const memory = screen.getByRole('button', { name: 'Memory' });
    const docs = screen.getByRole('button', { name: 'Docs' });

    expect(employees).toHaveAttribute('aria-label', 'Digital Employees');
    employees.focus();
    await user.keyboard('{ArrowDown}');
    expect(memory).toHaveFocus();
    await user.keyboard('{End}');
    expect(docs).toHaveFocus();
    await user.keyboard('{Home}');
    expect(employees).toHaveFocus();
    await user.keyboard('{ArrowUp}');
    expect(docs).toHaveFocus();
  });

  it('announces AI and source states with the reserved semantic patterns', () => {
    render(
      <div>
        <AIStatus state="thinking" />
        <SourceStatus state="error" />
      </div>,
    );
    expect(screen.getByRole('status', { name: /AI is working/i })).toHaveAttribute(
      'aria-live',
      'polite',
    );
    expect(screen.getByRole('status', { name: /Source needs attention/i })).toHaveAttribute(
      'aria-live',
      'assertive',
    );
  });

  it('composes a product-neutral shell with landmarks and no accessibility violations', async () => {
    const { container } = render(
      <AppShell
        moduleRail={<ModuleRail items={railItems} />}
        sidebar={<Sidebar>Navigation</Sidebar>}
        topbar={<Topbar>Workspace</Topbar>}
      >
        <PageHeader title="Overview" description="Shared workspace summary" />
      </AppShell>,
    );

    expect(screen.getByRole('navigation', { name: 'Products' })).toBeVisible();
    expect(screen.getByRole('complementary', { name: 'Workspace' })).toBeVisible();
    expect(screen.getByRole('main')).toHaveAttribute('id', 'main-content');
    const results = await axe(container, { rules: { 'color-contrast': { enabled: false } } });
    expect(results.violations).toEqual([]);
  });
});
