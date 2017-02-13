module.repository.measureWidth=
    module.shareImport('ui/measureWidth.js'),
Promise.all([
    module.shareImport('ui/createCliDiv.js'),
    module.repository.measureWidth,
    module.repository.npm.events,
]).then(modules=>{
    let
        createCliDiv=       modules[0],
        measureWidth=       modules[1],
        EventEmmiter=       modules[2]
    function Ui(vim){
        EventEmmiter.call(this)
        this._values={}
        this._vim=vim
        this._fontSize=13
        this._wrapMethod='greedy'
        this._refreshMinTime=16
        this._cursorSymbol=Symbol()
        this.node=createViewNode(this)
    }
    Object.setPrototypeOf(Ui.prototype,EventEmmiter.prototype)
    Object.defineProperty(Ui.prototype,'_fontSize',{set(v){
        this._values._fontSize=v
        this._values._fontWidth=measureWidth(this._fontSize)
    },get(){
        return this._values._fontSize
    }})
    Object.defineProperty(Ui.prototype,'_fontWidth',{get(){
        return this._values._fontWidth
    }})
    Ui.prototype._update=function(){
        this.emit('update')
    }
    Ui.prototype._updateByVim=function(changed){
        this._update()
        for(let v in changed)switch(v){
            case 'mode':
                this.emit('modeChange')
                break
        }
    }
    Object.defineProperty(Ui.prototype,'_wrapMethod',{set(val){
        this._values.wrapMethod=val
        if(this._values.wrapMethod=='greedy'){
            this._wrapMethodData={
                _scroll:0,
            }
        }else if(this._values.wrapMethod=='fixed'){
            this._wrapMethodData={
                _scroll:0,
            }
        }
    },get(){
        return this._values.wrapMethod
    }})
    Object.defineProperty(Ui.prototype,'width',{set(val){
        this._width=val
        this._update()
    },get(){
        return this._width
    }})
    Object.defineProperty(Ui.prototype,'height',{set(val){
        this._height=val
        this._update()
    },get(){
        return this._height
    }})
    Ui.prototype.focus=function(){
        this._inputTag.focus()
    }
    Object.defineProperty(Ui.prototype,'free',{get(){
        this._vim.removeUi(this)
    }})
    function createViewNode(ui){
        let n=createCliDiv(ui)
        n.classList.add('webvim')
        n.addEventListener('click',()=>
            ui._vim.focus()
        )
        return n
    }
    return{get(){
        let ui=new Ui(this)
        this._uis.add(ui)
        return ui
    }}
})