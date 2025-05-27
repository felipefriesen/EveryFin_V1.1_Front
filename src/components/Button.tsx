import React from 'react';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

export default function Button({ loading, children, ...props }: Props) {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={`px-4 py-2 rounded text-white bg-blue-500 disabled:opacity-50 ${props.className}`}
    >
      {loading ? 'Carregando...' : children}
    </button>
  );
}
