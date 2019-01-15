import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Hero } from '../domain/hero';
import { HeroService } from '../service/hero/hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {

  hero: Hero;

  constructor(private route: ActivatedRoute, private heroService: HeroService, private location: Location) { }

  ngOnInit() {
    this.getHero();
  }

  getHero(): any {
    /*
    * The route.snapshot is a static image of the route information shortly after the component was created.
    * The paramMap is a dictionary of route parameter values extracted from the URL. The "id" key returns the id of the hero to fetch.
    * Route parameters are always strings. The JavaScript (+) operator converts the string to a number, which is what a hero id should be.
    */
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id).subscribe(hero => this.hero = hero);
  }

  goBack() {
    this.location.back();
  }

  save(): void {
    this.heroService.updateHero(this.hero).subscribe(_ => this.goBack());
  }
}
