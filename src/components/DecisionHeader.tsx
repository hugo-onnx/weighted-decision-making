import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface DecisionHeaderProps {
  title: string;
  updatedAt: string;
  onTitleChange: (title: string) => void;
}

function formatUpdatedAt(updatedAt: string): string {
  const date = new Date(updatedAt);

  if (Number.isNaN(date.getTime())) {
    return 'just now';
  }

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
}

export function DecisionHeader({
  title,
  updatedAt,
  onTitleChange,
}: DecisionHeaderProps) {
  return (
    <header className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,380px)]">
      <Card className="bg-white/85">
        <CardHeader>
          <p className="text-xs font-semibold uppercase text-muted-foreground">
            Decision workspace
          </p>
          <CardTitle className="text-3xl sm:text-4xl">
            Shape the comparison below the paths.
          </CardTitle>
          <CardDescription className="max-w-2xl text-base leading-7">
            Name the decision, define the options in front of you, then weight
            and score each category to surface a recommendation that feels
            grounded.
          </CardDescription>
        </CardHeader>
      </Card>

      <Card className="bg-slate-50/90">
        <CardHeader className="pb-4">
          <p className="text-xs font-semibold uppercase text-muted-foreground">
            Current decision
          </p>
          <CardTitle className="text-2xl">Set the working title</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <label
            className="text-xs font-semibold uppercase text-muted-foreground"
            htmlFor="decision-title"
          >
            Decision title
          </label>
          <Input
            className="h-[3.25rem] rounded-md text-base"
            id="decision-title"
            onChange={(event) => onTitleChange(event.target.value)}
            placeholder="Untitled decision"
            value={title}
          />
          <p className="text-sm leading-6 text-muted-foreground">
            Last updated {formatUpdatedAt(updatedAt)}
          </p>
        </CardContent>
      </Card>
    </header>
  );
}
