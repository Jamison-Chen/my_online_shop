(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0b9bb6"],{"33cc":function(t,e,a){"use strict";a.r(e);var r=a("7a23");function n(t,e,a,n,c,o){var u=Object(r["B"])("ProductListPage");return Object(r["t"])(),Object(r["d"])(u,{fullPathList:t.fullPathList,products:t.products},null,8,["fullPathList","products"])}var c=a("1da1"),o=(a("96cf"),a("99af"),a("d3b7"),a("32fe")),u=a("0613"),s=Object(r["j"])({name:"Categorized",store:u["a"],components:{ProductListPage:o["a"]},data:function(){return{parentPageList:[{name:"Home",path:""}],categoryName:this.$route.params.category,products:[]}},computed:{fullPathList:function(){return this.parentPageList.concat([{name:this.categoryName,path:"./#"}])}},methods:{fetchData:function(t){var e="".concat(u["a"].state.backendApiUrl,"/product/all?category=").concat(t);return fetch(e,{method:"get",credentials:"include"}).then((function(t){return t.json()}))}},created:function(){var t=this;return Object(c["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.fetchData(t.categoryName);case 2:t.products=e.sent["data"];case 3:case"end":return e.stop()}}),e)})))()},beforeRouteUpdate:function(t,e){var a=this;return Object(c["a"])(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(t.params.category===e.params.category){r.next=4;break}return r.next=3,a.fetchData(a.categoryName);case 3:a.products=r.sent["data"];case 4:case"end":return r.stop()}}),r)})))()}}),i=a("6b0d"),d=a.n(i);const p=d()(s,[["render",n]]);e["default"]=p}}]);
//# sourceMappingURL=chunk-2d0b9bb6.4ede576a.js.map