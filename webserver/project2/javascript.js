window.onload = () => {
    console.log("page is fully loaded");
  };
  //set the colors to be constant
const colors=[
    '#D70015',//0
    '#FF9F0C',//1
    '#FFCC02',//2
    '#248A3D',//3
    '#0D817C',//4
    '#32AFC7',//5
    '#0171A4',//6
    '#3634A3',//7
    '#8944AA',//8
    '#7F6545'//9
]
//update the color by connect it to the time string
function updateColors(){
    const date=new Date();
    const timeString=date.toLocaleTimeString('en-US',{ hour12: false })
    //replace the ":" to " ". so they are pure numbers
    const timeDigits=timeString.replace(/:/g,'');
    //increments, change color parts
    for(let i = 0; i < 6; i++) {
      const col= document.getElementById(`col${i + 1}`)
      const digit= parseInt(timeDigits[i])
      col.style.backgroundColor=colors[digit];
    }
}
//set the interval and the updateColor function to 1 second.
setInterval(updateColors, 1000);
updateColors();