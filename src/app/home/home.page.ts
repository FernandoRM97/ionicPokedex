import { Component, OnInit, ViewChildren } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  offset = 0;
  pokemon = [];
  @ViewChildren(IonInfiniteScroll) infinite: IonInfiniteScroll;

  constructor(private pokeService: PokemonService) {}

  ngOnInit() {
    this.loadPokemon();
  }

  // FUNCION PARA MOSTRAR POKEMON DE 25 EN 25
  loadPokemon(loadMore = false, event?) {
    if (loadMore) {
      this.offset += 25;
    }
    this.pokeService.getPokemon(this.offset).subscribe(res => {
      this.pokemon = [...this.pokemon, ...res];

      if (event) {
        event.target.complete();
      }
      // TOPE PARA MUESTRE SOLO 125 POKEMON (NO FUNCIONA ACTUALMENTE)
      if (this.offset === 125) {
        this.infinite.disabled = true;
      }
    });
  }

  // PARA CARGAR LOS POKEMONS
  onSearchChange(e) {
    let value = e.detail.value;

    if (value === '') {
      this.offset = 0;
       this.loadPokemon();
       return;
    }

    // SACAR POKEMONS DE API
    this.pokeService.findPokemon(value).subscribe(res => {
      this.pokemon = [res];
    }, err => {
      this.pokemon = [];
    });
  }
}
