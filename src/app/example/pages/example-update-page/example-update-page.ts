import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { createContact } from '../../helpers';
import { DynamicContact } from '../../components/dynamic-contact/dynamic-contact';

@Component({
  selector: 'app-example-update-page',
  imports: [DynamicContact, JsonPipe],
  templateUrl: './example-update-page.html',
  styleUrl: './example-update-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleUpdatePage {
  protected readonly contacts = signal([createContact()]);
}
