import React, { useEffect } from "react";

type ModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
};

// DaisyUI modal wrapper to replace shadcn Dialog usage
export const Modal: React.FC<ModalProps> = ({ open, onOpenChange, title, description, children }) => {
  useEffect(() => {
    // Lock body scroll when modal is open and notify app to stop smooth scrolling
    if (open) {
      document.body.style.overflow = "hidden";
      // Prevent scroll chaining to the background
      document.body.style.setProperty("overscroll-behavior", "none");
    } else {
      document.body.style.overflow = "";
      document.body.style.removeProperty("overscroll-behavior");
    }
    const ev = new CustomEvent("app:scroll-lock", { detail: { locked: open } });
    window.dispatchEvent(ev);

    return () => {
      document.body.style.overflow = "";
      document.body.style.removeProperty("overscroll-behavior");
      const evOff = new CustomEvent("app:scroll-lock", { detail: { locked: false } });
      window.dispatchEvent(evOff);
    };
  }, [open]);

  return (
    <div className={`modal ${open ? "modal-open" : ""}`}>
      <div className="modal-box max-w-2xl md:max-w-3xl p-0 overflow-hidden bg-base-200/80 backdrop-blur rounded-2xl shadow-xl">
        {(title || description) && (
          <div className="px-6 pt-6">
            {title && <h3 className="font-bold text-2xl">{title}</h3>}
            {description && <p className="py-2 text-sm text-muted-foreground">{description}</p>}
          </div>
        )}
        <div className="px-6 pb-6">
          {children}
        </div>
        <div className="modal-action px-6 pb-6">
          <button className="btn btn-outline" onClick={() => onOpenChange(false)}>Close</button>
        </div>
      </div>
      {/* backdrop close */}
      <div className="modal-backdrop bg-black/60 backdrop-blur-sm" onClick={() => onOpenChange(false)} />
    </div>
  );
};

export default Modal;