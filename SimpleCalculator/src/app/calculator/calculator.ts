import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-calculator',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './calculator.html',
  styleUrl: './calculator.css',
})
export class Calculator {
 display: string = '0';
  private currentValue: number = 0;
  private previousValue: number | null = null;
  private operator: string | null = null;
  private shouldResetDisplay: boolean = false;

  onNumberClick(num: string): void {
    if (this.display === '0' || this.shouldResetDisplay) {
      this.display = num;
      this.shouldResetDisplay = false;
    } else {
      this.display += num;
    }
  }

  onDecimalClick(): void {
    if (this.shouldResetDisplay) {
      this.display = '0.';
      this.shouldResetDisplay = false;
      return;
    }
    if (!this.display.includes('.')) {
      this.display += '.';
    }
  }

  onOperatorClick(op: string): void {
    const inputValue = parseFloat(this.display);

    if (this.previousValue === null) {
      this.previousValue = inputValue;
    } else if (this.operator) {
      const result = this.calculate(this.previousValue, inputValue, this.operator);
      this.previousValue = result;
      this.display = this.formatResult(result);
    }

    this.operator = op;
    this.shouldResetDisplay = true;
  }

  onEqualsClick(): void {
    if (this.operator === null || this.previousValue === null) {
      return;
    }
    const inputValue = parseFloat(this.display);
    const result = this.calculate(this.previousValue, inputValue, this.operator);
    this.display = this.formatResult(result);
    this.previousValue = null;
    this.operator = null;
    this.shouldResetDisplay = true;
  }

  onClearClick(): void {
    this.display = '0';
    this.previousValue = null;
    this.operator = null;
    this.shouldResetDisplay = false;
  }

  onClearEntryClick(): void {
    this.display = '0';
    this.shouldResetDisplay = false;
  }

  onBackspaceClick(): void {
    if (this.display.length === 1 || this.shouldResetDisplay) {
      this.display = '0';
      this.shouldResetDisplay = false;
    } else {
      this.display = this.display.slice(0, -1);
    }
  }

  onToggleSignClick(): void {
    const value = parseFloat(this.display);
    this.display = this.formatResult(value * -1);
  }

  onPercentClick(): void {
    const value = parseFloat(this.display);
    this.display = this.formatResult(value / 100);
  }

  private calculate(a: number, b: number, op: string): number {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '×': return a * b;
      case '÷':
        if (b === 0) {
          alert("Cannot divide by zero");
          return 0;
        }
        return a / b;
      default: return b;
    }
  }

  private formatResult(value: number): string {
    // Avoid long floating point tails like 0.1 + 0.2 = 0.30000000000000004
    const rounded = Math.round(value * 1e10) / 1e10;
    return rounded.toString();
  }
}
