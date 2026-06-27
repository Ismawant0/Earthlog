import React from "react";
import { AlertTriangle, AlertCircle, CheckCircle, Info } from "lucide-react";
import InteractiveDiagram from "./InteractiveDiagram";
import FAQAccordion from "./FAQAccordion";
import Figure from "./mdx/Figure";
import InteractiveBlock from "./mdx/InteractiveBlock";

// CtaButton — affiliate / call-to-action button inserted from toolbar
export function CtaButton({ label = 'Click Here', href = '#', color = '#111827' }: { label?: string; href?: string; color?: string }) {
  return (
    <div style={{ margin: '1.75rem 0', textAlign: 'center' }}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer sponsored"
        style={{
          display: 'inline-block',
          padding: '0.7rem 1.8rem',
          backgroundColor: color,
          color: '#fff',
          borderRadius: '0.5rem',
          fontWeight: 700,
          fontSize: '1rem',
          textDecoration: 'none',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          transition: 'opacity 0.15s',
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = '0.85')}
        onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = '1')}
      >
        {label}
      </a>
    </div>
  );
}

// 1. WarningBox Component
interface WarningBoxProps {
  type: "success" | "warning" | "error" | "important";
  children: React.ReactNode;
}

export function WarningBox({ type, children }: WarningBoxProps) {
  const getStyles = () => {
    switch (type) {
      case "success":
        return {
          bg: "bg-success/5 dark:bg-success/10",
          border: "border-success",
          text: "text-success-foreground",
          icon: <CheckCircle className="h-5 w-5 text-success shrink-0" />,
        };
      case "warning":
        return {
          bg: "bg-warning/5 dark:bg-warning/10",
          border: "border-warning",
          text: "text-warning-foreground",
          icon: <AlertTriangle className="h-5 w-5 text-warning shrink-0" />,
        };
      case "error":
        return {
          bg: "bg-error/5 dark:bg-error/10",
          border: "border-error",
          text: "text-error-foreground",
          icon: <AlertCircle className="h-5 w-5 text-error shrink-0" />,
        };
      case "important":
      default:
        return {
          bg: "bg-primary/5 dark:bg-primary/10",
          border: "border-primary",
          text: "text-primary-foreground",
          icon: <Info className="h-5 w-5 text-primary dark:text-primary-light shrink-0" />,
        };
    }
  };

  const styles = getStyles();

  return (
    <div className={`my-6 p-4 rounded-lg border-l-4 ${styles.bg} ${styles.border} flex items-start gap-3 shadow-sm`}>
      {styles.icon}
      <div className="text-[15px] leading-relaxed text-foreground/95 antialiased">
        {children}
      </div>
    </div>
  );
}

// 2. TechnicalTable Component
function parseStringProp(raw: unknown): string[] {
  if (Array.isArray(raw)) return raw as string[];
  if (typeof raw !== "string") return [];
  const unescaped = (raw as string)
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
  try {
    const parsed = JSON.parse(unescaped);
    if (Array.isArray(parsed)) return parsed;
  } catch {
    try {
      // eslint-disable-next-line no-new-func
      const parsed = new Function(`return ${unescaped}`)();
      if (Array.isArray(parsed)) return parsed;
    } catch {}
  }
  return [];
}

