import stringWidthPromise from '../stringWidth.js'
let
    lfDoc={
        child:'$',
        class:'color4i',
    }
function substring(list,s,start,end){
    let a=[]
    for(;start!=end;start++){
        let c=s[start]
        a.push(c=='\n'?list?Object.create(lfDoc):'\n':c)
    }
    return a
}
export default(async()=>{
    let stringWidth=await stringWidthPromise
    function width(c){
        return c=='\n'?1:stringWidth(c)
    }
    function wrapLine(list,l,targetWidth){
        let rows=[]
        for(let i=0;i<l.length;){
            let start=i,end=calcEnd(i,l,targetWidth)
            rows.push({
                start,
                end,
                string:substring(list,l,start,end)
            })
            i=end
        }
        return rows
    }
    function calcEnd(i,l,targetWidth){
        for(
            let rowWidth=0,w;
            i<l.length&&rowWidth+(w=width(l[i]))<=targetWidth;
            rowWidth+=w,i++
        );
        return i
    }
    return wrapLine
})()
