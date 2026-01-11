{
  function compileTemplateAst(ast) {
  	let src = [];
    src.push("let js = \"\";");
    for (const node of ast) {
      if (node.type === "text") {
        src.push("js += " + JSON.stringify(node.value) + ";");
      } else if (node.type === "eval") {
        src.push("js += " + node.value + ";");
      } else if (node.type === "code") {
        src.push(node.value);
      }
    }
    src.push("return js;");
    return src.join("\n");
  }
}

Template_language = ast:Block { return compileTemplateAst(ast) }

Block = Unit*

Unit = Evaluable_block / Code_block / Text

Evaluable_block = "/**<?=" _ e:Evaluable_content Code_block_end  {
  return { type: "eval", value: e };
}

Code_block = "/**<?" ! "=" _ c:Code_content Code_block_end {
  return { type: "code", value: c };
}

Evaluable_content = (!"?>**/" .)* { return text() }

Code_content = (!"?>**/" .)* { return text() }

Code_block_end = "?>**/" ('"!template"' / "template")?

Text = t:Text_chunk {
  return { type: "text", value: text() };
}

Text_chunk = Text_char+ { return text() }

Text_char = !"/**<?" .

_ = [ \t\r\n]*