{const toObject=function(out,row) { out[row[0]]=row[1]; return out; };}
Start=_ ast:Value _ {return ast}
Value=Annotated / TObject / TArray / TString / TNumber / TBoolean / TNull
PropertyStream = PropertyStreamWrapped / PropertyStreamUnwrapped
PropertyStreamWrapped = _ "{" _ p:PropertyStreamUnwrapped _ "}" _ { return p }
PropertyStreamUnwrapped = p1:PropLine pN:MorePropLines? { return (base) => [p1].concat(pN||[]).reduce(toObject, base) }
MorePropLines = PropLine+
PropLine = _ "." k:TString _ v:Value _ { return [k, v] }
TNull="null" {return null}
TBoolean="true" {return true } / "false" {return false}
Annotated=s:("@" / "$" / "^") path:TString _ val:Value? {return { [s === "@" ? "type" : s === "$" ? "instanceOf" : "jojo" ]: path, ...(typeof val === "object" ? val : { value:val }) }}
TObject="{" _ m:Members? _ "}" mods:PropertyStream? {return mods ? mods(m||{}) : (m||{})}
Members=p1:Pair pN:MorePairs? {return [p1].concat(pN||[]).reduce(toObject,{})}
PairN=_ "," _ p:Pair { return p }
MorePairs=PairN+
Pair=k:TString _ ":" _ v:Value {return [k,v]}
TArray="[" _ list:Elements? _ "]" {return list || []}
Elements=val1:Value valN:(_ "," _ Value)* _ {return [val1].concat(valN.map(v=>v[3])||[])}
TString="\"" chars:(!"\"" .)* "\"" {return text().slice(1, -1)}
TNumber="-"? [0-9]+ ("." [0-9]+)? ([eE] [+-]? [0-9]+)? {return Number(text())}
_=[ \t\n\r]*