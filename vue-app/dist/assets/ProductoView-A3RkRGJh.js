import{_ as B,c as e,a,b as p,w as m,F as l,r as g,h as f,f as D,v as N,d as b,T as L,i as M,j as $,k as r,o as i,n as k,t as P,e as T}from"./index-DGu7qcOe.js";import{c as E,a as H}from"./carne_3-oru4Fao5.js";const S="/assets/corte_1-BYHprYmn.png",F="/assets/carne_2-BCu_2CjF.jpg",O="/assets/carne_4-rt8TMPDs.jpg",R="/assets/carne_5-BqWldzR8.jpg",G={class:"producto-view"},W={class:"breadcrumb"},Q={class:"container"},Y={class:"container"},U={class:"product-detail"},J={class:"product-main"},K={class:"product-images"},X={class:"main-image"},Z=["src"],aa={class:"image-thumbnails"},ta=["onClick"],sa=["src"],ea={class:"product-info"},ia={class:"quantity-selector"},oa={class:"quantity-controls"},na={class:"quantity-input"},da={class:"product-tabs"},ra={class:"tab-buttons"},ca=["onClick"],la=["innerHTML"],ua={key:0,class:"notification-vue"},va={__name:"ProductoView",setup(pa){const _=[E,F,H,O,R],u=r(0),o=r(1),v=r(0),c=r(""),h=r([{titulo:"Descripción",contenido:`
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
        `}]),w=$(()=>_[u.value]),x=d=>{u.value=d},j=()=>{o.value<99&&o.value++},I=()=>{o.value>1&&o.value--},V=d=>{v.value=d},C=d=>{c.value=d,setTimeout(()=>{c.value=""},3e3)},q=()=>{C(`✓ ${o.value} unidad(es) añadida(s) al carrito`)},z=()=>{C("❤️ Guardado en tus favoritos")};return(d,t)=>{const y=M("router-link");return i(),e("div",G,[a("div",W,[a("div",Q,[a("ul",null,[a("li",null,[p(y,{to:"/"},{default:m(()=>[...t[1]||(t[1]=[b("Inicio",-1)])]),_:1})]),t[3]||(t[3]=a("li",null,"→",-1)),a("li",null,[p(y,{to:"/resultados"},{default:m(()=>[...t[2]||(t[2]=[b("Productos",-1)])]),_:1})]),t[4]||(t[4]=a("li",null,"→",-1)),t[5]||(t[5]=a("li",null,[a("span",null,"Producto Premium 1")],-1))])])]),a("main",null,[a("div",Y,[a("div",U,[a("div",J,[a("div",K,[a("div",X,[t[6]||(t[6]=a("div",{class:"product-badges"},[a("span",{class:"badge new"},"Nuevo"),a("span",{class:"badge featured"},"Destacado")],-1)),a("img",{src:w.value,alt:"Imagen principal"},null,8,Z)]),a("div",aa,[(i(),e(l,null,g(_,(n,s)=>a("div",{key:s,class:k(["thumbnail",{active:u.value===s}]),onClick:A=>x(s)},[a("img",{src:n,alt:"Thumbnail"},null,8,sa)],10,ta)),64))])]),a("div",ea,[t[11]||(t[11]=f('<h1 data-v-c2318812>Producto Premium 1</h1><div class="product-rating" data-v-c2318812><div class="stars" data-v-c2318812>★★★★★</div><span class="rating-count" data-v-c2318812>(156 valoraciones)</span></div><div class="product-price" data-v-c2318812><span class="price-current" data-v-c2318812>$18.10</span><span class="price-original" data-v-c2318812>$25.50</span></div><div class="product-description" data-v-c2318812><p data-v-c2318812> Llevamos del campo a tu mesa la mejor selección de carne fresca. Sin aditivos ni conservantes, nuestro producto destaca por su color vibrante y su textura firme, reflejo de una crianza responsable y procesos artesanales. Calidad honesta para alimentar a tu familia con lo mejor. </p></div>',4)),a("div",ia,[t[10]||(t[10]=a("label",null,"Cantidad:",-1)),a("div",oa,[a("div",na,[a("button",{onClick:I},"-"),D(a("input",{type:"number","onUpdate:modelValue":t[0]||(t[0]=n=>o.value=n),min:"1",max:"99",readonly:""},null,512),[[N,o.value,void 0,{number:!0}]]),a("button",{onClick:j},"+")]),t[9]||(t[9]=a("span",{class:"stock-info"},"✓ 247 disponibles en inventario",-1)),a("div",{class:"product-actions"},[a("button",{class:"btn btn-primary",onClick:q},[...t[7]||(t[7]=[a("span",{class:"btn-icon"},"🛒",-1),b(" Añadir al carrito ",-1)])]),a("button",{class:"btn btn-secondary",onClick:z},[...t[8]||(t[8]=[a("span",{class:"btn-icon"},"❤️",-1)])])])])]),t[12]||(t[12]=f('<div class="product-features" data-v-c2318812><div class="feature-item" data-v-c2318812><span class="feature-icon" data-v-c2318812>✓</span><span class="feature-text" data-v-c2318812>Cadena de frío garantizada</span></div><div class="feature-item" data-v-c2318812><span class="feature-icon" data-v-c2318812>✓</span><span class="feature-text" data-v-c2318812>Corte artesanal fresco</span></div><div class="feature-item" data-v-c2318812><span class="feature-icon" data-v-c2318812>✓</span><span class="feature-text" data-v-c2318812>Origen 100% trazable</span></div><div class="feature-item" data-v-c2318812><span class="feature-icon" data-v-c2318812>✓</span><span class="feature-text" data-v-c2318812>Certificación Sanitaria</span></div></div>',1))])]),a("div",da,[a("div",ra,[(i(!0),e(l,null,g(h.value,(n,s)=>(i(),e("button",{key:s,class:k(["tab-button",{active:v.value===s}]),onClick:A=>V(s)},P(n.titulo),11,ca))),128))]),(i(!0),e(l,null,g(h.value,(n,s)=>(i(),e(l,{key:"tab-data-"+s},[v.value===s?(i(),e("div",{key:0,class:"tab-panel",style:{animation:"fadeIn 0.3s"},innerHTML:n.contenido},null,8,la)):T("",!0)],64))),128))]),t[13]||(t[13]=f('<div class="related-products" data-v-c2318812><h2 data-v-c2318812>Productos Relacionados</h2><div class="related-grid" data-v-c2318812><div class="related-product" data-v-c2318812><div class="related-product-image" data-v-c2318812><img src="'+S+'" alt="Producto Cárnico" class="related-img" data-v-c2318812></div><div class="related-product-info" data-v-c2318812><div class="related-product-title" data-v-c2318812>Producto Premium 2</div><div class="related-product-price" data-v-c2318812>$4.50</div></div></div></div></div>',1))])])]),p(L,{name:"slide-in"},{default:m(()=>[c.value?(i(),e("div",ua,P(c.value),1)):T("",!0)]),_:1})])}}},fa=B(va,[["__scopeId","data-v-c2318812"]]);export{fa as default};
