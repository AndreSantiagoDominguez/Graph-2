import Node from "./Node.mjs"
import Zone from "../Zone.mjs"

export default class LinkedList {
    #count
    #head

    constructor(){
        this.#count = 0
        this.#head = undefined
    }

    push(name,weight) {
        let zone = new Zone(name,weight)
        const node = new Node(zone)
        let current
        if (this.#head == null) {
            this.#head = node
        } else {
            current = this.#head
            while (current.next != null)
                current = current.next
            current.next = node
        }
        this.#count++
    }

    recorrerNode(callBack){
        if(this.#head == null){
            console.log('La lista enlazada está vacía')
        }
        else{
            let node = this.#head;

            while(node != null){
                callBack(node)

                node = node.next;
            }
        }
    }

    getHead(){
        return this.#head
    }

    getElementAt(index) {
        if (index>=0 && index<this.#count) {
            let node = this.#head
            for (let i=0;i<index && node != null; i++)
                node = node.next
            return node
        }
        return undefined
    }

    isEmpty(){
        return this.size() === 0
    }

    size(){
        return this.#count
    }


}