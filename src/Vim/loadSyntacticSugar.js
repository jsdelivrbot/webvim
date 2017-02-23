(o=>{
    Object.defineProperty(o,'node',{get(){
        return this._mainUi.node
    }})
    Object.defineProperty(o,'height',{set(val){
        this._mainUi.height=val
    }})
    Object.defineProperty(o,'width',{set(val){
        this._mainUi.width=val
    }})
    Object.defineProperty(o,'pollute',{get(){
        this.polluteStyle
        this.polluteCopy
    }})
    Object.defineProperty(o,'polluteStyle',{get(){
        document.head.appendChild(this.style)
        this.once('quit',()=>{
            document.head.removeChild(this.style)
        })
    }})
    Object.defineProperty(o,'polluteCopy',{get(){
        this.copy=s=>{
            let n=document.createElement('textarea')
            n.value=s
            n.style.position='fixed'
            let e=document.activeElement
            document.body.appendChild(n)
            n.select()
            console.log(document.queryCommandEnabled('copy'))
            document.execCommand('copy',true,null)
            document.body.removeChild(n)
            if(e)
                e.focus()
        }
    }})
})
