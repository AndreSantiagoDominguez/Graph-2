import Graph from "../models/Graph.mjs";

let g = new Graph(); 

let addZone = document.getElementById("addZone");
addZone.addEventListener("click", () => {
  let identificadorV = document.getElementById("location").value;
  let vertices = identificadorV.split(",");
  console.log(identificadorV);
  console.log(vertices);

  if (vertices.length == 1) {
    g.addV(vertices[0].trim())
    addDataTable(vertices[0].trim());
  } else {
    g.addVertices(...vertices.map((v) => v.trim()))
  }

  document.getElementById("location").value = "";
});


let btn_distance = document.getElementById("btn_addDistance");
btn_distance.addEventListener("click", () => {
  let zone1 = document.getElementById("zone1").value.trim();
  let zone2 = document.getElementById("zone2").value.trim();

  if (zone1 == "" || zone2 == "") {
    alert("No se aceptan campos vacios");
  } else {
    let distance = parseInt(document.getElementById("distance").value);
    console.log(zone1, zone2);
    console.log(g.addConexion(zone1, zone2, distance));

    document.getElementById("zone1").value = "";
    document.getElementById("zone2").value = "";
    document.getElementById("distance").value = "";
  }
});

let btn_show = document.getElementById("btn-show");
btn_show.addEventListener("click", () => {
  let zoneOrigin = document.getElementById("nodeInit").value;
  g.dfs(zoneOrigin, callback);
});

let body = document.getElementById("body-table");

const callback = (nameZone) => {
  console.log(nameZone);
  addZoneTable(nameZone)
};

let addZoneTable = (nameZone) => {
  let tr = document.createElement("tr");
  let td = document.createElement("td");
  td.textContent = nameZone;
  tr.appendChild(td);
  body.appendChild(tr);
};


let imprimirMensaje = (d) =>{
  let referencia = document.getElementById('result');

  d.forEach(valor => {
    let elementP = document.createElement('p')
    elementP.textContent = valor;
    console.log(elementP)
    referencia.appendChild(elementP);
}); 
}
const btn_dijkstra = document.getElementById('btn_dijkstra');
btn_dijkstra.addEventListener('click', () => {
    let verticePartida = document.getElementById('verticeInit').value; 
    g.dijkstra(verticePartida, imprimirMensaje); 
});



