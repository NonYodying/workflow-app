// item-entry.component.ts
import { Component, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { map } from 'rxjs';
import { Item, ItemStatus } from '../../models/item';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-item-entry',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './item-entry.component.html',
  styleUrl: './item-entry.component.scss'
})
export class ItemEntryComponent {


  httpClient = inject(HttpClient)

  items: Item[] = [];

  isSmallTable = false;
  filterItems = this.items;

  filterInput = new FormControl<string>('', { nonNullable: true });

  constructor() {

    this.httpClient.get<Item[]>('http://localhost:3000/items').subscribe(vs => {
      this.items = vs;
      this.filterItems = vs;
    })

    this.filterInput.valueChanges // ดักเหตุการณ์ที่ value เปลี่ยนได้
      .pipe(map((keyword) => keyword.toLocaleLowerCase())) // convert value ได้
      .subscribe((keyword) => {
        console.log('keyword', keyword)
        this.filterItems = this.items.filter((item) => item.title.toLocaleLowerCase().includes(keyword)); // เขียน logic จากการเปลี่ยน value ได้
      });


  }
}
