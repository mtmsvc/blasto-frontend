import { Container } from "@/components/layout/container";

/** Title and intro text at the top of every page except the home page. */
export function PageHeader({ title, text }: { title: string; text?: string }) {
  return (
    <Container className="pt-16 pb-10 sm:pt-24 sm:pb-14">
      <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance break-words hyphens-auto sm:text-5xl">
        {title}
      </h1>
      {text && (
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-pretty text-muted-foreground">
          {text}
        </p>
      )}
    </Container>
  );
}
