import React from "react";
import { AlertTriangle, AlertCircle, CheckCircle, Info } from "lucide-react";
import InteractiveDiagram from "./InteractiveDiagram";
import FAQAccordion from "./FAQAccordion";

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
interface TechnicalTableProps {
  headers: string[];
  data: string[][];
}

export function TechnicalTable({ headers = [], data = [] }: TechnicalTableProps) {
  let safeHeaders = Array.isArray(headers) ? headers : [];
  let safeData = Array.isArray(data) ? data : [];

  if (typeof headers === 'string') {
    try {
      const parsed = JSON.parse(headers);
      if (Array.isArray(parsed)) safeHeaders = parsed;
    } catch {
      try {
        const parsed = new Function(`return ${headers}`)();
        if (Array.isArray(parsed)) safeHeaders = parsed;
      } catch {}
    }
  }

  if (typeof data === 'string') {
    try {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) safeData = parsed;
    } catch {
      try {
        const parsed = new Function(`return ${data}`)();
        if (Array.isArray(parsed)) safeData = parsed;
      } catch {}
    }
  }

  if (safeHeaders.length === 0 && safeData.length === 0) {
    console.warn("TechnicalTable: safeHeaders and safeData are empty:", headers, data);
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
  
  // Custom styled base elements for consistent beautiful typography in MDX
  h1: (props: any) => (
    <h1 
      className="text-3xl md:text-4xl font-bold font-serif tracking-tight mt-8 mb-4 border-b border-border/60 pb-3 text-foreground" 
      {...props} 
    />
  ),
  h2: (props: any) => {
    const text = React.Children.toArray(props.children).join("");
    const id = text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
    return (
      <h2 
        id={id}
        className="text-2xl font-bold tracking-tight mt-10 mb-4 text-foreground/95 border-b border-border/30 pb-2 scroll-mt-20" 
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
        className="text-xl font-bold mt-6 mb-3 text-foreground/90 scroll-mt-20" 
        {...props} 
      />
    );
  },
  p: (props: any) => (
    <p 
      className="text-[17px] md:text-lg leading-[1.85] text-foreground/80 my-4 text-justify" 
      {...props} 
    />
  ),
  ul: (props: any) => (
    <ul 
      className="list-disc pl-6 my-4 space-y-2 text-[16px] md:text-[17px] text-foreground/80" 
      {...props} 
    />
  ),
  ol: (props: any) => (
    <ol 
      className="list-decimal pl-6 my-4 space-y-2 text-[16px] md:text-[17px] text-foreground/80" 
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
      className="border-l-4 border-accent bg-accent/5 py-2 px-4 rounded-r my-6 italic text-[17px] text-foreground/90" 
      {...props} 
    />
  ),
  pre: (props: any) => (
    <pre 
      className="bg-card border border-border p-4 rounded-lg overflow-x-auto my-6 font-mono text-sm leading-relaxed" 
      {...props} 
    />
  ),
  code: (props: any) => (
    <code 
      className="bg-background-alt border border-border px-1.5 py-0.5 rounded font-mono text-sm text-accent font-semibold" 
      {...props} 
    />
  ),
};
