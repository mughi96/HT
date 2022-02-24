class HashTable {
    constructor(size = 17) {
        this.buckets = new Array(size)
        this.size = size
    }

    hash(str) {
        //polynomial rolling hash
        //maximum string length = 79 characters
        var p = 7919 //large prime number
        var m = 17 //hash table size (number of buckets)
        var p_power = 1
        var hash = 0
        for (var i = 0; i < str.length; i++) {
            var charCode = str.charCodeAt(i) //obtain charcode for each char
            hash += charCode * p ** (str.length - i - 1) // -i-1 to get to the char's index
        }
        return hash % m
    }

    setItem(key) {
        let index = this.hash(key);

        if (!this.buckets[index]) {
            this.buckets[index] = [];
        }
        this.buckets[index].push(key);
        return index; 
    }


    getItemIndex(key){
        let index = this.hash(key);

        if (!this.buckets[index]) {
            return "String does not exist!"
        }
        for (let bucket of this.buckets[index]) {
            if (bucket === key) {
                return index;
            }
        }
    }

    getItem(key){
        let index = this.hash(key);

        if (!this.buckets[index]) {
            return "String does not exist!"
        }
        for (let bucket of this.buckets[index]) {
            if (bucket === key) {
                return bucket;
            }
        }
    }

    removeItem(key){
        let index = this.hash(key);
        
        if (!this.buckets[index]) {
            return "Unable to delete - string not found!"
        } else {
            for (let i = 0; i < this.buckets[index].length; i++) {
                if (this.buckets[index][i] === key) {
                    this.buckets[index].splice(i, 1)
                    return "String deleted!"
                }
            }
        }
    }

}


