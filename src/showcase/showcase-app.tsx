import {
  Bell,
  Bot,
  Brain,
  ChevronDown,
  Clock3,
  Command,
  FilePenLine,
  FileText,
  FolderOpen,
  History,
  Inbox,
  Library,
  Moon,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  Sparkles,
  Sun,
  Users,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

import {
  AIStatus,
  AppShell,
  Badge,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Input,
  ModuleRail,
  PageHeader,
  Sidebar,
  SidebarItem,
  SidebarSection,
  SidebarSectionLabel,
  SourceStatus,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Topbar,
} from '../index';

type ModuleId = 'employees' | 'memory' | 'docs';
type Theme = 'light' | 'dark';

const moduleDetails = {
  employees: {
    name: 'Digital Employees',
    icon: <Bot size={21} />,
    sections: [
      { label: 'Overview', icon: <Inbox size={16} />, count: 3 },
      { label: 'Employees', icon: <Users size={16} />, count: 3 },
      { label: 'Runs', icon: <History size={16} />, count: 12 },
    ],
  },
  memory: {
    name: 'Memory',
    icon: <Brain size={21} />,
    sections: [
      { label: 'Recent', icon: <Clock3 size={16} />, count: 18 },
      { label: 'Sources', icon: <Library size={16} />, count: 6 },
      { label: 'Collections', icon: <FolderOpen size={16} />, count: 4 },
    ],
  },
  docs: {
    name: 'Docs',
    icon: <FileText size={21} />,
    sections: [
      { label: 'All documents', icon: <FileText size={16} />, count: 24 },
      { label: 'Shared', icon: <Users size={16} />, count: 8 },
      { label: 'Drafts', icon: <FilePenLine size={16} />, count: 3 },
    ],
  },
} satisfies Record<
  ModuleId,
  {
    name: string;
    icon: React.ReactNode;
    sections: Array<{ label: string; icon: React.ReactNode; count: number }>;
  }
>;

function BrandMark() {
  return (
    <div className="showcase-brand" aria-label="Fullstack AI Infrastructure">
      <span>F</span>
    </div>
  );
}

function WorkspaceSidebar({ activeModule }: { activeModule: ModuleId }) {
  const details = moduleDetails[activeModule];
  return (
    <Sidebar
      label={`${details.name} navigation`}
      header={
        <button type="button" className="showcase-workspace-switcher">
          <span className="showcase-workspace-avatar">A</span>
          <span>
            <strong>Atlas workspace</strong>
            <small>{details.name}</small>
          </span>
          <ChevronDown size={15} aria-hidden="true" />
        </button>
      }
      footer={
        <div className="showcase-profile">
          <span className="showcase-avatar">W</span>
          <span>
            <strong>Signed-in user</strong>
            <small>Workspace owner</small>
          </span>
          <Settings size={15} aria-hidden="true" />
        </div>
      }
    >
      <SidebarSection>
        {details.sections.map((item, index) => (
          <SidebarItem key={item.label} icon={item.icon} count={item.count} active={index === 0}>
            {item.label}
          </SidebarItem>
        ))}
      </SidebarSection>
      <SidebarSection>
        <SidebarSectionLabel>Workspace</SidebarSectionLabel>
        <SidebarItem icon={<Sparkles size={16} />}>AI activity</SidebarItem>
        <SidebarItem icon={<Settings size={16} />}>Settings</SidebarItem>
      </SidebarSection>
      <div className="showcase-sidebar-note">
        <Sparkles size={16} aria-hidden="true" />
        <p>
          <strong>One workspace, one language.</strong>
          <span>Every module uses the same accessible system.</span>
        </p>
      </div>
    </Sidebar>
  );
}

function EmployeePanel() {
  return (
    <Card className="showcase-module-card">
      <div className="showcase-module-card__accent is-employee" />
      <CardContent>
        <div className="showcase-module-heading">
          <span className="showcase-module-icon is-employee">
            <Bot size={20} aria-hidden="true" />
          </span>
          <div>
            <Badge tone="success">2 online</Badge>
            <h2>Digital Employees</h2>
          </div>
          <Button variant="ghost" size="icon" aria-label="Digital Employees options">
            <MoreHorizontal size={18} />
          </Button>
        </div>
        <p className="showcase-module-copy">
          Reliable roles with visible sources and human handoff.
        </p>
        <div className="showcase-employee">
          <span className="showcase-employee-avatar">A</span>
          <span className="showcase-list-copy">
            <strong>Answer agent</strong>
            <small>Support knowledge · 14 sources</small>
          </span>
          <AIStatus state="ready" label="Ready" />
        </div>
        <div className="showcase-employee">
          <span className="showcase-employee-avatar is-lavender">R</span>
          <span className="showcase-list-copy">
            <strong>Research partner</strong>
            <small>Product research · 6 sources</small>
          </span>
          <AIStatus state="review" label="Review" />
        </div>
        <Button variant="secondary" className="showcase-card-action">
          View employees
        </Button>
      </CardContent>
    </Card>
  );
}

function MemoryPanel() {
  return (
    <Card className="showcase-module-card">
      <div className="showcase-module-card__accent is-memory" />
      <CardContent>
        <div className="showcase-module-heading">
          <span className="showcase-module-icon is-memory">
            <Brain size={20} aria-hidden="true" />
          </span>
          <div>
            <Badge tone="info">18 today</Badge>
            <h2>Memory</h2>
          </div>
          <Button variant="ghost" size="icon" aria-label="Memory options">
            <MoreHorizontal size={18} />
          </Button>
        </div>
        <p className="showcase-module-copy">
          Traceable context that stays owned by your workspace.
        </p>
        <div className="showcase-memory-note">
          <span className="showcase-memory-note__time">10:32</span>
          <p>
            <strong>Decision</strong>
            <span>Use the shared C design language across all products.</span>
          </p>
        </div>
        <div className="showcase-source-row">
          <span className="showcase-list-copy">
            <strong>Project files</strong>
            <small>Synced 2 minutes ago</small>
          </span>
          <SourceStatus state="available" label="Connected" />
        </div>
        <Button variant="secondary" className="showcase-card-action">
          Explore memories
        </Button>
      </CardContent>
    </Card>
  );
}

function DocsPanel() {
  return (
    <Card className="showcase-module-card">
      <div className="showcase-module-card__accent is-docs" />
      <CardContent>
        <div className="showcase-module-heading">
          <span className="showcase-module-icon is-docs">
            <FileText size={20} aria-hidden="true" />
          </span>
          <div>
            <Badge tone="neutral">24 docs</Badge>
            <h2>Docs</h2>
          </div>
          <Button variant="ghost" size="icon" aria-label="Docs options">
            <MoreHorizontal size={18} />
          </Button>
        </div>
        <p className="showcase-module-copy">
          A calm, collaborative writing surface for humans and AI.
        </p>
        <div className="showcase-doc-row">
          <FileText size={17} aria-hidden="true" />
          <span className="showcase-list-copy">
            <strong>Product direction</strong>
            <small>Edited 4 min ago</small>
          </span>
          <span className="showcase-presence">W</span>
        </div>
        <div className="showcase-doc-row">
          <FileText size={17} aria-hidden="true" />
          <span className="showcase-list-copy">
            <strong>Launch checklist</strong>
            <small>8 collaborators · Yesterday</small>
          </span>
          <span className="showcase-presence is-second">+3</span>
        </div>
        <Button variant="secondary" className="showcase-card-action">
          Open documents
        </Button>
      </CardContent>
    </Card>
  );
}

function CreateDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus size={16} aria-hidden="true" /> Create
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create in your workspace</DialogTitle>
          <DialogDescription>
            Choose an object. Product data stays in its owning application.
          </DialogDescription>
        </DialogHeader>
        <div className="showcase-create-grid">
          <button type="button">
            <Bot size={20} aria-hidden="true" />
            <strong>Employee</strong>
            <span>Configure a reliable role</span>
          </button>
          <button type="button">
            <Brain size={20} aria-hidden="true" />
            <strong>Memory</strong>
            <span>Capture traceable context</span>
          </button>
          <button type="button">
            <FileText size={20} aria-hidden="true" />
            <strong>Document</strong>
            <span>Start a shared page</span>
          </button>
        </div>
        <DialogFooter>
          <Button variant="secondary">Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function ShowcaseApp() {
  const [activeModule, setActiveModule] = useState<ModuleId>('employees');
  const [theme, setTheme] = useState<Theme>('light');
  const [query, setQuery] = useState('');

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const moduleItems = useMemo(
    () =>
      (Object.entries(moduleDetails) as Array<[ModuleId, (typeof moduleDetails)[ModuleId]]>).map(
        ([id, details]) => ({
          id,
          label: details.name,
          icon: details.icon,
          active: activeModule === id,
          onSelect: () => setActiveModule(id),
        }),
      ),
    [activeModule],
  );

  return (
    <TooltipProvider delayDuration={350}>
      <a className="showcase-skip-link" href="#main-content">
        Skip to content
      </a>
      <AppShell
        aria-label="Warm Agent Workspace showcase"
        moduleRail={
          <ModuleRail
            items={moduleItems}
            brand={<BrandMark />}
            footer={
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
                    onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                  >
                    {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">Toggle color theme</TooltipContent>
              </Tooltip>
            }
          />
        }
        sidebar={<WorkspaceSidebar activeModule={activeModule} />}
        topbar={
          <Topbar
            breadcrumbs={
              <span className="showcase-breadcrumb">
                Atlas workspace <span>/</span> {moduleDetails[activeModule].name}
              </span>
            }
            actions={
              <>
                <label className="showcase-search">
                  <Search size={15} aria-hidden="true" />
                  <span className="showcase-visually-hidden">Search workspace</span>
                  <Input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search workspace"
                  />
                  <kbd>
                    <Command size={11} aria-hidden="true" /> K
                  </kbd>
                </label>
                <Button variant="ghost" size="icon" aria-label="Notifications">
                  <Bell size={18} />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" aria-label="Workspace menu">
                      <MoreHorizontal size={18} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Workspace</DropdownMenuLabel>
                    <DropdownMenuItem>Invite people</DropdownMenuItem>
                    <DropdownMenuItem>Preferences</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Documentation</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            }
          />
        }
      >
        <div className="showcase-page">
          <PageHeader
            eyebrow="Unified workspace"
            title="Good morning"
            description="Your employees, memories, and documents share one calm, trustworthy workspace."
            meta={
              <>
                <SourceStatus state="available" label="All systems connected" />
                <span className="showcase-updated">Updated just now</span>
              </>
            }
            actions={<CreateDialog />}
          />

          <section className="showcase-briefing" aria-labelledby="briefing-title">
            <span className="showcase-briefing__icon">
              <Sparkles size={19} aria-hidden="true" />
            </span>
            <div>
              <AIStatus state="ready" label="AI briefing" />
              <h2 id="briefing-title">Three threads are ready for your attention</h2>
              <p>
                The answer agent has a response to review, 18 memories were captured, and a product
                direction document was updated.
              </p>
            </div>
            <Button variant="ai">Review briefing</Button>
          </section>

          <div className="showcase-section-heading">
            <div>
              <h2>Your workspace</h2>
              <p>One interaction language across every infrastructure plane.</p>
            </div>
            <Button variant="ghost">Manage workspace</Button>
          </div>

          <section className="showcase-module-grid" aria-label="Workspace modules">
            <EmployeePanel />
            <MemoryPanel />
            <DocsPanel />
          </section>

          <section className="showcase-foundation" aria-labelledby="foundation-title">
            <div>
              <Badge tone="ai">Design system foundation</Badge>
              <h2 id="foundation-title">
                Warm enough for people. Precise enough for infrastructure.
              </h2>
              <p>
                Paper surfaces, stone navigation, sage actions, and lavender AI cues stay consistent
                in light and dark themes.
              </p>
            </div>
            <div className="showcase-token-swatches" aria-label="Core color roles">
              <span className="is-paper" title="Paper surface" />
              <span className="is-stone" title="Stone navigation" />
              <span className="is-sage" title="Sage action" />
              <span className="is-ai" title="AI lavender" />
              <span className="is-charcoal" title="Charcoal text" />
            </div>
          </section>
        </div>
      </AppShell>
    </TooltipProvider>
  );
}
