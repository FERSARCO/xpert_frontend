import { Component } from '@angular/core';
import { RouterOutlet,Router } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'prueba-frontend';

  constructor(private router: Router){}
  ngOnInit(): void {
    // Redirigir al componente de login al iniciar la aplicación
    this.router.navigate(['/register']);
  }
}
