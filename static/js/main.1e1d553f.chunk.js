(this["webpackJsonprs-type-explore"]=this["webpackJsonprs-type-explore"]||[]).push([[0],[,,,,,,function(e,t,n){e.exports=n(13)},,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),i=n(4),c=n.n(i),s=(n(11),n(1)),o=(n(12),n(2)),l=n(5),u=function(){function e(){Object(o.a)(this,e),this.type="",this.args=[],this.raw=""}return Object(l.a)(e,[{key:"isTuple",value:function(){return""===this.type}},{key:"hashCode",value:function(){var e,t=this.toString(),n=0;if(0===t.length)return n;for(e=0;e<t.length;e++)n=(n<<5)-n+t.charCodeAt(e),n|=0;return n}},{key:"getColor",value:function(){if(1===this.args.length&&0!==this.args[0].args.length)return this.args[0].getColor();var e=this.hashCode()%360;return"hsl(".concat(e,", 45%, 85%)")}},{key:"getShortName",value:function(){return this.isTuple()?"(".concat(this.args.map((function(e){return e.getShortName()})).join(", "),")"):0===this.args.length?this.type:1===this.args.length?"".concat(this.type,"<").concat(this.args[0].getShortName(),">"):"".concat(this.type,"<...>")}},{key:"toString",value:function(){return this.raw?this.raw:this.isTuple()?(this.raw="(".concat(this.args.map((function(e){return e.toString()})).join(", "),")"),this.raw):0===this.args.length?this.type:(this.raw="".concat(this.type,"<").concat(this.args.map((function(e){return e.toString()})).join(", "),">"),this.raw)}}]),e}(),m=function e(t){Object(o.a)(this,e),this.roots=void 0,this.flat=void 0,this.roots=t,this.flat={};for(var n=t.slice(),r=n.shift();r;)this.flat[r.toString()]=r,n.push.apply(n,r.args),r=n.shift()};function h(e){var t=e.indexOf("`"),n=e.lastIndexOf("`"),r=e.substring(t+1,n),a=r.length,i=new u,c=[],s=[i];function o(){var e=s.pop();e&&(s.length>0?s[s.length-1].args.push(e):c.push(e))}function l(){s.push(new u)}for(var h=0;h<a;h+=1){var p=r[h];if(":"!==p||" "!==r[h+1]){if(" "===p||"\n"===p)if(!(s.length&&s[s.length-1].type.endsWith("dyn")))continue;","!==p?"<"!==p?">"!==p?"("!==p?")"!==p?0===s.length?console.warn("Ignoring: ".concat(p)):s[s.length-1].type+=p:o():l():o():l():(o(),l())}else o(),l()}return new m(c.concat(s))}function p(e){var t=e.flat,n=Object.values(t);return n.sort((function(e,t){var n=e.toString(),r=t.toString();return n<r?-1:n>r?1:0})),a.a.createElement(a.a.Fragment,null,a.a.createElement("h3",null,"All types"),a.a.createElement("ul",null,n.map((function(e){return a.a.createElement("li",{key:e.toString()},a.a.createElement(d,{type:e}))}))))}function g(e){var t=e.roots;return a.a.createElement("ul",null,t.map((function(e){return a.a.createElement("li",{key:e.toString()},a.a.createElement(d,{type:e,expand:!0}))})))}function d(e){var t=e.type,n=e.expand,i=Object(r.useState)(!!t.isTuple()||!n),c=Object(s.a)(i,2),o=c[0],l=c[1],u=t.getShortName();return 0===t.args.length?a.a.createElement("div",{className:"type"},a.a.createElement("span",{style:{backgroundColor:t.getColor()}},u)):a.a.createElement("div",{className:"type"},a.a.createElement("a",{href:"#",onClick:function(){return l(!o)},style:{backgroundColor:t.getColor()}},u),a.a.createElement("ul",{style:{display:o?"none":"block"}},t.args.map((function(e){return a.a.createElement("li",{key:e.toString()},a.a.createElement(d,{type:e,expand:n}))}))))}var f=function(){var e=Object(r.useState)("\nerror[E0277]: the trait bound `&alloc::sync::Arc<sc_client::client::Client<sc_client_db::Backend<sp_runtime::generic::block::Block<sp_runtime::generic::header::Header<u32, sp_runtime::traits::BlakeTwo256>, sp_runtime::OpaqueExtrinsic>>, sc_client::call_executor::LocalCallExecutor<sc_client_db::Backend<sp_runtime::generic::block::Block<sp_runtime::generic::header::Header<u32, sp_runtime::traits::BlakeTwo256>, sp_runtime::OpaqueExtrinsic>>, sc_executor::native_executor::NativeExecutor<node_executor::Executor>>, sp_runtime::generic::block::Block<sp_runtime::generic::header::Header<u32,\nsp_runtime::traits::BlakeTwo256>, sp_runtime::OpaqueExtrinsic>, node_runtime::RuntimeApi>>: sp_blockchain::backend::HeaderBackend<sp_runtime::generic::block::Block<sp_runtime::generic::header::Header<u32, sp_runtime::traits::BlakeTwo256>, sp_runtime::generic::unchecked_extrinsic::UncheckedExtrinsic<pallet_indices::address::Address<sp_core::crypto::AccountId32, u32>, node_runtime::Call, sp_runtime::MultiSignature, (frame_system::CheckVersion<node_runtime::Runtime>, frame_system::CheckGenesis<node_runtime::Runtime>, frame_system::CheckEra<node_runtime::Runtime>, frame_system::CheckNonce<node_runtime::Runtime>, frame_system::CheckWeight<node_runtime::Runtime>, pallet_transaction_payment::ChargeTransactionPayment<node_runtime::Runtime>, pallet_contracts::CheckBlockGasLimit<node_runtime::Runtime>)>>>` is not satisfied\n"),t=Object(s.a)(e,2),n=t[0],i=t[1],c=Object(r.useState)(""),o=Object(s.a)(c,2),l=o[0],u=o[1],m=Object(r.useState)(h(n)),d=Object(s.a)(m,2),f=d[0],_=d[1];return a.a.createElement("div",{className:"App"},a.a.createElement("div",{className:"input"},a.a.createElement("div",{className:"block"},a.a.createElement("textarea",{onChange:function(e){return function(e){i(e);try{var t=h(e);console.dir(t),u(""),_(t)}catch(n){console.error(n),u(n.toString())}}(e.target.value)},value:n})),a.a.createElement("div",{className:"block"},l&&a.a.createElement("h1",{className:"error"},l),!l&&a.a.createElement(p,{flat:f.flat}))),a.a.createElement("div",{className:"output"},a.a.createElement("div",{className:"block"},!l&&a.a.createElement(g,{roots:f.roots}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(a.a.createElement(f,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}],[[6,1,2]]]);
//# sourceMappingURL=main.1e1d553f.chunk.js.map