function Cursor(set,get){
    this._position=0
    Object.defineProperty(this,'string',{set,get})
}
Object.defineProperty(Cursor.prototype,'backspace',{get(){
    if(this._position<1)
        return
    this.string=
        this.string.substring(0,this._position-1)+
        this.string.substring(this._position)
    this._position--
}})
Object.defineProperty(Cursor.prototype,'delete',{get(){
    if(this._position==this.string.length)
        return
    this.string=
        this.string.substring(0,this._position)+
        this.string.substring(this._position+1)
}})
Object.defineProperty(Cursor.prototype,'end',{get(){
    this._position=this.string.length
}})
Object.defineProperty(Cursor.prototype,'home',{get(){
    this._position=0
}})
Object.defineProperty(Cursor.prototype,'position',{set(v){
    this._position=Math.min(this.string.length,Math.max(0,v))
},get(){
    return this._position
}})
export default Cursor
