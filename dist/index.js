Object.defineProperty(exports,"__esModule",{value:!0});const t={PRETTIFY_CHARS_TO_CHECK:["-","_"]},e=t=>t?t.charAt(0):"",r=t=>{if(!t)return"";const r=t.toString();return e(r).toUpperCase()+r.slice(1)},o=r=>{if(!r)return"";const o=r.toString(),{PRETTIFY_CHARS_TO_CHECK:s}=t;return s.reduce(((t,r)=>{const o=t.startsWith(r),s=t.split(r);return(o||1===s.length)&&s.forEach(((t,r)=>{(r||o)&&t&&(s[r]=e(t).toUpperCase()+t.slice(1))})),s.join("")}),o)};exports.default=t=>{const{$data:e}=t??{};e&&"object"==typeof e&&!Array.isArray(e)&&Object.keys(e).forEach((e=>{((t,e)=>{const s=r(o(e));t[`set${s}`]=r=>t[e]=r})(t,e),((t,e)=>{const s=r(o(e));Object.defineProperty(t,`has${s}`,{get:()=>!!t[e]})})(t,e)}))};
//# sourceMappingURL=index.js.map
