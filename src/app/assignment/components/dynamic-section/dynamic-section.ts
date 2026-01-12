import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { createSection, DynamicInput, Section } from '../dynamic-input/dynamic-input';

@Component({
  selector: 'app-dynamic-section',
  imports: [DynamicInput],
  templateUrl: './dynamic-section.html',
  styleUrl: './dynamic-section.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicSection {
  protected sections = signal<Section[]>([createSection()]);

  protected canRemoveSection(): boolean {
    return this.sections().length > 1;
  }

  protected addSection(): void {
    this.sections.update((sections) => [...sections, createSection()]);
  }

  protected removeSection(index: number): void {
    this.sections.update((sections) => sections.filter((_, i) => i !== index));
  }
}
