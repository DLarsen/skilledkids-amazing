// a set of sets that combines pairs of inputs
class SetSet {

    
    constructor() {
        this.sets = [];
    }

    // return true if we have a permitted add
    // return false if the add is redundant
    add(a,b){
        if (b == NaN){
            return;
        }
        if (a == NaN){
            return;
        }
        let aMatch = this.indexMatching(a);
        let bMatch = this.indexMatching(b);

        let totalMatched = 
            (aMatch != -1 ? 1 : 0) +
            (bMatch != -1 ? 1 : 0);

        if (totalMatched == 0){
            // we matched nothing
            console.log("we matched nothing");
            let newSet = new Set();
            newSet.add(a);
            newSet.add(b);
            this.sets.push(newSet);
        } else if (aMatch != -1){
            // we only matched "a"
            console.log("we matched A");
            console.log("Adding " + a + " to " + [...this.sets[aMatch]].join(" "));
            if (this.sets[aMatch].has(b)){
                return false;
            } else {
                this.sets[aMatch].add(b);
            }
        } else if (bMatch != -1){
            // we only matched "b"
            console.log("we matched B");
            if (this.sets[bMatch].has(a)){
                return false;
            } else {
                this.sets[bMatch].add(a);
            }
        } else {
            // we matched both
            console.log("we matched both");

            // add non-matchers to new array of sets
            let newSets = [];
            this.sets.forEach((set,idx) => {
                if (idx != aMatch && idx != bMatch){
                    newSets.push(set);
                }
            });

            // now merge the sets
            let combinedSet = newSet();
            this.sets[aMatch].forEach(item => { combinedSet.add(item)});
            this.sets[bMatch].forEach(item => { combinedSet.add(item)});

            newSets.push(newSets);
            this.sets = newSets;
        }
        return true;
    }

    maxSetSize(){
        return Math.max(...this.sets.map(item => item.size));
    }

    indexMatching(item){
        var foundIdx = -1;
        this.sets.forEach((set,idx) => {
            if (set.has(item)) foundIdx = idx;
        })  
        return foundIdx;  
    }

    log(){
        this.sets.forEach((set,idx) => {
            console.log(`idx: ${idx} => set: ${[...set].join(" ")}`)
        })
    }
}