export function TechnicalTable({ headers, data }: { headers: unknown; data: unknown }) {
  const safeHeaders = parseStringProp(headers);
  const safeData: string[][] = Array.isArray(data)
    ? (data as string[][])
    : (() => {
        if (typeof data !== "string") return [];
        const unescaped = (data as string)
          .replace(/&quot;/g, '"')
          .replace(/&amp;/g, "&")
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">");
        try {
          const parsed = JSON.parse(unescaped);
          if (Array.isArray(parsed)) return parsed as string[][];
        } catch {
          try {
            // eslint-disable-next-line no-new-func
            const parsed = new Function(`return ${unescaped}`)();
            if (Array.isArray(parsed)) return parsed as string[][];
          } catch {}
        }
        return [];
      })();

  if (safeHeaders.length === 0 && safeData.length === 0) {
    return null;
  }


  return (
    <div className="my-8 overflow-x-auto rounded-lg border border-border bg-card shadow-sm">
      <table className="w-full text-left border-collapse">
        {safeHeaders.length > 0 && (
          <thead>
            <tr className="bg-background-alt border-b border-border text-[13px] font-bold text-foreground/80 uppercase tracking-wider">
              {safeHeaders.map((h, i) => (
                <th key={i} className="px-4 py-3 font-semibold">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
        )}
        {safeData.length > 0 && (
          <tbody className="divide-y divide-border text-sm">
            {safeData.map((row, idx) => (
              <tr 
                key={idx} 
                className={`transition-colors hover:bg-background-alt/50 ${
                  idx % 2 === 1 ? "bg-background-alt/20" : ""
                }`}
              >
                {Array.isArray(row) && row.map((cell, cellIdx) => (
                  <td key={cellIdx} className="px-4 py-3 text-foreground/95 font-medium">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
}

// 3. MDX Custom Component Dictionary Mapping (Server-side Dictionary)
export const mdxComponents = {
  WarningBox,
  TechnicalTable,
  FAQAccordion,
  InteractiveDiagram,
  Figure,
  InteractiveBlock,
  CtaButton,
  
  // Custom styled base elements for consistent beautiful typography in MDX
  h1: (props: any) => (
    <h1 
      className="text-3xl md:text-4xl font-bold tracking-tight mt-8 mb-4 pb-3 text-foreground"
      style={{ borderBottom: '1px solid var(--border)' }}
      {...props} 
    />
  ),
  h2: (props: any) => {
    const text = React.Children.toArray(props.children).join("");
    const id = text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
    return (
      <h2 
        id={id}
        className="text-2xl font-semibold tracking-tight mt-10 mb-4 scroll-mt-20"
        style={{ color: 'var(--foreground)', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}
        {...props} 
      />
    );
  },
  h3: (props: any) => {
    const text = React.Children.toArray(props.children).join("");
    const id = text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
    return (
      <h3 
        id={id}
        className="text-xl font-semibold mt-7 mb-3 scroll-mt-20"
        style={{ color: 'var(--foreground)' }}
        {...props} 
      />
    );
  },
  p: (props: any) => (
    <p 
      className="text-[16.5px] leading-[1.85] my-4"
      style={{ color: 'var(--foreground-sub)' }}
      {...props} 
    />
  ),
  ul: (props: any) => (
    <ul 
      className="list-disc pl-6 my-4 space-y-2 text-[16px]"
      style={{ color: 'var(--foreground-sub)' }}
      {...props} 
    />
  ),
  ol: (props: any) => (
    <ol 
      className="list-decimal pl-6 my-4 space-y-2 text-[16px]"
      style={{ color: 'var(--foreground-sub)' }}
      {...props} 
    />
  ),
  li: (props: any) => (
    <li 
      className="leading-[1.75]" 
      {...props} 
    />
  ),
  hr: (props: any) => (
    <hr 
      className="border-border/60 my-8" 
      {...props} 
    />
  ),
  blockquote: (props: any) => (
    <blockquote 
      className="border-l-[3px] py-3 px-5 my-6 italic text-[16px] leading-relaxed"
      style={{ 
        backgroundColor: 'var(--blockquote-bg)', 
        borderLeftColor: 'var(--blockquote-border)',
        color: 'var(--blockquote-text)',
        borderRadius: '0 12px 12px 0'
      }}
      {...props} 
    />
  ),
  pre: (props: any) => (
    <pre 
      className="overflow-x-auto my-6 font-mono text-sm leading-relaxed"
      style={{
        backgroundColor: 'var(--codeblock-bg)',
        color: 'var(--codeblock-text)',
        border: '1px solid var(--codeblock-border)',
        borderRadius: 'var(--radius-card)',
        padding: '1.25rem 1.5rem'
      }}
      {...props} 
    />
  ),
  code: (props: any) => (
    <code 
      className="font-mono text-sm font-medium"
      style={{
        backgroundColor: 'var(--code-bg)',
        color: 'var(--code-text)',
        padding: '2px 6px',
        borderRadius: '6px'
      }}
      {...props} 
    />
  ),
};
