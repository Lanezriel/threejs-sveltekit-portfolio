function y(){}const A=t=>t;function k(t,n){for(const e in n)t[e]=n[e];return t}function w(t){return t()}function B(){return Object.create(null)}function j(t){t.forEach(w)}function v(t){return typeof t=="function"}function C(t,n){return t!=t?n==n:t!==n||t&&typeof t=="object"||typeof t=="function"}function D(t){return Object.keys(t).length===0}function E(t,...n){if(t==null){for(const o of n)o(void 0);return y}const e=t.subscribe(...n);return e.unsubscribe?()=>e.unsubscribe():e}function F(t,n,e){t.$$.on_destroy.push(E(n,e))}function P(t,n,e,o){if(t){const r=m(t,n,e,o);return t[0](r)}}function m(t,n,e,o){return t[1]&&o?k(e.ctx.slice(),t[1](o(n))):e.ctx}function S(t,n,e,o){if(t[2]&&o){const r=t[2](o(e));if(n.dirty===void 0)return r;if(typeof r=="object"){const a=[],f=Math.max(n.dirty.length,r.length);for(let u=0;u<f;u+=1)a[u]=n.dirty[u]|r[u];return a}return n.dirty|r}return n.dirty}function U(t,n,e,o,r,a){if(r){const f=m(n,e,o,a);t.p(f,r)}}function G(t){if(t.ctx.length>32){const n=[],e=t.ctx.length/32;for(let o=0;o<e;o++)n[o]=-1;return n}return-1}function H(t){const n={};for(const e in t)e[0]!=="$"&&(n[e]=t[e]);return n}function I(t,n,e){return t.set(e),n}function J(t){return t&&v(t.destroy)?t.destroy:y}let l;function d(t){l=t}function p(){if(!l)throw new Error("Function called outside component initialization");return l}function K(t){p().$$.on_mount.push(t)}function L(t){p().$$.after_update.push(t)}function N(t){p().$$.on_destroy.push(t)}const i=[],b=[];let c=[];const g=[],x=Promise.resolve();let h=!1;function O(){h||(h=!0,x.then(z))}function Q(){return O(),x}function q(t){c.push(t)}const _=new Set;let s=0;function z(){if(s!==0)return;const t=l;do{try{for(;s<i.length;){const n=i[s];s++,d(n),M(n.$$)}}catch(n){throw i.length=0,s=0,n}for(d(null),i.length=0,s=0;b.length;)b.pop()();for(let n=0;n<c.length;n+=1){const e=c[n];_.has(e)||(_.add(e),e())}c.length=0}while(i.length);for(;g.length;)g.pop()();h=!1,_.clear(),d(t)}function M(t){if(t.fragment!==null){t.update(),j(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(q)}}function R(t){const n=[],e=[];c.forEach(o=>t.indexOf(o)===-1?n.push(o):e.push(o)),e.forEach(o=>o()),c=n}export{w as A,i as B,O as C,L as a,b,F as c,I as d,P as e,S as f,G as g,k as h,H as i,q as j,N as k,J as l,v as m,y as n,K as o,A as p,B as q,j as r,C as s,Q as t,U as u,z as v,D as w,R as x,l as y,d as z};