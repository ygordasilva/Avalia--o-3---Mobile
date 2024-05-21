import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cep',
  templateUrl: './cep.page.html',
  styleUrls: ['./cep.page.scss'],
})
export class CepPage {
  cep: string = '';
  cepValido: boolean = false;
  endereco: any = null;

  constructor(private http: HttpClient) {}

  formatCep(event: any) {
    let input = event.target.value;
    input = input.replace(/\D/g, '');
    if (input.length > 5) {
      input = input.replace(/(\d{5})(\d{1,3})/, '$1-$2');
    }
    this.cep = input;
    if (this.cep.length === 9) {
      this.buscarEndereco();
    } else {
      this.cepValido = false;
      this.endereco = null;
    }
  }

  buscarEndereco() {
    const cepSemMascara = this.cep.replace('-', '');
    this.http.get(`https://viacep.com.br/ws/${cepSemMascara}/json/`).subscribe(
      (data: any) => {
        if (!data.erro) {
          this.endereco = data;
          this.cepValido = true;
        } else {
          this.cepValido = false;
          this.endereco = null;
        }
      },
      (error) => {
        console.error('Erro ao buscar endereço', error);
        this.cepValido = false;
        this.endereco = null;
      }
    );
  }

  verificarCep() {
    if (this.cep.length < 9) {
      this.cepValido = false;
      this.endereco = null;
    }
  }
}
