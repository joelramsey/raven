import { Component, OnInit } from '@angular/core';

let fadeList = document.getElementById("fadeList");
let body = document.getElementsByTagName("BODY")[0];
let textList = ["DISCOVER source material with dynamic and constantly adaptive searches.", "EVALUATE source material quickly with interactive displays.", "UNDERSTAND source material with powerful visualizations.", "DETERMINE new or PROVE existing conclusions from source material.", "RAVEN SCHOLAR: UNLIKE ANYTHING YOU'VE EVER SEEN" ];
let listArray = [];
let h = 0;

@Component({
  selector: 'rvn-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor() { }

  ngOnInit() {this.init()}

  init(){
    this.createListItem();
    this.runFade();
    console.log(typeof fadeList);
    console.log(typeof body);
  }

  createListItem(){

  for (let i = 0; i < textList.length; i++) {
    let listContainer = document.createElement("p");
    console.log("list container is of type: " + listContainer);
    let listItem = document.createTextNode(textList[i]);
    listContainer.className="elementToFade";
    listContainer.appendChild(listItem);
    listArray.push(listContainer);
    console.log("Creating Array " + listArray + " Length: " + listArray.length) ;
    }
  }

  runFade(){
    setTimeout(function() {
      fadeList.appendChild(listArray[h]);
      console.log("Fading In 1");
      h++;

      if (h < listArray.length) {
        this.runFade();
        console.log("Fading In 2");
      }

      if (h == listArray.length){
        h =0;
        this.runFade();
      }}, 6000)
    }
  }
