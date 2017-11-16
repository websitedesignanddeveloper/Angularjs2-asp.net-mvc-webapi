import { Component } from "@angular/core"
@Component({
	selector: "event-app",
	template: `
               <div>
                  <nav class='navbar navbar-inverse'>
                       <div class='container-fluid'>
                         <ul class='nav navbar-nav'>
							<li><a [routerLink]="['event']">Events Management</a></li>
						 </ul>
                      </div>
                 </nav>    
              <div class='container'>
                <router-outlet></router-outlet>
              </div>
             </div>          
`
})

export class AppComponent {

}