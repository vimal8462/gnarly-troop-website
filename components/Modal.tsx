interface ModalProps {
  isOpen: boolean;
  close: () => void;
  title: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, close, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-md shadow-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={close} className="text-gray-600 hover:text-black">✖</button>
        </div>

        {children}
      </div>
    </div>
  );
}
