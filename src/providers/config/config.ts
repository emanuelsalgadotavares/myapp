import { Injectable } from '@angular/core';

 let config_key_name = "config";

@Injectable()
export class ConfigProvider {

  private config = {
    showSlide: false,
    name: "",
    username: ""
  }

  constructor() {
    
  }
  
  //funcao para recuperar os dados das configurações do local storage
  getConfigData(): any {
    return localStorage.getItem(config_key_name);
  }

  //funcao para gravar os dados das configurações do local storage
  setConfigData(showSlide?: boolean, name?: string, username?: string) {
    let config = {
      showSlide: false,
      name: "",
      username: ""
    }

    if(showSlide) {
      this.config.showSlide = showSlide;
    }
    if(name) {
      this.config.name = name;
    }
    if(username) {
      this.config.username;
    }

    localStorage.setItem(config_key_name, JSON.stringify(this.config));
  }

}
