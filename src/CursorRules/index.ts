/**
 * Custom Cursor Effects Module
 * 
 * Provides smooth, interactive cursor animations for desktop users.
 * Uses requestAnimationFrame for optimal performance.
 */

interface CursorPosition {
  x: number;
  y: number;
}

class CustomCursor {
  private cursor: HTMLElement | null = null;
  private currentPosition: CursorPosition = { x: 0, y: 0 };
  private targetPosition: CursorPosition = { x: 0, y: 0 };
  private isVisible: boolean = false;
  private animationFrameId: number | null = null;
  private readonly smoothing: number = 0.15;
  private readonly scale: { normal: number; hover: number } = {
    normal: 1,
    hover: 1.5
  };

  constructor() {
    this.init();
  }

  private init(): void {
    // Only initialize on desktop devices with mouse
    if (this.isTouchDevice()) return;

    this.cursor = document.getElementById('custom-cursor');
    if (!this.cursor) return;

    this.setupEventListeners();
    this.startAnimation();
  }

  private isTouchDevice(): boolean {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }

  private setupEventListeners(): void {
    document.addEventListener('mousemove', this.handleMouseMove.bind(this));
    document.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
    document.addEventListener('mouseleave', this.handleMouseLeave.bind(this));

    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, input, textarea, select, [role="button"], [tabindex]'
    );

    interactiveElements.forEach((element) => {
      element.addEventListener('mouseenter', this.handleElementHover.bind(this));
      element.addEventListener('mouseleave', this.handleElementLeave.bind(this));
    });
  }

  private handleMouseMove(e: MouseEvent): void {
    this.targetPosition = {
      x: e.clientX,
      y: e.clientY
    };

    if (!this.isVisible) {
      this.currentPosition = { ...this.targetPosition };
      this.isVisible = true;
      this.cursor?.style.setProperty('opacity', '0.8');
    }
  }

  private handleMouseEnter(): void {
    this.isVisible = true;
    this.cursor?.style.setProperty('opacity', '0.8');
  }

  private handleMouseLeave(): void {
    this.isVisible = false;
    this.cursor?.style.setProperty('opacity', '0');
  }

  private handleElementHover(): void {
    this.cursor?.style.setProperty('transform', 
      `translate(-50%, -50%) scale(${this.scale.hover})`
    );
  }

  private handleElementLeave(): void {
    this.cursor?.style.setProperty('transform', 
      `translate(-50%, -50%) scale(${this.scale.normal})`
    );
  }

  private animate(): void {
    if (!this.cursor) return;

    // Smooth interpolation
    this.currentPosition.x += (this.targetPosition.x - this.currentPosition.x) * this.smoothing;
    this.currentPosition.y += (this.targetPosition.y - this.currentPosition.y) * this.smoothing;

    // Update cursor position
    this.cursor.style.left = `${this.currentPosition.x}px`;
    this.cursor.style.top = `${this.currentPosition.y}px`;

    this.animationFrameId = requestAnimationFrame(this.animate.bind(this));
  }

  private startAnimation(): void {
    if (this.animationFrameId === null) {
      this.animate();
    }
  }

  public destroy(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }
}

// Initialize cursor on page load
if (typeof window !== 'undefined') {
  let cursorInstance: CustomCursor | null = null;

  const initCursor = () => {
    if (cursorInstance) {
      cursorInstance.destroy();
    }
    cursorInstance = new CustomCursor();
  };

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCursor);
  } else {
    initCursor();
  }

  // Reinitialize on Astro page transitions
  document.addEventListener('astro:page-load', initCursor);
}

export default CustomCursor;
