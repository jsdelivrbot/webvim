Promise.all([
    module.shareImport('measureWidth.js'),
]).then(modules=>{
    let
        measureWidth=   modules[0]
    return(ui=>{
        let vim=ui._vim
        let textarea=document.createElement('textarea')
        textarea.className='input'
        textarea.style.fontSize=`${ui._fontSize}px`
        textarea.style.height=`${ui._fontSize+2}px`
        let composing=false
        textarea.addEventListener('blur',()=>{
            vim._view()
        })
        textarea.addEventListener('compositionstart',e=>{
            composing=true
        })
        textarea.addEventListener('compositionend',e=>{
            vim.imInput=''
            composing=false
            f()
        })
        textarea.addEventListener('focus',()=>{
            vim._view()
        })
        textarea.addEventListener('input',()=>{
            f()
        })
        textarea.addEventListener('keydown',e=>{
            if(composing||!(
                e.key=='ArrowLeft'||
                e.key=='ArrowRight'||
                e.key=='ArrowDown'||
                e.key=='ArrowUp'||
                e.key=='Backspace'||
                e.key=='Delete'||
                e.key=='End'||
                e.key=='Enter'||
                e.key=='Escape'||
                e.key=='Home'||
                e.key=='Tab'||
                e.ctrlKey&&e.key=='c'||
                e.ctrlKey&&e.key=='['||
                e.ctrlKey&&e.key=='r'
            ))
                return
            e.preventDefault()
            e.stopPropagation()
            vim.input=e
        })
        return textarea
        function f(){
            if(composing){
                vim.imInput=textarea.value
                vim._view()
            }else{
                vim.input=textarea.value
                textarea.value=''
            }
            let width=measureWidth(ui._fontSize,textarea.value)
            if(width)
                width++
            textarea.style.width=`${width}px`
        }
    })
})
