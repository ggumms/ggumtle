import { ReactNode } from 'react';
import { Slide, ToastOptions, toast } from 'react-toastify';
import './style.css';

const defaultToastOption: ToastOptions = {
  autoClose: 1500,
  hideProgressBar: true,
  pauseOnHover: false,
  closeButton: false,
  delay: 300,
  icon: false,
  transition: Slide,
}

const Toast = {
  info: (message: ReactNode, options: ToastOptions = {}) => {
    toast.info(message, { ...defaultToastOption, ...options });
  },
  success: (message: ReactNode, options: ToastOptions = {}) => {
    toast.success(message, { ...defaultToastOption, ...options });
  },
  error: (message: ReactNode, options: ToastOptions = {}) => {
    toast.error(message, { ...defaultToastOption, ...options });
  },
}

export default Toast;
