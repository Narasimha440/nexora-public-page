# Create additional CSS for the order status section
additional_css = '''

/* Order Status Section Styles */
.order-status-section {
  padding: 100px 0;
  background: var(--color-background);
}

.order-status-form {
  max-width: 600px;
  margin: 0 auto;
  margin-top: var(--space-32);
}

.status-form-group {
  display: flex;
  gap: var(--space-16);
  align-items: stretch;
}

.status-input {
  flex: 1;
  padding: var(--space-16) var(--space-20);
  font-size: var(--font-size-lg);
  border-radius: var(--radius-lg);
  border: 2px solid var(--color-border);
  transition: all var(--duration-fast) var(--ease-standard);
}

.status-input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(var(--color-teal-500-rgb), 0.1);
}

.status-btn {
  padding: var(--space-16) var(--space-32);
  font-size: var(--font-size-lg);
  border-radius: var(--radius-lg);
  white-space: nowrap;
}

.error-message {
  background: rgba(var(--color-error-rgb), 0.1);
  border: 1px solid var(--color-error);
  border-radius: var(--radius-lg);
  padding: var(--space-16);
  margin-top: var(--space-24);
  color: var(--color-error);
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-8);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

/* Order Status Popup */
.order-status-popup {
  max-width: 700px;
  width: 90vw;
  max-height: 80vh;
  overflow-y: auto;
}

.order-header {
  text-align: center;
  margin-bottom: var(--space-32);
  padding-bottom: var(--space-24);
  border-bottom: 1px solid var(--color-border);
}

.order-title {
  margin-bottom: var(--space-16);
  font-size: var(--font-size-3xl);
  color: var(--color-text);
}

.order-id-display {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--color-primary);
  background: var(--color-secondary);
  padding: var(--space-12) var(--space-20);
  border-radius: var(--radius-lg);
  display: inline-block;
}

/* Progress Container */
.progress-container {
  margin-bottom: var(--space-32);
}

.progress-steps {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin: var(--space-24) 0;
}

.progress-line {
  position: absolute;
  top: 20px;
  left: 10%;
  right: 10%;
  height: 4px;
  background: var(--color-border);
  border-radius: var(--radius-full);
  z-index: 1;
}

.progress-line-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--color-primary), var(--color-teal-600));
  border-radius: var(--radius-full);
  transition: width 0.8s var(--ease-standard);
}

.progress-step-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2;
  flex: 1;
  max-width: 120px;
}

.progress-step-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: var(--font-size-base);
  margin-bottom: var(--space-8);
  transition: all var(--duration-normal) var(--ease-standard);
  border: 3px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-text-secondary);
}

.progress-step-item.completed .progress-step-circle {
  background: var(--color-success);
  border-color: var(--color-success);
  color: white;
  box-shadow: 0 4px 12px rgba(var(--color-success-rgb), 0.3);
}

.progress-step-item.active .progress-step-circle {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: white;
  box-shadow: 0 4px 12px rgba(var(--color-teal-500-rgb), 0.3);
  animation: pulse 2s infinite;
}

.progress-step-item.pending .progress-step-circle {
  background: var(--color-secondary);
  border-color: var(--color-border);
  color: var(--color-text-secondary);
}

@keyframes pulse {
  0% {
    transform: scale(1);
    box-shadow: 0 4px 12px rgba(var(--color-teal-500-rgb), 0.3);
  }
  50% {
    transform: scale(1.1);
    box-shadow: 0 6px 16px rgba(var(--color-teal-500-rgb), 0.4);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 4px 12px rgba(var(--color-teal-500-rgb), 0.3);
  }
}

.progress-step-label {
  font-size: var(--font-size-sm);
  font-weight: 500;
  text-align: center;
  color: var(--color-text);
  line-height: 1.3;
}

.progress-step-item.completed .progress-step-label {
  color: var(--color-success);
  font-weight: 600;
}

.progress-step-item.active .progress-step-label {
  color: var(--color-primary);
  font-weight: 600;
}

/* Order Details */
.order-details {
  background: var(--color-secondary);
  border-radius: var(--radius-lg);
  padding: var(--space-24);
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-12) 0;
  border-bottom: 1px solid var(--color-border);
}

.detail-row:last-child {
  border-bottom: none;
}

.detail-label {
  font-weight: 600;
  color: var(--color-text);
  min-width: 100px;
}

/* Status Badges */
.status-badge {
  padding: var(--space-6) var(--space-12);
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: var(--space-6);
}

.status-badge.order-placed,
.status-badge.received {
  background: rgba(var(--color-info-rgb), 0.15);
  color: var(--color-info);
  border: 1px solid rgba(var(--color-info-rgb), 0.3);
}

.status-badge.in-progress {
  background: rgba(var(--color-warning-rgb), 0.15);
  color: var(--color-warning);
  border: 1px solid rgba(var(--color-warning-rgb), 0.3);
}

.status-badge.in-review {
  background: rgba(var(--color-primary-rgb, 33, 128, 141), 0.15);
  color: var(--color-primary);
  border: 1px solid rgba(var(--color-primary-rgb, 33, 128, 141), 0.3);
}

.status-badge.completed {
  background: rgba(var(--color-success-rgb), 0.15);
  color: var(--color-success);
  border: 1px solid rgba(var(--color-success-rgb), 0.3);
}

.status-badge::before {
  content: '';
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: currentColor;
}

/* Enhanced Popup Styling */
.popup-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(8px);
  animation: overlayFadeIn 0.3s ease-out;
}

@keyframes overlayFadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.popup-content {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  position: relative;
  animation: popupSlideIn 0.4s var(--ease-standard);
  border: 1px solid var(--color-border);
  max-height: 90vh;
  overflow-y: auto;
}

@keyframes popupSlideIn {
  from { 
    opacity: 0; 
    transform: scale(0.9) translateY(20px); 
  }
  to { 
    opacity: 1; 
    transform: scale(1) translateY(0); 
  }
}

.close-button {
  position: absolute;
  top: var(--space-16);
  right: var(--space-16);
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-secondary);
  border: 1px solid var(--color-border);
  border-radius: 50%;
  color: var(--color-text);
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-standard);
  font-size: var(--font-size-lg);
  z-index: 10;
}

.close-button:hover {
  background: var(--color-error);
  color: white;
  transform: scale(1.1);
}

.copy-button {
  display: inline-flex;
  align-items: center;
  gap: var(--space-8);
  padding: var(--space-12) var(--space-20);
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: var(--radius-lg);
  font-weight: 500;
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-standard);
  margin-top: var(--space-16);
}

.copy-button:hover {
  background: var(--color-primary-hover);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(var(--color-teal-500-rgb), 0.3);
}

/* Mobile Responsive Adjustments */
@media (max-width: 768px) {
  .status-form-group {
    flex-direction: column;
    gap: var(--space-12);
  }

  .order-status-popup {
    width: 95vw;
    margin: var(--space-16);
  }

  .progress-steps {
    flex-direction: column;
    gap: var(--space-24);
    align-items: stretch;
  }

  .progress-line {
    display: none;
  }

  .progress-step-item {
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    max-width: none;
    padding: var(--space-16);
    background: var(--color-secondary);
    border-radius: var(--radius-lg);
    border: 1px solid var(--color-border);
  }

  .progress-step-circle {
    margin-bottom: 0;
    margin-right: var(--space-16);
    width: 32px;
    height: 32px;
    font-size: var(--font-size-sm);
  }

  .progress-step-label {
    text-align: left;
    font-size: var(--font-size-base);
  }

  .detail-row {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-6);
  }
}

/* Loading spinner in progress step */
.progress-step-circle .spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

/* Accessibility improvements */
.progress-step-item[aria-current="step"] .progress-step-circle {
  outline: 2px solid var(--color-focus-ring);
  outline-offset: 2px;
}

/* Enhanced visual feedback */
.order-status-section .container {
  position: relative;
}

.order-status-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 50%, rgba(var(--color-teal-500-rgb), 0.05) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(var(--color-primary-rgb, 33, 128, 141), 0.03) 0%, transparent 50%);
  pointer-events: none;
}

/* Utility classes for order status */
.ml-8 { margin-left: var(--space-8); }
.mt-16 { margin-top: var(--space-16); }
.mt-24 { margin-top: var(--space-24); }
.mb-4 { margin-bottom: var(--space-4); }
.mb-6 { margin-bottom: var(--space-6); }
.text-2xl { font-size: var(--font-size-2xl); }
.font-semibold { font-weight: var(--font-weight-semibold); }
.font-medium { font-weight: var(--font-weight-medium); }
.font-mono { font-family: var(--font-family-mono); }
.font-bold { font-weight: var(--font-weight-bold); }

/* Dark mode specific adjustments */
@media (prefers-color-scheme: dark) {
  .order-id-display {
    background: rgba(var(--color-gray-400-rgb), 0.15);
  }
}

[data-color-scheme="dark"] .order-id-display {
  background: rgba(var(--color-gray-400-rgb), 0.15);
}

/* Additional utility classes */
.max-w-4xl {
  max-width: 896px;
}

.space-y-4 > * + * {
  margin-top: var(--space-16);
}

.grid {
  display: grid;
}

.grid-cols-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.gap-4 {
  gap: var(--space-16);
}

.text-sm {
  font-size: var(--font-size-sm);
}

.text-gray-600 {
  color: var(--color-text-secondary);
}

.dark\\:text-gray-400 {
  color: var(--color-text-secondary);
}

.bg-gray-100 {
  background-color: var(--color-secondary);
}

.dark\\:bg-gray-700 {
  background-color: var(--color-secondary);
}

.rounded-lg {
  border-radius: var(--radius-lg);
}

.p-3 {
  padding: var(--space-12);
}

.w-10 {
  width: 40px;
}

.h-10 {
  height: 40px;
}

.rounded-full {
  border-radius: var(--radius-full);
}

.flex {
  display: flex;
}

.items-center {
  align-items: center;
}

.justify-center {
  justify-content: center;
}

.bg-primary {
  background-color: var(--color-primary);
}

.text-white {
  color: white;
}

.bg-primary-light {
  background-color: rgba(var(--color-teal-500-rgb), 0.2);
}

.border-2 {
  border-width: 2px;
}

.border-primary {
  border-color: var(--color-primary);
}

.bg-gray-200 {
  background-color: var(--color-border);
}

.dark\\:bg-gray-700 {
  background-color: var(--color-secondary);
}

.-z-1 {
  z-index: -1;
}
'''

# Read the existing CSS and add the new styles
with open('style.css', 'r') as f:
    existing_css = f.read()

# Write the complete CSS with additional styles
complete_css = existing_css + additional_css

with open('style.css', 'w') as f:
    f.write(complete_css)

print("✅ Updated style.css with enhanced order status styling")
print("📁 Total lines of CSS:", len(complete_css.splitlines()))