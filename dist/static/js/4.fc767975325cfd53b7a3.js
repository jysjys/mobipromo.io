webpackJsonp([4,5],{43:function(t,e,n){"use strict";function a(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(30),i=a(o),s=n(29),r=a(s),c=n(24),l=a(c),u=n(5),d=a(u);e.default={props:["isSuccess","searchDeviceData"],data:function(){return{deviceDetailData:[]}},computed:{},watch:{isSuccess:function(t){t===!0&&this.GetDeviceList()},searchDeviceData:function(t){return""===t?void this.GetDeviceList():(this.deviceDetailData=this.$options.methods.responseArray(t),this.deviceDetailData)}},created:function(){this.GetDeviceList()},mounted:function(){},methods:{responseArray:function(t){return t.map(function(t){var e=!0,n=!1,a=void 0;try{for(var o,s=(0,l.default)((0,r.default)(t));!(e=(o=s.next()).done);e=!0){var c=(0,i.default)(o.value,2),u=c[0],d=c[1];""===d&&(t[u]="--")}}catch(t){n=!0,a=t}finally{try{!e&&s.return&&s.return()}finally{if(n)throw a}}0===t.status?t.status="Ununited":1===t.status?t.status="Active":2===t.status?t.status="Idle":3===t.status&&(t.status="Error")}),t},fmtLength:function(t,e){var n=t[e.property];return void 0===n?"0":n.length},GetDeviceList:function(){var t=this;d.default.get("/promo/authed/account/box/lists/1/5").then(function(e){t.deviceDetailData=t.$options.methods.responseArray(e.data)}).catch(function(t){console.log(t)})},sureUnbindDevice:function(t){var e=this,n=t.row.boxSN;d.default.post("/promo/authed/account/box/disconnect",{boxSN:n}).then(function(n){console.log(n.data.isSuccess),n.data.isSuccess&&(d.default.get("/promo/authed/account/box/lists/1/5").then(function(t){e.deviceDetailData=e.$options.methods.responseArray(t.data)}).catch(function(t){console.log(t)}),t.row.visible=!1)}).catch(function(t){console.log(t)})},isMiningEvent:function(t,e){console.log(e);var n=this;d.default.get("/promo/authed/account/box/stop/mining/"+t+"/"+!e).then(function(t){t.data.isSuccess&&d.default.get("/promo/authed/account/box/lists/1/5").then(function(t){n.deviceDetailData=n.$options.methods.responseArray(t.data)}).catch(function(t){console.log(t)})}).catch(function(t){console.log(t)})}}}},59:function(t,e,n){e=t.exports=n(3)(),e.push([t.id,'.unbindDevice-btn[data-v-1821eb7a]{padding-left:8px}.pause-btn[data-v-1821eb7a]{position:relative;padding-right:8px}.pause-btn[data-v-1821eb7a]:after{content:" ";border-right:1px solid rgba(0,0,0,.15);position:absolute;left:106%;height:8px;top:36%}.status-circle[data-v-1821eb7a]{display:inline-block;width:8px;height:8px;border-radius:50%}.color-red[data-v-1821eb7a]{background-color:#f5222d}.color-orange[data-v-1821eb7a]{background-color:#ffc64b}.color-grey[data-v-1821eb7a]{background-color:rgba(0,0,0,.22)}.color-green[data-v-1821eb7a]{background-color:#52c41a}.table1-container .el-popover[data-v-1821eb7a]{padding:16px}.unbindDevice-poppver-content[data-v-1821eb7a]{float:right;padding-top:10px}.unbindDevice-poppver-content .el-button[data-v-1821eb7a]{padding:4px 7px}',"",{version:3,sources:["/./src/pages/table/table1.vue"],names:[],mappings:"AACA,mCACE,gBAAkB,CACnB,AACD,4BACE,kBAAkB,AAClB,iBAAmB,CACpB,AACD,kCACE,YAAa,AACb,uCAA0C,AAC1C,kBAAmB,AACnB,UAAW,AACX,WAAY,AACZ,OAAS,CACV,AACD,gCACE,qBAAsB,AACtB,UAAU,AACV,WAAY,AACZ,iBAAmB,CACpB,AACD,4BACE,wBAAyB,CAC1B,AACD,+BACE,wBAAyB,CAC1B,AACD,6BACE,gCAAkC,CACnC,AACD,8BACE,wBAAyB,CAC1B,AACD,+CACE,YAAa,CACd,AACD,+CACE,YAAa,AACb,gBAAiB,CAClB,AACD,0DACE,eAAgB,CACjB",file:"table1.vue",sourcesContent:["\n.unbindDevice-btn[data-v-1821eb7a] {\n  padding-left: 8px;\n}\n.pause-btn[data-v-1821eb7a] {\n  position:relative;\n  padding-right: 8px;\n}\n.pause-btn[data-v-1821eb7a]:after {\n  content: ' ';\n  border-right: 1px solid rgba(0,0,0,0.15) ;\n  position: absolute;\n  left: 106%;\n  height: 8px;\n  top: 36%;\n}\n.status-circle[data-v-1821eb7a] {\n  display: inline-block;\n  width:8px;\n  height: 8px;\n  border-radius: 50%;\n}\n.color-red[data-v-1821eb7a] {\n  background-color:#F5222D;\n}\n.color-orange[data-v-1821eb7a] {\n  background-color:#FFC64B;\n}\n.color-grey[data-v-1821eb7a] {\n  background-color:rgba(0,0,0,0.22);\n}\n.color-green[data-v-1821eb7a] {\n  background-color:#52C41A;\n}\n.table1-container .el-popover[data-v-1821eb7a] {\n  padding:16px;\n}\n.unbindDevice-poppver-content[data-v-1821eb7a] {\n  float: right;\n  padding-top:10px;\n}\n.unbindDevice-poppver-content .el-button[data-v-1821eb7a] {\n  padding:4px 7px;\n}\n\n"],sourceRoot:"webpack://"}])},66:function(t,e,n){var a=n(59);"string"==typeof a&&(a=[[t.id,a,""]]);n(4)(a,{});a.locals&&(t.exports=a.locals)},67:function(t,e,n){n(66);var a=n(2)(n(43),n(69),"data-v-1821eb7a",null);t.exports=a.exports},69:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"table1-container"},[n("el-table",{staticStyle:{width:"100%"},attrs:{data:t.deviceDetailData,"empty-text":"No data"}},[n("el-table-column",{attrs:{label:"S/N",prop:"boxSN"}}),t._v(" "),n("el-table-column",{attrs:{label:"State",prop:"status"},scopedSlots:t._u([{key:"default",fn:function(e){return["Ununited"==e.row.status?n("span",{staticClass:"status-circle color-grey"}):"Active"==e.row.status?n("span",{staticClass:"status-circle color-green"}):"Idle"==e.row.status?n("span",{staticClass:"status-circle color-orange"}):n("span",{staticClass:"status-circle color-red"}),t._v("\n      "+t._s(e.row.status)+"\n    ")]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"Uplink bandwidth (Mbps)",prop:"uplinkBandwidth"}}),t._v(" "),n("el-table-column",{attrs:{label:"Storage(TB)",prop:"storageSize"}}),t._v(" "),n("el-table-column",{attrs:{label:"Today output",prop:"allTodayCoins"}}),t._v(" "),n("el-table-column",{attrs:{label:"Operation",prop:"name"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{staticClass:"pause-btn fontSize-14",attrs:{type:"text",size:"small"},domProps:{innerHTML:t._s(e.row.isMining===!0?"stop":"begin")},on:{click:function(n){t.isMiningEvent(e.row.boxSN,e.row.isMining)}}}),t._v(" "),n("el-popover",{ref:"unbindDevice",attrs:{placement:"top",trigger:"click",width:"173"},model:{value:e.row.visible,callback:function(n){t.$set(e.row,"visible",n)},expression:"scope.row.visible"}},[n("span",[n("i",{staticClass:"el-icon-error",staticStyle:{color:"red"}}),t._v(" "),t._v("\n          Are you sure unbinding this device?\n        ")]),t._v(" "),n("div",{staticClass:"unbindDevice-poppver-content"},[n("el-button",{on:{click:function(t){e.row.visible=!1}}},[t._v("\n            Cancel\n          ")]),t._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:function(n){t.sureUnbindDevice(e)}}},[t._v("\n            Sure\n          ")])],1)]),t._v(" "),n("el-button",{directives:[{name:"popover",rawName:"v-popover:unbindDevice",arg:"unbindDevice"}],staticClass:"unbindDevice-btn fontSize-14",attrs:{type:"text",size:"small"}},[t._v("\n        Unbind\n      ")])]}}])})],1)],1)},staticRenderFns:[]}}});
//# sourceMappingURL=4.fc767975325cfd53b7a3.js.map