import { clsx, ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges Tailwind classes and resolves conflicts safely.
 * @param inputs - Array of class names or class condition maps.
 * @returns The combined and resolved class string.
 */
/**
 * cn function - Auto-generated expression
 * 
 * ⚠️ WARNING: This expression is auto-generated and should not be modified.
 * Any manual changes will be overwritten during the next generation.
 * 
 * @generated
 * @readonly
 * @author chlbri (bri_lvi@icloud.com)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

    