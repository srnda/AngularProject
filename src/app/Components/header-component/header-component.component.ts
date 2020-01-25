import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { RecipeService } from 'src/app/ServiceDependencies/Recipe.Service';

@Component({
  selector: 'app-header-component',
  templateUrl: './header-component.component.html',
  styleUrls: ['./header-component.component.css']
})
export class HeaderComponentComponent implements OnInit {
  constructor(private recipeService:RecipeService) { }

  ngOnInit() {
  }
}
