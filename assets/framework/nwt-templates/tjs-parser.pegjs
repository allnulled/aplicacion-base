{
  function compileTemplateAst(ast) {
  	let src = [];
    src.push("let js = \"\";");
    for (const node of ast) {
      if (node.type === "text") {
        src.push("js += " + JSON.stringify(node.value) + ";");
      } else if (node.type === "evaluation") {
        src.push("js += " + node.value + ";");
      } else if (node.type === "code") {
        src.push(node.value);
      } else if (node.type === "fragment") {
        let js = "";
        js += "js += (val => {";
        js += `\n  if(typeof val === "function") {`;
        js += `\n    return NwtCodeComposer.getBlankFunctionBody(val);`;
        js += `\n  } else if (typeof val === "string") {`;
        js += `\n    return val;`;
        js += `\n  } else if(typeof val === "undefined") {`;
        js += `\n    return "";`;
        js += `\n  } else {`;
        js += `\n    return JSON.stringify(val);`;
        js += `\n  }`;
        js += "\n})(NwtUtils.trify(() => ";
        js += node.value;
        js += ", undefined));"
        src.push(js);
      }
    }
    src.push("return js;");
    return src.join("\n");
  }
}

Template_language = ast:Block { return compileTemplateAst(ast) }

Block = Unit*

Unit = Evaluable_block / Fragment_block / Code_block / Text

Evaluable_block = "/**<?=" _ e:Evaluable_content Code_block_end  {
  return { type: "evaluation", value: e };
}

Fragment_block = "/**<?#" _ e:Evaluable_content Code_block_end  {
  return { type: "fragment", value: e };
}

Code_block = "/**<?" !("=" / "#") _ c:Code_content Code_block_end {
  return { type: "code", value: c };
}

Evaluable_content = (!"?>**/" .)* { return text() }

Code_content = (!"?>**/" .)* { return text() }

Code_block_end = "?>**/" ('"!template"' / Variable_name)?

Variable_name = [A-Za-z_$] [A-Za-z0-9_$]* { return text() }

Text = t:Text_chunk {
  return { type: "text", value: text() };
}

Text_chunk = Text_char+ { return text() }

Text_char = !"/**<?" .

_ = [ \t\r\n]*