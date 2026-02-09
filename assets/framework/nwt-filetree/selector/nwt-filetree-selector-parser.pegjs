{
  
  const fromTokensToString = function(tokens) {
    return tokens.map(element => element.to).join("");
  };
  
  const formatAst = function(ast, text) {
    
  	let output = {
      $type: "nfs-object",
      isDirectory: null,
      isFile: null,
      isJson: null,
      isProperty: null,
      hasGlobs: null,
      hasIds: false,
      hasParametricIds: false,
      hasHardcodedIds: false,
      startsWithBar: typeof ast[0].type === "separator",
    };
    const originalTokens = ast.concat([]);
    output.hasTokens = [];
    output.hasParametricIds = {};
    output.hasHardcodedIds = {};
    Ampliar: {
      for(let index=0; index<originalTokens.length; index++) {
        const token = originalTokens[index];
        switch(token.type) {
          case "separator":
            break;
          case "json token":
            Object.assign(output, {
              isDirectory: false,
              isFile: false,
              isJson: true,
              isProperty: false,
            });
            break;
          case "property token":
            Object.assign(output, {
              isDirectory: false,
              isFile: false,
              isJson: false,
              isProperty: true,
            });
            break;
          case "file token":
            Object.assign(output, {
              isDirectory: false,
              isFile: true,
              isJson: false,
              isProperty: false,
            });
            break;
          case "id.var":
            output.hasParametricIds = output.hasParametricIds || {};
            if(typeof originalTokens[index-1] !== "undefined") {
              output.hasTokens.push({type:"separator",text:"/",to:"/"});
            }
            output.hasParametricIds[output.hasTokens.length] = token.id;
            break;
          case "id.text":
          case "id.tag":
            output.hasHardcodedIds = output.hasHardcodedIds || {};
            if(typeof originalTokens[index-1] !== "undefined") {
              output.hasTokens.push({type:"separator",text:"/",to:"/"});
            }
            output.hasHardcodedIds[output.hasTokens.length] = token.id;
            break;
        }
        output.hasTokens.push(token);
      }
    }
    Condensar: {
      output.hasEndpointByTokens = fromTokensToString(output.hasTokens);
    }
    return output;
  };
}

Language = ast:Block+ { return formatAst(ast, text()) }

Block = Injected_token / Random_character

Random_character = ((!Injected_token) .)+ { return { type: "text", to:text(), text: text() } }

Injected_token = Separator_1 / Separator_2 / Separator_3 / Separator_4 / Separator_5 / Separator_6 / Separator_simple

Separator_1 = PS+ "#" PS+ EOF { return {type:"json token",text:text(),to:"/#/"} }
Separator_2 = PS+ "#" PS+ { return {type:"property token",text:text(),to:"/#/"} }
Separator_3 = PS+ "#" EOF { return {type:"file token",text:text(),to:"/#"} }
Separator_4 = PS+ ":" id:VarId_injection { return {type:"id.var",id,text:":"+id,to:":"+id} }
Separator_5 = PS+ "\"" id:TextId_injection { return {type:"id.text",id,text:JSON.stringify(id),to:JSON.stringify(id) } }
Separator_6 = PS+ "<" id:TaggedId_injection { return {type:"id.tag",id,text:"<"+id+">",to:"<"+id+">" } }
Separator_simple = PS+ { return {type:"separator",text:text(),to:"/"} }

VarId_injection = id:VarId_injection_content VarId_injection_closer { return id }
VarId_injection_content = (!(VarId_injection_closer) .)+ { return text() }
VarId_injection_closer = & PS+ {}

TextId_injection = id:TextId_injection_content TextId_injection_closer { return id }
TextId_injection_content = (!(TextId_injection_closer / "\\\"") .)+ { return text() }
TextId_injection_closer = "\"" & PS+ {}

TaggedId_injection = id:TaggedId_injection_content TaggedId_injection_closer { return id }
TaggedId_injection_content = (!(TaggedId_injection_closer / (">" & PS+) ) .)+ { return text() }
TaggedId_injection_closer = ">" & PS+ {}

EOF = !.

PS = "\\" / "/"