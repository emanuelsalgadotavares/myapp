import { FilmeDetalhesPage } from './../filme-detalhes/filme-detalhes';
import { MovieProvider } from './../../providers/movie/movie';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
  providers: [
    MovieProvider
  ]
})
export class FeedPage {

  public objeto_feed = {
    titulo: "Charles Franca",
    data: "November 5, 1955",
    descricao: "Estou criando um app incrível.",
    qntd_likes: 200,
    qntd_comments: 4,
    time_comment: "11h ago"
  }

  public lista_filmes = new Array<any>();
  public nome_usuario:string = "Emanuel Salgado";
  public loading;
  public refresher;
  public isRefreshing: boolean = false;
  public page = 1;
  public infiniteScroll;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private movieProvider: MovieProvider,
    public loadingCtrl: LoadingController) {
  }

  abreCarregando() {
    this.loading = this.loadingCtrl.create({
      content: 'Carregando filmes...'
    });

    this.loading.present();

    //setTimeout(() => {
    //  loading.dismiss();
    //}, 5000);
  }

  fechaCarregando() {
    this.loading.dismiss();
  }

  public somaDoisNumeros(num1:number, num2:number):void {
    alert(num1 + num2);
  }

  doRefresh(refresher) {
    this.refresher = refresher;
    this.isRefreshing = true;

    this.carregarFilmes();
    //setTimeout(() => {
    //  console.log('Async operation has ended');
    //  refresher.complete();
    //}, 2000);
  }

  ionViewDidEnter() {
    this.carregarFilmes();
  }

  abrirDetalhes(filme) {    
    this.navCtrl.push(FilmeDetalhesPage, { id: filme.id });
  }

  doInfinite(infiniteScroll) {
    this.page++;
    this.infiniteScroll = infiniteScroll;
    this.carregarFilmes();

    //setTimeout(() => {
    //  for (let i = 0; i < 30; i++) {
    //    this.items.push( this.items.length );
    //  }

    //  console.log('Async operation has ended');
    //  infiniteScroll.complete();
    //}, 500);
  }

  carregarFilmes(newpage: boolean = false) {
    this.abreCarregando();

    this.movieProvider.getLatestMovies(this.page).subscribe(
      data => {
        this.lista_filmes = data.results;
        


        console.log(this.lista_filmes.results);
        
        this.fechaCarregando();
        
        if(this.isRefreshing) {
          this.refresher.complete();
          this.refresher = false;
        }
      }, error => {
        console.log(error);
        this.fechaCarregando();
        
        if(this.isRefreshing) {
          this.refresher.complete();
          this.refresher = false;
        }
      }
    )
  }
}