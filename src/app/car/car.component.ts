import { Component, OnInit } from '@angular/core';
import { CarImage } from '../carimage';
import { CarImages } from '../mock-carimage';
import { HostListener } from '@angular/core';
import { VERSION, ViewChild, ElementRef, Renderer2 } from "@angular/core";

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss']
})
export class CarComponent implements OnInit {

  cars = CarImages
  selectCar : CarImage = this.cars[0]
  @ViewChild("carPostion") carPosition: ElementRef | undefined;
  leftPosition : number = 0
  topPosition : number  = 0

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
    this.selectCar = this.randomNoRepeats(this.cars)
    this.RandomPlaceOnTheScreen()
  }

  constructor( private renderer: Renderer2) { 
   
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    
  }
  randomNoRepeats( cars: CarImage[]) {
      return  cars[Math.floor(Math.random() * cars.length)]
  }

  RandomPlaceOnTheScreen() {
    var docHeight = window.innerHeight,
        docWidth = window.innerWidth
        if(this.carPosition !=  undefined){
          var divWidth = this.carPosition.nativeElement.width
          var divHeight = this.carPosition.nativeElement.height
          var heightMax = docHeight - divHeight
          var widthMax = docWidth - divWidth
          this.leftPosition = Math.floor( Math.random() * widthMax )
          this.topPosition = Math.floor( Math.random() * heightMax )
          this.renderer.setStyle(this.carPosition.nativeElement, 'position', 'fixed');
          this.renderer.setStyle(this.carPosition.nativeElement, 'top', this.topPosition+'px');
          this.renderer.setStyle(this.carPosition.nativeElement, 'left', this.leftPosition+'px');
        }
      }
    }
 