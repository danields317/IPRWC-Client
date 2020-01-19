import { Injectable, TemplateRef } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts: any[] = [];

  showSuccessToast(message: string) {
    this.show(message, { classname: 'bg-success text-light', delay: 2000});
  }

  showErrorToast(message: string) {
    this.show(message, { classname: 'bg-danger text-light', delay: 5000});
  }

  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }

  remove(toast) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
}
