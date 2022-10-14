import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fecha'
})
export class FechaPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    let fecha = new Date(value);

    console.log(fecha);
    return fecha.toLocaleDateString();
  }

}
