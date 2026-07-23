
/*!
 * CSVParser.js
 * Mr-Data-Converter
 *
 * Input CSV or Tab-delimited data and this will parse it into a Data Grid Javascript object
 */
function DataConverter(n){this.nodeId=n;this.node=$("#"+n);this.outputDataType="json";this.rowDelimiter="\n";this.inputText="";this.outputText="";this.indent="  ";this.tableName="your_table_name";this.headersProvided=!0;this.safeHeaders=!0;this.downcaseHeaders=!1;this.upcaseHeaders=!1;this.includeWhiteSpace=!0;this.useTabsForIndent=!1}function saveSettings(){for(var n,i,t={},r=0;r<settings.length;++r){n=settings[r];i=n.name||n.id;switch(n.type){case"button":continue;case"checkbox":t[i]=n.checked;break;case"radio":n.checked&&(t[i]=n.value);break;default:t[i]=n.value}}t.outputDataType=$("#data-selector").val();localStorage.settings=JSON.stringify(t)}var isDecimalRe=/^\s*(\+|-)?((\d+([,\.]\d+)?)|([,\.]\d+))\s*$/,CSVParser={escapeText:function(n,t){return n===undefined?"":(t===undefined&&(t="html"),t==="xml"&&(n=n.replace(/&/g,"&amp;"),n=n.replace(/'/g,"&apos;")),t==="rtf"?(n=n.replace(/\\/g,"\\'5c"),n=n.replace(/\{/g,"\\'7b"),n=n.replace(/\}/g,"\\'7d"),n=n.replace(/~/g,"\\'98")):(n=n.replace(/</g,"&lt;"),n=n.replace(/>/g,"&gt;")),n=n.replace(/…/g,t==="rtf"?"\\'85":"&hellip;"),n=n.replace(/‘/g,t==="rtf"?"\\'91":"&lsquo;"),n=n.replace(/’/g,t==="rtf"?"\\'92":"&rsquo;"),n=n.replace(/“/g,t==="rtf"?"\\'93":"&ldquo;"),n=n.replace(/”/g,t==="rtf"?"\\'94":"&rdquo;"),n=n.replace(/–/g,t==="rtf"?"\\'96":"&ndash;"),n=n.replace(/—/g,t==="rtf"?"\\'97":"&mdash;"),n=n.replace(/‹/g,t==="rtf"?"\\'8b":"&lsaquo;"),n=n.replace(/›/g,t==="rtf"?"\\'9b":"&rsaquo;"),n=n.replace(/«/g,t==="rtf"?"\\'ab":"&laquo;"),n=n.replace(/»/g,t==="rtf"?"\\'bb":"&raquo;"),n=n.replace(/¡/g,t==="rtf"?"\\'a1":"&iexcl;"),n=n.replace(/¿/g,t==="rtf"?"\\'bf":"&iquest;"),n=n.replace(/ /g,t==="rtf"?"\\~":"&nbsp;"),n=n.replace(/€/g,t==="rtf"?"\\'80":"&euro;"),n=n.replace(/†/g,t==="rtf"?"\\'86":"&dagger;"),n=n.replace(/‡/g,t==="rtf"?"\\'87":"&Dagger;"),n=n.replace(/•/g,t==="rtf"?"\\'95":"&bull;"),n=n.replace(/™/g,t==="rtf"?"\\'99":"&trade;"),n=n.replace(/¢/g,t==="rtf"?"\\'a2":"&cent;"),n=n.replace(/£/g,t==="rtf"?"\\'a3":"&pound;"),n=n.replace(/¤/g,t==="rtf"?"\\'a4":"&curren;"),n=n.replace(/¥/g,t==="rtf"?"\\'a5":"&yen;"),n=n.replace(/§/g,t==="rtf"?"\\'a7":"&sect;"),n=n.replace(/©/g,t==="rtf"?"\\'a9":"&copy;"),n=n.replace(/®/g,t==="rtf"?"\\'ae":"&reg;"),n=n.replace(/°/g,t==="rtf"?"\\'b0":"&deg;"),n=n.replace(/±/g,t==="rtf"?"\\'b1":"&plusmn;"),n=n.replace(/²/g,t==="rtf"?"\\'b2":"&sup2;"),n=n.replace(/³/g,t==="rtf"?"\\'b3":"&sup3;"),n=n.replace(/µ/g,t==="rtf"?"\\'b5":"&micro;"),n=n.replace(/¶/g,t==="rtf"?"\\'b6":"&para;"),n=n.replace(/·/g,t==="rtf"?"\\'b7":"&middot;"),n=n.replace(/¼/g,t==="rtf"?"\\'bc":"&frac14;"),n=n.replace(/½/g,t==="rtf"?"\\'bd":"&frac12;"),n=n.replace(/¾/g,t==="rtf"?"\\'be":"&frac34;"),n=n.replace(/×/g,t==="rtf"?"\\'d7":"&times;"),n=n.replace(/÷/g,t==="rtf"?"\\'f7":"&divide;"),n=n.replace(/á/g,t==="rtf"?"\\'e1":"&aacute;"),n=n.replace(/Á/g,t==="rtf"?"\\'c1":"&Aacute;"),n=n.replace(/à/g,t==="rtf"?"\\'e0":"&agrave;"),n=n.replace(/À/g,t==="rtf"?"\\'c0":"&Agrave;"),n=n.replace(/â/g,t==="rtf"?"\\'e2":"&acirc;"),n=n.replace(/Â/g,t==="rtf"?"\\'c2":"&Acirc;"),n=n.replace(/ä/g,t==="rtf"?"\\'e4":"&auml;"),n=n.replace(/Ä/g,t==="rtf"?"\\'c4":"&Auml;"),n=n.replace(/ã/g,t==="rtf"?"\\'e3":"&atilde;"),n=n.replace(/Ã/g,t==="rtf"?"\\'c3":"&Atilde;"),n=n.replace(/å/g,t==="rtf"?"\\'e5":"&aring;"),n=n.replace(/Å/g,t==="rtf"?"\\'c5":"&Aring;"),n=n.replace(/æ/g,t==="rtf"?"\\'e6":"&aelig;"),n=n.replace(/Æ/g,t==="rtf"?"\\'c6":"&AElig;"),n=n.replace(/ç/g,t==="rtf"?"\\'e7":"&ccedil;"),n=n.replace(/Ç/g,t==="rtf"?"\\'c7":"&Ccedil;"),n=n.replace(/ð/g,t==="rtf"?"\\'f0":"&eth;"),n=n.replace(/Ð/g,t==="rtf"?"\\'d0":"&ETH;"),n=n.replace(/é/g,t==="rtf"?"\\'e9":"&eacute;"),n=n.replace(/É/g,t==="rtf"?"\\'c9":"&Eacute;"),n=n.replace(/è/g,t==="rtf"?"\\'e8":"&egrave;"),n=n.replace(/È/g,t==="rtf"?"\\'c8":"&Egrave;"),n=n.replace(/ê/g,t==="rtf"?"\\'ea":"&ecirc;"),n=n.replace(/Ê/g,t==="rtf"?"\\'ca":"&Ecirc;"),n=n.replace(/ë/g,t==="rtf"?"\\'eb":"&euml;"),n=n.replace(/Ë/g,t==="rtf"?"\\'cb":"&Euml;"),n=n.replace(/í/g,t==="rtf"?"\\'ed":"&iacute;"),n=n.replace(/Í/g,t==="rtf"?"\\'cd":"&Iacute;"),n=n.replace(/ì/g,t==="rtf"?"\\'ec":"&igrave;"),n=n.replace(/Ì/g,t==="rtf"?"\\'cc":"&Igrave;"),n=n.replace(/î/g,t==="rtf"?"\\'ee":"&icirc;"),n=n.replace(/Î/g,t==="rtf"?"\\'ce":"&Icirc;"),n=n.replace(/ï/g,t==="rtf"?"\\'ef":"&iuml;"),n=n.replace(/Ï/g,t==="rtf"?"\\'cf":"&Iuml;"),n=n.replace(/ñ/g,t==="rtf"?"\\'f1":"&ntilde;"),n=n.replace(/Ñ/g,t==="rtf"?"\\'d1":"&Ntilde;"),n=n.replace(/ó/g,t==="rtf"?"\\'f3":"&oacute;"),n=n.replace(/Ó/g,t==="rtf"?"\\'d3":"&Oacute;"),n=n.replace(/ò/g,t==="rtf"?"\\'f2":"&ograve;"),n=n.replace(/Ò/g,t==="rtf"?"\\'d2":"&Ograve;"),n=n.replace(/ô/g,t==="rtf"?"\\'f4":"&ocirc;"),n=n.replace(/Ô/g,t==="rtf"?"\\'d4":"&Ocirc;"),n=n.replace(/ö/g,t==="rtf"?"\\'f6":"&ouml;"),n=n.replace(/Ö/g,t==="rtf"?"\\'d6":"&Ouml;"),n=n.replace(/õ/g,t==="rtf"?"\\'f5":"&otilde;"),n=n.replace(/Õ/g,t==="rtf"?"\\'d5":"&Otilde;"),n=n.replace(/ø/g,t==="rtf"?"\\'f8":"&oslash;"),n=n.replace(/Ø/g,t==="rtf"?"\\'d8":"&Oslash;"),n=n.replace(/œ/g,t==="rtf"?"\\'9c":"&#339;"),n=n.replace(/Œ/g,t==="rtf"?"\\'8c":"&#338;"),n=n.replace(/ß/g,t==="rtf"?"\\'df":"&szlig;"),n=n.replace(/ú/g,t==="rtf"?"\\'fa":"&uacute;"),n=n.replace(/Ú/g,t==="rtf"?"\\'da":"&Uacute;"),n=n.replace(/ù/g,t==="rtf"?"\\'f9":"&ugrave;"),n=n.replace(/Ù/g,t==="rtf"?"\\'d9":"&Ugrave;"),n=n.replace(/û/g,t==="rtf"?"\\'fb":"&ucirc;"),n=n.replace(/Û/g,t==="rtf"?"\\'db":"&Ucirc;"),n=n.replace(/ü/g,t==="rtf"?"\\'fc":"&uuml;"),n=n.replace(/Ü/g,t==="rtf"?"\\'dc":"&Uuml;"),n=n.replace(/ý/g,t==="rtf"?"\\'fd":"&yacute;"),n=n.replace(/Ý/g,t==="rtf"?"\\'dd":"&Yacute;"),n=n.replace(/ÿ/g,t==="rtf"?"\\'ff":"&yuml;"),n=n.replace(/Ÿ/g,t==="rtf"?"\\'9f":"&#376;"),n=n.replace(/´/g,t==="rtf"?"\\'b4":"&acute;"),t!=="rtf"&&(n=n.replace(/`/g,"&#96;")),n)},isNumber:function(n){return n!==""&&!(isNaN(n)||/^0\d/.test(n))},repeat:function(n,t){if(t<1)return"";for(var i="";t>1;)t&1&&(i+=n),t>>=1,n+=n;return i+n},parse:function(n,t,i,r,u,f,e){var a,s=[],w,l,k,g,o,v,c;switch(t){case"comma":a=",";break;case"tab":a="\t";break;default:a=/\t/.test(n)?"\t":","}for(n.indexOf(a)>-1&&(w=new RegExp("^"+d.rowDelimiter+"+|"+d.rowDelimiter+"+$","g"),n=n.replace(w,"")),s=this.CSVToArray(n,a),o=s.length-1;o>=0;--o)for(l=s[o].length-1;l>=0;--l)s[o][l]=s[o][l].replace("\t","\\t"),s[o][l]=s[o][l].replace("\n","\\n"),s[o][l]=s[o][l].replace("\r","\\r");var h=[],y=[],b=s[0].length,it=s.length;if(r)h=s.splice(0,1)[0],it=s.length;else for(o=0;o<b;++o)h.push("val"+o),y.push("");for(o=h.length-1;o>=0;--o)h[o]=$.trim(h[o]),u&&(h[o]=h[o].replace(/[^\w -]|&quot;/g,""),h[o]=h[o].replace(/ +/g,"_"),/^[^a-z]/i.test(h[o])&&(h[o]="col"+h[o])),e?h[o]=h[o].toUpperCase():f&&(h[o]=h[o].toLowerCase());for(o=0,v=s.length;o<v;++o)k=s[o].length,k!==b&&this.log("Error parsing row "+o+". Wrong number of columns.");for(g=s.length,o=0,v=h.length;o<v;++o){var nt=0,tt=0,p=0;for(c=0;c<g;++c)s[c]&&(i==="comma"&&isDecimalRe.test(s[c][o])&&(s[c][o]=s[c][o].replace(",",".")),CSVParser.isNumber(s[c][o])?(++tt,(s[c][o]+"").indexOf(".")>-1&&++p):s[c][o]!==""&&++nt);y[o]=nt||!tt&&!p?"string":p===0?"int":"float"}return{dataGrid:s,headerNames:h,headerTypes:y,errors:this.getLog()}},errorLog:[],resetLog:function(){this.errorLog=[]},log:function(n){this.errorLog.push(n)},getLog:function(){var t="",n,i;if(this.errorLog.length>0){for(n=0,i=this.errorLog.length;n<i;++n)t+="!!"+this.errorLog[n]+"!!\n";t+="\n"}return t},CSVToArray:function(n,t){var u,f;t=t||",";var e=new RegExp("(\\"+t+'|\\r?\\n|\\r|^)(?:"([^"]*(?:""[^"]*)*)"|([^"\\'+t+"\\r\\n]*))","gi"),r=[[]],i=null;for(t==="\t"&&(n=n.replace(/(\t|\r?\n|\r|^)(".+?")([\t\n\r])/g,function(n,t,i,r){return t+i.replace(/\t/g,"\\t")+r}),n=n.replace(/(\t|\r?\n|\r|^)([^\t"][^\t]+)/g,function(n,t,i){return t+i.replace(/"/g,"&quot;")}));i=e.exec(n);)u=i[1],u.length&&u!==t&&r.push([]),f=i[2]?i[2].replace(/""/g,"&quot;"):i[3],r[r.length-1].push(f);return r}},DataGridRenderer,d,settings;
/*!
 * DataGridRenderer.js
 * Part of Mr-Data-Converter
 *
 * Created by Shan Carter on 2010-10-18.
 */
DataGridRenderer={asp:function(n,t,i,r,u){var o="",c=n.length,l=t.length,e,s,f,h;for(u=u||":",e=0;e<c;++e)for(s=n[e],f=0;f<l;++f)h=i[f]==="int"||i[f]==="float"?s[f]||"Empty":'"'+(s[f]||"")+'"',o+="myArray("+f+","+e+") = "+h+u;return o="Dim myArray("+(f-1)+","+(e-1)+")"+u+o,o.replace(/&quot;/g,'""')},csharp:function(n,t,i,r,u){var e="",c=n.length,s=t.length,o,h,f;for(e+="DataTable "+d.tableName+" = new DataTable();"+u,f=0;f<s;++f)e+=d.tableName+'.Columns.Add("'+t[f]+'", typeof('+(i[f]==="int"||i[f]==="float"?i[f]:"string")+"));"+u;for(o=0;o<c;++o){for(h=n[o],e+=d.tableName+".Rows.Add(",f=0;f<s;++f)e+=i[f]==="int"||i[f]==="float"?h[f]||"null":'"'+(h[f]||"")+'"',f<s-1&&(e+=", ");e+=");"+u}return e.replace(/&quot;/g,'\\"')},cfml:function(n,t,i,r,u){for(var s,f,l,e="[",h=n.length,c=t.length,o=0;o<h;++o){for(s=n[o],e+="{",f=0;f<c;++f)l=i[f]==="int"||i[f]==="float"?s[f]||'""':'"'+(s[f]||"")+'"',e+='"'+t[f]+'"='+l,f<c-1&&(e+=",");e+="}";o<h-1&&(e+=","+u)}return e+="]"+u,e.replace(/&quot;/g,'\\"')},go:function(n,t,i,r,u){var e="",c=n.length,o=t.length,s,h,f;for(e+="type rows struct{",f=0;f<o;++f)e+=t[f]+" "+(i[f]==="int"||i[f]==="float"?i[f]+"64":"string"),f<o-1&&(e+="; ");for(e+="}"+(u||";")+d.tableName+" := []rows{"+u,s=0;s<c;++s){for(h=n[s],e+=r+"{",f=0;f<o;++f)e+=i[f]==="int"||i[f]==="float"?h[f]||"nil":'"'+(h[f]||"")+'"',f<o-1&&(e+=", ");e+="},"+u}return e+="}"+u,e.replace(/&quot;/g,'\\"')},html:function(n,t,i,r,u){var f="",h=n.length,c=t.length,l=function(n){return d.includeHtmlClass?' class="cell-'+(d.headersProvided?t[n].replace(/_/g,"-").toLowerCase():"col"+(n+1))+'"':""},o,a,s,e;if(f+="<table>"+u,d.headersProvided){for(f+=r+"<thead>"+u+r+r+"<tr>"+u,e=0;e<c;++e)f+=r+r+r+"<th"+l(e)+">"+t[e].replace(/^col(\d)/,"$1")+"</th>"+u;f+=r+r+"</tr>"+u+r+"</thead>"+u}for(f+=r+"<tbody>"+u,o=0;o<h;++o){for(a=n[o],s="",o===h-1?s=d.includeHtmlClass?' class="last-row"':"":o===0&&(s=d.includeHtmlClass?' class="first-row"':""),f+=r+r+"<tr"+s+">"+u,e=0;e<c;++e)f+=r+r+r+"<td"+l(e)+">"+CSVParser.escapeText(a[e])+"</td>"+u;f+=r+r+"</tr>"+u}return f+=r+"</tbody>"+u+"</table>"+u,f.replace(/&quot;/g,'"')},jsonArrayCols:function(n,t,i,r,u){for(var o,e="{"+u,s=n.length,h=t.length,f=0;f<h;++f){for(e+=r+'"'+t[f]+'":[',o=0;o<s;++o)e+=i[f]==="int"||i[f]==="float"?n[o][f]||"null":'"'+(n[o][f]||"")+'"',o<s-1&&(e+=",");e+="]";f<h-1&&(e+=","+u)}return e+=u+"}"+u,e.replace(/&quot;/g,'\\"')},jsonArrayRows:function(n,t,i,r,u){for(var f,e="["+u,s=n.length,h=t.length,o=0;o<s;++o){for(e+=r+"[",f=0;f<h;++f)e+=i[f]==="int"||i[f]==="float"?n[o][f]||"null":'"'+(n[o][f]||"")+'"',f<h-1&&(e+=",");e+="]";o<s-1&&(e+=","+u)}return e+=u+"]"+u,e.replace(/&quot;/g,'\\"')},jsonDict:function(n,t,i,r,u){for(var o,f="{"+u,s=n.length,h=t.length,c=function(t,r){return i[r]==="int"||i[r]==="float"?n[t][r]||"null":'"'+(n[t][r]||"")+'"'},e=0;e<s;++e){if(f+=r+'"'+n[e][0]+'":',h===2)f+=c(e,1);else{for(f+="{",o=1;o<h;++o)o>1&&(f+=","),f+='"'+t[o]+'":'+c(e,o);f+="}"}e<s-1&&(f+=","+u)}return f+=u+"}"+u,f.replace(/&quot;/g,'\\"')},json:function(n,t,i,r,u){for(var s,f,l,e="[",h=n.length,c=t.length,o=0;o<h;++o){for(s=n[o],e+="{",f=0;f<c;++f)l=i[f]==="int"||i[f]==="float"?s[f]||"null":'"'+(s[f]||"")+'"',e+='"'+t[f]+'":'+l,f<c-1&&(e+=",");e+="}";o<h-1&&(e+=","+u)}return e+="]"+u,e.replace(/&quot;/g,'\\"')},luaArray:function(n,t,i,r,u){for(var s,f,l,e="{"+u,h=n.length,c=t.length,o=0;o<h;++o){for(s=n[o],e+=r+"["+(o+1)+"]={",f=0;f<c;++f)l=i[f]==="int"||i[f]==="float"?s[f]||"nil":'"'+(s[f]||"")+'"',e+='["'+t[f]+'"]='+l,f<c-1&&(e+=",");e+="}";o<h-1&&(e+=","+u)}return e+=u+"}"+u,e.replace(/&quot;/g,'\\"')},luaDict:function(n,t,i,r,u){for(var o,f="{"+u,s=n.length,h=t.length,c=function(t,r){return i[r]==="int"||i[r]==="float"?n[t][r]||"nil":'"'+(n[t][r]||"")+'"'},e=0;e<s;++e){if(f+=r+'["'+n[e][0]+'"]=',h===2)f+=c(e,1);else{for(f+="{",o=1;o<h;++o)o>1&&(f+=","),f+='["'+t[o]+'"]='+c(e,o);f+="}"}e<s-1&&(f+=","+u)}return f+=u+"}"+u,f.replace(/&quot;/g,'\\"')},markdown:function(n,t,i,r,u){var e="",l=n.length,h=t.length,o=[],s,c,f;for(e+="|",f=0;f<h;++f)e+=" "+t[f]+" |",o.push(t[f].length+2+(i[f]==="int"||i[f]==="float"?"r":""));for(e+=u+"|",f=0;f<h;++f)e+=(o[f].indexOf("r")<0?CSVParser.repeat("-",o[f]):CSVParser.repeat("-",parseInt(o[f])-1)+":")+"|";for(s=0;s<l;++s)for(c=n[s],e+=u+"|",f=0;f<h;++f)e+=" "+CSVParser.escapeText(c[f]).replace(/\|/g,"&#124;")+" |";return e+=u,e.replace(/&quot;/g,'"')},mysql:function(n,t,i,r,u){var e="",l=n.length,o=t.length,c,h,f,s;for(e+="CREATE TABLE "+d.tableName+" ("+u+r+"id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,"+u,f=0;f<o;++f)c="VARCHAR(255)",(i[f]==="int"||i[f]==="float")&&(c=i[f].toUpperCase()),e+=r+t[f]+" "+c,f<o-1&&(e+=","),e+=u;for(e+=");"+u+"INSERT INTO "+d.tableName+u+r+"(",f=0;f<o;++f)e+=t[f].replace(/\W/g,""),f<o-1&&(e+=",");for(e+=")"+u+"VALUES"+u,h=0;h<l;++h){for(e+=r+"(",f=0;f<o;++f)s=n[h][f],i[f]==="int"||i[f]==="float"||t[f].slice(-3)==="_id"?e+=s||"NULL":(s=s?s.replace(/'/g,"''"):"",e+="'"+s+"'"),f<o-1&&(e+=",");e+=")";h<l-1&&(e+=","+u)}return e+=";"+u,e.replace(/&quot;/g,'"')},perl:function(n,t,i,r,u){for(var s,f,l,e="(",h=n.length,c=t.length,o=0;o<h;++o){for(s=n[o],e+="{",f=0;f<c;++f)l=i[f]==="int"||i[f]==="float"?s[f]||"undef":'"'+(s[f]||"")+'"',e+='"'+t[f]+'"=>'+l,f<c-1&&(e+=",");e+="}";o<h-1&&(e+=","+u)}return e+=")"+u,e.replace(/&quot;/g,'\\"')},php:function(n,t,i,r,u){for(var s,f,l,e="array("+u,h=n.length,c=t.length,o=0;o<h;++o){for(s=n[o],e+=r+"array(",f=0;f<c;++f)l=i[f]==="int"||i[f]==="float"?s[f]||"NULL":'"'+(s[f]||"")+'"',e+='"'+t[f]+'"=>'+l,f<c-1&&(e+=",");e+=")";o<h-1&&(e+=","+u)}return e+=u+")"+u,e.replace(/&quot;/g,'\\"')},python:function(n,t,i,r,u){for(var s,f,l,e="[",h=n.length,c=t.length,o=0;o<h;++o){for(s=n[o],e+="{",f=0;f<c;++f)l=i[f]==="int"||i[f]==="float"?s[f]||"None":'"'+(s[f]||"")+'"',e+='"'+t[f]+'":'+l,f<c-1&&(e+=",");e+="}";o<h-1&&(e+=","+u)}return e+="]"+u,e.replace(/&quot;/g,'\\"')},rtf:function(n,t,i,r,u){var e="",l=n.length,o=t.length,h="",a=Math.round(9e3/o),s,c,f;for(e+="\\trowd\\trgaph144",f=0;f<o;++f)e+="\\clbrdrt\\brdrs\\clbrdrl\\brdrs\\clbrdrb\\brdrs\\clbrdrr\\brdrs\\cellx"+a*(f+1);for(h=e,f=0;f<o;++f)e+="\\pard\\intbl\\qc\\b{"+t[f]+"}\\cell";for(e+="\\row"+u,s=0;s<l;++s){for(c=n[s],e+=h,f=0;f<o;++f)e+="\\pard\\intbl"+(i[f]==="int"||i[f]==="float"?"\\qr":"")+"\\plain{"+CSVParser.escapeText(c[f],"rtf")+"}\\cell";e+="\\row"+u}return e.replace(/&quot;/g,'"')},ruby:function(n,t,i,r,u){for(var s,f,l,e="[",h=n.length,c=t.length,o=0;o<h;++o){for(s=n[o],e+="{",f=0;f<c;++f)l=i[f]==="int"||i[f]==="float"?s[f]||"nil":'"'+(s[f]||"")+'"',e+='"'+t[f]+'"=>'+l,f<c-1&&(e+=",");e+="}";o<h-1&&(e+=","+u)}return e+="]"+u,e.replace(/&quot;/g,'\\"')},trac:function(n,t,i,r,u){var e="",c=n.length,s=t.length,o,h,f;for(e+="||=",f=0;f<s;++f)e+=" "+t[f]+" =||",f<s-1&&(e+="=");for(o=0;o<c;++o)for(h=n[o],e+=u+"||",f=0;f<s;++f)e+=" "+CSVParser.escapeText(h[f]).replace(/\|/g,"&#124;")+(i[f]==="int"||i[f]==="float"?"":" ")+"||";return e+=u,e.replace(/&quot;/g,'"')},wiki:function(n,t,i,r,u){var e="",h=n.length,s=t.length,o,c,f;for(e+='{| class="wikitable sortable"'+u+"! ",f=0;f<s;++f)e+='scope="col" | '+t[f],f<s-1&&(e+=" || ");for(e+=u+"|-"+u,o=0;o<h;++o){for(c=n[o],e+="| ",f=0;f<s;++f)e+=(i[f]==="int"||i[f]==="float"?'style="text-align:right" | ':"")+CSVParser.escapeText(c[f]).replace(/\|/g,"&#124;"),f<s-1&&(e+=" || ");o<h-1&&(e+=u+"|-"+u)}return e+=u+"|}"+u,e.replace(/&quot;/g,'"')},xmlIllustrator:function(n,t,i,r,u){var e="",c=n.length,h=t.length,o,s,f;for(e+='<?xml version="1.0" encoding="utf-8"?>'+u+'<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20001102//EN" "http://www.w3.org/TR/2000/CR-SVG-20001102/DTD/svg-20001102.dtd" ['+u+r+'<!ENTITY ns_graphs "http://ns.adobe.com/Graphs/1.0/">'+u+r+'<!ENTITY ns_vars "http://ns.adobe.com/Variables/1.0/">'+u+r+'<!ENTITY ns_imrep "http://ns.adobe.com/ImageReplacement/1.0/">'+u+r+'<!ENTITY ns_custom "http://ns.adobe.com/GenericCustomNamespace/1.0/">'+u+r+'<!ENTITY ns_flows "http://ns.adobe.com/Flows/1.0/">'+u+r+'<!ENTITY ns_extend "http://ns.adobe.com/Extensibility/1.0/">'+u+"]>"+u+"<svg>"+u+r+'<variableSets xmlns="&ns_vars;">'+u+r+r+'<variableSet varSetName="binding1" locked="none">'+u+r+r+r+"<variables>"+u,f=0;f<h;++f)e+=r+r+r+r+'<variable varName="'+t[f]+'" trait="textcontent" category="&ns_flows;"></variable>'+u;for(e+=r+r+r+"</variables>"+u+r+r+r+'<v:sampleDataSets xmlns:v="http://ns.adobe.com/Variables/1.0/" xmlns="http://ns.adobe.com/GenericCustomNamespace/1.0/">'+u,o=0;o<c;++o){for(s=n[o],e+=r+r+r+r+'<v:sampleDataSet dataSetName="'+s[0]+'">'+u,f=0;f<h;++f)t[f]=t[f].replace(/\W/g,""),e+=r+r+r+r+r+"<"+t[f]+"><p>"+CSVParser.escapeText(s[f],"xml")+"</p></"+t[f]+">"+u;e+=r+r+r+r+"</v:sampleDataSet>"+u}return e+=r+r+r+"</v:sampleDataSets>"+u+r+r+"</variableSet>"+u+r+"</variableSets>"+u+"</svg>"+u,e.replace(/&amp;quot;/g,"&quot;")},xml:function(n,t,i,r,u){var e="",h=n.length,c=t.length,s,o,f;for(e+='<?xml version="1.0" encoding="UTF-8"?>'+u+"<rows>"+u,s=0;s<h;++s){for(o=n[s],e+=r+"<row>"+u,f=0;f<c;++f)o[f]=o[f]?CSVParser.escapeText(o[f],"xml"):"",t[f]=t[f].replace(/\W/g,""),e+=r+r+"<"+t[f]+">"+o[f]+"</"+t[f]+">"+u;e+=r+"</row>"+u}return e+="</rows>"+u,e.replace(/&amp;quot;/g,"&quot;")},xmlProperties:function(n,t,i,r,u){var f="",h=n.length,c=t.length,o,s,e;for(f+='<?xml version="1.0" encoding="UTF-8"?>'+u+"<rows>"+u,o=0;o<h;++o){for(s=n[o],f+=r+"<row ",e=0;e<c;++e)f+=t[e]+'="'+CSVParser.escapeText(s[e],"xml")+'" ';f+="/>"+u}return f+="</rows>"+u,f.replace(/&amp;quot;/g,"&quot;")},xmlSmart:function(n,t,i,r,u){var h,y,l,o,c,p,s,f,a;console.log(t);var e="",w=n.length,b=t.length,v=t[0].match(/^([\w:.-]+?)\[([\w:.-]*?)\]$/);if(v){for(h=v[1],y=v[2],e+='<?xml version="1.0" encoding="UTF-8"?>'+u+"<"+h+"s>"+u,l=0;l<w;++l){for(o=n[l],s=!1,e+=r+"<"+h+" "+(y||h+"-id")+'="'+o[0]+'">'+u,f=1;f<b;++f)o[f]=o[f]?CSVParser.escapeText(o[f],"xml"):"",a=t[f].match(/^([\w:.-]+?)\[([\w&=:;".-]+?)\]$/),a?(c=a[1],p=a[2].replace(/&quot;/g,'"'),s||(e+=r+r+"<"+c+"s>"+u,s=!0),e+=r+r+r+"<"+c+" "+p+">"+o[f]+"</"+c+">"+u):(s&&(e+=r+r+"</"+c+"s>"+u,s=!1),t[f]=t[f].replace(/[^\w:.-]/g,""),console.log(t[f]),e+=r+r+"<"+t[f]+">"+o[f]+"</"+t[f]+">"+u);s&&(e+=r+r+"</"+c+"s>"+u,s=!1);e+=r+"</"+h+">"+u}return e+="</"+h+"s>"+u,e.replace(/&amp;quot;/g,"&quot;")}return this.xml(n,t,i,r,u)},yaml:function(n,t,i,r,u){for(var s,f,o="",h=n.length,c=t.length,l=t.sort(function(n,t){return t.length-n.length})[0].length,e=0;e<h;++e)for(s=n[e],f=0;f<c;++f)o+=(f>0?"  ":"- ")+t[f]+": "+CSVParser.repeat(" ",l-t[f].length)+(s[f]||"")+u;return o.replace(/&quot;/g,'"')}};
/*!
 * Converter.js
 * Mr-Data-Converter
 *
 * Created by Shan Carter on 2010-09-01.
 */
DataConverter.prototype.init = function() {
    var n = this;
    this.inputTextArea = $("#data-input");
    this.outputTextArea = $("#data-output");
    this.dataSelector = $("#data-selector");
    this.outputNotes = $("#output-notes");
    this.templateOutputTextArea = $('#template-output');
    $("#converter > .wrapper").append('<div class="loader">  <span class="loader-text">Loading...</span>  <i class="loader-icon"></i></div>');
    this.outputTextArea.val() && (n.outputDataType = this.dataSelector.children("option:selected").val(), n.convert());
    this.inputTextArea.add(this.outputTextArea).click(function() {
        this.select()
    });
    $(".insert-sample").click(function(t) {
        t.preventDefault();
        const value = $(this).data('value');
        n.insertSampleData(value);
        n.convert();
        //ga("send", "event", "SampleData", "InsertGeneric")
    });

    this.inputTextArea.on({
        change: function() {
            n.convert();
            //ga("send", "event", "DataType", n.outputDataType)
        },
        keyup: function() {
            var t = $(this);
            t.data("wait") || (t.data("wait", !0), n.convert(), setTimeout(function() {
                t.data("wait", !1)
            }, 500))
        }
    });
    this.dataSelector.change(function() {
        n.outputDataType = $(this).val();
        n.outputDataType === "xmlSmart" ? (n.outputNotes.text("This format requires safe header names to be disabled."), $("#headersUnsafe").click()) : n.outputNotes.text("");
        n.convert();
        n.outputTextArea.select();
        saveSettings()
    });
    $(".loader").remove();
    this.node.addClass("loaded")
};
DataConverter.prototype.convert = function() {
    if (this.inputText = this.inputTextArea.val(), this.inputText.length > 0) {
        this.includeWhiteSpace ? this.newLine = "\n" : (this.indent = "", this.newLine = "");
        CSVParser.resetLog();
        var inputText = this.inputText;
        // Pull the values for these options from the HTML radios/checkboxes elements
        // this is no longer necessary and defaults could be provided, but the onclick events keep getting messed up when i remove them from the html
        /*
        var delimiter = "auto"; //this.delimiter;
        var decimal = "comma"; //this.decimal;
        var headersProvided = true; //this.headersProvided;
        var safeHeaders = false; //this.safeHeaders;
        var downcaseHeaders = false; //this.downcaseHeaders;
        var upcaseHeaders = false; //this.upcaseHeaders;
        */
        var delimiter = this.delimiter;
        var decimal = this.decimal;
        var headersProvided = this.headersProvided;
        var safeHeaders = this.safeHeaders;
        var downcaseHeaders = this.downcaseHeaders;
        var upcaseHeaders = this.upcaseHeaders;
        //console.log(delimiter, decimal, headersProvided, safeHeaders, downcaseHeaders, upcaseHeaders);
        var n = CSVParser.parse(inputText, delimiter, decimal, headersProvided, safeHeaders, downcaseHeaders, upcaseHeaders),
            t = n.dataGrid,
            i = n.headerNames,
            r = n.headerTypes,
            u = n.errors;
        this.outputText = DataGridRenderer[this.outputDataType](t, i, r, this.indent, this.newLine);
        this.outputTextArea.val(u + this.outputText);

        // TODO add onchange event handling for priceCategoriesColorsTraitsConfirmed, tagsConfirmed, collectionConfirmed, functionsConfirmed


        const jsonString = this.outputText;
        // convert to array of JSON objects with properties from formatted string
		const jsonArray = JSON.parse(jsonString);

		//console.log("renderParent about to be called with global var templateType value:", templateType);
        this.templateOutputTextArea.val(renderParent(jsonArray, templateType));
    }
};
DataConverter.prototype.insertSampleData = function(dataName) {  

	// COMMENCE RANDOM SAMPLE DATA

  	var outputString = "";
  	if (dataName == "spDuties") {
  		outputString = 
  		// ====== spDuties: num, icon, name, qty, reward ======
	    'num\ticon\tname\tqty\treward\n' +
	    '1\tFishing\tCatch fish somewhere "Valorous"\t10\t15\n' +
	    '2\tGoofy\'s Stall\tSell items.\t20\t15\n' +
	    '3\tGain Star Coins\tEarn 30,000 Star Coins.\t30K\t25';
  	}
  	else if (dataName == "spRewards") {
  		outputString = 
	    // ====== spRewards: tier, tile, name, premium, eventtokens, itemType, location, source ======
	    'tier\ttile\tname\tpremium\teventtokens\titemType\tlocation\tsource\n' +
	    '6\t6A\tSpiderweb Dress Daisy\tno\t100\tCharacter Dream Style\tstarpath - witchful\tStar Path - Witchful Thinking - 6A - T6 (100 tokens)\n' +
	    '6\t6B\tPurple Witch Robes\tyes\t50\tClothing\tstarpath - witchful\tStar Path - Witchful Thinking - 6B - T6 Premium (50 tokens)\n' +
	    '6\t6C\t610\tyes\t60\tMoonstones\tstarpath - witchful\tStar Path - Witchful Thinking - 6C - T6 Premium (60 tokens)\n' +
	    '6\t6D\tPurple Witch Purse\tyes\t30\tAccessory\tstarpath - witchful\tStar Path - Witchful Thinking - 6D - T6 Premium (30 tokens)\n' +
	    '6\t6E\tWooden Potion Cupboard\tno\t30\tFurniture\tstarpath - witchful\tStar Path - Witchful Thinking - 6E - T6 (30 tokens)\n';
  	}
  	else if (dataName == "questItems") {
  		outputString = 
	    // ====== questItems: name, description, questname, questcharacter, realmname =====
	    'name\tdescription\tquestname\tquestcharacter\tcharacterlevel\trealmname\n' +
	    'Flag Poles\tThese flag poles are needed to play Capture the Sun.\tCapture the Sun\tJoy\t\tnone';
  	}
  	else if (dataName == "meals") {
  		/*outputString = 
	    // ====== meals: name, type, stars ======
	    'name\ttype\tstars\ting1\ting2\ting3\ting4\ting5\n' +
	    'Roast\tEntrées\t1\tMeat\t\t\t\t\n' +
	    'Chowder\tEntrées\t4\tSeafood\tMilk\tPotato\tVegetables\t\n' +
	    'Grecian Baked Fish\tEntrées\t5\tStygian Mudskipper\tElysian Grain\tOlives\tSalt Crystal\tAmbrosia\n' +
	    //'Tea Sandwiches\tAppetizers\t4\thello\tim\tan\tingrident\tfive\n' +
	    'Cheshire Cat Tail\tDesserts\t4\tonly\tfour\there\tok\t\n';
	    */
	    outputString = 'collection\tversion\tversionRemoved\tname\tChecklist\tsheetOrder\tstars\tcategory\ting1\ting2\ting3\ting4\ting5'
+'\nWR\t1.20\tbiome1\tBeauty and the Beetroot Napoleons\t\t1.001\t5\tAppetizers\tRed Currants\tBeetroot\tButter\tEgg\tMilk'
+'\nWR\t1.20\tbiome1\tButtermilk Borscht\t\t1.002\t4\tAppetizers\tBeetroot\tDill\tMilk\tEgg\t'
+'\nWR\t1.20\tbiome2\tFelt Food Spread\t\t1.003\t3\tAppetizers\tButton Mushroom\tEgg\tSatinFinned Betta\t\t'
+'\nWR\t1.20\tbiome1\tScarlet Kale and Cheese Pinwheels\t\t1.004\t3\tAppetizers\tScarlet Kale\tCheese\tWheat\t\t'
+'\nWR\t1.20\tbiome1\tAlpine Fishcakes\t\t1.005\t2\tAppetizers\tDill\tAlpine Bass\t\t\t'
+'\nWR\t1.20\tbiome2\tEdible Button Stew\t\t1.006\t2\tAppetizers\tButton Mushroom\tCarrot\t\t\t'
+'\nWR\t1.20\tbiome2\tKanine Krunchies Cereal\t\t1.007\t2\tAppetizers\tPearly Barley\tPincushion Peach\t\t\t'
+'\nWR\t1.20\tbiome2\tJellied Salad\t\t1.008\t2\tAppetizers\tJelliedFish\tScarlet Kale\t\t\t'
+'\nWR\t1.20\tbiome3\tFizzy Nectar Soda\t\t1.009\t2\tAppetizers\tBonsai Starfruit\tSlush Ice\t\t\t'
+'\nWR\t1.20\tbiome3\tRosehip Honey Tea\t\t1.010\t1\tAppetizers\tCoral Honey\t\t\t\t'
+'\nWR\t1.20\tbiome2\tFishy Pineapple Jelly\t\t2.001\t5\tEntrees\tMeasuringTape Snail\tJelliedFish\tCrab\tScarlet Kale\tAny Fish'
+'\nWR\t1.20\tbiome3\tPixie Pizza\t\t2.002\t5\tEntrees\tFairy Kamut\tCheese\tTomato\tFairy Sprinkles\tButton Mushroom'
+'\nWR\t1.20\tbiome1\tSmoked Fish Charcuterie Spread\t\t2.003\t4\tEntrees\tWheat\tTuna\tMountain Whitefish\tAny Fish\t'
+'\nWR\t1.20\tbiome3\tFriendly Bento\t\t2.004\t4\tEntrees\tTigger Fish\tScarlet Kale\tCoral Honey\tAny Vegetable\t'
+'\nWR\t1.20\tbiome3\tBread Bowl Pumpkin Soup\t\t2.005\t4\tEntrees\tTigger Fish\tFairy Kamut\tPumpkin\tMilk\t'
+'\nWR\t1.20\tbiome2\tAfternoon Tea Set\t\t2.006\t4\tEntrees\tDark Chocolate Coffee Beans\tPearly Barley\tAny Vegetable\tPincushion Peach\t'
+'\nWR\t1.20\tbiome2\tStargazy Pie\t\t2.007\t4\tEntrees\tMeasuringTape Snail\tSatinFinned Betta\tAlpine Bass\tWheat\t'
+'\nWR\t1.20\tbiome2\tHorace\'s Ham Sandwich\t\t2.008\t3\tEntrees\tPearly Barley\tCheese\tAny Vegetables\t\t'
+'\nWR\t1.20\tbiome3\tHoney Glazed Carrots\t\t2.009\t3\tEntrees\tCoral Honey\tCarrot\tDill\t\t'
+'\nWR\t1.20\tbiome3\tHoney Pancakes\t\t2.010\t3\tEntrees\tCoral Honey\tWheat\tEgg\t\t'
+'\nWR\t1.20\tbiome1\tBeetiful Spaetzle\t\t2.011\t3\tEntrees\tBeetroot\tEgg\tWheat\t\t'
+'\nWR\t1.20\tbiome1\tBaked Whitefish & Roasted Beetroot\t\t2.012\t2\tEntrees\tBeetroot\tMountain Whitefish\t\t\t'
+'\nWR\t1.20\tbiome2\tJellied Fish Terrine\t\t2.013\t1\tEntrees\tJelliedFish\t\t\t\t'
+'\nWR\t1.20\tbiome1\tScarlet Bouquet Salad\t\t2.014\t1\tEntrees\tScarlet Kale\t\t\t\t'
+'\nWR\t1.20\tbiome2\tVintage Peach Trifle\t\t3.001\t5\tDesserts\tPincushion Peach\tMilk\tPearly Barley\tSugarcane\tAny Fruits'
+'\nWR\t1.20\tbiome3\tFairy Boot Cake\t\t3.002\t5\tDesserts\tFairy Kamut\tCoral Honey\tEgg\tButter\tDark Chocolate Coffee Beans'
+'\nWR\t1.20\tbiome1\tRed Currant Linzer Cookies\t\t3.003\t4\tDesserts\tRed Currants\tSugarcane\tWheat\tButter\t'
+'\nWR\t1.20\tbiome3\tFairy Ice Cream Dome Cake\t\t3.004\t4\tDesserts\tFairy Kamut\tFairy Sprinkles\tSlush Ice\tRed Currants\t'
+'\nWR\t1.20\tbiome2\t101 Teeny Tiny Dalmation Cupcakes\t\t3.005\t4\tDesserts\tDark Chocolate Coffee Beans\tEgg\tWheat\tSugarcane\t'
+'\nWR\t1.20\tbiome3\tFairy Wands\t\t3.006\t3\tDesserts\tBonsai Starfruit\tLollipop Fruit\tAny Fruit\t\t'
+'\nWR\t1.20\tbiome1\tBeet Brownie Stack\t\t3.007\t3\tDesserts\tBeetroot\tAny Sweet\tEgg\t\t'
+'\nWR\t1.20\tbiome1\tRed Currant Valley Cakes\t\t3.008\t3\tDesserts\tRed Currants\tMilk\tEgg\t\t'
+'\nWR\t1.20\tbiome2\tEton Mess\t\t3.009\t3\tDesserts\tRed Currants\tPincushion Peach\tEgg\t\t'
+'\nWR\t1.20\tbiome3\tFairy Bread\t\t3.010\t2\tDesserts\tFairy Kamut\tFairy Sprinkles\t\t\t'
+'\nWR\t1.20\tbiome3\tTigger Tails\t\t3.011\t2\tDesserts\tLollipop Fruit\tFairy Sprinkles\t\t\t'
+'\nWR\t1.20\tbiome1\tBeet Sugar Sculpture\t\t3.012\t2\tDesserts\tBeetroot\tSugarcane\t\t\t';
	    
  	}
  	else if (dataName == "ingredients") {
  		/*outputString = 
  		// ====== ingredients: name, cookingType =====
	    'name\tingtype\n' +
	    'Brussels Sprout\tVegetables\n' +
	    'Cauliflower\tSpices\n' +
	    'Green Beans\tFruit';*/

		outputString = 'collection\tversion\tversionremoved\tobtainable\tID\tsheetOrder\tname\tChecklist\tcookingType\tcollectionType\tobtainMethod\tbiome\tenergy\tsellprice'
		+'\nWR\t1.20.1\t\t\t\t\tMountain Whitefish\t\tFish\tFish\tFishing\tWishing Alps\t\t'
		/*+'\nWR\t1.20.1\t\t\t\t\tAlpine Bass\t\tFish\tFish\tFishing\tBIOME1/2\t\t'
		+'\nWR\t1.20.1\t\t\t\t\tJellied-Fish\t\tFish\tFish\tFishing\tGlamor Gulch\t\t'
		+'\nWR\t1.20.1\t\t\t\t\tSatin-Finned Betta\t\tFish\tFish\tFishing\tGlamor Gulch\t\t'
		+'\nWR\t1.20.1\t\t\t\t\tBalloon Fish\t\tFish\tFish\tFishing\tPixie Acres\t\t'
		+'\nWR\t1.20.1\t\t\t\t\tTigger Fish\t\tFish\tFish\tFishing\tPixie Acres\t\t'*/
		+'\nWR\t1.20.1\t\t\t\t\tPink Crocus\t\tFlower\tForaging > Flowers\tForaging (Pick Up)\tWishing Alps\t\t'
		/*+'\nWR\t1.20.1\t\t\t\t\tPurple Crocus\t\tFlower\tForaging > Flowers\tForaging (Pick Up)\tWishing Alps\t\t'
		+'\nWR\t1.20.1\t\t\t\t\tWhite Crocus\t\tFlower\tForaging > Flowers\tForaging (Pick Up)\tWishing Alps\t\t'
		+'\nWR\t1.20.1\t\t\t\t\tYellow Crocus\t\tFlower\tForaging > Flowers\tForaging (Pick Up)\tWishing Alps\t\t'
		+'\nWR\t1.20.1\t\t\t\t\tBlack Silk Flower\t\tFlower\tForaging > Flowers\tForaging (Pick Up)\tGlamor Gulch\t\t'
		+'\nWR\t1.20.1\t\t\t\t\tGreen Silk Flower\t\tFlower\tForaging > Flowers\tForaging (Pick Up)\tGlamor Gulch\t\t'
		+'\nWR\t1.20.1\t\t\t\t\tRed Silk Flower\t\tFlower\tForaging > Flowers\tForaging (Pick Up)\tGlamor Gulch\t\t'
		+'\nWR\t1.20.1\t\t\t\t\tSilver Silk Flower\t\tFlower\tForaging > Flowers\tForaging (Pick Up)\tGlamor Gulch\t\t'
		+'\nWR\t1.20.1\t\t\t\t\tBlue Lily of the Valley\t\tFlower\tForaging > Flowers\tForaging (Pick Up)\tPixie Acres\t\t'
		+'\nWR\t1.20.1\t\t\t\t\tPink Lily of the Valley\t\tFlower\tForaging > Flowers\tForaging (Pick Up)\tPixie Acres\t\t'
		+'\nWR\t1.20.1\t\t\t\t\tPurple Lily of the Valley\t\tFlower\tForaging > Flowers\tForaging (Pick Up)\tPixie Acres\t\t'
		+'\nWR\t1.20.1\t\t\t\t\tYellow Lily of the Valley\t\tFlower\tForaging > Flowers\tForaging (Pick Up)\tPixie Acres\t\t'*/
		+'\nWR\t1.20.1\t\t\t\t\tRed Currants\t\tFruit\tFruit\tForaging - Tree/Bush\tBIOME1/2/3\t\t'
		+'\nWR\t1.20.1\t\t\t\t\tPincushion Peach\t\tFruit\t\t\tGlamor Gulch\t\t'
		/*+'\nWR\t1.20.1\t\t\t\t\tBonsai Starfruit\t\tFruit\t\t\tPixie Acres\t\t'
		+'\nWR\t1.20.1\t\t\t\t\tLollipop Fruit\t\tFruit\t\t\tPixie Acres\t\t'
		+'\nWR\t1.20.1\t\t\t\t\tPearly Barley\t\tGrains\tGrains\tGardening\tGlamor Gulch\t\t'
		+'\nWR\t1.20.1\t\t\t\t\tFairy Kamut\t\tGrain\t\t\tPixie Acres\t\t'
		+'\nWR\t1.20.1\t\t\t\t\tSilver Ore\t\tITEMS\tGem\t\tBIOME 1/2\t\t'*/
		+'\nWR\t1.20.1\t\t\t\t\tPyrite\t\tITEMS\tGem\t\tWishing Alps\t\t'
		+'\nWR\t1.20.1\t\t\t\t\tJasper\t\tITEMS\tGem\t\tGlamor Gulch\t\t'
		+'\nWR\t1.20.1\t\t\t\t\tGrassy Ore\t\tITEMS\tGem\t\tPixie Acres\t\t'
		/*+'\nWR\t1.20.1\t\t\t\t\tHoneycomb Stone\t\tITEMS\tGem\t\tPixie Acres\t\t'
		+'\nWR\t1.20.1\t\t\t\t\tRusty Barn Hinge\t\tITEMS\t\t\tBIOME 1/2\t\t'
		+'\nWR\t1.20.1\t\t\t\t\tSnow\t\tITEMS\t\t\tBIOME 1/2\t\t'
		+'\nWR\t1.20.1\t\t\t\t\tPixie Dust\t\tITEMS\t\t\tBIOME 1/2/3\t\t'
		+'\nWR\t1.20.1\t\t\t\t\tOld Braided Rope\t\tITEMS\t\t\tBIOME 1/3\t\t'
		+'\nWR\t1.20.1\t\t\t\t\tAntique Clothes Iron\t\tITEMS\t\t\tGlamor Gulch\t\t'
		+'\nWR\t1.20.1\t\t\t\t\tBeady Soil\t\tITEMS\t\t\tGlamor Gulch\t\t'
		+'\nWR\t1.20.1\t\t\t\t\tSequin Strands\t\tITEMS\t\t\tGlamor Gulch\t\t'
		+'\nWR\t1.20.1\t\t\t\t\tWire Coat Hanger\t\tITEMS\t\t\tGlamor Gulch\t\t'
		+'\nWR\t1.20.1\t\t\t\t\tCopter Seeds\t\tITEMS\t\t\tPixie Acres\t\t'
		+'\nWR\t1.20.1\t\t\t\t\tFeather\t\tITEMS\t\t\tPixie Acres\t\t'
		+'\nWR\t1.20.1\t\t\t\t\tGiant Acorns\t\tITEMS\t\t\tPixie Acres\t\t'
		+'\nWR\t1.20.1\t\t\t\t\tHoneycomb\t\tITEMS\t\t\tPixie Acres\t\t'*/
		+'\nWR\t1.20.1\t\t\t\t\tReclaimed Barn Wood\t\tRaw Material\tForaging > Crafting Materials\tForaging (Pick Up)\tBIOME 1/2\t\t'
		/*+'\nWR\t1.20.1\t\t\t\t\tMeasuring-Tape Snail\t\tSeafood\t\t\tGlamor Gulch\t\t'
		+'\nWR\t1.20.1\t\t\t\t\tDill\t\tSpice\tSpices & Herbs\t\tBIOME1/3\t\t'
		+'\nWR\t1.20.1\t\t\t\t\tDark Chocolate Coffee Beans\t\tSweet\t\t\tBIOME2/3\t\t'
		+'\nWR\t1.20.1\t\t\t\t\tCoral Honey\t\tSweet\t\tForaging\tPixie Acres\t\t'
		+'\nWR\t1.20.1\t\t\t\t\tFairy Sprinkles\t\tSweet\t\tForaging\tPixie Acres\t\t'
		+'\nWR\t1.20.1\t\t\t\t\tBeetroot\t\tVegetable\t\t\tWishing Alps\t\t'
		+'\nWR\t1.20.1\t\t\t\t\tScarlet Kale\t\tVegetable\t\t\tBIOME1/2/3/\t\t'*/
		+'\nWR\t1.20.1\t\t\t\t\tButton Mushroom\t\tVegetable\t\t\tBIOME2/3\t\t';
  	}
  	else if (dataName == "gems") {
  		// also used for flowers
  		outputString = 
  		// ====== gems: name, biome =====
	    'name\tbiome\n' +
	    'Star Sapphire\tEverafter\n' +
	    'Red Daisy\tPlaza\n' +
	    'Shiny Garnet\tPlaza';
  	}
  	else if (dataName == "companions") {
  		//outputString = 'name\ttype\tbiome\tregion\tfavfood\tlikedfoods\nBee 1\tBee\tPixie Acres\ttba\ttba\ttba\nSkunk 2\tSkunk\tGlamour Gulch\ttba\ttba\ttba\nGoose 3\tGoose\tWishing Alps\ttba\ttba\ttba';
  		outputString = 'name\ttype\tbiome\tregion\tfavfood\tlikedfoods\tschedule\tnumFeedings'
		+'\nGoose\tGoose\tWishing Alps\t\tRed Currants\tBlueberry, Gooseberry, Raspberry, Strawberry\tMon, Wed, Fri, Sat, Sun\t1'
		+'\nTrue North Goose\tGoose\tWishing Alps\t\tRed Currants\tBlueberry, Gooseberry, Raspberry, Strawberry\tTue, Thu\t1'
		+'\nBlack Goose\tGoose\tWishing Alps\t\tRed Currants\tBlueberry, Gooseberry, Raspberry, Strawberry\tEvery day, 5am - 11am\t1'
		+'\nGolden Goose\tGoose\tWishing Alps\t\tRed Currants\tBlueberry, Gooseberry, Raspberry, Strawberry\tEvery day, 7am - 8am / 7pm - 8pm\t1'
		+'\nBlue Goose\tGoose\tWishing Alps\t\tRed Currants\tBlueberry, Gooseberry, Raspberry, Strawberry\tEvery day, 6pm - 8pm\t1'
		+'\nSkunk\tSkunk\tGlamor Gulch\t\tButton Mushroom and Pincushion Peach\tAny Fruits, Any Vegetables, Egg, Cheese\tEvery day, PM\t1'
		+'\nBrown Skunk\tSkunk\tGlamor Gulch\t\tButton Mushroom and Pincushion Peach\tAny Fruits, Any Vegetables, Egg, Cheese\tMon PM, Wed PM, Fri PM, Sun PM // PM: Mon, Wed, Fri, Sun\t2'
		+'\nWhite Skunk\tSkunk\tGlamor Gulch\t\tButton Mushroom and Pincushion Peach\tAny Fruits, Any Vegetables, Egg, Cheese\tTue PM, Thu PM, Sat PM, Sun PM // PM: Tue, Thu, Sat, Sun\t2'
		+'\nPatterned Skunk\tSkunk\tGlamor Gulch\t\tButton Mushroom and Pincushion Peach\tAny Fruits, Any Vegetables, Egg, Cheese\tEvery day, during Heavy Cloud, Heavy Rain, Light Rain or Stormy Weather\t2'
		+'\nSweet Bee\tBee\tPixie Acres\t\tCoral Honey\tAny Flowers\tEvery day, 7am - 8pm\t1'
		+'\nPink Sweet Bee\tBee\tPixie Acres\t\tCoral Honey\tAny Flowers\tWed, Fri, Sat\t2'
		+'\nBlue Sweet Bee\tBee\tPixie Acres\t\tCoral Honey\tAny Flowers\tEvery day, during Clear Skies or Light Clouds Weather\t2'
		+'\nWhite Sweet Bee\tBee\tPixie Acres\t\tCoral Honey\tAny Flowers\tEvery day from 8PM to 7AM\t2';
  	}
  	else if (dataName == "clothingFurniture") {
  		outputString = 
  		// ===== sampleItems: itemType, collection, version, versionRemoved, obtainable, ID, sheetOrder, universe, limited, speculated, Subgroup, name, category, tagsConfirmed, tags, color, traits, Checklist, verified, buyprice, MSCost, source, placement, size, W, L, functions, npcInterest, location, inStore =====
    //'itemType\tcollection\tversion\tversionRemoved\tobtainable\tID\tsheetOrder\tuniverse\tlimited\tspeculated\tSubgroup\tname\tcategory\ttagsConfirmed\ttags\tcolor\ttraits\tChecklist\tverified\tbuyprice\tMSCost\tsource\tplacement\tsize\tW\tL\tfunctions\tnpcInterest\tlocation\tinStore\n'+
	//'Furniture\tSV\t1.17.11\t\t\tnull\t22.138\tSleeping Beauty\tnull\t\t\tRustic Cottage Bed\tBeds\tTODO\tRustic, Bedroom\tbrown, purple\tSimple, Calm, Strong, Wondrous\tFALSE\t2025.07.25 - 2a (TT to 07.27)\t4600\t\tStore\tdefault\t4x6\t4\t6\tSit\tnull\tSize 2\tSV';

//'itemType\tcollection\tversion\tversionRemoved\tobtainable\tID\tsheetOrder\tuniverse\tlimited\tspeculated\tSubgroup\tname\tcategory\ttagsConfirmed\ttags\tcolor\ttraits\tChecklist\tverified\tbuyprice\tMSCost\tsource\tplacement\tsize\tW\tL\tfunctions\tnpcInterest\tlocation\tinStore\t\nClothing\tDV\t1.14.3\t\t--\t50500144\t13.430\tGeneral\t\t\t\tFairy Haircut\t\t\t\t\t\tTRUE\t2024.12.05 - 1c\t\t\tStar Path - Frost & Fairies - 2E - T2 Premium (30 tokens)\t\t\t\t\t\t\tstarpath - frost\t\t\nClothing\t--\t1.11\t\t\t110800021\t19.523\tnone (Mulan)\tLimited Time\t\t\tOrnate Hand Fan\tAccessory\t\t\t\t\tTRUE\t2024.06.26 - 17\t10 tokens\t\tStar Path - Majesty and Magnolias - 2C - T2 (10 tokens)\t\t\t\t\t\t\tstarpath - majesty\t\t\nClothing\tDV\t1.11\t\t\t50500124\t19.508\tMulan\tPremium Limited Time\t\tu12 za71 Premium Limited Time <-- hair zzq 70\tBlooming Lotus Updo\tHair\t\t\t\t\tTRUE\t2024.06.27 - 5\t10 tokens\t\tStar Path - Majesty and Magnolias - 5C - T5 Premium (10 tokens)\t\t\t\t\t\t\tstarpath - majesty\t\t\nClothing\t--\t1.12\t\t\t\t27.026\tNone (The Princess and the Frog)\t\t\t\tDapper Green Umbrella\t\t\t\t\t\tTRUE\t2024.08.22 - 12\t40 Tokens\t\tStar Path - Dapper Delights - 5G - T5 (40 tokens)\t\t\t\t\t\t\tstarpath - dapper\t\t\nClothing\t--\t1.14.3\t\t\t110800027\t13.543\tNone - Accessory\t\t\t\tHandheld Plushie\t\t\t\t\t\tFALSE\t\t1000 M\t1000\tPremium Bundle - Handheld Plushie (1000 M)\t\t\t\t\t\t\tpremium\t\t\nClothing\t--\t1.15\t\t\t\t13.558\tAccessory\t\t\t\tWicker Bag with Genie Charm\t\t\t\t\t\tTRUE\t2025.02.27 - 1j\t40 tokens\t\tStar Path - Oasis Retreat - 3B - T3 Premium (40 tokens)\t\t\t\t\t\t\tstarpath - oasis\t\t';

"itemType\tcollection\tversion\tversionRemoved\tobtainable\tID\tsheetOrder\tuniverse\tlimited\tspeculated\tSubgroup\tname\tcategory\ttagsConfirmed\ttags\tcolor\ttraits\tChecklist\tverified\tbuyprice\tMSCost\tsource\tplacement\tsize\tW\tL\tfunctions\tnpcInterest\tlocation\tinStore\t"
+"\nFurniture\tEI\t1.8\t1.9 bug, back 1.10\t--\t40002073\t1.218\tAncient Civilization\t\t\tac - market stall\tSmall Blue Market Stall\tMisc.\t\t\tblue, brown\tLavish, Calm, Strong, Wondrous\tTRUE\t2024.03.12\tn/a\t\tCrafting\tdefault (outdoor)\t8x6\t8\t6\tTable - 4x4\t\tcrafting\t\t"
//+"\nFurniture\tDV\t1.17\t\t\t\t20.0767\tOther\t\t\t\tSizzling BBQ Cooking Station\tEssentials, Utilities\t\tRustic, Outdoors\tred, brown\tSimple, Playful, Strong, Familiar\tTRUE\t2025.07.01 - 1z\tn/a\t\tCrafting -- Summer Sizzle (End of Summer)\tdefault\t2x2\t2\t2\tCooking Station\t\tcrafting\t\t"
//+"\nFurniture\tDV\t1.19\t\t\t\t20.0432\tOther\t\t\t\tIcy Counter\tDecor\t\t\tblue\tLavish, Calm, Strong, Wondrous\tFALSE\t2025.10.05 - 1f\t-\t\tCrafting after Cogsworth Level 4 (On Her Majesty's Festive Service)\t\t8x4\t8\t4\t-- (no table)\t\tquest/crafting\t\t"

/*
// doesnt work....?
'itemType\tcollection\tversion\tversionRemoved\tobtainable\tID\tsheetOrder\tuniverse\tlimited\tspeculated\tSubgroup\tname\tcategory\ttagsConfirmed\ttags\tcolor\ttraits\tChecklist\tverified\tbuyprice\tMSCost\tsource\tplacement\tsize\tW\tL\tfunctions\tnpcInterest\tlocation\tinStore\t' +
'Clothing\tDV\t1.14.3\t\t--\t50500144\t13.430\tGeneral\t\t\t\tFairy Haircut\t\t\t\t\t\tTRUE\t2024.12.05 - 1c\t\t\tStar Path - Frost & Fairies - 2E - T2 Premium (30 tokens)\t\t\t\t\t\t\tstarpath - frost\t\t';
'Clothing\t--\t1.11\t\t\t110800021\t19.523\tnone (Mulan)\tLimited Time\t\t\tOrnate Hand Fan\tAccessory\t\t\t\t\tTRUE\t2024.06.26 - 17\t10 tokens\t\tStar Path - Majesty and Magnolias - 2C - T2 (10 tokens)\t\t\t\t\t\t\tstarpath - majesty\t\t' +
'Clothing\tDV\t1.11\t\t\t50500124\t19.508\tMulan\tPremium Limited Time\t\tu12 za71 Premium Limited Time <-- hair zzq 70\tBlooming Lotus Updo\tHair\t\t\t\t\tTRUE\t2024.06.27 - 5\t10 tokens\t\tStar Path - Majesty and Magnolias - 5C - T5 Premium (10 tokens)\t\t\t\t\t\t\tstarpath - majesty\t\t' +
'Clothing\t--\t1.12\t\t\t\t27.026\tNone (The Princess and the Frog)\t\t\t\tDapper Green Umbrella\t\t\t\t\t\tTRUE\t2024.08.22 - 12\t40 Tokens\t\tStar Path - Dapper Delights - 5G - T5 (40 tokens)\t\t\t\t\t\t\tstarpath - dapper\t\t' +
'Clothing\t--\t1.14.3\t\t\t110800027\t13.543\tNone - Accessory\t\t\t\tHandheld Plushie\t\t\t\t\t\tFALSE\t\t1000 M\t1000\tPremium Bundle - Handheld Plushie (1000 M)\t\t\t\t\t\t\tpremium\t\t' +
'Clothing\t--\t1.15\t\t\t\t13.558\tAccessory\t\t\t\tWicker Bag with Genie Charm\t\t\t\t\t\tTRUE\t2025.02.27 - 1j\t40 tokens\t\tStar Path - Oasis Retreat - 3B - T3 Premium (40 tokens)\t\t\t\t\t\t\tstarpath - oasis\t\t' ;
 */
/*+'\nFurniture\tSV\t1.14.1\t\tx\t40003469\t20.0201\tOther\t\t\t\tBright Hanging Glass Orbs\tDecor, Ceiling\tyes - added\tRustic, Elegant, Living Room, Rec Room, Dining Room\tblue, green, red\tLavish, Playful, Delicate, Wondrous\tFALSE\t2024.12.05 - 1i\t5000\t\tStore\tceiling (indoor)\t5x5\t10\t10\tLighting (Automatic)\t\tSize 2\tSV\t'
+'\nFurniture\tEI\t1.14.1\t\tx\t40003638\t20.0243\tOther\t\t\t\tClay Cooking Stove\tEssentials, Appliance\ttodo\tRustic, Traditional, Kitchen, Outdoors\tbrown\tLavish, Calm, Delicate, Wondrous\tFALSE\t2024.12.09 - 1j\t7360\t\tStore\tdefault\t2x2\t4\t4\tCooking Station (Use)\t\tSize 4\tx\t'

+'\nFurniture\tDV\t1.3\t1.9, back 1.10\tx\t40001084\t20.1016\tOther\t\t\tlamppost - wooden\tWooden Lamppost with Blue Light\tDecor, Lighting\t\t\tblue, black, brown, gray\tSimple, Calm, Strong, Wondrous\tFALSE\t2023.02.21\tn/a\t\tCrafting\tdefault\t2x1 (not full) (1 empty)\t4\t2\tLight (Interact)\t\tcrafting\t\t';

*/
outputString ='itemType\tcollection\tversion\tversionRemoved\tname\tobtainable\tChecklist\tsheetOrder\trecipeCategory\ting1\ting1qty\ting2\ting2qty\ting3\ting3qty\ting4\ting4qty\ting5\t"ing5qty"\ting6\ting6qty\tlocation\tuniverse'
+'\nFurniture\tSV\t1.14.1\t\tOrange Bind Armchair\t\tFALSE\t1.000\tFurniture\tPetrified Wood\t10\tMoss\t2\tPine Cone\t5\tOlive Green Tale Cone Flower\t2\t\t\t\t\tcrafting\t'
+'\nFurniture\tSV\t1.14.1\t\tBlue Bird Snippet\t\tFALSE\t1.001\tRefined Materials\tWhite Bird Snippet\t1\t\t\t\t\t\t\t\t\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tAlpine Cuckoo Clock\t\t\t2.003\tFurniture\tPyrite\t1\tDry Wood\t2\tYellow Crocus\t1\tWhite Crocus\t1\t\t\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tAlpine Dining Chair\t\t\t2.004\tFurniture\tReclaimed Barn Wood\t2\tRusty Barn Hinge\t1\tYellow Crocus\t1\tPurple Crocus\t1\t\t\t\t\tcrafting\t'
/*+'\nFurniture\tWR\t1.20.1\t\tCheckered Fashion-Show Runway\t\t\t2.019\tFurniture\tBlack Silk Flower\t5\tSilver Silk Flower\t5\t\t\t\t\t\t\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tClassic Farm Fence\t\t\t2.020\tFurniture\tDry Wood\t1\tPink Crocus\t1\tWhite Crocus\t1\t\t\t\t\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tCozy Alpine Rocking Chair\t\t\t2.021\tFurniture\tReclaimed Barn Wood\t2\tRusty Barn Hinge\t1\tPink Crocus\t1\tPurple Crocus\t1\t\t\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tFarmhouse Water Trough\t\t\t2.033\tFurniture\tReclaimed Barn Wood\t2\tSnow\t1\tPink Crocus\t1\tPurple Crocus\t1\t\t\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tHeart-Shaped Planter\t\t\t2.049\tFurniture\tOld Braided Rope\t1\tDry Wood\t2\tPink Crocus\t1\tWhite Crocus\t1\t\t\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tOutdoor Silver Fire Pit\t\t\t2.064\tFurniture\tPyrite\t2\tPebbles\t5\tSilver Ore\t3\t\t\t\t\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tPainted Alpine Dinner Table\t\t\t2.066\tFurniture\tReclaimed Barn Wood\t4\tRusty Barn Hinge\t2\tPink Crocus\t2\tPurple Crocus\t2\t\t\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tPainted Farm Gate\t\t\t2.067\tFurniture\tDry Wood\t1\tPink Crocus\t1\tWhite Crocus\t1\tRusty Barn Hinge\t1\t\t\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tPink Pyrite Wood Stove\t\t\t2.071\tFurniture\tPyrite\t2\tReclaimed Barn Wood\t4\tPurple Crocus\t2\tPink Crocus\t2\t\t\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tRectangular Straw Bale\t\t\t2.082\tFurniture\tOld Braided Rope\t5\tWheat\t5\t\t\t\t\t\t\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tRound Snowy Straw Bale\t\t\t2.085\tFurniture\tOld Braided Rope\t4\tWheat\t4\tSnow\t2\t\t\t\t\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tRound Snowy Straw Bales\t\t\t2.086\tFurniture\tOld Braided Rope\t4\tWheat\t4\tSnow\t2\t\t\t\t\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tRound Straw Bale\t\t\t2.087\tFurniture\tOld Braided Rope\t5\tWheat\t5\t\t\t\t\t\t\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tRound Straw Bales\t\t\t2.088\tFurniture\tOld Braided Rope\t5\tWheat\t5\t\t\t\t\t\t\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tRustic Log Fence\t\t\t2.089\tFurniture\tReclaimed Barn Wood\t1\tRusty Barn Hinge\t2\t\t\t\t\t\t\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tRustic Log Gate\t\t\t2.090\tFurniture\tReclaimed Barn Wood\t1\tRusty Barn Hinge\t2\t\t\t\t\t\t\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tSnowy Classic Farm Fence\t\t\t2.103\tFurniture\tDry Wood\t1\tPink Crocus\t1\tWhite Crocus\t1\tSnow\t1\t\t\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tSnowy Rectangular Straw Bale\t\t\t2.104\tFurniture\tOld Braided Rope\t4\tWheat\t4\tSnow\t2\t\t\t\t\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tSnowy Rustic Log Fence\t\t\t2.105\tFurniture\tReclaimed Barn Wood\t1\tRusty Barn Hinge\t2\tSnow\t1\t\t\t\t\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tTack Rack\t\t\t2.108\tFurniture\tOld Braided Rope\t2\tRusty Barn Hinge\t1\tPink Crocus\t1\tWhite Crocus\t1\t\t\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\t60s Era TV Set\t\t\t2.001\tFurniture\tGlass\t2\tWire Coat Hanger\t4\tAntique Clothes Iron\t2\tJasper\t2\t\t\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tAcorn Drums\t\t\t2.002\tFurniture\tGiant Acorns\t4\tBalloon Fish\t4\tGrassy Ore\t2\t\t\t\t\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tArtful Roots Arch\t\t\t2.011\tFurniture\tGrassy Ore\t6\tSoil\t6\tHardwood\t6\tHoneycomb\t2\t\t\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tBlack Glass Mod Coffee Table\t\t\t2.013\tFurniture\tGlass\t8\tAntique Clothes Iron\t2\t\t\t\t\t\t\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tBlack Leaf Sculpture\t\t\t2.014\tFurniture\tBeady Soil\t2\tStone\t1\tBlack Silk Flower\t1\tJasper\t1\t\t\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tBlack Metal Barrier\t\t\t2.015\tFurniture\tStone\t1\tBeady Soil\t1\tWire Coat Hanger\t1\t\t\t\t\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tBlue Birthday Candle Lamppost\t\t\t2.016\tFurniture\tHoneycomb Stone\t1\tBlue Lily of the Valley\t3\tClay\t1\t\t\t\t\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tBlue Heffalump Hot Air Balloon\t\t\t2.017\tFurniture\tBalloon Fish\t8\tFeather\t8\tPurple Lily of the Valley\t4\t\t\t\t\t\t\tcrafting\tWinnie the Pooh'
+'\nFurniture\tWR\t1.20.1\t\tCast Iron Greyhound Sculpture\t\t\t2.018\tFurniture\tBeady Soil\t4\tAntique Clothes Iron\t4\tJasper\t2\t\t\t\t\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tDark Deco Mirror\t\t\t2.022\tFurniture\tGlass\t6\tAntique Clothes Iron\t2\tSequin Strands\t2\t\t\t\t\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tFeathered Fence\t\t\t2.034\tFurniture\tFeather\t2\tGiant Acorns\t1\t\t\t\t\t\t\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tFloral Bench Swing\t\t\t2.036\tFurniture\tGrassy Ore\t4\tPink Lily of the Valley\t3\tPurple Lily of the Valley\t3\tHardwood\t10\t\t\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tFloral Fairy Bench\t\t\t2.037\tFurniture\tGrassy Ore\t3\tGiant Acorns\t2\t\t\t\t\t\t\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tFloral Fairy Chair\t\t\t2.038\tFurniture\tGrassy Ore\t2\tGiant Acorns\t2\tSoil\t1\t\t\t\t\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tFloral Fairy Table\t\t\t2.039\tFurniture\tGrassy Ore\t4\tGiant Acorns\t4\tSoil\t2\t\t\t\t\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tFlowering Wood Fencing\t\t\t2.040\tFurniture\tGiant Acorns\t1\tGrassy Ore\t1\tGlass\t1\t\t\t\t\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tGiant Feather Carpet\t\t\t2.042\tFurniture\tFeather\t12\tHardwood\t8\t\t\t\t\t\t\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tGiant Galosh Planter\t\t\t2.043\tFurniture\tBalloon Fish\t6\tBlue Lily of the Valley\t2\tYellow Lily of the Valley\t2\t\t\t\t\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tGothic Bench\t\t\t2.044\tFurniture\tAntique Clothes Iron\t2\tSequin Strands\t1\tRed Silk Flower\t1\tBeady Soil\t1\t\t\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tGothic Patio Chairs\t\t\t2.045\tFurniture\tAntique Clothes Iron\t2\tSequin Strands\t1\tRed Silk Flower\t1\tBeady Soil\t1\t\t\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tGreen Heffalump Hot Air Balloon\t\t\t2.047\tFurniture\tBalloon Fish\t8\tFeather\t8\tBlue Lily of the Valley\t4\t\t\t\t\t\t\tcrafting\tWinnie the Pooh'
+'\nFurniture\tWR\t1.20.1\t\tGreen Leaf Sculpture\t\t\t2.048\tFurniture\tBeady Soil\t2\tStone\t1\tGreen Silk Flower\t1\tJasper\t1\t\t\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tHoneycomb Picnic Table\t\t\t2.050\tFurniture\tClay\t4\tHardwood\t4\tHoneycomb Stone\t2\t\t\t\t\t\t\tcrafting\tWinnie the Pooh'
+'\nFurniture\tWR\t1.20.1\t\tHoneycomb Side Table\t\t\t2.051\tFurniture\tClay\t2\tHardwood\t2\tHoneycomb Stone\t1\t\t\t\t\t\t\tcrafting\tWinnie the Pooh'
+'\nFurniture\tWR\t1.20.1\t\tIron Dress Form\t\t\t2.053\tFurniture\tAntique Clothes Iron\t4\tBeady Soil\t4\tRed Silk Flower\t2\t\t\t\t\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tLeafy Canoe\t\t\t2.054\tFurniture\tCopter Seeds\t5\tGiant Acorns\t5\tHardwood\t10\t\t\t\t\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tMagnifying Glass Post\t\t\t2.056\tFurniture\tGlass\t4\tHoneycomb\t1\t\t\t\t\t\t\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tMatchbox Bed\t\t\t2.057\tFurniture\tFeather\t5\tGrassy Ore\t2\tCopter Seeds\t3\t\t\t\t\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tMod Red Settee\t\t\t2.058\tFurniture\tSequin Strands\t3\tAntique Clothes Iron\t3\tWire Coat Hanger\t2\tRed Silk Flower\t2\t\t\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tMonochrome Gate\t\t\t2.059\tFurniture\tStone\t1\tBeady Soil\t1\tWire Coat Hanger\t1\t\t\t\t\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tMossy Spiral Pillar\t\t\t2.060\tFurniture\tCopter Seeds\t7\tGiant Acorns\t2\tHoneycomb\t1\t\t\t\t\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tNestling Bed\t\t\t2.061\tFurniture\tFeather\t6\tHardwood\t4\t\t\t\t\t\t\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tOrange Heffalump Hot Air Balloon\t\t\t2.062\tFurniture\tBalloon Fish\t8\tFeather\t8\tYellow Lily of the Valley\t4\t\t\t\t\t\t\tcrafting\tWinnie the Pooh'
+'\nFurniture\tWR\t1.20.1\t\tOutdoor Runway Lights\t\t\t2.063\tFurniture\tGlass\t2\tJapser\t1\tBeady Soil\t2\t\t\t\t\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tOversized Umbrella\t\t\t2.065\tFurniture\tSequin Strands\t8\tAntique Clothes Iron\t4\tBlack Silk Flower\t4\tSilver Silk Flower\t4\t\t\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tPink Birthday Candle Lamppost\t\t\t2.069\tFurniture\tHoneycomb Stone\t1\tPink Lily of the Valley\t3\tClay\t1\t\t\t\t\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tPink Heffalump Hot Air Balloon\t\t\t2.070\tFurniture\tBalloon Fish\t8\tFeather\t8\tPink Lily of the Valley\t4\t\t\t\t\t\t\tcrafting\tWinnie the Pooh'
+'\nFurniture\tWR\t1.20.1\t\tPurple Birthday Candle Lamppost\t\t\t2.080\tFurniture\tHoneycomb Stone\t1\tPurple Lily of the Valley\t3\tClay\t1\t\t\t\t\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tRed Leaf Sculptures\t\t\t2.083\tFurniture\tBeady Soil\t2\tStone\t1\tRed Silk Flower\t1\tJasper\t1\t\t\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tSilk Settee Black\t\t\t2.092\tFurniture\tSequin Strands\t3\tAntique Clothes Iron\t3\tWire Coat Hanger\t2\tSilver Silk Flower\t2\t\t\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tSilk Settee Green\t\t\t2.093\tFurniture\tSequin Strands\t3\tAntique Clothes Iron\t3\tWire Coat Hanger\t2\tGreen Silk Flower\t2\t\t\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tSilk Settee Silver/White\t\t\t2.094\tFurniture\tSequin Strands\t3\tAntique Clothes Iron\t3\tWire Coat Hanger\t2\tBlack Silk Flower\t2\t\t\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tSilver Leaf Sculpture\t\t\t2.095\tFurniture\tBeady Soil\t2\tStone\t1\tSilver Silk Flower\t1\tJasper\t1\t\t\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tVintage Lamppost\t\t\t2.109\tFurniture\tGlass\t2\tJapser\t1\tBeady Soil\t1\tWire Coat Hanger\t1\t\t\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tYellow Birthday Candle Lamppost\t\t\t2.115\tFurniture\tHoneycomb Stone\t1\tYellow Lily of the Valley\t3\tClay\t1\t\t\t\t\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tGothic Patio Table\t\t\t2.046\tFurniture\tAntique Clothes Iron\t3\tSequin Strands\t2\tRed Silk Flower\t1\tBeady Soil\t2\tGlass\t2\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tPixie Acres Awning\t\t\t2.072\tFurniture\tPixie Dust\t15\tPurple Lily of the Valley\t5\tPink Lily of the Valley\t5\tCopter Seeds\t10\tGrassy Ore\t15\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tPixie Acres Market Building\t\t\t2.073\tFurniture\tPixie Dust\t15\tBlue Lily of the Valley\t5\tYellow Lily of the Valley\t5\tCopter Seeds\t10\tGrassy Ore\t15\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tPixie Acres Mossy Building\t\t\t2.074\tFurniture\tPixie Dust\t15\tPink Lily of the Valley\t5\tPurple Lily of the Valley\t5\tCopter Seeds\t10\tGrassy Ore\t15\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tPixie Acres Shelter Building\t\t\t2.075\tFurniture\tPixie Dust\t15\tYellow Lily of the Valley\t5\tPink Lily of the Valley\t5\tCopter Seeds\t10\tGrassy Ore\t15\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tPixie Acres Short Building\t\t\t2.076\tFurniture\tPixie Dust\t15\tPurple Lily of the Valley\t5\tPink Lily of the Valley\t5\tCopter Seeds\t10\tGrassy Ore\t15\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tPixie Acres Tall Building\t\t\t2.077\tFurniture\tPixie Dust\t15\tYellow Lily of the Valley\t5\tBlue Lily of the Valley\t5\tCopter Seeds\t10\tGrassy Ore\t15\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tDe Vil Manor Corner\t\t\t2.023\tFurniture\tPixie Dust\t15\tStone\t15\tSequin Strands\t10\tSilver Silk Flower\t5\tGreen Silk Flower\t10\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tDe Vil Manor Corner Storehouse\t\t\t2.024\tFurniture\tPixie Dust\t15\tStone\t15\tSequin Strands\t10\tRed Silk Flower\t5\tGreen Silk Flower\t10\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tDe Vil Manor Small Entry\t\t\t2.026\tFurniture\tPixie Dust\t15\tStone\t15\tSequin Strands\t10\tBlack Silk Flower\t5\tGreen Silk Flower\t10\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tRack of Fabric Rolls\t\t\t2.081\tFurniture\tSequin Strands\t4\tBlack Silk Flower\t4\tRed Silk Flower\t4\tSilver Silk Flower\t4\tGreen Silk Flower\t4\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tShear Topiary\t\t\t2.091\tFurniture\tBeady Soil\t6\tStone\t5\tBlack Silk Flower\t3\tRed Silk Flower\t3\tGreen Silk Flower\t3\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tVintage Sewing Machine\t\t\t2.110\tFurniture\tSequin Strands\t6\tAntique Clothes Iron\t6\tWire Coat Hanger\t4\tRed Silk Flower\t2\tGreen Silk Flower\t2\t\t\tcrafting\t'
+'\nBlueprints\tWR\t1.20.1\t\tPixie Acres Waterslide\t\t\t3.007\tBlueprints\tPixie Dust\t20\tYellow Lily of the Valley\t15\tGreen Silk Flower\t10\tPurple Crocus\t10\tHoneycomb Stone\t5\t\t\tcrafting\t'
+'\nBlueprints\tWR\t1.20.1\t\tPixie Acres Terrarium\t\t\t3.008\tBlueprints\tPixie Dust\t20\tGrassy Ore\t15\tCopter Seeds\t10\tBalloon Fish\t10\tHoneycomb Stone\t5\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tRed Phone Booth\t\t\t2.084\tFurniture\tGlass\t10\tBeady Soil\t2\tAntique Clothes Iron\t5\tRed Silk Flower\t2\tJasper\t1\t\t\tcrafting\t'
+'\nBlueprints\tWR\t1.20.1\t\tCast Iron Green House\t\t\t3.004\tBlueprints\tPixie Dust\t20\tRusty Barn Hinge\t10\tWire Coat Hanger\t15\tGreen Silk Flower\t5\tJasper\t5\t\t\tcrafting\t'
+'\nBlueprints\tWR\t1.20.1\t\tGlamor Gulch Bell Tower\t\t\t3.005\tBlueprints\tPixie Dust\t20\tAntique Clothes Iron\t10\tSequin Strands\t10\tBeady Soil\t10\tJasper\t5\t\t\tcrafting\t'
+'\nBlueprints\tWR\t1.20.1\t\tGlamor Gulch Archway\t\t\t3.006\tBlueprints\tPixie Dust\t15\tPyrite\t2\tReclaimed Barn Wood\t10\tBlack Silk Flower\t5\tJasper\t3\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tSnowy Alpine Corner - Short\t\t\t2.097\tFurniture\tPixie Dust\t15\tDry Wood\t10\tSilver Ore\t15\tRusty Barn Hinge\t5\tOld Braided Rope\t5\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tAlpine Floral Arch\t\t\t2.006\tFurniture\tDry Wood\t4\tWhite Crocus\t4\tYellow Crocus\t4\tPurple Crocus\t4\tPink Crocus\t4\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tFairy Pipe Organ\t\t\t2.031\tFurniture\tGiant Acorns\t6\tHardwood\t4\tGrassy Ore\t4\tBlue Lily of the Valley\t4\tPink Lily of the Valley\t2\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tFlowery Alpine Rug\t\t\t2.041\tFurniture\tOld Braided Rope\t2\tPink Crocus\t2\tYellow Crocus\t2\tWhite Crocus\t2\tPurple Crocus\t2\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tSnowy Alpine Corner - Tall\t\t\t2.098\tFurniture\tPixie Dust\t15\tDry Wood\t10\tSilver Ore\t15\tYellow Crocus\t5\tPurple Crocus\t5\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tSnowy Alpine Half Arch with Fence\t\t\t2.100\tFurniture\tPixie Dust\t15\tReclaimed Barn Wood\t10\tSilver Ore\t15\tPink Crocus\t5\tPurple Crocus\t5\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tSnowy Alpine Town Arch\t\t\t2.102\tFurniture\tPixie Dust\t15\tDry Wood\t10\tSilver Ore\t15\tWhite Crocus\t5\tPurple Crocus\t5\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tStony Alpine Fireplace\t\t\t2.106\tFurniture\tPyrite\t2\tPebbles\t10\tReclaimed Barn Wood\t4\tWhite Crocus\t2\tPurple Crocus\t2\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tFairy Harp\t\t\t2.030\tFurniture\tGiant Acorns\t6\tHardwood\t4\tGrassy Ore\t4\tBlue Lily of the Valley\t4\tPurple Lily of the Valley\t2\t\t\tcrafting\t'
+'\nBlueprints\tWR\t1.20.1\t\tWishblossom Welcome Gate\t\t\t3.001\tBlueprints\tPixie Dust\t20\tSilver Ore\t15\tOld Braided Rope\t10\tReclaimed Barn Wood\t10\tPyrite\t5\t\t\tcrafting\t'
+'\nBlueprints\tWR\t1.20.1\t\tWishblossom Ranch Windmill\t\t\t3.003\tBlueprints\tPixie Dust\t20\tSilver Ore\t15\tRusty Barn Hinge\t10\tReclaimed Barn Wood\t10\tPyrite\t5\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tAlpine Lamp Post Pink\t\t\t2.007\tFurniture\tPyrite\t1\tStone\t1\tPink Crocus\t1\tSilver Ore\t1\tReclaimed Barn Wood\t1\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tAlpine Lamp Post Purple\t\t\t2.008\tFurniture\tPyrite\t1\tStone\t1\tPurple Crocus\t1\tSilver Ore\t1\tReclaimed Barn Wood\t1\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tAlpine Lamp Post White\t\t\t2.009\tFurniture\tPyrite\t1\tStone\t1\tWhite Crocus\t1\tSilver Ore\t1\tReclaimed Barn Wood\t1\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tAlpine Lamp Post Yellow\t\t\t2.010\tFurniture\tPyrite\t1\tStone\t1\tYellow Crocus\t1\tSilver Ore\t1\tReclaimed Barn Wood\t1\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tPink Alpine Lamppost\t\t\t2.068\tFurniture\tPyrite\t1\tSnow\t1\tPink Crocus\t1\tSilver Ore\t1\tReclaimed Barn Wood\t1\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tPurple Alpine Lamppost\t\t\t2.079\tFurniture\tPyrite\t1\tSnow\t1\tPurple Crocus\t1\tSilver Ore\t1\tReclaimed Barn Wood\t1\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tWhite Alpine Lamppost\t\t\t2.112\tFurniture\tPyrite\t1\tSnow\t1\tWhite Crocus\t1\tSilver Ore\t1\tReclaimed Barn Wood\t1\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tYellow Alpine Lamppost\t\t\t2.114\tFurniture\tPyrite\t1\tSnow\t1\tYellow Crocus\t1\tSilver Ore\t1\tReclaimed Barn Wood\t1\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tDe Vil Solarium\t\t\t2.028\tFurniture\tPixie Dust\t15\tAntique Clothes Iron\t15\tSequin Strands\t10\tBlack Silk Flower\t5\tRed Silk Flower\t10\t\t\tcrafting\t'
+'\nBlueprints\tWR\t1.20.1\t\tWishblossom Water Tower\t\t\t3.002\tBlueprints\tPixie Dust\t5\tPebbles\t5\tReclaimed Barn Wood\t5\tOld Braided Rope\t3\tSilver Ore\t5\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tBicycle Coffee bar\t\t\t2.012\tFurniture\tSequin Strands\t4\tAntique Clothes Iron\t6\tWire Coat Hanger\t6\tBlack Silk Flower\t2\tSilver Silk Flower\t2\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tDe Vil Manor Entry\t\t\t2.025\tFurniture\tPixie Dust\t15\tAntique Clothes Iron\t15\tSequin Strands\t10\tBlack Silk Flower\t5\tSilver Silk Flower\t10\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tDe Vil Manor Wing\t\t\t2.027\tFurniture\tPixie Dust\t15\tAntique Clothes Iron\t15\tSequin Strands\t10\tRed Silk Flower\t5\tSilver Silk Flower\t10\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tFitting Room Screen\t\t\t2.035\tFurniture\tSequin Strands\t2\tWire Coat Hanger\t2\tBlack Silk Flower\t2\tRed Silk Flower\t2\tSilver Silk Flower\t2\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tWrought Iron Flower Trellises\t\t\t2.113\tFurniture\tBeady Soil\t4\tWire Coat Hanger\t4\tBlack Silk Flower\t4\tRed Silk Flower\t4\tSilver Silk Flower\t4\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tAlpine Farmhouse Sink\t\t\t2.005\tFurniture\tRusty Barn Hinge\t2\tReclaimed Barn Wood\t2\tSilver Ore\t2\tYellow Crocus\t2\tWhite Crocus\t2\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tDecorative Horse Feeder\t\t\t2.029\tFurniture\tReclaimed Barn Wood\t5\tWheat\t5\tSnow\t2\tPink Crocus\t4\tWhite Crocus\t4\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tSnowy Alpine Tower\t\t\t2.101\tFurniture\tPixie Dust\t15\tReclaimed Barn Wood\t10\tSilver Ore\t15\tPink Crocus\t5\tWhite Crocus\t5\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tFarmhouse Pantry Wall\t\t\t2.032\tFurniture\tRusty Barn Hinge\t4\tDry Wood\t4\tSilver Ore\t4\tPink Crocus\t4\tYellow Crocus\t4\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tSnowy Alpine Building\t\t\t2.096\tFurniture\tPixie Dust\t15\tReclaimed Barn Wood\t10\tSilver Ore\t15\tWhite Crocus\t5\tYellow Crocus\t5\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tSnowy Alpine Half Arch\t\t\t2.099\tFurniture\tPixie Dust\t15\tReclaimed Barn Wood\t10\tSilver Ore\t15\tPink Crocus\t5\tYellow Crocus\t5\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tSwinging Alpine Door\t\t\t2.107\tFurniture\tDry Wood\t2\tRusty Barn Hinge\t2\tSilver Ore\t2\tWhite Crocus\t2\tYellow Crocus\t2\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tWagon Wheel Bookshelf\t\t\t2.111\tFurniture\tReclaimed Barn Wood\t2\tSilver Ore\t2\tOld Braided Rope\t2\tPink Crocus\t2\tYellow Crocus\t2\t\t\tcrafting\t'
+'\nFurniture\tWR\t1.20.1\t\tHorseshoe Archway\t\t\t2.052\tFurniture\tHardwood\t5\tBlue Lily of the Valley\t6\tPink Lily of the Valley\t4\tPurple Lily of the Valley\t3\tYellow Lily of the Valley\t2\t\t\tcrafting\tWinnie the Pooh'
+'\nFurniture\tWR\t1.20.1\t\tLeafy Hammock Seat\t\t\t2.055\tFurniture\tCopter Seeds\t3\tGrassy Ore\t3\tBalloon Fish\t2\tBlue Lily of the Valley\t1\tYellow Lily of the Valley\t1\t\t\tcrafting\t'*/
+'\nFurniture\tWR\t1.20.1\t\tPretty Flower Garlands\t\t\t2.078\tFurniture\tOld Braided Rope\t1\tBlue Lily of the Valley\t3\tPink Lily of the Valley\t3\tPurple Lily of the Valley\t2\tYellow Lily of the Valley\t1\t\t\tcrafting\t';
 
 /*
 outputString = "itemType\tcollection\tversion\tversionRemoved\tobtainable\tID\tsheetOrder\tuniverse\tlimited\tspeculated\tSubgroup\tname\tcategory\ttagsConfirmed\ttags\tcolor\ttraits\tChecklist\tverified\tbuyprice\tMSCost\tsource\tplacement\tsize\tW\tL\tfunctions\tnpcInterest\tlocation\tinStore\t"
//+"\nFurniture\tEI\t1.8\t1.9 bug, back 1.10\t--\t40002073\t1.218\tAncient Civilization\t\t\tac - market stall\tSmall Blue Market Stall\tMisc.\t\t\tblue, brown\tLavish, Calm, Strong, Wondrous\tTRUE\t2024.03.12\tn/a\t\tCrafting\tdefault (outdoor)\t8x6\t8\t6\tTable - 4x4\t\tcrafting\t\t"
//+"\nFurniture\tDV\t1.17\t\t\t\t20.0767\tOther\t\t\t\tSizzling BBQ Cooking Station\tEssentials, Utilities\t\tRustic, Outdoors\tred, brown\tSimple, Playful, Strong, Familiar\tTRUE\t2025.07.01 - 1z\tn/a\t\tCrafting -- Summer Sizzle (End of Summer)\tdefault\t2x2\t2\t2\tCooking Station\t\tcrafting\t\t"
//+"\nFurniture\tDV\t1.19\t\t\t\t20.0432\tOther\t\t\t\tIcy Counter\tDecor\t\t\tblue\tLavish, Calm, Strong, Wondrous\tFALSE\t2025.10.05 - 1f\t-\t\tCrafting after Cogsworth Level 4 (On Her Majesty's Festive Service)\t\t8x4\t8\t4\t-- (no table)\t\tquest/crafting\t\t"
+'\nFurniture\tSV\t1.14.1\t\tx\t40003469\t20.0201\tOther\t\t\t\tBright Hanging Glass Orbs\tDecor, Ceiling\tyes - added\tRustic, Elegant, Living Room, Rec Room, Dining Room\tblue, green, red\tLavish, Playful, Delicate, Wondrous\tFALSE\t2024.12.05 - 1i\t5000\t\tStore\tceiling (indoor)\t5x5\t10\t10\tLighting (Automatic)\t\tSize 2\tSV\t'
+'\nFurniture\tEI\t1.14.1\t\tx\t40003638\t20.0243\tOther\t\t\t\tClay Cooking Stove\tEssentials, Appliance\ttodo\tRustic, Traditional, Kitchen, Outdoors\tbrown\tLavish, Calm, Delicate, Wondrous\tFALSE\t2024.12.09 - 1j\t7360\t\tStore\tdefault\t2x2\t4\t4\tCooking Station (Use)\t\tSize 4\tx\t'
+'\nFurniture\tDV\t1.3\t1.9, back 1.10\tx\t40001084\t20.1016\tOther\t\t\tlamppost - wooden\tWooden Lamppost with Blue Light\tDecor, Lighting\t\t\tblue, black, brown, gray\tSimple, Calm, Strong, Wondrous\tFALSE\t2023.02.21\tn/a\t\tCrafting\tdefault\t2x1 (not full) (1 empty)\t4\t2\tLight (Interact)\t\tcrafting\t\t';
*/


	//outputString = "itemType\titemID\tVLOOKUP\tcollection\tversion\tversionRemoved\tobtainable\tID\tsheetOrder\tuniverse\tlimited\tspeculated\tSubgroup\tname\tcategory\ttagsConfirmed\ttags\tcolor\ttraits\tChecklist\tverified\tbuyprice\tMSCost\tsource\tplacement\tsize\tW\tL\tfunctions\tnpcInterest\tlocation\tinStore\tDSChestItem\nFurniture\t40005644\t40005644\tDV\t1.22\t\t\t40005644\t20.0638\tOther\t\t\t\tMoontide Glow Banner\tDecor\tyes\tCute, Outdoors, Rustic\tblue, pink, brown\tLavish, Playful, Strong, Wondrous\tFALSE\t2026.04.09 - 9e\t20000\t\tPocahontas Level 10 quest (A Raccoon's Return) (during)\tdefault (outdoor)\t20x2 (not full) (16x2 cutout)\t20\t2\tArch\t\tquest\t\t\nFurniture\t40005122\t40005122\tDV\t1.20.11\t\t--\t40005122\t17.113\tMickey & Friends\t\t\t\tEnchanted Holiday Fireplace\tDecor\tyes - created\t<!--Winter Warmth 2025, -->Rustic, Bold, Living Room, Study\tbrown\tSimple, Calm, Strong, Familiar\tFALSE\t2025.12.10 - 1j\t25000\t\tStar Path - Winter Warmth - 4C - T4 Premium (35 tokens)\tdefault\t12x6\t12\t6\tFireplace, also additional animation when turned on\t\tstarpath - warmth\t\t\nFurniture\t40005260\t40005260\tDV\t1.21\t\tx\t40005260\t12.804\tLady and the Tramp\t\t\t\tDarling Golden Lamp\tLighting\tyes\tElegant, Living Room, Rec Room, Study\tblue, yellow\tSimple, Calm, Delicate, Familiar\tFALSE\t2026.02.13 - 7a\t2040\t\tStore\tdefault\t2x2\t2\t2\tLighting\t\ttable 1\tx\t\nFurniture\t40005160\t40005160\tDV\t1.20.11\t\tx\t40005160\t5.014\tCinderella\t\t\t\tGlass Shoe\tDecor\tyes\tBedroom, Elegant, Living Room\twhite\tLavish, Calm, Delicate, Wondrous\tFALSE\t2025.12.15 (tt to 12.16) - 2a\t3000\t\tCinderella Level 10 Quest (The Friendship Ball) (post-quest mailbox reward)\tsurfaces\t2x2\t2\t2\t\t\tquest\t\t\nFurniture\t40004040\t40004040\tDV\t1.17\t\tx\t40004040\t0.204\tA Bug's Life\tPremium\t\t\tGiant String Lights\tLighting\tyes - created\tCute, Modern, Outdoors\tblue, green, red, yellow, brown\tSimple, Playful, Strong, Wondrous\tFALSE\t2025.04.26 - 5a\t5440\tdupe\tPremium Bundle - A Bug's Life Decor Bundle (2000 M) (x4)\tdefault (outdoor)\t20x2 (not full)\t20\t2\tLighting, Arch\t\tpremium\t\t\nFurniture\t40004772\t40004772\t--\t1.20.11\t\tx\t40004772\t5.072\tCinderella\t\t\t\tCinderella's Room Divider\tMisc.\t\tElegant, Bathroom, Bedroom, Outdoors\tbrown, purple\tLavish, Calm, Delicate, Familiar\tFALSE\t2025.12.13? - 1a\t-\t\tCinderella Level 2 quest (Cinderella's Custom Creation) (reward)\tdefault\t8x2\t8\t2\t\t\tquest\t\t\nFurniture\t40004768\t40004768\t--\t1.20.11\t\tx\t40004768\t5.076\tCinderella\t\t\t\tSpell Pumpkin\tDecor, Misc.\t\t\tblue\tLavish, Calm, Strong, Wondrous\tFALSE\t2025.12.10 - 4a\t-\t\tFairy Godmother Quest (A Grateful Gift) - mailbox post quest\tdefault\t6x6 (not full)\t6\t6\t\t\tquest\t\t\nFurniture\t40005279\t40005279\tDV\t1.21\t\tx\t40005279\t12.814\tLady and the Tramp\t\t\t\tEdwardian Dog Toy\tDecor\t\tTraditional, Rec Room, Living Room, Rustic, Bedroom\tgreen, red, black\tSimple, Playful, Strong, Familiar\tFALSE\t2026.02.24 - 4a\t5000\t\tTramp Level 2 Quest (Not Your Average Squeaky Toy) (during?)\tdefault\t10x8 (not full)\t10\t8\tGather (3), Interact (nonfunctional)\t\tquest\t\t\nFurniture\t40005455\t40005455\t--\t1.22\t\t\t40005455\t20.1521\tOther\t\t\t\tDazzle Beach Companion Home\tDecor\t\tCasual, Outdoors\tgreen, red, brown\tSimple, Playful, Strong, Familiar\tFALSE\t2026.04.18? - 8a\t-\t\tThe Grand Exhibition: Dazzle Beach - TBA\tdefault (outdoor)\t24x24 (not full)\t24\t24\tCompanion Home\t\tquest\t\t\nFurniture\t40005570\t40005570\tDV\t1.22\t\t\t40005570\t20.0639\tOther\t\t\t\tMoontide Glow Lamppost\tDecor, Lighting, Trees\tyes\tCute, Outdoors, Rustic\tblue, green, brown\tSimple, Playful, Strong, Wondrous\tFALSE\t2026.04.09 - 9d\t8000\t\tPocahontas Level 10 quest (A Raccoon's Return) (4 during)\tdefault (outdoor)\t8x6 (not full)\t8\t6\tLight (Constant) (Animation)\t\tquest\t\t\nFurniture\t40005417\t40005417\tDV\t1.22\t\t\t40005417\t20.0640\tOther\t\t\t\tMoontide Glow Stage\tDecor, Utilities, Misc.\tyes - added\tOutdoors, Casual\tred, black, brown\tLavish, Playful, Strong, Familiar\tFALSE\t2026.04.09 - 9b\t6000\t\tPocahontas Level 4 quest (Working Together) (pick up after completed)\tdefault (outdoor)\t32x36 (not full)\t32\t36\tTODO - VERIFY\t\tquest\t\t\nFurniture\t40005585\t40005585\tDV\t1.22\t\t\t40005585\t21.403\tPocahontas\t\t\t\tChair of the Chieftain\tEssentials, Decor, Seating\tyes - added\tTraditional, Outdoors\tbrown, gray\tLavish, Calm, Strong, Wondrous\tFALSE\t2026.04.09 - 8z\t25000\t\tPocahontas Level 8\tdefault\t12x6\t12\t6\tSit\t\tfriendship\t\t\nFurniture\t40005380\t40005380\tDV\t1.17\t\t--\t40004261\t21.239\tPeter Pan\t\t\t\tFishing Trinkets Light Fixture\tDecor, Lighting, Ceiling\tyes - created/added\tStudy, Quirky, Rec Room, Living Room, Rustic<!--, Adventures in Never Land-->\tred, yellow, brown\tSimple, Calm, Delicate, Familiar\tFALSE\t2025.06.18 - 1r\t8000\t\tStar Path - Adventures in Never Land - 6E - T6 (10 tokens)\tceiling (indoor)\t8x8\t8\t8\tLighting (Automatic)\t\tstarpath - neverland\t\t\nFurniture\t40005435\t40005435\tDV\t1.22\t\t\t40005435\t21.301\tPirates of the Caribbean\t\t\t\tPirate Throne\t\t\t\t\t\tFALSE\t\t\t\tevent - TreasureHunt_CompleteXFishMaps: Fishing for Adventure / Complete X Fishing Treasure Maps.\t\t\t\t\t\t\tevent\t\t";
 	
 	// syntax issues
 	//outputString = "itemType\titemID\tVLOOKUP\tcollection\tversion\tversionRemoved\tobtainable\tID\tsheetOrder\tuniverse\tlimited\tspeculated\tSubgroup\tname\tcategory\ttagsConfirmed\ttags\tcolor\ttraits\tChecklist\tverified\tbuyprice\tMSCost\tsource\tplacement\tsize\tW\tL\tfunctions\tnpcInterest\tlocation\tinStore\tDSChestItem\nFurniture\t40005644\t40005644\tDV\t1.22\t\t\t40005644\t20.0638\tOther\t\t\t\tMoontide Glow Banner\tDecor\tyes\tCute, Outdoors, Rustic\tblue, pink, brown\tLavish, Playful, Strong, Wondrous\tFALSE\t2026.04.09 - 9e\t20000\t\tPocahontas Level 10 quest (A Raccoon's Return) (during)\tdefault (outdoor)\t20x2 (not full) (16x2 cutout)\t20\t2\tArch\t\tquest\t\nFurniture\t40005122\t40005122\tDV\t1.20.11\t\t--\t40005122\t17.113\tMickey & Friends\t\t\t\tEnchanted Holiday Fireplace\tDecor\tyes - created\t<!--Winter Warmth 2025, -->Rustic, Bold, Living Room, Study\tbrown\tSimple, Calm, Strong, Familiar\tFALSE\t2025.12.10 - 1j\t25000\t\tStar Path - Winter Warmth - 4C - T4 Premium (35 tokens)\tdefault\t12x6\t12\t6\tFireplace, also additional animation when turned on\t\tstarpath - warmth\t\nFurniture\t40005260\t40005260\tDV\t1.21\t\tx\t40005260\t12.804\tLady and the Tramp\t\t\t\tDarling Golden Lamp\tLighting\tyes\tElegant, Living Room, Rec Room, Study\tblue, yellow\tSimple, Calm, Delicate, Familiar\tFALSE\t2026.02.13 - 7a\t2040\t\tStore\tdefault\t2x2\t2\t2\tLighting\t\ttable 1\tx\nFurniture\t40005160\t40005160\tDV\t1.20.11\t\tx\t40005160\t5.014\tCinderella\t\t\t\tGlass Shoe\tDecor\tyes\tBedroom, Elegant, Living Room\twhite\tLavish, Calm, Delicate, Wondrous\tFALSE\t2025.12.15 (tt to 12.16) - 2a\t3000\t\tCinderella Level 10 Quest (The Friendship Ball) (post-quest mailbox reward)\tsurfaces\t2x2\t2\t2\t\t\tquest\t\nFurniture\t40004040\t40004040\tDV\t1.17\t\tx\t40004040\t0.204\tA Bug's Life\tPremium\t\t\tGiant String Lights\tLighting\tyes - created\tCute, Modern, Outdoors\tblue, green, red, yellow, brown\tSimple, Playful, Strong, Wondrous\tFALSE\t2025.04.26 - 5a\t5440\tdupe\tPremium Bundle - A Bug's Life Decor Bundle (2000 M) (x4)\tdefault (outdoor)\t20x2 (not full)\t20\t2\tLighting, Arch\t\tpremium\t\nFurniture\t40004772\t40004772\t--\t1.20.11\t\tx\t40004772\t5.072\tCinderella\t\t\t\tCinderella's Room Divider\tMisc.\t\tElegant, Bathroom, Bedroom, Outdoors\tbrown, purple\tLavish, Calm, Delicate, Familiar\tFALSE\t2025.12.13? - 1a\t-\t\tCinderella Level 2 quest (Cinderella's Custom Creation) (reward)\tdefault\t8x2\t8\t2\t\t\tquest\t\nFurniture\t40004768\t40004768\t--\t1.20.11\t\tx\t40004768\t5.076\tCinderella\t\t\t\tSpell Pumpkin\tDecor, Misc.\t\t\tblue\tLavish, Calm, Strong, Wondrous\tFALSE\t2025.12.10 - 4a\t-\t\tFairy Godmother Quest (A Grateful Gift) - mailbox post quest\tdefault\t6x6 (not full)\t6\t6\t\t\tquest\t\nFurniture\t40005279\t40005279\tDV\t1.21\t\tx\t40005279\t12.814\tLady and the Tramp\t\t\t\tEdwardian Dog Toy\tDecor\t\tTraditional, Rec Room, Living Room, Rustic, Bedroom\tgreen, red, black\tSimple, Playful, Strong, Familiar\tFALSE\t2026.02.24 - 4a\t5000\t\tTramp Level 2 Quest (Not Your Average Squeaky Toy) (during?)\tdefault\t10x8 (not full)\t10\t8\tGather (3), Interact (nonfunctional)\t\tquest\t\nFurniture\t40005455\t40005455\t--\t1.22\t\t\t40005455\t20.1521\tOther\t\t\t\tDazzle Beach Companion Home\tDecor\t\tCasual, Outdoors\tgreen, red, brown\tSimple, Playful, Strong, Familiar\tFALSE\t2026.04.18? - 8a\t-\t\tThe Grand Exhibition: Dazzle Beach - TBA\tdefault (outdoor)\t24x24 (not full)\t24\t24\tCompanion Home\t\tquest\t\nFurniture\t40005570\t40005570\tDV\t1.22\t\t\t40005570\t20.0639\tOther\t\t\t\tMoontide Glow Lamppost\tDecor, Lighting, Trees\tyes\tCute, Outdoors, Rustic\tblue, green, brown\tSimple, Playful, Strong, Wondrous\tFALSE\t2026.04.09 - 9d\t8000\t\tPocahontas Level 10 quest (A Raccoon's Return) (4 during)\tdefault (outdoor)\t8x6 (not full)\t8\t6\tLighting (Constant)<!-- (Animation)-->\t\tquest\t\nFurniture\t40005417\t40005417\tDV\t1.22\t\t\t40005417\t20.0640\tOther\t\t\t\tMoontide Glow Stage\tDecor, Utilities, Misc.\tyes - added\tOutdoors, Casual\tred, black, brown\tLavish, Playful, Strong, Familiar\tFALSE\t2026.04.09 - 9b\t6000\t\tPocahontas Level 4 quest (Working Together) (pick up after completed)\tdefault (outdoor)\t32x36 (not full)\t32\t36\tGathering (3) - TODO - VERIFY\t\tquest\t\nFurniture\t40005585\t40005585\tDV\t1.22\t\t\t40005585\t21.403\tPocahontas\t\t\t\tChair of the Chieftain\tEssentials, Decor, Seating\tyes - added\tTraditional, Outdoors\tbrown, gray\tLavish, Calm, Strong, Wondrous\tFALSE\t2026.04.09 - 8z\t25000\t\tPocahontas Level 8\tdefault\t12x6\t12\t6\tSit\t\tfriendship\t\nFurniture\t40005380\t40005380\tDV\t1.17\t\t--\t40004261\t21.239\tPeter Pan\t\t\t\tFishing Trinkets Light Fixture\tDecor, Lighting, Ceiling\tyes - created/added\tStudy, Quirky, Rec Room, Living Room, Rustic<!--, Adventures in Never Land-->\tred, yellow, brown\tSimple, Calm, Delicate, Familiar\tFALSE\t2025.06.18 - 1r\t8000\t\tStar Path - Adventures in Never Land - 6E - T6 (10 tokens)\tceiling (indoor)\t8x8\t8\t8\tLighting (Automatic)\t\tstarpath - neverland\t\nFurniture\t40005435\t40005435\tDV\t1.22\t\t\t40005435\t21.301\tPirates of the Caribbean\t\t\t\tPirate Throne\t\t\t\t\t\tFALSE\t\t\t\tevent - TreasureHunt_CompleteXFishMaps: Fishing for Adventure / Complete X Fishing Treasure Maps.\t\t\t\t\t\t\tevent\t\nFurniture\t40004377\t40004377\tDV\t1.19\t\tx\t40004377\t20.0391\tOther\t\t\t\tFox and Raccoon Sculpture\tDecor, Art\tyes\tLiving Room, Cute, Traditional, Elegant, Study, Outdoors\tred, gray\tLavish, Calm, Strong, Familiar\tFALSE\t2025.10.04 - 7a?\t5000\t\tLumiere Level 10 quest (Long Lost Loves) (during) ** quest - party photo - requires pickup after quest to register in collection\tdefault\t12x12\t12\t12\tGathering - 3\t\tquest\t\nFurniture\t40004577\t40004577\tDV\t1.19\t\tx\t40004577\t2.078\tBeauty and the Beast\tPremium\t\t\tMosaic of Friendship\tDecor, Rugs\tyes\tLiving Room, Outdoors, Quirky, Bold\tgreen, pink, yellow\tLavish, Calm, Strong, Wondrous\tFALSE\t2025.10.16 - 1a\t10000\tdupe\tPremium Bundle - Once Upon a Dance Dream Bundle (4000 M) ** quest - party photo ** Mirabel quest (Once Upon a Dance: Pieces of the Hearts) (during?) ** Replaces a party item, must be picked up tor egister in collection\tdefault (under)\t10x10\t10\t10\tRug\t\tpremium/quest\t\nFurniture\t40005249\t40005249\tDV\t1.21\t\tx\t40005249\t12.835\tLady and the Tramp\t\t\t\tZoo Fountain\tDecor\t\tElegant, Traditional, Outdoors\tblue, green\tLavish, Calm, Strong, Familiar\tFALSE\t2026.02.24 - 8a -- 2026.03.14 - 2a\t10000\t\tTramp Level 7 Quest (And How Did That Make You Feel?) (during, pick up after quest)\t\t10x16 (not full)\t10\t16\tGather (3)\t\tquest\t\nFurniture\t40004993\t40004993\tWM\t1.20.2\t\tx\t40004993\t20.0471\tOther\t\t\t\tGreen Gulch Curved Hedge\tFoliage, Fencing\tyes\tTraditional, Outdoors\tgreen\tSimple, Calm, Strong, Familiar\tFALSE\t2025.11.22 - 1i\t3600\t\tStore, pick up in Glamour Gulch (Cruella's Fortress)\t\t\t\t\t\t\tSize 4\tWM\nFurniture\t40004845\t40004845\tWM\t1.20.2\t\tx\t40004845\t22.319\tSnow White\t\t\t\tFlowery Wishblossom Garden\tDecor\t\t\tblue, green, yellow\tSimple, Calm, Delicate, Familiar\tFALSE\t2025.11.30 - 9a\tn/a\t\tCrafting after Snow White Level 10 Quest (Flowery Wishblossom Garden)\tdefault (outdoor)\t26x26 (not full)\t26\t26\t\t\tquest/crafting\t\nFurniture\t40002937\t40002937\t--\t1.13\t\tx\t40002937\t25.062\tThe Lion King\t\t\t\tDisplay Pillar\tDecor, Tables\t\tElegant, Rustic, Outdoors\twhite, yellow\tLavish, Calm, Strong, Wondrous\tFALSE\t2024.11.07 - 1\tn/a\t\tCrafting after Pumbaa Level 4 Quest (Fine Arts for Warthogs) (during) - 4 given\tdefault\t2x2\t2\t2\tTable - 1x1\t\tquest/crafting\t\nFurniture\t40003256\t40003256\tDV\t1.12\t\tx\t40003256\t27.001\tThe Princess and the Frog\t\t\t\tBayou Companion Home\tEssentials, Misc.\t\tRustic, Outdoors\tyellow, brown\tSimple, Calm, Strong, Familiar\tFALSE\t2024.09.06 - 1\tn/a\t\tCrafting after Tiana Level 4 quest (Little Louis's Big Break) (unlocked during or after?)\tdefault (outdoor)\t6x6\t6\t6\tCompanion Home\t\tquest/crafting\t\nFurniture\t40002397\t40002397\tEI\t1.8\t1.9, back 1.10\tx\t40002397\t20.0036\tOther\t\t\t\tBasic Canvas\t\t\t\t\t\tFALSE\t2024.01.22\tn/a\t\tCrafting after Rapunzel Level 10 quest (Home is Where The Art Is) (1 during)\twalls (indoor)\t4x4\t4\t4\t-\t\tquest/crafting\t\nFurniture\t40004468\t40004468\t--\t1.18\t\tx\t40004468\t12.531\tInside Out\t\t\t\tJoy and Sadness's Fireworks\tDecor, Art\t\tCasual, Outdoors\tblue, yellow\tSimple, Playful, Delicate, Familiar\tFALSE\t2025.09.08-15?19 - 2a\t-\t\tSadness Level 10 Quest (Create a Bear) (during?)\tdefault\t10x10\t10\t10\tGathering (2), Fireworks (yellow, blue, green)\t\tquest\t\nFurniture\t160000169\t160000169\tTracked Wall\t1.9\t\tx\t160000169\t20.1334\tOther\tLimited Time-->Premium\tBundle - 1.14.3\t\tPlayful Monsters Wallpaper\tWallpaper\t\t\t\t\tFALSE\t2024.02.28\t-\tdupe\tPremium Bundle - Monstrous Pink Bundle (1200 M) [___ M] ** Star Path - Lovely Monsters - 2C - T2 (5 tokens)\tindoor\t--\t--\t--\t-\t\tstarpath - monsters\t\nFurniture\t40005177\t40005177\tDV\t1.21\t\tx\t40005177\t2.201\tBig Hero 6\t\t\t\tMochi's Cat House\tEssentials, Decor\tyes\tRustic, Traditional, Outdoors\tblue, green\tLavish, Calm, Strong, Familiar\tFALSE\t2026.03.06 -- TBA - 2026.03.02\t10000\tdupe\tMochi Level 5 / Premium Bundle - Mochi (3000 M)\tdefault (outdoor)\t8x10\t8\t10\tCompanion Home\t\tpremium/friendship\t\nFurniture\t40005372\t40005372\tDV\t1.22\t\t\t40005372\t21.429\tPocahontas\t\t\t\tSwirling Forest Leaves\tMisc.\tyes - added\tRustic, Outdoors, Bold\tgreen, purple\tLavish, Playful, Delicate, Wondrous\tFALSE\t2026.04.14 - 1i\t24000\tdupe\tPremium Bundle - Swirling Leaves Set (1250 M) (x3) ** Premium Bundle - Mega Bundle - Colors of Nature Bundle (6600 M) (x1)\tdefault (outdoor)\t24x60 (not full)\t24\t60\tVFX\t\tpremium\t\t ** ";

	outputString = "itemType\titemID\tVLOOKUP\tcollection\tversion\tversionRemoved\tobtainable\tID\tsheetOrder\tuniverse\tlimited\tspeculated\tSubgroup\tname\tcategory\ttagsConfirmed\ttags\tcolor\ttraits\tChecklist\tverified\tbuyprice\tMSCost\tsource\tplacement\tsize\tW\tL\tfunctions\tnpcInterest\tlocation\tinStore\tDSChestItem\nFurniture\t40005644\t40005644\tDV\t1.22\t\t\t40005644\t20.0638\tOther\t\t\t\tMoontide Glow Banner\tDecor\tyes\tCute, Outdoors, Rustic\tblue, pink, brown\tLavish, Playful, Strong, Wondrous\tFALSE\t2026.04.09 - 9e\t20000\t\tPocahontas Level 10 quest (A Raccoon's Return) (during)\tdefault (outdoor)\t20x2 (not full) (16x2 cutout)\t20\t2\tArch\t\tquest\t\t\nFurniture\t40005122\t40005122\tDV\t1.20.11\t\t--\t40005122\t17.113\tMickey & Friends\t\t\t\tEnchanted Holiday Fireplace\tDecor\tyes - created\t<!--Winter Warmth 2025, -->Rustic, Bold, Living Room, Study\tbrown\tSimple, Calm, Strong, Familiar\tFALSE\t2025.12.10 - 1j\t25000\t\tStar Path - Winter Warmth - 4C - T4 Premium (35 tokens)\tdefault\t12x6\t12\t6\tFireplace, also additional animation when turned on\t\tstarpath - warmth\t\t\nFurniture\t40005260\t40005260\tDV\t1.21\t\tx\t40005260\t12.804\tLady and the Tramp\t\t\t\tDarling Golden Lamp\tLighting\tyes\tElegant, Living Room, Rec Room, Study\tblue, yellow\tSimple, Calm, Delicate, Familiar\tFALSE\t2026.02.13 - 7a\t2040\t\tStore\tdefault\t2x2\t2\t2\tLighting\t\ttable 1\tx\t\nFurniture\t40005160\t40005160\tDV\t1.20.11\t\tx\t40005160\t5.014\tCinderella\t\t\t\tGlass Shoe\tDecor\tyes\tBedroom, Elegant, Living Room\twhite\tLavish, Calm, Delicate, Wondrous\tFALSE\t2025.12.15 (tt to 12.16) - 2a\t3000\t\tCinderella Level 10 Quest (The Friendship Ball) (post-quest mailbox reward) (\"I found this...\")\tsurfaces\t2x2\t2\t2\t\t\tquest\t\t\nFurniture\t40004040\t40004040\tDV\t1.17\t\tx\t40004040\t0.204\tA Bug's Life\tPremium\t\t\tGiant String Lights\tLighting\tyes - created\tCute, Modern, Outdoors\tblue, green, red, yellow, brown\tSimple, Playful, Strong, Wondrous\tFALSE\t2025.04.26 - 5a\t5440\tdupe\tPremium Bundle - A Bug's Life Decor Bundle (2000 M) (x4)\tdefault (outdoor)\t20x2 (not full)\t20\t2\tLighting, Arch\t\tpremium\t\t\nFurniture\t40004772\t40004772\t--\t1.20.11\t\tx\t40004772\t5.072\tCinderella\t\t\t\tCinderella's Room Divider\tMisc.\t\tElegant, Bathroom, Bedroom, Outdoors\tbrown, purple\tLavish, Calm, Delicate, Familiar\tFALSE\t2025.12.13? - 1a\t-\t\tCinderella Level 2 quest (Cinderella's Custom Creation) (reward)\tdefault\t8x2\t8\t2\t\t\tquest\t\t\nFurniture\t40004768\t40004768\t--\t1.20.11\t\tx\t40004768\t5.076\tCinderella\t\t\t\tSpell Pumpkin\tDecor, Misc.\t\t\tblue\tLavish, Calm, Strong, Wondrous\tFALSE\t2025.12.10 - 4a\t-\t\tThe Fairy Godmother Quest (The Pumpkin and the Princess) - mailbox post quest (\"A Grateful Gift\")\tdefault\t6x6 (not full)\t6\t6\t\t\tquest\t\t\nFurniture\t40005279\t40005279\tDV\t1.21\t\tx\t40005279\t12.814\tLady and the Tramp\t\t\t\tEdwardian Dog Toy\tDecor\t\tTraditional, Rec Room, Living Room, Rustic, Bedroom\tgreen, red, black\tSimple, Playful, Strong, Familiar\tFALSE\t2026.02.24 - 4a\t5000\t\tTramp Level 2 Quest (Not Your Average Squeaky Toy) (during?)\tdefault\t10x8 (not full)\t10\t8\tGather (3), Interact (nonfunctional)\t\tquest\t\t\nFurniture\t40005455\t40005455\t--\t1.22\t\t\t40005455\t20.1521\tOther\t\t\t\tDazzle Beach Companion Home\tDecor\t\tCasual, Outdoors\tgreen, red, brown\tSimple, Playful, Strong, Familiar\tFALSE\t2026.04.18? - 8a\t-\t\tThe Grand Exhibition: Dazzle Beach - TBA\tdefault (outdoor)\t24x24 (not full)\t24\t24\tCompanion Home\t\tquest\t\t\nFurniture\t40005570\t40005570\tDV\t1.22\t\t\t40005570\t20.0639\tOther\t\t\t\tMoontide Glow Lamppost\tDecor, Lighting, Trees\tyes\tCute, Outdoors, Rustic\tblue, green, brown\tSimple, Playful, Strong, Wondrous\tFALSE\t2026.04.09 - 9d\t8000\t\tPocahontas Level 10 quest (A Raccoon's Return) (4 during)\tdefault (outdoor)\t8x6 (not full)\t8\t6\tLighting (Constant)<!-- (Animation)-->\t\tquest\t\t\nFurniture\t40005417\t40005417\tDV\t1.22\t\t\t40005417\t20.0640\tOther\t\t\t\tMoontide Glow Stage\tDecor, Utilities, Misc.\tyes - added\tOutdoors, Casual\tred, black, brown\tLavish, Playful, Strong, Familiar\tFALSE\t2026.04.09 - 9b\t6000\t\tPocahontas Level 4 quest (Working Together) (pick up after completed)\tdefault (outdoor)\t32x36 (not full)\t32\t36\tGathering (3) - TODO - VERIFY\t\tquest\t\t\nFurniture\t40005585\t40005585\tDV\t1.22\t\t\t40005585\t21.403\tPocahontas\t\t\t\tChair of the Chieftain\tEssentials, Decor, Seating\tyes - added\tTraditional, Outdoors\tbrown, gray\tLavish, Calm, Strong, Wondrous\tFALSE\t2026.04.09 - 8z\t25000\t\tPocahontas Level 8\tdefault\t12x6\t12\t6\tSit\t\tfriendship\t\t\nFurniture\t40005634\t40005634\tDV\t1.22\t\t\t40005634\t21.404\tPocahontas\t\t\t\tDecorative Powhatan Cradleboard\tDecor, Wall\tyes\tRustic, Rec Room, Living Room, Bedroom\tblue, red, brown\tLavish, Calm, Strong, Familiar\tFALSE\t2026.04.12 - 1b\t3000\t\tStore - after unlocking Pocahontas\twall (indoor)\t2x6 (wall)\t2\t6\t-\t\twall - M\tx - C\t\nFurniture\t40005380\t40005380\tDV\t1.17\t\t--\t40004261\t21.239\tPeter Pan\t\t\t\tFishing Trinkets Light Fixture\tDecor, Lighting, Ceiling\tyes - created/added\tStudy, Quirky, Rec Room, Living Room, Rustic<!--, Adventures in Never Land-->\tred, yellow, brown\tSimple, Calm, Delicate, Familiar\tFALSE\t2025.06.18 - 1r\t8000\t\tStar Path - Adventures in Never Land - 6E - T6 (10 tokens)\tceiling (indoor)\t8x8\t8\t8\tLighting (Automatic)\t\tstarpath - neverland\t\t\nFurniture\t40005435\t40005435\tDV\t1.22\t\t\t40005435\t21.301\tPirates of the Caribbean\t\t\t\tPirate Throne\t\t\t\t\t\tFALSE\t\t\t\tevent - TreasureHunt_CompleteXFishMaps: Fishing for Adventure / Complete X Fishing Treasure Maps.\t\t\t\t\t\t\tevent\t\t\nFurniture\t40005249\t40005249\tDV\t1.21\t\tx\t40005249\t12.835\tLady and the Tramp\t\t\t\tZoo Fountain\tDecor\t\tElegant, Traditional, Outdoors\tblue, green\tLavish, Calm, Strong, Familiar\tFALSE\t2026.02.24 - 8a -- 2026.03.14 - 2a\t10000\t\tTramp Level 7 Quest (And How Did That Make You Feel?) (during, pick up after quest)\t\t10x16 (not full)\t10\t16\tGather (3)\t\tquest\t\t\nFurniture\t40004993\t40004993\tWM\t1.20.2\t\tx\t40004993\t20.0471\tOther\t\t\t\tGreen Gulch Curved Hedge\tFoliage, Fencing\tyes\tTraditional, Outdoors\tgreen\tSimple, Calm, Strong, Familiar\tFALSE\t2025.11.22 - 1i\t3600\t\tStore, pick up in Glamour Gulch (Cruella's Fortress)\t\t\t\t\t\t\tSize 4\tWM\t\nFurniture\t40005177\t40005177\tDV\t1.21\t\tx\t40005177\t2.201\tBig Hero 6\t\t\t\tMochi's Cat House\tEssentials, Decor\tyes\tRustic, Traditional, Outdoors\tblue, green\tLavish, Calm, Strong, Familiar\tFALSE\t2026.03.06 -- TBA - 2026.03.02\t10000\tdupe\tMochi Level 5 / Premium Bundle - Mochi (3000 M)\tdefault (outdoor)\t8x10\t8\t10\tCompanion Home\t\tpremium/friendship\t\t\nFurniture\t40004845\t40004845\tWM\t1.20.2\t\tx\t40004845\t22.319\tSnow White\t\t\t\tFlowery Wishblossom Garden\tDecor\t\t\tblue, green, yellow\tSimple, Calm, Delicate, Familiar\tFALSE\t2025.11.30 - 9a\tn/a\t\tCrafting after Snow White Level 10 Quest (Flowery Wishblossom Garden)\tdefault (outdoor)\t26x26 (not full)\t26\t26\t\t\tquest/crafting\t\t\nFurniture\t40002937\t40002937\t--\t1.13\t\tx\t40002937\t25.062\tThe Lion King\t\t\t\tDisplay Pillar\tDecor, Tables\t\tElegant, Rustic, Outdoors\twhite, yellow\tLavish, Calm, Strong, Wondrous\tFALSE\t2024.11.07 - 1\tn/a\t\tCrafting after Pumbaa Level 4 Quest (Fine Arts for Warthogs) (during) - 4 given\tdefault\t2x2\t2\t2\tTable - 1x1\t\tquest/crafting\t\t\nFurniture\t40003256\t40003256\tDV\t1.12\t\tx\t40003256\t27.001\tThe Princess and the Frog\t\t\t\tBayou Companion Home\tEssentials, Misc.\t\tRustic, Outdoors\tyellow, brown\tSimple, Calm, Strong, Familiar\tFALSE\t2024.09.06 - 1\tn/a\t\tCrafting after Tiana Level 4 quest (Little Louis's Big Break) (unlocked during or after?)\tdefault (outdoor)\t6x6\t6\t6\tCompanion Home\t\tquest/crafting\t\t\nFurniture\t40004468\t40004468\t--\t1.18\t\tx\t40004468\t12.531\tInside Out\t\t\t\tJoy and Sadness's Fireworks\tDecor, Art\t\tCasual, Outdoors\tblue, yellow\tSimple, Playful, Delicate, Familiar\tFALSE\t2025.09.08-15?19 - 2a\t-\t\tSadness Level 10 Quest (Create a Bear) (during?)\tdefault\t10x10\t10\t10\tGathering (2), Fireworks (yellow, blue, green)\t\tquest\t\t\nFurniture\t40002397\t40002397\tEI\t1.8\t1.9, back 1.10\tx\t40002397\t20.0036\tOther\t\t\t\tBasic Canvas\t\t\t\t\t\tFALSE\t2024.01.22\tn/a\t\tCrafting after Rapunzel Level 10 quest (Home is Where The Art Is) (1 during)\twalls (indoor)\t4x4\t4\t4\t-\t\tquest/crafting\t\t";
 	}

  this.inputTextArea.val(outputString);
};



/*!
 * 
 * Controller.js
 * 
 */
$(document).ready(function() {
    function r(n) {
        n /*&& ga("send", "event", "Restore Defaults", n.currentTarget.id)*/;
        localStorage.clear();
        location.reload()
    }

    function i(n) {
        if (n /*&& ga("send", "event", "Settings", n.currentTarget.id)*/,d.delimiter = $("input[name=delimiter]:checked").val(), d.decimal = $("input[name=decimal]:checked").val(), d.headersProvided = $("#headersProvidedCB").prop("checked"), d.headersProvided) {
            $("#headerGroup input").prop("disabled", !1);
            d.safeHeaders = $("input[name=headerType]:checked").val() === "safe";

            // this is janky, i'm overriding the header modifications (upcase, downcase, none) so that i dont have to do my own event handlers atm...
            var headerModVal = $("input[name=headerModifications]:checked").val();
            switch (headerModVal) {
                case "none":
                	templateType = headerModVal;
                    d.downcaseHeaders = !1;
                    d.upcaseHeaders = !1;
                    break;
                case "downcase":
                    d.downcaseHeaders = !0;
                    d.upcaseHeaders = !1;
                    break;
                case "upcase":
                	templateType = headerModVal;
                    d.downcaseHeaders = !1;
                    d.upcaseHeaders = !0;
                    break;
                case "spRewards":
                case "questItems":
                case "meals":
                case "ingredients":
                case "spDuties":
               	case "clothingFurniture":
               	case "companions":
               	case "gems":
               	case "flowers":
                    templateType = headerModVal;
                    break;
            }

        } else $("#headerGroup input").prop("disabled", !0);
        if (d.includeWhiteSpace = $("#includeWhiteSpaceCB").prop("checked"), d.includeWhiteSpace) {
            $("#indentGroup input").prop("disabled", !1);
            switch ($("input[name=indentType]:checked").val()) {
                case "spaces":
                    d.indent = "  ";
                    break;
                case "tabs":
                    d.indent = "\t"
            }
        } else $("#indentGroup input").prop("disabled", !0);
        d.includeHtmlClass = $("#includeHtmlClassCB").prop("checked");
        d.convert();
        saveSettings()
    }
    var t, n;
    if (d = new DataConverter("converter"), d.init(), settings = $("#settings-form")[0], localStorage.settings) {
        try {
            t = JSON.parse(localStorage.settings)
        } catch (u) {}
        if (t)
            for (n in t) n === "outputDataType" ? $("#data-selector").val(t[n]).change() : typeof t[n] == "boolean" ? settings[n].checked = t[n] : settings[n].value = t[n]
        	// TODO: comment out original (above) once a bunch of settings are removed from interface and instead have code defined defaults? 
    }
    $(".settings-element").change(i);
    $("#restore").click(r);
    i()
});// todo: check for values coming from the settings panel and assign defaults, then hide settings panel