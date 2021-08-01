import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calculateTotalTimeLeft',
})
export class CalculateTotalTimeLeftPipe implements PipeTransform {
  transform(value: number, currentTime: number): unknown {
    console.log(value);
    if (currentTime) {
      value -= currentTime;
    }
    console.log('CurrentTime', currentTime);
    const hours = Math.floor(value / 3600);
    const minutes = Math.floor((value - hours * 3600) / 60);
    const seconds = Math.floor(value - hours * 3600 - minutes * 60);
    console.log(
      hours.toString().padStart(2, '0') +
        ':' +
        minutes.toString().padStart(2, '0') +
        ':' +
        seconds.toString().padStart(2, '0')
    );
    // console.log(value);
    return (
      hours.toString().padStart(2, '0') +
      ':' +
      minutes.toString().padStart(2, '0') +
      ':' +
      seconds.toString().padStart(2, '0')
    );
  }
}
