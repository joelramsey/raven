

var fadeList = document.getElementById("fadeList");
var textList = ["DISCOVER source material with dynamic and constantly adaptive searches.", "EVALUATE source material quickly with interactive displays.", "UNDERSTAND source material with powerful visualizations.", "DETERMINE new or PROVE existing conclusions from source material.", "RAVEN SCHOLAR: UNLIKE ANYTHING YOU'VE EVER SEEN" ];
var listArray = [];
 var h = 0;

//Init function that is attached to the body onload.
function init() {
    "use strict";
    createListItem();
    runFade();
     
       
}


function createListItem() {
    "use strict";
      var i= 0;
     for (i = 0; i < textList.length; i++) {
        
        var listContainer = document.createElement("p");
        
        var listItem = document.createTextNode(textList[i]);
        
         listContainer.className="elementToFade";
         
        listContainer.appendChild(listItem);
         
        
        listArray.push(listContainer);
         
         console.log("Creating Array " + listArray + " Length: " + listArray.length) ;
       
    };
}



function runFade(){
    "use strict";
    
    setTimeout(function() {
        fadeList.appendChild(listArray[h]);
        console.log("Fading In 1");
        h++;
        
        if (h < listArray.length) {
            runFade();
            console.log("Fading In 2");
        }
        
        if (h == listArray.length){
            h =0;
            runFade();
        }
    }, 6000) 
        
}



document.getElementsByTagName("BODY")[0].onload = function () {
    init();
};

