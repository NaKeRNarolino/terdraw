export interface Vector2 {
  x: number;
  y: number;
}

export class EventNotifier<T> {
  private listeners: Set<(data: T) => void> = new Set();

  listen(listener: (data: T) => void): void {
    this.listeners.add(listener);
  }

  removeListener(listener: (data: T) => void): void {
    this.listeners.delete(listener);
  }

  fire = (data: T): void => {
    this.listeners.forEach((listener) => {
      listener(data);
    });
  };
}

export class IdifiedEventNotifier<T> {
  private listeners: Map<string, (data: T) => void> = new Map();

  listen(listener: (data: T) => void, id: string): void {
    this.listeners.set(id, listener);
  }

  removeListener(id: string): void {
    this.listeners.delete(id);
  }

  fire = (data: T): void => {
    this.listeners.forEach((listener) => {
      listener(data);
    });
  };
}

export interface Pair<F, S> {
  first: F;
  second: S;
}

export const Dialog = ({
  isOpen,
  onClose,
  title,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: JSX.Element | JSX.Element[];
}) => {
  if (!isOpen) return null;

  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div className="dialog" onClick={(e) => e.stopPropagation()}>
        <div className="dialog-header">
          <h2>{title}</h2>
        </div>
        <div className="dialog-content">{children}</div>
      </div>
    </div>
  );
};
