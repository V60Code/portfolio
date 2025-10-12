import React from "react";
import { useToast } from "@/hooks/use-toast";
import type { ToastProps } from "@/components/ui/toast";

type DaisyVariant = ToastProps["variant"] | "success" | "warning" | "info";
const variantToAlertClass = (variant?: DaisyVariant) => {
  switch (variant) {
    case "destructive":
      return "alert-error";
    case "success":
      return "alert-success";
    case "warning":
      return "alert-warning";
    case "info":
      return "alert-info";
    default:
      return "alert-info";
  }
};

export const DaisyToaster: React.FC = () => {
  const { toasts, dismiss } = useToast();

  if (!toasts.length) return null;

  return (
    <div className="toast toast-end z-[100]">
      {toasts.map(({ id, title, description, action, ...props }) => (
        <div key={id} className={`alert ${variantToAlertClass((props as ToastProps).variant)}`}>
          <div className="flex-1">
            {title && <div className="font-bold">{title}</div>}
            {description && <div className="text-sm opacity-90">{description}</div>}
          </div>
          {action ? (
            <div className="ml-2">{action}</div>
          ) : (
            <button className="btn btn-ghost btn-xs" onClick={() => dismiss(id)}>Close</button>
          )}
        </div>
      ))}
    </div>
  );
};

export default DaisyToaster;