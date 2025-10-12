import * as React from "react";
import { cn } from "@/lib/utils";

// DaisyUI Tooltip mapping retaining Shadcn-like API
// <Tooltip>
//   <TooltipTrigger asChild>...element...</TooltipTrigger>
//   <TooltipContent side="top">Text</TooltipContent>
// </Tooltip>

type TooltipContextValue = {
  content: string | null;
  side: "top" | "right" | "bottom" | "left";
  hidden: boolean;
  setContext: (value: { content?: string | null; side?: TooltipContextValue["side"]; hidden?: boolean }) => void;
};

const TooltipContext = React.createContext<TooltipContextValue | null>(null);

const TooltipProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => <>{children}</>;

const Tooltip: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = React.useState<string | null>(null);
  const [side, setSide] = React.useState<TooltipContextValue["side"]>("top");
  const [hidden, setHidden] = React.useState<boolean>(false);

  const setContext = React.useCallback(({ content: c, side: s, hidden: h }: { content?: string | null; side?: TooltipContextValue["side"]; hidden?: boolean }) => {
    if (c !== undefined) setContent(c);
    if (s !== undefined) setSide(s);
    if (h !== undefined) setHidden(h);
  }, []);

  return <TooltipContext.Provider value={{ content, side, hidden, setContext }}>{children}</TooltipContext.Provider>;
};

type TooltipTriggerProps = { asChild?: boolean } & React.ComponentPropsWithoutRef<"button">;
const TooltipTrigger = React.forwardRef<HTMLElement, TooltipTriggerProps>(({ asChild, className, children, ...props }, ref) => {
  const ctx = React.useContext(TooltipContext);
  const sideClass = ctx?.side ? `tooltip-${ctx.side}` : "";

  if (asChild) {
    const child = React.isValidElement(children) ? children : null;
    const Comp: React.ElementType = child ? (child.type as React.ElementType) : "button";
    const childProps = child ? (child.props as Record<string, unknown>) : {};
    const childClassName = (childProps as { className?: string }).className;
    const merged = {
      ...childProps,
      className: cn("tooltip", sideClass, childClassName, className),
      "data-tip": ctx?.hidden ? undefined : ctx?.content ?? undefined,
    };
    return <Comp ref={ref as React.Ref<HTMLElement>} {...merged} />;
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      className={cn("tooltip", sideClass, className)}
      data-tip={ctx?.hidden ? undefined : ctx?.content ?? undefined}
      {...props}
    />
  );
});
TooltipTrigger.displayName = "TooltipTrigger";

const TooltipContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div"> & { side?: "top" | "right" | "bottom" | "left"; sideOffset?: number; hidden?: boolean }
>(({ children, side = "top", hidden, ..._props }, _ref) => {
  const ctx = React.useContext(TooltipContext);
  const setContext = ctx?.setContext;
  React.useEffect(() => {
    setContext?.({ content: typeof children === "string" ? children : String(children), side, hidden });
    // cleanup to avoid stale content when unmounting
    return () => setContext?.({ content: null });
  }, [children, side, hidden, setContext]);

  return null;
});
TooltipContent.displayName = "TooltipContent";

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
