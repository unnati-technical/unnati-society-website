import React from 'react'
import { cn } from '@unnati/utils'

// ─── Button ───────────────────────────────────────────────────────────────────

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  ...props
}) {
  const base =
    'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed'

  const variants = {
    primary:
      'bg-violet-600 text-white hover:bg-violet-700 focus:ring-violet-500 shadow-lg shadow-violet-500/20',
    secondary:
      'bg-white text-gray-900 border border-gray-200 hover:bg-gray-50 focus:ring-gray-300',
    ghost:
      'text-violet-600 hover:bg-violet-50 focus:ring-violet-500',
    danger:
      'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    outline:
      'border-2 border-violet-600 text-violet-600 hover:bg-violet-600 hover:text-white focus:ring-violet-500',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3.5 text-base',
  }

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {loading && (
        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      )}
      {children}
    </button>
  )
}

// ─── Badge ────────────────────────────────────────────────────────────────────

export function Badge({ children, color = 'violet', className = '' }) {
  const colors = {
    violet: 'bg-violet-100 text-violet-700 border border-violet-200',
    green: 'bg-green-100 text-green-700 border border-green-200',
    blue: 'bg-blue-100 text-blue-700 border border-blue-200',
    yellow: 'bg-yellow-100 text-yellow-700 border border-yellow-200',
    red: 'bg-red-100 text-red-700 border border-red-200',
    gray: 'bg-gray-100 text-gray-600 border border-gray-200',
  }
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        colors[color],
        className
      )}
    >
      {children}
    </span>
  )
}

// ─── Card ─────────────────────────────────────────────────────────────────────

export function Card({ children, className = '', ...props }) {
  return (
    <div
      className={cn(
        'bg-white border border-gray-100 rounded-2xl shadow-sm p-6',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

// ─── Avatar ───────────────────────────────────────────────────────────────────

export function Avatar({ src, alt, initials, size = 'md', className = '' }) {
  const sizes = { sm: 'w-8 h-8 text-xs', md: 'w-10 h-10 text-sm', lg: 'w-14 h-14 text-base' }
  return src ? (
    <img
      src={src}
      alt={alt}
      className={cn('rounded-full object-cover flex-shrink-0', sizes[size], className)}
    />
  ) : (
    <div
      className={cn(
        'rounded-full bg-violet-100 text-violet-700 font-bold flex items-center justify-center flex-shrink-0',
        sizes[size],
        className
      )}
    >
      {initials || '?'}
    </div>
  )
}

// ─── Spinner ──────────────────────────────────────────────────────────────────

export function Spinner({ size = 'md', className = '' }) {
  const sizes = { sm: 'w-4 h-4', md: 'w-6 h-6', lg: 'w-10 h-10' }
  return (
    <svg
      className={cn('animate-spin text-violet-600', sizes[size], className)}
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  )
}

// ─── Input ────────────────────────────────────────────────────────────────────

export function Input({ label, error, className = '', ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      <input
        className={cn(
          'w-full px-4 py-2.5 rounded-xl border text-sm transition-all',
          'focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent',
          error
            ? 'border-red-400 bg-red-50'
            : 'border-gray-200 bg-white hover:border-gray-300',
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  )
}

// ─── Empty State ──────────────────────────────────────────────────────────────

export function EmptyState({ icon = '📭', title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
      <span className="text-5xl">{icon}</span>
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        {description && <p className="text-sm text-gray-500 mt-1 max-w-sm">{description}</p>}
      </div>
      {action}
    </div>
  )
}
