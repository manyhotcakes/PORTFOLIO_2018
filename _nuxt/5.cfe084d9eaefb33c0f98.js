webpackJsonp([5],{"+T3G":function(t,e,a){"use strict";var i=function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"squareImage"},[e(this.imageType,{tag:"component",staticClass:"squareImage_content",attrs:{src:this.src}}),e("p",{staticClass:"squareImage_title",domProps:{textContent:this._s(this.title)}})],1)};i._withStripped=!0;var s={render:i,staticRenderFns:[]};e.a=s},"08yH":function(t,e,a){"use strict";e.a={props:{src:{type:String,required:!0},title:{type:String,required:!1},imageType:{type:String,required:!1,default:"cryptImage"}},components:{CryptImage:function(){return a.e(7).then(a.bind(null,"djlp"))},CryptImageWithLb:function(){return a.e(6).then(a.bind(null,"aDk3"))}}}},"115t":function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("article",{staticClass:"wrap"},[a("h2",{staticClass:"modaltitle"},[t._v(t._s(t.contents.title))]),a("div",{staticClass:"desc",domProps:{textContent:t._s(t.contents.description)}}),a("div",{staticClass:"l-tworow"},[a("dl",{staticClass:"l-tworow_col l-tworow_col-first spec"},[t.contents.duration?a("dt",[t._v("プロジェクト期間")]):t._e(),t.contents.duration?a("dd",{domProps:{textContent:t._s(t.contents.duration)}}):t._e(),t.contents.targetdevice?a("dt",[t._v("対象デバイス")]):t._e(),t.contents.targetdevice?a("dd",{domProps:{textContent:t._s(t.contents.targetdevice)}}):t._e(),t.contents.team?a("dt",[t._v("チーム規模")]):t._e(),t.contents.team?a("dd",{domProps:{textContent:t._s(t.contents.team)}}):t._e(),t.contents.position?a("dt",[t._v("自身の役割")]):t._e(),t.contents.position?a("dd",[a("ul",{staticClass:"sublist"},t._l(t.contents.position,function(e,i){return a("li",{key:i,domProps:{textContent:t._s(e)}})}))]):t._e(),t.contents.charge?a("dt",[t._v("自身の担当フェーズ")]):t._e(),t.contents.charge?a("dd",{domProps:{textContent:t._s(t.contents.charge)}}):t._e(),t.contents.technique?a("dt",[t._v("技術要素")]):t._e(),t.contents.technique?a("dd",[a("ul",{staticClass:"sublist"},t._l(t.contents.technique,function(e,i){return a("li",{key:i,domProps:{textContent:t._s(e)}})}))]):t._e(),t.contents.site?a("dt",[t._v("サイト")]):t._e(),t.contents.site?a("dd",[a("ul",{staticClass:"sublist"},t._l(t.contents.site,function(e,i){return a("li",{key:i},[a("a",{attrs:{href:e.url,target:"_blank",rel:"noopener noreferrer"},domProps:{textContent:t._s(e.title)}})])}))]):t._e()]),t.contents.images.length?a("section",{staticClass:"l-tworow_col l-tworow_col-second l-imagelist"},t._l(t.contents.images,function(t,e){return a("squareimage",{key:e,staticClass:"l-imagelist_item l-imagelist_item-2separate",attrs:{src:t.image,title:t.title,imageType:"CryptImageWithLb"}})})):t._e()]),t.contents.particular?a("section",{staticClass:"particular"},[a("h3",{staticClass:"subtitle"},[t._v("こだわり")]),a("div",{staticClass:"sublist"},t._l(t.contents.particular,function(e,i){return a("div",{key:i},[a("h4",{staticClass:"particular_title",domProps:{textContent:t._s(e.title)}}),a("div",{staticClass:"particular_body"},t._l(e.body,function(e,i){return a("p",{key:i,staticClass:"particular_body",domProps:{innerHTML:t._s(e)}})}))])}))]):t._e()])};i._withStripped=!0;var s={render:i,staticRenderFns:[]};e.a=s},"52dj":function(t,e,a){"use strict";var i=a("08yH"),s=a("+T3G"),n=!1;var r=function(t){n||a("gB4I")},o=a("VU/8")(i.a,s.a,!1,r,"data-v-77fb0e04",null);o.options.__file="components/contents/Squareimage.vue",e.a=o.exports},VssI:function(t,e,a){"use strict";var i=a("52dj");e.a={name:"Works",components:{Squareimage:i.a},props:{contents:{type:[Object],required:!0}},data:function(){return{}},mounted:function(){},watch:{},computed:{}}},WMB3:function(t,e,a){(t.exports=a("FZ+f")(!1)).push([t.i,".wrap[data-v-c626c0d6]{text-align:left}.spec>dt[data-v-c626c0d6],.subtitle[data-v-c626c0d6]{background:#5fc0bb;color:#fafafa;line-height:1}.desc[data-v-c626c0d6]{margin:1rem 0 3rem}.l-tworow[data-v-c626c0d6]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-ms-flex-wrap:wrap;flex-wrap:wrap;margin-bottom:1rem}.l-tworow_col-first[data-v-c626c0d6]{-webkit-box-flex:0;-ms-flex:0 0 40%;flex:0 0 40%;padding-right:.5rem}@media screen and (max-width:767px){.l-tworow_col-first[data-v-c626c0d6]{padding-right:0}}.l-tworow_col-second[data-v-c626c0d6]{-webkit-box-flex:0;-ms-flex:0 0 60%;flex:0 0 60%;padding-left:.5rem}@media screen and (max-width:767px){.l-tworow_col-second[data-v-c626c0d6]{margin-bottom:2rem;padding-left:0}}@media screen and (max-width:767px){.l-tworow[data-v-c626c0d6]{-webkit-box-orient:vertical;-webkit-box-direction:reverse;-ms-flex-direction:column-reverse;flex-direction:column-reverse;-ms-flex-wrap:nowrap;flex-wrap:nowrap}}.spec[data-v-c626c0d6]{word-break:break-all}.spec>dt[data-v-c626c0d6]{font-size:1.4em;font-weight:700;padding:.2rem;margin:1rem 0 .5rem}.spec>dt[data-v-c626c0d6]:first-child{margin-top:0}.spec>dd[data-v-c626c0d6]{padding-left:2rem}.sublist[data-v-c626c0d6]{list-style:circle;padding-left:1rem}.sublist>li[data-v-c626c0d6]{margin:4px 0;padding:0}.particular_title[data-v-c626c0d6]{margin:1rem 0 .5rem}.particular_body[data-v-c626c0d6]{white-space:pre-wrap;margin-top:.5rem;padding-left:1rem;line-height:1.4rem}.particular_body[data-v-c626c0d6]:first-child{margin-top:0}.particular_body[data-v-c626c0d6] b{font-weight:700;color:#5fc0bb}",""])},gB4I:function(t,e,a){var i=a("lgxm");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);a("rjj0")("616b0efe",i,!1,{sourceMap:!1})},lgxm:function(t,e,a){(t.exports=a("FZ+f")(!1)).push([t.i,'.squareImage[data-v-77fb0e04]{width:100%;position:relative;overflow:hidden;border:1px solid rgba(0,0,0,.12);border-radius:2px;-webkit-animation:fadeIn .4s ease 0s 1 normal;animation:fadeIn .4s ease 0s 1 normal;-webkit-box-sizing:border-box;box-sizing:border-box}.squareImage[data-v-77fb0e04]:before{content:"";padding-top:100%;display:block}.squareImage:hover .squareImage_content[data-v-77fb0e04]{-webkit-filter:brightness(20%);filter:brightness(20%)}.squareImage:hover .squareImage_title[data-v-77fb0e04]{opacity:1}.squareImage_content[data-v-77fb0e04]{position:absolute;top:0;left:0;-webkit-transition:-webkit-filter .3s linear;transition:-webkit-filter .3s linear;transition:filter .3s linear;transition:filter .3s linear,-webkit-filter .3s linear;width:100%;height:100%;-webkit-filter:brightness(100%);filter:brightness(100%)}.squareImage_title[data-v-77fb0e04]{position:absolute;font-size:1rem;width:100%;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);-webkit-transition:opacity .3s linear;transition:opacity .3s linear;color:#fff;opacity:0;padding:.2rem;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;white-space:pre-wrap}',""])},pTHZ:function(t,e,a){var i=a("WMB3");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);a("rjj0")("d51b1894",i,!1,{sourceMap:!1})},veSe:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("VssI"),s=a("115t"),n=!1;var r=function(t){n||a("pTHZ")},o=a("VU/8")(i.a,s.a,!1,r,"data-v-c626c0d6",null);o.options.__file="components/modal/Works.vue",e.default=o.exports}});