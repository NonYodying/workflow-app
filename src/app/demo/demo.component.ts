import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { filter, interval, of, tap } from 'rxjs';

@Component({
  selector: 'app-demo',
  standalone: true,
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './demo.component.html',
  styleUrl: './demo.component.scss'
})
export class DemoComponent {

  // finit observable
  numbers$ = of([1, 2, 3, 4, 5])
  numbers:number[] = []

  httpClient = inject(HttpClient)
  users: any

  // infinit observable
  clock$ = interval(1000 * 1)
  now = new Date


  sideEffect = ''

  inputBox = new FormControl<string>('Angular')
  outputText = ''

  constructor() {
    this.numbers$.subscribe(vs => this.numbers = vs)
    this.httpClient.get('https://jsonplaceholder.typicode.com/users').subscribe(vs => this.users = vs)

    this.clock$.subscribe(v => this.now = new Date())
    this.inputBox.valueChanges.pipe(
      filter((v) => v != null),
      tap((v) => this.sideEffect = v?.toUpperCase())
    ).subscribe(v => this.outputText = v)
  }

}
