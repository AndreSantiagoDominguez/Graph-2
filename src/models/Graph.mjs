import LinkedList from "./LinkedList/LinkedList.mjs";

export default class Graph {
  #listaAdyacencia = [];
  #map = new Map();
  #listVisit = [];
  #matrizAdyencia = [];

  constructor() {}

  addVertices(...vertices) {
      for (let value of vertices) {
          this.#listaAdyacencia.push(new LinkedList())
          this.#map.set(value,this.#listaAdyacencia.length-1)
      }
  }

  addV(value) {
      this.#listaAdyacencia.push(new LinkedList())
      this.#map.set(value,this.#listaAdyacencia.length-1)
      return value
  }

  addConexion(start, end, weight=1){
      if (this.#map.has(start) && this.#map.has(end)) {
          this.#listaAdyacencia[this.#map.get(start)].push(end,weight)
          this.#listaAdyacencia[this.#map.get(end)].push(start,weight)
          return true
      }
      return false;
  }

  dfs(origen,callback){
    this.#listVisit[this.#map.get(origen)] = true
    callback(origen)

    let space = this.#listaAdyacencia[this.#map.get(origen)];

    for(let i=0; i<space.size(); i++){
        let v = space.getElementAt(i)
        if(this.#listVisit[this.#map.get(v.data.name)] != true){
            this.#listVisit[this.#map.get(v.data.name)] = true
            this.dfs(v.data.name,callback)
        } 
    }
  }

  

  dijkstra(verticeInit, imprimirMensaje) {
    // Valores iniciales
    let l = [];
    let v = [];
    let d = [];
    let dp = [];
    let v1;

    // Rellenar la matriz de adyacencia si no está definida
    for (let i = 0; i < this.#matrizAdyencia.length; i++) {
        for (let j = 0; j < this.#matrizAdyencia.length; j++) {
            if (this.#matrizAdyencia[i][j] === null) {
                this.#matrizAdyencia[i][j] = Infinity; // Inicializar a un valor grande si no hay conexión directa
            }
            console.log(this.#matrizAdyencia[i][j])
        }            
    }
    
    // Inicialización de arreglos y valores
    for(let i = 0; i < this.#matrizAdyencia.length; i++) {
        v[i] = i;
        d[i] = Infinity; // Inicializar todas las distancias como Infinity
    }

    // Obtener el índice del vértice inicial
    v1 = this.#map.get(verticeInit);
    if (v1 === null) {
        console.error('El vértice inicial no existe en el grafo.');
        // Aquí podrías agregar un mensaje de alerta o manejo adicional
        return; // Terminar la ejecución de la función si no existe el vértice inicial
    } else {
        d[v1] = 0; // La distancia al vértice inicial es 0
        dp = [...d];

        // Algoritmo de Dijkstra
        while (l.length !== this.#matrizAdyencia.length) {
            let minimo = Math.min(...dp.filter(value => value !== null));
            let indice = dp.indexOf(minimo);
            l.push(minimo);

            for (let i = 0; i < d.length; i++) {
                if (this.#matrizAdyencia[indice][i] !== Infinity) {
                    let suma = d[indice] + this.#matrizAdyencia[indice][i];
                    if (d[i] > suma) {
                        d[i] = suma;
                    }
                }
            }

            dp[indice] = null;
             imprimirMensaje(d);
        }

        // Llamar a la función imprimirMensaje con las distancias calculadas
        imprimirMensaje(d);
        console.log(d);
    }
}


}