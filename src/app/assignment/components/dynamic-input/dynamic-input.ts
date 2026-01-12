import { DecimalPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  booleanAttribute,
  computed,
  input,
  model,
  numberAttribute,
  output,
} from '@angular/core';

interface NumberInput {
  value: number;
}

function createNumberInput(value = 0): NumberInput {
  return { value };
}

export interface Section {
  inputs: NumberInput[];
}

export function createSection(): Section {
  return {
    inputs: [createNumberInput()],
  };
}

@Component({
  selector: 'app-dynamic-input',
  imports: [DecimalPipe],
  templateUrl: './dynamic-input.html',
  styleUrl: './dynamic-input.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'section',
  },
})
export class DynamicInput {
  readonly sectionNumber = input(NaN, { transform: numberAttribute });
  readonly section = model(createSection());
  readonly removable = input(true, { transform: booleanAttribute });

  readonly remove = output<void>();

  protected numberIsNaN = computed(() => Number.isNaN(this.sectionNumber()));

  protected result = computed(() => {
    return this.section().inputs.reduce((sum, input) => sum + input.value, 0);
  });

  protected canRemoveInput(): boolean {
    return this.section().inputs.length > 1;
  }

  protected addInput(): void {
    this.section.update((section) => {
      const { inputs, ...rest } = section;

      return {
        ...rest,
        inputs: [...inputs, createNumberInput()],
      };
    });
  }

  protected onInputChange(index: number, value: number): void {
    this.section.update((section) => {
      const { inputs, ...rest } = section;

      return {
        ...rest,
        inputs: inputs.map((input, i) => {
          if (i === index) {
            return { ...input, value };
          }
          return input;
        }),
      };
    });
  }

  protected removeInput(index: number): void {
    this.section.update((section) => {
      const { inputs, ...rest } = section;

      return {
        ...rest,
        inputs: inputs.filter((_value, i) => i !== index),
      };
    });
  }
}
