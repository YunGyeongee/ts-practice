import crypto from "crypto"

interface BlockShape {
    hash: string
    prevHash: string
    heigth: number
    data: string
}

class Block implements BlockShape {
    public hash: string
    constructor(
        public prevHash: string,
        public heigth: number,
        public data: string
    ) {
        this.hash = Block.calculateHash(prevHash, heigth, data)
    }
    static calculateHash(prevHash: string, heigth: number, data: string) {
        const toHash = `${prevHash}${heigth}${data}`
        return crypto.createHash("sha256").update(toHash).digest("hex")
    }
}

class Blockchain {
    private blocks: Block[]
    constructor() {
        this.blocks = []
    }

    private getPrevHast() {
        if (this.blocks.length === 0) return ""
        return this.blocks[this.blocks.length - 1].hash
    }
    public addBlock(data: string) {
        const newBlock = new Block(this.getPrevHast(), this.blocks.length + 1, data)
        this.blocks.push(newBlock)
    }
    public getBlocks() {
        return [...this.blocks]
    }
}

const blockchain = new Blockchain()

blockchain.addBlock("First one")
blockchain.addBlock("Second one")
blockchain.addBlock("Third onde")

console.log(blockchain.getBlocks())