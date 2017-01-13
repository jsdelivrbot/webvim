Promise.all([
    module.repository.Cli,
    module.shareImport('createTextCli/viewText.js'),
    module.shareImport('createTextCli/createTextContentCli.js'),
]).then(modules=>{
    let
        Cli=                    modules[0],
        viewText=               modules[1],
        createTextContentCli=   modules[2],
        refreshTime=            33
    function createTextCli(view){
        let cli=new Cli
        f()
        view.on('update',f)
        setInterval(()=>cli.flush(),refreshTime)
        return cli
        function f(){
            cli.clear()
            build(cli,view,viewText(view,
                view._vim._options.number?view.width-4:view.width
            ),document.activeElement==view._inputTag&&view._vim.mode!='cmdline')
        }
    }
    function build(cli,view,text,showCursor){
        let res=createTextContentCli(view,text,showCursor)
        if(view._vim._options.number){
            cli.appendChild(number(text))
            cli.appendChild({
                child:res.textCli,
                c:4,
            })
        }else{
            cli.appendChild(res.textCli)
        }
        for(let r=res.rowsCount;r<view.height-1;r++)
            cli.appendChild({child:'~',r})
        return cli
    }
    function number(text){
        let cli=new Cli
        let currentRowsCount=0
        text.map(l=>{
            cli.appendChild({
                child:pad((l.index+1).toString()),
                r:currentRowsCount,
            })
            currentRowsCount+=l.rows.length||1
        })
        return cli
        function pad(s){
            return ' '.repeat(3-s.length)+s
        }
    }
    return createTextCli
})
