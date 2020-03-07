let d;
let l;
let r;
fetch('https://private-54c48-amansharma.apiary-mock.com/questions')
.then(res => {
  return res.json();
})
.then(data => {
   console.log(data.response.data);
   console.log(box);
   d=data.response.data;
  l =d.length;
  var x="abc";
  // creating post method
   document.getElementById("box").addEventListener('submit',function (e) {
     e.preventDefault();
       data = {};
       item = [];
       document.querySelectorAll("select").forEach(i => {
           item.push(i.value);
       });
       controlLoop = 0;
       document.querySelectorAll("label").forEach(lab => {
           data[lab.id] = item[controlLoop];
           controlLoop = controlLoop + 1;
       });
    console.log(data);
    fetch(vart,{
      method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      body: JSON.stringify(data)
    }).then(function(response){
      return response.json();
    }).then(function (res) {
     console.log(res);
     })
  });





  // taverse each array element
   for (let i = 0; i < l; i++) {
      
     // bringing the label and select box
     let exi="showIf" in d[i];
    
      if((d[i].type==="dropdown")&&(x!=d[i].label||exi!=true)){
  
      //created label
        if(i===0)
          document.getElementById("box").innerHTML = `<label id="${d[i].name}" for="${i}">${d[i].label}</label>`;
        else
          document.getElementById("box").innerHTML += `<label id="${d[i].name}" for="${i}">${d[i].label}</label>`;
           x=d[i].label;
      // check validation
        if("validations" in d[i]){
          document.getElementById("box").innerHTML += `<select id="${i}" class="sel" onchange="hell(this.value,this.id)" ${d[i].validations[0].name} ><option value="">${d[i].validations[0].message}</option></select>`+"<br>";
          }
        
        else{
            document.getElementById("box").innerHTML += `<select id=${i} class="sel"><option value="">select</option></select>`+"<br>";
        } 
            //  give size
        if("noOfChoices" in d[i]){
          document.getElementById(`${i}`).size = d[i].noOfChoices;
         }
          r=d[i].source;
      // check  if array contains showif
         if(!("showIf" in d[i])){
           if("validations" in d[i]){
          for(j=0;j<(d[i][r].length);j++)
           {
             document.getElementById(`${i}`).innerHTML +=`<option value="${d[i][r][j].value}">${d[i][r][j].key}</option>`;
           }
          }
          else{
            document.getElementById(`${i}`).innerHTML =`<option value="${d[i][r][0].value}">${d[i][r][0].key}</option>`;
            for(j=1;j<(d[i][r].length);j++)
           {
             document.getElementById(`${i}`).innerHTML +=`<option value="${d[i][r][j].value}">${d[i][r][j].key}</option>`;
           }
          }
      }

    }
      else if(d[i].type==="button") {

        document.getElementById("box").innerHTML+= `<button type="submit" class="sub" method="post">Submit</button>`;
        var vart=d[i].api.uri;
       }
    
    
}

  
});
// making option change event function
function hell(obj,id){
   let a;
   let temp=d[0].label;
   index=0;
   flag=0
   for (let k = 0; k< l; k++) {
     //  storing of id
          if(temp!==d[k].label){
              temp=d[k].label;
              index=k;
           }
          if("showIf" in d[k] && d[k].showIf.value===obj) {
                flag=1;
              r=d[k].source;
              if(temp==d[k].label){
               if("validations" in d[index]){
              a=`<option value="">${d[index].validations[0].message}</option>`;}
               }
            d[k][r].forEach(element => {
            a+= `<option value="${element.value}">${element.key}</option>`;
           document.getElementById(index).innerHTML=a;
         });
      
    
     
    
     }
     
   }
   id=+id;
   s=id;
   temp2=d[id].label;
   id=id+1;
   if(flag==0){
    for (let k = id; k< l; k++){
      if(d[k].showIf&&d[k].showIf.field==d[s].name&&temp2!=d[k].label){
        temp2=d[k].label;
        document.getElementById(k).innerHTML=`<option value="not available">Not available for this option</option>`
      }
    }
   }

  }