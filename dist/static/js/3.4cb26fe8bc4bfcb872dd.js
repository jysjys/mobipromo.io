webpackJsonp([3,4,5],{43:function(t,e,n){"use strict";function a(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var i=n(30),o=a(i),s=n(29),c=a(s),r=n(24),l=a(r),d=n(5),u=a(d);e.default={props:["isSuccess","searchDeviceData"],data:function(){return{deviceDetailData:[]}},computed:{},watch:{isSuccess:function(t){t===!0&&this.GetDeviceList()},searchDeviceData:function(t){return""===t?void this.GetDeviceList():(this.deviceDetailData=this.$options.methods.responseArray(t),this.deviceDetailData)}},created:function(){this.GetDeviceList()},mounted:function(){},methods:{responseArray:function(t){return t.map(function(t){var e=!0,n=!1,a=void 0;try{for(var i,s=(0,l.default)((0,c.default)(t));!(e=(i=s.next()).done);e=!0){var r=(0,o.default)(i.value,2),d=r[0],u=r[1];""===u&&(t[d]="--")}}catch(t){n=!0,a=t}finally{try{!e&&s.return&&s.return()}finally{if(n)throw a}}0===t.status?t.status="Ununited":1===t.status?t.status="Active":2===t.status?t.status="Idle":3===t.status&&(t.status="Error")}),t},fmtLength:function(t,e){var n=t[e.property];return void 0===n?"0":n.length},GetDeviceList:function(){var t=this;u.default.get("/promo/authed/account/box/lists/1/5").then(function(e){t.deviceDetailData=t.$options.methods.responseArray(e.data)}).catch(function(t){console.log(t)})},sureUnbindDevice:function(t){var e=this,n=t.row.boxSN;u.default.post("/promo/authed/account/box/disconnect",{boxSN:n}).then(function(n){console.log(n.data.isSuccess),n.data.isSuccess&&(u.default.get("/promo/authed/account/box/lists/1/5").then(function(t){e.deviceDetailData=e.$options.methods.responseArray(t.data)}).catch(function(t){console.log(t)}),t.row.visible=!1)}).catch(function(t){console.log(t)})},isMiningEvent:function(t,e){console.log(e);var n=this;u.default.get("/promo/authed/account/box/stop/mining/"+t+"/"+!e).then(function(t){t.data.isSuccess&&u.default.get("/promo/authed/account/box/lists/1/5").then(function(t){n.deviceDetailData=n.$options.methods.responseArray(t.data)}).catch(function(t){console.log(t)})}).catch(function(t){console.log(t)})}}}},45:function(t,e,n){t.exports={default:n(46),__esModule:!0}},46:function(t,e,n){var a=n(7),i=a.JSON||(a.JSON={stringify:JSON.stringify});t.exports=function(t){return i.stringify.apply(i,arguments)}},59:function(t,e,n){e=t.exports=n(3)(),e.push([t.id,'.unbindDevice-btn[data-v-1821eb7a]{padding-left:8px}.pause-btn[data-v-1821eb7a]{position:relative;padding-right:8px}.pause-btn[data-v-1821eb7a]:after{content:" ";border-right:1px solid rgba(0,0,0,.15);position:absolute;left:106%;height:8px;top:36%}.status-circle[data-v-1821eb7a]{display:inline-block;width:8px;height:8px;border-radius:50%}.color-red[data-v-1821eb7a]{background-color:#f5222d}.color-orange[data-v-1821eb7a]{background-color:#ffc64b}.color-grey[data-v-1821eb7a]{background-color:rgba(0,0,0,.22)}.color-green[data-v-1821eb7a]{background-color:#52c41a}.table1-container .el-popover[data-v-1821eb7a]{padding:16px}.unbindDevice-poppver-content[data-v-1821eb7a]{float:right;padding-top:10px}.unbindDevice-poppver-content .el-button[data-v-1821eb7a]{padding:4px 7px}',"",{version:3,sources:["/./src/pages/table/table1.vue"],names:[],mappings:"AACA,mCACE,gBAAkB,CACnB,AACD,4BACE,kBAAkB,AAClB,iBAAmB,CACpB,AACD,kCACE,YAAa,AACb,uCAA0C,AAC1C,kBAAmB,AACnB,UAAW,AACX,WAAY,AACZ,OAAS,CACV,AACD,gCACE,qBAAsB,AACtB,UAAU,AACV,WAAY,AACZ,iBAAmB,CACpB,AACD,4BACE,wBAAyB,CAC1B,AACD,+BACE,wBAAyB,CAC1B,AACD,6BACE,gCAAkC,CACnC,AACD,8BACE,wBAAyB,CAC1B,AACD,+CACE,YAAa,CACd,AACD,+CACE,YAAa,AACb,gBAAiB,CAClB,AACD,0DACE,eAAgB,CACjB",file:"table1.vue",sourcesContent:["\n.unbindDevice-btn[data-v-1821eb7a] {\n  padding-left: 8px;\n}\n.pause-btn[data-v-1821eb7a] {\n  position:relative;\n  padding-right: 8px;\n}\n.pause-btn[data-v-1821eb7a]:after {\n  content: ' ';\n  border-right: 1px solid rgba(0,0,0,0.15) ;\n  position: absolute;\n  left: 106%;\n  height: 8px;\n  top: 36%;\n}\n.status-circle[data-v-1821eb7a] {\n  display: inline-block;\n  width:8px;\n  height: 8px;\n  border-radius: 50%;\n}\n.color-red[data-v-1821eb7a] {\n  background-color:#F5222D;\n}\n.color-orange[data-v-1821eb7a] {\n  background-color:#FFC64B;\n}\n.color-grey[data-v-1821eb7a] {\n  background-color:rgba(0,0,0,0.22);\n}\n.color-green[data-v-1821eb7a] {\n  background-color:#52C41A;\n}\n.table1-container .el-popover[data-v-1821eb7a] {\n  padding:16px;\n}\n.unbindDevice-poppver-content[data-v-1821eb7a] {\n  float: right;\n  padding-top:10px;\n}\n.unbindDevice-poppver-content .el-button[data-v-1821eb7a] {\n  padding:4px 7px;\n}\n\n"],sourceRoot:"webpack://"}])},66:function(t,e,n){var a=n(59);"string"==typeof a&&(a=[[t.id,a,""]]);n(4)(a,{});a.locals&&(t.exports=a.locals)},67:function(t,e,n){n(66);var a=n(2)(n(43),n(69),"data-v-1821eb7a",null);t.exports=a.exports},69:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"table1-container"},[n("el-table",{staticStyle:{width:"100%"},attrs:{data:t.deviceDetailData,"empty-text":"No data"}},[n("el-table-column",{attrs:{label:"S/N",prop:"boxSN"}}),t._v(" "),n("el-table-column",{attrs:{label:"State",prop:"status"},scopedSlots:t._u([{key:"default",fn:function(e){return["Ununited"==e.row.status?n("span",{staticClass:"status-circle color-grey"}):"Active"==e.row.status?n("span",{staticClass:"status-circle color-green"}):"Idle"==e.row.status?n("span",{staticClass:"status-circle color-orange"}):n("span",{staticClass:"status-circle color-red"}),t._v("\n      "+t._s(e.row.status)+"\n    ")]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"Uplink bandwidth (Mbps)",prop:"uplinkBandwidth"}}),t._v(" "),n("el-table-column",{attrs:{label:"Storage(TB)",prop:"storageSize"}}),t._v(" "),n("el-table-column",{attrs:{label:"Today output",prop:"allTodayCoins"}}),t._v(" "),n("el-table-column",{attrs:{label:"Operation",prop:"name"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{staticClass:"pause-btn fontSize-14",attrs:{type:"text",size:"small"},domProps:{innerHTML:t._s(e.row.isMining===!0?"stop":"begin")},on:{click:function(n){t.isMiningEvent(e.row.boxSN,e.row.isMining)}}}),t._v(" "),n("el-popover",{ref:"unbindDevice",attrs:{placement:"top",trigger:"click",width:"173"},model:{value:e.row.visible,callback:function(n){t.$set(e.row,"visible",n)},expression:"scope.row.visible"}},[n("span",[n("i",{staticClass:"el-icon-error",staticStyle:{color:"red"}}),t._v(" "),t._v("\n          Are you sure unbinding this device?\n        ")]),t._v(" "),n("div",{staticClass:"unbindDevice-poppver-content"},[n("el-button",{on:{click:function(t){e.row.visible=!1}}},[t._v("\n            Cancel\n          ")]),t._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:function(n){t.sureUnbindDevice(e)}}},[t._v("\n            Sure\n          ")])],1)]),t._v(" "),n("el-button",{directives:[{name:"popover",rawName:"v-popover:unbindDevice",arg:"unbindDevice"}],staticClass:"unbindDevice-btn fontSize-14",attrs:{type:"text",size:"small"}},[t._v("\n        Unbind\n      ")])]}}])})],1)],1)},staticRenderFns:[]}},152:function(t,e,n){"use strict";function a(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var i=n(45),o=a(i),s=n(5),c=a(s),r=n(67),l=a(r);e.default={data:function(){return{SNSearchNumber:"",SNAddNumber:"",isSuccess:!0,searchDeviceData:"",bindNewOneDevice:{},miningStatisticsData:""}},components:{jewelTable:l.default},mounted:function(){this.GetMiningStatistics()},methods:{GetMiningStatistics:function(){var t=this;c.default.get("/promo/authed/account/allbox/statistics").then(function(e){t.miningStatisticsData=e.data}).catch(function(t){console.log(t)})},SearchSNDevice:function(){var t=this;return""===this.SNSearchNumber?void(this.searchDeviceData=""):void c.default.get("/promo/authed/account/box/search/"+t.SNSearchNumber).then(function(e){return"{}"===(0,o.default)(e.data)?(t.searchDeviceData=[],!1):void(t.searchDeviceData=Array.isArray(e.data)?e.data:[e.data])}).catch(function(t){console.log(t)})},BindSNDevice:function(){var t=this;return""===this.SNAddNumber?void(this.isSuccess=!0):(this.isSuccess=!1,void c.default.post("/promo/authed/account/box/connect",{boxSN:t.SNAddNumber}).then(function(e){return t.isSuccess=e.data.isSuccess,t.isSuccess===!0?void t.$message({message:"Added successfully",type:"success",customClass:"messageLocation"}):(t.$message({message:e.data.reason,type:"error",customClass:"messageLocation"}),void console.log(t.isSuccess))}).catch(function(t){console.log(t)}))},iconSearchClick:function(){this.$options.methods.SearchSNDevice.bind(this)()}}}},219:function(t,e,n){e=t.exports=n(3)(),e.push([t.id,'.record-titles[data-v-10ccc130]{padding-top:24px;padding-bottom:16px}.me-box-title[data-v-10ccc130]{padding-top:32px;padding-bottom:24px}.el-input[data-v-10ccc130],.el-input__inner[data-v-10ccc130]{width:243px}.jewel-right-container[data-v-10ccc130]{float:right}.deveice-adrress[data-v-10ccc130]{width:200px;padding:0 6px;margin:0;margin-right:10px;border-radius:4px}.jewel-table-container[data-v-10ccc130]{margin-top:16px}.online-device[data-v-10ccc130]{position:relative;padding-right:10px}.online-device[data-v-10ccc130]:after{content:" ";border-right:2px solid rgba(0,0,0,.15);position:absolute;left:100%;height:20px;top:30%}.console-mac-address-input[data-v-10ccc130]{margin-right:10px;width:160px}',"",{version:3,sources:["/./src/pages/deviceMoint/deviceMoint.vue"],names:[],mappings:"AACA,gCACE,iBAAiB,AACjB,mBAAqB,CACtB,AACD,+BACE,iBAAiB,AACjB,mBAAqB,CACtB,AACD,6DACE,WAAY,CACb,AACD,wCACE,WAAY,CACb,AACD,kCACE,YAAY,AACZ,cAAc,AACd,SAAS,AACT,kBAAmB,AACnB,iBAAmB,CACpB,AACD,wCACE,eAAgB,CACjB,AACD,gCACE,kBAAmB,AACnB,kBAAoB,CACrB,AACD,sCACE,YAAa,AACb,uCAA0C,AAC1C,kBAAmB,AACnB,UAAW,AACX,YAAa,AACb,OAAS,CACV,AACD,4CACE,kBAAmB,AACnB,WAAY,CACb",file:"deviceMoint.vue",sourcesContent:["\n.record-titles[data-v-10ccc130] {\n  padding-top:24px;\n  padding-bottom: 16px;\n}\n.me-box-title[data-v-10ccc130] {\n  padding-top:32px;\n  padding-bottom: 24px;\n}\n.el-input[data-v-10ccc130], .el-input__inner[data-v-10ccc130] {\n  width:243px;\n}\n.jewel-right-container[data-v-10ccc130] {\n  float:right;\n}\n.deveice-adrress[data-v-10ccc130] {\n  width:200px;\n  padding:0 6px;\n  margin:0;\n  margin-right: 10px;\n  border-radius: 4px;\n}\n.jewel-table-container[data-v-10ccc130] {\n  margin-top:16px;\n}\n.online-device[data-v-10ccc130] {\n  position: relative;\n  padding-right: 10px;\n}\n.online-device[data-v-10ccc130]:after {\n  content: ' ';\n  border-right: 2px solid rgba(0,0,0,0.15) ;\n  position: absolute;\n  left: 100%;\n  height: 20px;\n  top: 30%;\n}\n.console-mac-address-input[data-v-10ccc130] {\n  margin-right: 10px;\n  width:160px;\n}\n"],sourceRoot:"webpack://"}])},256:function(t,e,n){var a=n(219);"string"==typeof a&&(a=[[t.id,a,""]]);n(4)(a,{});a.locals&&(t.exports=a.locals)},291:function(t,e,n){n(256);var a=n(2)(n(152),n(305),"data-v-10ccc130",null);t.exports=a.exports},305:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"deviceMoint-container"},[n("div",{staticClass:"trade-record-container"},[n("p",{staticClass:"font-weight-500"},[t._v("\n      Statistics\n    ")]),t._v(" "),t._m(0),t._v(" "),n("ul",{staticClass:"record-numbers flex fontSize-38 theme-fontColor text-center line-height-46"},[n("li",{staticClass:"flex-1 center"},[n("span",{staticClass:"online-device"},[t._v(t._s(t.miningStatisticsData.onLineBox))]),t._v(" "),n("span",{staticClass:"fontcolor-opocity-87"},[t._v(t._s(t.miningStatisticsData.allBox))])]),t._v(" "),n("li",{staticClass:"flex-1"},[n("span",[t._v(t._s(t.miningStatisticsData.allTodayCoins))])]),t._v(" "),n("li",{staticClass:"flex-1"},[n("span",[t._v(t._s(t.miningStatisticsData.allYesterdayCoins))])]),t._v(" "),n("li",{staticClass:"flex-1"},[n("span",[t._v(t._s(t.miningStatisticsData.totalMiningCoin))])])])]),t._v(" "),n("div",{staticClass:"my-jewel-box-container"},[n("p",{staticClass:"me-box-title font-weight-500"},[t._v("\n      Device List\n    ")]),t._v(" "),n("div",{staticClass:"search-container"},[n("el-input",{staticClass:"fontcolor-opocity-54",attrs:{placeholder:"Enter the search S/N number"},on:{input:t.SearchSNDevice},model:{value:t.SNSearchNumber,callback:function(e){t.SNSearchNumber=e},expression:"SNSearchNumber"}},[n("i",{staticClass:"el-input__icon el-icon-search",attrs:{slot:"suffix"},on:{click:t.iconSearchClick},slot:"suffix"})]),t._v(" "),n("div",{staticClass:"jewel-right-container flex"},[n("el-input",{staticClass:"fontcolor-opocity-54 console-mac-address-input",attrs:{placeholder:"Enter the search"},model:{value:t.SNAddNumber,callback:function(e){t.SNAddNumber=e},expression:"SNAddNumber"}}),t._v(" "),n("el-button",{staticClass:"fontSize-14 fontcolor-opocity-54",attrs:{plain:!0},on:{click:t.BindSNDevice}},[t._v("\n          Add Device\n        ")])],1)],1)]),t._v(" "),n("div",{staticClass:"jewel-table-container"},[n("jewel-table",{attrs:{isSuccess:t.isSuccess,searchDeviceData:t.searchDeviceData}})],1)])},staticRenderFns:[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ul",{staticClass:"record-titles flex fontSize-14 fontcolor-opocity-54 center text-center line-height-22"},[n("li",{staticClass:"flex-1"},[t._v("\n        Live devices | All devices\n      ")]),t._v(" "),n("li",{staticClass:"flex-1"},[t._v("\n        Today output\n      ")]),t._v(" "),n("li",{staticClass:"flex-1"},[t._v("\n        Yesterday output\n      ")]),t._v(" "),n("li",{staticClass:"flex-1"},[t._v("\n        Cumulative output\n      ")])])}]}}});
//# sourceMappingURL=3.4cb26fe8bc4bfcb872dd.js.map