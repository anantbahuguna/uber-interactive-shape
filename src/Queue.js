//Queue data structure with FIFO and complexity of O(1)
class Queue {
    constructor() {
        this.items = {};
        this.headIndex = 0;
        this.tailIndex = 0;
    }

    //adds a new element at the end
    enqueue(item) {
        this.items[this.tailIndex] = item;
        this.tailIndex++;
    }

    //removes the head element of the queue
    dequeue() {
        const removedItem = this.items[this.headIndex];
        delete this.items[this.headIndex];
        this.headIndex++;
        if(this.isEmpty()) {
            this.clear()
        }
        return removedItem;
    }

    //shows the head element of the queue
    peek() {
        return this.items[this.headIndex];
    }

    //shows the number of items in queue
    size() {
        return this.tailIndex - this.headIndex;
    }

    //checks if queue is empty or not
    isEmpty() {
        if(this.tailIndex - this.headIndex === 0) {
            return true;
        } else {
            return false;
        }
    }

    //empty the queue
    clear() {
        this.items = {}
        this.headIndex = 0;
        this.tailIndex = 0;
    }
}

export default Queue;