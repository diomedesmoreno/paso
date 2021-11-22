import { Component} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private language = 'es';//this.translate.getBrowserCultureLang().split('-')[0];
  constructor(
    private translate: TranslateService
  ) {
    // console.log(this.language, 'soy',this.translate.getBrowserCultureLang());
    if (localStorage.getItem('language')){
      this.translate.setDefaultLang( 'es'/*localStorage.getItem('language')*/);
    } else {
      this.translate.setDefaultLang( 'es'/*this.language*/);
      localStorage.setItem('language', 'es'/*this.language*/)
    }
   }
}
