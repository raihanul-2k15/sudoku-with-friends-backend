(this["webpackJsonpsudoku-with-a-friend-frontend"]=this["webpackJsonpsudoku-with-a-friend-frontend"]||[]).push([[0],{44:function(e,t,n){e.exports=n(99)},49:function(e,t,n){},96:function(e,t){},99:function(e,t,n){"use strict";n.r(t);var o=n(0),a=n.n(o),i=n(37),r=n.n(i),c=(n(49),n(38)),l=n(39),u=n(6),s=n(43),d=n(42),f=n(40),p=n.n(f),m=n(41),v=n.n(m),h=void 0,y=void 0,b=void 0,E=void 0,w=void 0;function k(e){var t=e.cellVal,n=e.uneditable,o=e.index,i=e.cycleUp,r=e.cycleDown,c=e.typeIn;return n?a.a.createElement("input",{value:t,type:"text",readOnly:!0,id:"txtbx".concat(o),onContextMenu:function(e){e.preventDefault()},style:{background:"lightblue"}}):a.a.createElement("input",{value:0===t?"":t,style:{background:"white"},type:"text",id:"txtbx".concat(o),onClick:i,onContextMenu:function(e){e.preventDefault(),r()},onChange:c})}function C(e){var t=e.show,n=e.onPopupClose,o=e.res;return!0===t?a.a.createElement("div",{class:"popup"},a.a.createElement("p",null,JSON.stringify(o)),a.a.createElement("button",{onClick:function(){n()}},"X")):null}var g=function(e){Object(s.a)(n,e);var t=Object(d.a)(n);function n(e){var o;return Object(c.a)(this,n),(o=t.call(this,e)).cycleCell=function(e,t){return function(){var n=o.state.puzzle[e],a=Math.floor(e/9),i=e%9,r=n+t;r<0&&(r=9),r>9&&(r=0),function(e,t,n){h.emit("updateCell",{row:e,col:t,val:n})}(a,i,r),console.log(a,i,r)}},o.state={puzzle:new Array(81),uneditable:new Array(81),verdict:!1,time:0,penalty:0,showPopup:!1},o.countUp=o.countUp.bind(Object(u.a)(o)),setInterval(o.countUp,1e3),o}return Object(l.a)(n,[{key:"secondsToHms",value:function(e){e=Number(e);var t=Math.floor(e/3600),n=Math.floor(e%3600/60),o=Math.floor(e%3600%60);return(t>0?t+(1===t?" hr ":" hrs "):"")+(n>0?n+(1===n?" min ":" mins "):"")+(o>0?o+(1===o?" sec":" secs"):"")}},{key:"countUp",value:function(){this.setState((function(e){return{time:e.time+1}}))}},{key:"componentDidMount",value:function(){var e,t,n,o=this;y=function(e){var t,n;document.getElementById("server").innerHTML=e,t=e,n=function(e){console.log(JSON.stringify(e,void 0,4));var t=new Array(81);e.uneditable.forEach((function(e){var n=e.row,o=e.col;t[9*n+o]=!0})),o.setState({uneditable:t,time:e.time,penalty:e.penalty})},p.a.get("".concat("","/status/").concat(t)).then((function(e){return n(e.data)})).catch((function(e){return alert(e)}))},b=e,E=t,w=n,(h=v.a.connect("")).on("connect",(function(e){console.log("Connected to server!")})),h.on("joinedBoard",(function(e){"function"===typeof y&&y(e)})),h.on("updatedCells",(function(e){"function"===typeof b&&b(e)})),h.on("submissionResult",(function(e){console.log("Called hoise"),console.log(typeof E),"function"===typeof E&&E(e)})),h.on("errorOccurred",(function(e){"function"===typeof w&&w(e)})),h.emit("createBoard"),b=function(e){var t=o.state.puzzle;e.forEach((function(e){var n=e.row,o=e.col,a=e.val;return t[9*n+o]=a})),o.setState({puzzle:t})},function(e){E=e}((function(e){var t=e.time,n=e.penalty,a=e.verdict;o.setState({showPopup:!0,time:t,penalty:n,verdict:a})}))}},{key:"render",value:function(){var e=this,t=this.state,n=t.verdict,o=t.penalty,i=t.time;return a.a.createElement("div",{className:"App"},a.a.createElement("h1",null,"Sudoku With Friends"),a.a.createElement("div",{id:"info"},"You are on board:",a.a.createElement("div",{id:"server"}),a.a.createElement("input",{type:"text",name:"join-board",id:"join-board"}),a.a.createElement("button",{id:"join-button",onClick:function(){var e,t=document.getElementById("join-board").value;e=t,h.emit("joinBoard",e)}},"Join Board")),a.a.createElement("form",{id:"sudoku-board"},this.state.puzzle.map((function(t,n){return a.a.createElement(k,{key:n,index:n,cellVal:t,uneditable:e.state.uneditable[n],cycleUp:e.cycleCell(n,1),cycleDown:e.cycleCell(n,-1)})}))),a.a.createElement("div",{id:"check"},a.a.createElement("div",{id:"timer"},"Timer:"," ",this.state.time?this.secondsToHms(this.state.time):"0"," "),a.a.createElement("div",{id:"penalty"},"Penalty: ",this.state.penalty," "),a.a.createElement("button",{id:"submit-board",onClick:function(){h.emit("submitBoard")}},"Submit Guess")),a.a.createElement(C,{show:this.state.showPopup,onPopupClose:function(){return e.setState({showPopup:!1})},res:{verdict:n,time:i,penalty:o}}),a.a.createElement("div",{id:"help"},a.a.createElement("abbr",{title:"Send your friend(s) the ID of the board or join theirs.\r Left or right click on a cell to cycle between numbers."},a.a.createElement("i",null,"Help?"))))}}]),n}(a.a.Component);r.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(g,null)),document.getElementById("root"))}},[[44,1,2]]]);
//# sourceMappingURL=main.a15b80d7.chunk.js.map