'use client'

import { forwardRef } from 'react'
import { FieldError } from 'react-hook-form'

interface FormFieldProps {
  label: string
  name: string
  type?: 'text' | 'email' | 'textarea' | 'checkbox'
  placeholder?: string
  required?: boolean
  error?: FieldError
  className?: string
}

export const FormField = forwardRef<HTMLInputElement | HTMLTextAreaElement, FormFieldProps>(
  ({ label, name, type = 'text', placeholder, required = false, error, className = '', ...props }, ref) => {
    const inputClasses = `input input-bordered w-full ${error ? 'input-error' : ''} ${className}`
    const textareaClasses = `textarea textarea-bordered w-full ${error ? 'textarea-error' : ''} ${className}`

    return (
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">
            {label}
            {required && <span className="text-error ml-1">*</span>}
          </span>
        </label>
        
        {type === 'textarea' ? (
          <textarea
            {...props}
            ref={ref as React.ForwardedRef<HTMLTextAreaElement>}
            name={name}
            placeholder={placeholder}
            className={textareaClasses}
            rows={4}
          />
        ) : type === 'checkbox' ? (
          <input
            {...props}
            ref={ref as React.ForwardedRef<HTMLInputElement>}
            type="checkbox"
            name={name}
            className="checkbox checkbox-primary"
          />
        ) : (
          <input
            {...props}
            ref={ref as React.ForwardedRef<HTMLInputElement>}
            type={type}
            name={name}
            placeholder={placeholder}
            className={inputClasses}
          />
        )}
        
        {error && (
          <label className="label">
            <span className="label-text-alt text-error">{error.message}</span>
          </label>
        )}
      </div>
    )
  }
)

FormField.displayName = 'FormField'