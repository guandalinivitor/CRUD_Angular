import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Funcionario } from './funcionario';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  constructor(private _angularFireDataBase: AngularFireDatabase) { }

  insert(funcionario: Funcionario) {
    this._angularFireDataBase.list("angular-project-2bb33").push(funcionario)
      .then((result: any) => {
        console.log(result.key);
      })
  }

  update(funcionario: Funcionario, key: string) {
    this._angularFireDataBase.list("angular-project-2bb33").update(key, funcionario);
  }

  getAll() {
    return this._angularFireDataBase.list("angular-project-2bb33")
    .snapshotChanges().pipe(
      map(changes => {
        return changes.map(data => ({ key: data.payload.key, ...data.payload.val()}));
      })    
    )
  }

  delete(key: string) {
    this._angularFireDataBase.object('angular-project-2bb33/${key}').remove();

  }
}
