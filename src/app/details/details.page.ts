import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  details: any;
  // CONFIGURACION DEL SLIDE DE LA PAGINA DE DETAILS
  slideOpts = {
    autoplay: {
      delay: 2000,
      disableOnInteraction: false
    }
  };

  constructor(private route: ActivatedRoute, private pokeService: PokemonService) { }

  // CUANDO ENTRAMOS A ESTA PAGINA RECOGE EL INDEX Y HACE LA CONSULTA AL SERVICIO 
  // DONDE NOS TRAE DE LA API TODA LA INFORMACION DEL POKEMON QUE LE HEMOS EXPECIFICADO POR ID
  ngOnInit() {
    let index = this.route.snapshot.paramMap.get('index');
    this.pokeService.getPokeDetails(index).subscribe(details => {
      console.log('Details: ', details);
      this.details = details;
    })
  }

}
