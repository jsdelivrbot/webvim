function f(ui,cli){
    function inNvii(v){
        return 0<=[
            'normal',
            'insert',
            'visual',
            'visual-block',
        ].indexOf(v)
    }
    let vim=ui._vim
    if(inNvii(vim.mode)){
        update(ui,cli)
        ui.on('update',listener)
        function listener(){
            if(inNvii(vim.mode))
                update(ui,cli)
            else
                ui.removeListener('update',listener)
        }
    }else if(vim.mode=='cmdline'){
        cmdlineUpdate(ui,cli)
        ui.on('update',listener)
        function listener(){
            if(vim.mode=='cmdline')
                cmdlineUpdate(ui,cli)
            else
                ui.removeListener('update',listener)
        }
    }
}
function update(ui,cli){
    let vim=ui._vim
    cli.clear()
    if(vim.mode=='normal'){
        cli.appendChild(vim._modeData.status!=undefined?
            vim._modeData.status
        :
            ''
        )
    }else if(vim.mode=='insert'){
        g('-- INSERT --')
    }else if(vim.mode=='visual'){
        g('-- VISUAL --')
    }else if(vim.mode=='visual-block'){
        g('-- VISUAL BLOCK --')
    }
    cli.appendChild({
        child:scroll(
            ui._wrapMethodData._scroll,
            ui._wrapMethodData.text.countOfRows,
            ui.height
        ),
        c:ui.width-4
    })
    cli.flush()
    function scroll(s,cr,h){
        let
            top=s==0,
            bot=cr<=s+(h-1)
        if(top&&bot)
            return 'All'
        if(top)
            return 'Top'
        if(bot)
            return 'Bot'
        return`${Math.floor(100*s/(cr-(h-1))).toString()}%`
    }
    function g(s){
        cli.appendChild({child:s,style:{fontWeight:'bold'}})
    }
}
function cmdlineUpdate(ui,cli){
    let vim=ui._vim
    let
        text=vim._modeData.inputBuffer,
        cursor=vim._modeData.cursor.position
    cli.clear()
    cli.appendChild(text)
    cli.appendChild({
        child:
            text.substring(cursor,cursor+1)||' ',
        c:cursor,
        class:'cursor',
    })
    cli.flush()
}
;(async()=>{
    let Cli=await module.repository.Cli
    function createCommandDiv(ui){
        let cli=new Cli
        f(ui,cli)
        ui.on('modeChange',()=>f(ui,cli))
        return cli
    }
    return createCommandDiv
})()