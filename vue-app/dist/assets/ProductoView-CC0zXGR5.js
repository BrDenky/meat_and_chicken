import{_ as M,c as o,a,b as f,w as b,F as v,r as g,h,f as N,v as $,d as C,T as L,i as R,j as S,k as c,o as n,n as T,t as w,e as x}from"./index-BduG8dra.js";import{c as E,a as H}from"./carne_3-oru4Fao5.js";const F="/assets/corte_1-BYHprYmn.png",O="/assets/carne_2-BCu_2CjF.jpg",W="/assets/carne_4-rt8TMPDs.jpg",G="/assets/carne_5-BqWldzR8.jpg",Q={class:"producto-view"},Y={class:"breadcrumb"},U={class:"container"},J={class:"container"},K={class:"product-detail"},X={class:"product-main"},Z={class:"product-images"},aa={class:"main-image"},ta=["src"],sa={class:"thumbnails-container-wrapper"},ea=["onClick"],ia=["src"],oa={class:"product-info"},na={class:"quantity-selector"},da={class:"quantity-controls"},ca={class:"quantity-input"},ra={class:"product-tabs"},la={class:"tab-buttons"},ua=["onClick"],va=["innerHTML"],pa={key:0,class:"notification-vue"},ma={__name:"ProductoView",setup(fa){const _=[E,O,H,W,G],p=c(0),d=c(1),m=c(0),r=c(""),y=c([{titulo:"Descripción",contenido:`
            <div class="tab-details">
                <h3>Detalles del Corte</h3>
                <p>
                    Nuestro corte Premium es seleccionado de ganado joven criado en pastizales
                    naturales, garantizando una textura tierna y un marmoleo excepcional.
                    Cada pieza es procesada bajo estrictos estándares de higiene para asegurar
                    que llegue a tu mesa con toda su jugosidad y sabor original.
                </p>
                <p>Compromiso de calidad:</p>
                <ul class="quality-list">
                    <li>100% Carne de pastoreo natural</li>
                    <li>Sin hormonas ni promotores de crecimiento</li>
                    <li>Corte artesanal realizado por maestros carniceros</li>
                    <li>Empaque al vacío para mantener la frescura</li>
                    <li>Cadena de frío monitoreada constantemente</li>
                </ul>
            </div>
        `},{titulo:"Ficha Técnica",contenido:`
            <div class="tab-details">
                <h3>Especificaciones Técnicas</h3>
                <table class="specifications-table">
                    <tr><th>Origen</th><td>Haciendas Locales (Ecuador)</td></tr>
                    <tr><th>Tipo de Ganado</th><td>Angus / Brangus seleccionado</td></tr>
                    <tr><th>Maduración</th><td>14 - 21 días (Wet Aged)</td></tr>
                    <tr><th>Presentación</th><td>Corte individual empacado al vacío</td></tr>
                    <tr><th>Peso Aprox.</th><td>500g - 800g por unidad</td></tr>
                    <tr><th>Vida Útil</th><td>30 días en refrigeración / 6 meses congelado</td></tr>
                    <tr><th>Temp. de Almacenamiento</th><td>0°C a 4°C</td></tr>
                    <tr><th>Alimentación</th><td>Pastura natural y granos seleccionados</td></tr>
                    <tr><th>Certificaciones</th><td>AGROCALIDAD, BPM</td></tr>
                </table>
            </div>
        `},{titulo:"Valoraciones",contenido:`
            <div class="tab-details">
                <h3>Opiniones de Parrilleros</h3>
                <div class="tab-review">
                    <div class="review-header">
                        <div>
                            <strong>Ricardo Peña</strong>
                            <div class="stars">★★★★★</div>
                        </div>
                        <span class="review-date">Hace 2 días</span>
                    </div>
                    <p class="review-text">
                        La suavidad de la carne es de otro nivel. El marmoleo estaba perfecto y
                        el empaque llegó muy frío, se nota el cuidado en el transporte.
                    </p>
                </div>
            </div>
        `}]),j=S(()=>_[p.value]),l=c(null),I=i=>{p.value=i},k=i=>{if(l.value){const t=l.value.querySelector(".thumbnail"),u=t?t.offsetWidth+10:100;l.value.scrollBy({left:i*u,behavior:"smooth"})}},q=()=>{d.value<99&&d.value++},A=()=>{d.value>1&&d.value--},V=i=>{m.value=i},P=i=>{r.value=i,setTimeout(()=>{r.value=""},3e3)},z=()=>{P(`✓ ${d.value} unidad(es) añadida(s) al carrito`)},B=()=>{P("❤️ Guardado en tus favoritos")};return(i,t)=>{const u=R("router-link");return n(),o("div",Q,[a("div",Y,[a("div",U,[a("ul",null,[a("li",null,[f(u,{to:"/"},{default:b(()=>[...t[3]||(t[3]=[C("Inicio",-1)])]),_:1})]),t[5]||(t[5]=a("li",null,"→",-1)),a("li",null,[f(u,{to:"/resultados"},{default:b(()=>[...t[4]||(t[4]=[C("Productos",-1)])]),_:1})]),t[6]||(t[6]=a("li",null,"→",-1)),t[7]||(t[7]=a("li",null,[a("span",null,"Producto Premium 1")],-1))])])]),a("main",null,[a("div",J,[a("div",K,[a("div",X,[a("div",Z,[a("div",aa,[t[8]||(t[8]=a("div",{class:"product-badges"},[a("span",{class:"badge new"},"Nuevo"),a("span",{class:"badge featured"},"Destacado")],-1)),a("img",{src:j.value,alt:"Imagen principal"},null,8,ta)]),a("div",sa,[a("button",{class:"thumb-nav-btn prev",onClick:t[0]||(t[0]=e=>k(-1)),type:"button"},[...t[9]||(t[9]=[a("i",{class:"fa-solid fa-chevron-left"},null,-1)])]),a("div",{class:"image-thumbnails",ref_key:"miniaturasRef",ref:l},[(n(),o(v,null,g(_,(e,s)=>a("div",{key:s,class:T(["thumbnail",{active:p.value===s}]),onClick:D=>I(s)},[a("img",{src:e,alt:"Thumbnail"},null,8,ia)],10,ea)),64))],512),a("button",{class:"thumb-nav-btn next",onClick:t[1]||(t[1]=e=>k(1)),type:"button"},[...t[10]||(t[10]=[a("i",{class:"fa-solid fa-chevron-right"},null,-1)])])])]),a("div",oa,[t[15]||(t[15]=h('<h1 data-v-d47c23c0>Producto Premium 1</h1><div class="product-rating" data-v-d47c23c0><div class="stars" data-v-d47c23c0>★★★★★</div><span class="rating-count" data-v-d47c23c0>(156 valoraciones)</span></div><div class="product-price" data-v-d47c23c0><span class="price-current" data-v-d47c23c0>$18.10</span><span class="price-original" data-v-d47c23c0>$25.50</span></div><div class="product-description" data-v-d47c23c0><p data-v-d47c23c0> Llevamos del campo a tu mesa la mejor selección de carne fresca. Sin aditivos ni conservantes, nuestro producto destaca por su color vibrante y su textura firme, reflejo de una crianza responsable y procesos artesanales. Calidad honesta para alimentar a tu familia con lo mejor. </p></div>',4)),a("div",na,[t[14]||(t[14]=a("label",null,"Cantidad:",-1)),a("div",da,[a("div",ca,[a("button",{onClick:A},"-"),N(a("input",{type:"number","onUpdate:modelValue":t[2]||(t[2]=e=>d.value=e),min:"1",max:"99",readonly:""},null,512),[[$,d.value,void 0,{number:!0}]]),a("button",{onClick:q},"+")]),t[13]||(t[13]=a("span",{class:"stock-info"},"✓ 247 disponibles en inventario",-1)),a("div",{class:"product-actions"},[a("button",{class:"btn btn-primary",onClick:z},[...t[11]||(t[11]=[a("span",{class:"btn-icon"},"🛒",-1),C(" Añadir al carrito ",-1)])]),a("button",{class:"btn btn-secondary",onClick:B},[...t[12]||(t[12]=[a("i",{class:"fa-solid fa-heart fav-icon-style"},null,-1)])])])])]),t[16]||(t[16]=h('<div class="product-features" data-v-d47c23c0><div class="feature-item" data-v-d47c23c0><span class="feature-icon" data-v-d47c23c0>✓</span><span class="feature-text" data-v-d47c23c0>Cadena de frío garantizada</span></div><div class="feature-item" data-v-d47c23c0><span class="feature-icon" data-v-d47c23c0>✓</span><span class="feature-text" data-v-d47c23c0>Corte artesanal fresco</span></div><div class="feature-item" data-v-d47c23c0><span class="feature-icon" data-v-d47c23c0>✓</span><span class="feature-text" data-v-d47c23c0>Origen 100% trazable</span></div><div class="feature-item" data-v-d47c23c0><span class="feature-icon" data-v-d47c23c0>✓</span><span class="feature-text" data-v-d47c23c0>Certificación Sanitaria</span></div></div>',1))])]),a("div",ra,[a("div",la,[(n(!0),o(v,null,g(y.value,(e,s)=>(n(),o("button",{key:s,class:T(["tab-button",{active:m.value===s}]),onClick:D=>V(s)},w(e.titulo),11,ua))),128))]),(n(!0),o(v,null,g(y.value,(e,s)=>(n(),o(v,{key:"tab-data-"+s},[m.value===s?(n(),o("div",{key:0,class:"tab-panel",style:{animation:"fadeIn 0.3s"},innerHTML:e.contenido},null,8,va)):x("",!0)],64))),128))]),t[17]||(t[17]=h('<div class="related-products" data-v-d47c23c0><h2 data-v-d47c23c0>Productos Relacionados</h2><div class="related-grid" data-v-d47c23c0><div class="related-product" data-v-d47c23c0><div class="related-product-image" data-v-d47c23c0><img src="'+F+'" alt="Producto Cárnico" class="related-img" data-v-d47c23c0></div><div class="related-product-info" data-v-d47c23c0><div class="related-product-title" data-v-d47c23c0>Producto Premium 2</div><div class="related-product-price" data-v-d47c23c0>$4.50</div></div></div></div></div>',1))])])]),f(L,{name:"slide-in"},{default:b(()=>[r.value?(n(),o("div",pa,w(r.value),1)):x("",!0)]),_:1})])}}},ha=M(ma,[["__scopeId","data-v-d47c23c0"]]);export{ha as default};
