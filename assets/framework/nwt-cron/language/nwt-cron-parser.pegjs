{
    const CronUtils = {
        neutralize(obj) {
            const output = {};
            Iterating_properties:
            for(let prop in obj) {
                if((typeof obj[prop] === "undefined") || (obj[prop] === null)) continue Iterating_properties;
                output[prop] = obj[prop];
            }
            return output;
        }
    }
    const CronFactory = {
        calendarable(obj = {}) {
            return Object.assign({}, {year:undefined,month:undefined,day:undefined}, CronUtils.neutralize(obj));
        },
        watchable(obj = {}) {
            return Object.assign({}, {hour:undefined,minute:undefined,second:undefined}, CronUtils.neutralize(obj));
        },
        mix(a,b) {
            return Object.assign({}, a, b);
        }
    };
}

Language = _* s:Full_sentence* _* { return s.filter(sub => (typeof sub !== "undefined") && (sub !== null)) }

Full_sentence = _* s:Sentence (EOL/EOF) { return s }

Sentence =
      Sentence_1
    / Comment_sentence

Sentence_1 = Nesteable_time_structure_list

Nesteable_time_structure_list =
    selector:Time_structure_list
    complement:Time_structure_continuation
        { return { selector, ...complement||{}} }

Time_structure_continuation = Time_structure_wrapped / Signification

Time_structure_wrapped "{...}" = 
    token1:(_* "{" _*)
    block:Language
    token2:(_* "}")
        { return { subselector: block } }

Signification "={signification}" = _* t:(Text_wrapped / Rest_of_line) { return {type:"signification",value:t} }

Text_wrapped = ">" __* "{" ((!"}").)* "}" { return text() }
Rest_of_line = "=" ((!EOL) .)+ { return text() }

Time_structure_list = it_1:Time_structure_item_1 it_n:Time_structure_item_n* { return [it_1].concat(it_n) }

Time_structure_item_1 = Time_structure_item
Time_structure_item_n = "," t:Time_structure_item { return t }

Time_structure_item = Time_structure_range / Time_structure_point

Time_structure_range =
    a:Time_structure_point
    token1:(Range_separator)
    b:Time_structure_point
        { return {type:"range",from:a,to:b} }

Time_structure_point = Time_structure_full /
    Time_structure_calendarable /
    Time_structure_disambiguable /
    Time_structure_watchable

Time_structure_full = c:Calendarable_expression " " w:Watchable_expression { return {...c,...w} }
Time_structure_calendarable = Calendarable_expression
Time_structure_watchable = Watchable_expression
Time_structure_disambiguable = c:Day_symbol " " w:Watchable_expression { return {...CronFactory.calendarable({day:c}),...w} }

Calendarable_expression = Calendarable_expression_main_1 / Calendarable_expression_main_2 / Calendarable_expression_main_3

Calendarable_expression_main_1 = 
    year:Year_symbol
    month:Slash_month_symbol?
    day:Slash_day_symbol?
        { return CronFactory.calendarable({year, month, day})}

Calendarable_expression_main_2 = 
    month:Month_symbol
    day:Slash_day_symbol
        { return CronFactory.calendarable({month, day})}

Calendarable_expression_main_3 = 
    month:Month_name
    day:Slash_day_symbol?
        { return CronFactory.calendarable({month, day})}

Watchable_expression =
    hour:Hour_symbol
    minute:Semicolon_minute_symbol?
    second:Semicolon_second_symbol?
        { return CronFactory.watchable({hour, minute, second})}

Slash_month_symbol "/{month}" = "/" m:Two_numbers_or_wildcard_or_month_name { return m }
Slash_day_symbol "/{day}" = "/" d:Two_numbers_or_wildcard { return d }
Semicolon_minute_symbol ":{minute}" = ":" m:Two_numbers_or_wildcard { return m }
Semicolon_second_symbol ":{second}" = ":" s:Two_numbers_or_wildcard { return s }

Year_symbol "{year}" = Four_numbers
Month_symbol "{month}" = Two_numbers_or_wildcard
Day_symbol "{day}" = Two_numbers_or_wildcard
Hour_symbol "{hour}" = Two_numbers_or_wildcard
Minute_symbol "{minute}" = Two_numbers_or_wildcard
Second_symbol "{second}" = Two_numbers_or_wildcard

Slash_two_numbers_or_wildcard = "/" t:Two_numbers_or_wildcard { return t }
Semicolon_two_numbers_or_wildcard = ":" t:Two_numbers_or_wildcard { return t }

Two_numbers_or_wildcard = Two_numbers / "*"
Two_numbers_or_wildcard_or_month_name = Month_name / Two_numbers_or_wildcard
Month_name = "enero" { return 0 } /"febrero" { return 1 } /"marzo" { return 2 } /"abril" { return 3 } /"mayo" { return 4 } /"junio" { return 5 } /"julio" { return 6 } /"agosto" { return 7 } /"septiembre" { return 8 } /"octubre" { return 9 } /"noviembre" { return 10 } /"diciembre" { return 11 } 
Weekday_name = "lunes" { return 0 } /"martes" { return 1 } /"miércoles" { return 2 } /"miercoles" { return 2 } /"jueves" { return 3 } /"viernes" { return 4 } /"sábado" { return 5 } /"sabado" { return 5 } /"domingo" { return 6 } 
Two_numbers_substract_1_or_wildcard = Two_numbers_substract_1 / "*"
Four_numbers_or_wildcard = Four_numbers / "*"

Four_numbers = [0-9] [0-9] [0-9] [0-9] { return parseInt(text()) }
Two_numbers = [0-9] [0-9]? { return parseInt(text()) }
Two_numbers_substract_1 = n:Two_numbers { return n-1 }

Comment_sentence "{Comment sentence}" = Comment_multiline / Comment_oneline { return undefined }

Comment_oneline = "//" (!(___/EOF).)* { return null }

Comment_multiline = Comment_multiline_start Comment_multiline_content Comment_multiline_end { return null }
Comment_multiline_start = "/*"
Comment_multiline_content = (!("*/").)+
Comment_multiline_end = "*/"

Hour_separator = ":"
Date_separator = "/"
Range_separator = "-"

Wildcard = "*"

_ "{any space}" = __/___/Comment_multiline
__ "{tab or space}" = "\t" / " "
___ "{end of line}" = "\r\n" / "\r" / "\n"

EOF "{end of file}" = !.
EOL = ___ (__* ___)*